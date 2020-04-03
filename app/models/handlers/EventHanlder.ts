import Compositor from '../compositor';
import { LayerType } from '../setup/layout';
import Grid from '../grid';
import {
  getLayerTemplate,
  getEntityFromGrid,
  getPossition,
  cloneEntities,
  getEntityParameters
} from '../helpers/get helpers';
import { Entity } from '../Entity';
import {
  _setChildrenCoordinates,
  isNotReadyToGetDraggable
} from '../helpers/helpers for draw';
import { PopUp } from '../popUp';
import { LayerElements } from '../createLayers';
import { cursorHandler } from './cursor handler';

type AdditionalLayers = Map<LayerType, Array<LayerElements>>;

export default class EventHanlder {
  compositor: Compositor;
  grid: Map<LayerType, Array<Grid>>;
  additionalLayers: AdditionalLayers;
  popupActive: boolean;
  getDraggableAvailability: boolean;
  deltaX: number;
  deltaY: number;
  canvas: HTMLCanvasElement;
  popupAvailable: boolean;
  qID: string;

  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>,
    qID:string
  ) {
    this.qID = qID;
    this.canvas = canvas;
    this.popupActive = false;
    this.compositor = compositor;
    this.grid = grid;
    this.getDraggableAvailability = true;
    this.deltaX = 0;
    this.deltaY = 0;
    this.additionalLayers = new Map();

    this.popupAvailable = this.compositor.layers.get('drop')[0].popupAvailable; //temp workaround for QP3;

    this.initAdditionalLayers([
      'draggable',
      'droppablePopUp',
      'droppablePopUp_UI'
    ]);
  }

  updateBufferLayer(names: Array<LayerType>) {
    const _this = this;
    names.forEach(name => _this.compositor.updateBufferLayer(name));
  }

  initAdditionalLayers(names: Array<LayerType>) {
    const _this = this;
    names.forEach(name => {
      if (_this.additionalLayers.has(name)) {
        return;
      }
      _this.additionalLayers.set(name, getLayerTemplate());
    });
    this.setAdditionalBuffers();
  }

  setAdditionalBuffers() {
    const _this = this;
    this.additionalLayers.forEach((layer, name) => {
      if (_this.compositor.layers.has(name)) {
        return;
      }
      _this.compositor.layers.set(name, layer);
      _this.compositor.addBuffer(name);
    });
  }

  displayChildrens(
    name: LayerType,
    entities: Array<Entity>,
    parent_x: number,
    parent_y: number,
    parent_w: number,
    parent_h: number
  ) {
    const layer = this.additionalLayers.get(name);
    layer[0].elements = [].concat(entities);
    layer[0].debug = false
    layer[0].elements_padding_right = 5;
    layer[0].elements_padding_top = 0;

    _setChildrenCoordinates(
      layer[0].elements as Array<Entity>,
      parent_x,
      parent_y,
      parent_w,
      parent_h,
      name !== 'droppablePopUp_UI',
      this.qID
    );
    this.grid.set(name, [new Grid(layer[0])]);
    this.updateBufferLayer([name]);
  }

  getEntity(e: MouseEvent | TouchEvent, name: LayerType) {
    return getEntityFromGrid(e, name, this.grid);
  }

  displayPopUp(e: MouseEvent | TouchEvent) {
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    const popUp_layer_NAME = 'droppablePopUp';
    const popUp_UI_layer_NAME = 'droppablePopUp_UI';
    const popUp_layer = this.additionalLayers.get(popUp_layer_NAME);
    const popUp_UI_layer = this.additionalLayers.get(popUp_UI_layer_NAME);

    if (this.popupActive && popUp_layer[0].elements[0].checkCoord(x, y)) {
      return;
    }

    popUp_layer[0].elements.length = 0;
    popUp_UI_layer[0].elements.length = 0;

    this.grid.delete(popUp_UI_layer_NAME);
    const availableDroppable = this.getEntity(e, 'drop');

    if (availableDroppable.length > 0 && availableDroppable[0].popupAvailabe) {
      this.popupActive = true;
      const popUp = new PopUp(availableDroppable[0].element);
      popUp_layer[0].elements.push(popUp);

      this.displayChildrens(
        popUp_UI_layer_NAME,
        popUp.entity.childs,
        popUp.x,
        popUp.y,
        popUp.width,
        popUp.height
      );
    } else {
      this.popupActive = false;
    }

    this.updateBufferLayer([popUp_layer_NAME, popUp_UI_layer_NAME]);
  }

  removeElement(e: MouseEvent | TouchEvent, name: LayerType, callback: CallableFunction) {
    if (!this.popupActive && this.popupAvailable) {
      return;
    }

    const _this = this;
    const layer = this.additionalLayers.get(name);
    const entityToRemove = this.getEntity(e, name);
    let parentElement: Entity;

    entityToRemove.forEach(entity => {
      const parent = entity.element.parentEntity;
      parentElement = parent;
      parent.removeChild(entity.element);
      layer[0].elements = [].concat(parent.childs);

      let display_childrens = false;
      _this.compositor.layers.get('drop').forEach(layer => {
        if (layer.display_childrens) display_childrens = layer.display_childrens
      })
      if (display_childrens) {
        _this.displayChildrens(
          parent.id,
          _this.popupAvailable ? cloneEntities(parent.childs) : parent.childs,
          parent.x,
          parent.y,
          parent.width,
          parent.height
        );
      }

      _this.updateBufferLayer(['drop', name]);
    });

    callback(parentElement);
  }

  get(e: MouseEvent | TouchEvent, name: LayerType) {
    if (this.popupActive && this.popupAvailable) {
      return;
    }
    if (isNotReadyToGetDraggable(e, this.getDraggableAvailability)) {
      return;
    }

    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    const layer = this.additionalLayers.get(name);

    const availableDraggable: Entity[] = [];
    const _this = this;
    const draggable = this.getEntity(e, 'drag');
    if (draggable.length > 0) {
      availableDraggable.push(draggable[0].element);
    }

    availableDraggable.forEach(availableEntity => {
      const draggable = new Entity(
        availableEntity.image,
        getEntityParameters(availableEntity)
      );
      _this.deltaX = x - availableEntity.x;
      _this.deltaY = y - availableEntity.y;
      _this.getDraggableAvailability = false;
      layer[0].elements.push(draggable);
    });
  }

  append(e: MouseEvent | TouchEvent, name: LayerType, callback: CallableFunction) {
    if (this.popupActive && this.popupAvailable) {
      return;
    }

    const _this = this;
    const layer = this.additionalLayers.get(name);
    const availableDroppable = this.getEntity(e, 'drop');
    availableDroppable.forEach(droppable => {
      if (droppable && layer[0].elements.length > 0) {
        layer[0].elements.forEach(element => {
          const entity = element as Entity;
          droppable.element.addChild(entity);
          entity.parentEntity = droppable.element;
        });
        _this.initAdditionalLayers([droppable.element.id]);

        let display_childrens = false;
        _this.compositor.layers.get('drop').forEach(layer => {
          if (layer.display_childrens) display_childrens = layer.display_childrens
        })

        if (display_childrens) {
          _this.displayChildrens(
            droppable.element.id,
            _this.popupAvailable ? cloneEntities(droppable.element.childs) : droppable.element.childs,
            droppable.element.x,
            droppable.element.y,
            droppable.element.width,
            droppable.element.height
          );
        }

      }
    });
    layer[0].elements.length = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.getDraggableAvailability = true;
    this.updateBufferLayer([name, 'drop']);

    callback(availableDroppable);
  }

  move(e: MouseEvent | TouchEvent, name: LayerType) {
    const _this = this;
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    const layer = this.additionalLayers.get(name);

    if (layer[0].elements.length > 0) {
      layer[0].elements.forEach(element => {
        const entity = element as Entity;
        entity.x = x - _this.deltaX;
        entity.y = y - _this.deltaY;
      });
      this.updateBufferLayer([name]);
    } else {
      cursorHandler(this.canvas, this.grid, x, y, this.popupActive);
    }
  }

  remove(e: MouseEvent | TouchEvent, callback: CallableFunction) {
    const layerNames = [];
    if (!this.popupAvailable) {
      const drop = this.compositor.layers.get('drop');
      drop.forEach(layer => layer.elements.forEach(element => {
        const entity = element as Entity;
        layerNames.push(entity.id);
      })
      )
    } else {
      layerNames.push('droppablePopUp_UI');
    }
    const _this = this;
    layerNames.forEach(name => _this.removeElement(e, name, (parent: Entity) => callback(parent)))
  }
}
