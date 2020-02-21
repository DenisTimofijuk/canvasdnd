import { Entity } from '../Entity';
import {
  getPossition,
  getEntityParameters,
  getEntityFromGrid
} from '../helpers/get helpers';
import Compositor from '../compositor';
import Grid from '../grid';
import { LayerType } from '../setup/layout';
import { LayerElements } from '../createLayers';
import { PopUp } from '../popUp';
import { cursorHandler } from './cursor handler';
import { _setPopUpChildrenCoordinates } from '../helpers/helpers for draw';
import { getParam_Popup_Children_Layer } from '../setup/style/popup children';

export type DroppablePopUpUILayer = {
  elements: Entity[];
  debug: boolean;
  elements_padding_right: number;
  elements_padding_top: number;
};

type DroppablePopUpLayer = {
  elements: PopUp[];
  debug: boolean;
  elements_padding_right: number;
  elements_padding_top: number;
};

type AdditionalLayers = Map<LayerType, Array<LayerElements>>

export default class EventsHandler {
  getDraggableAvailability: boolean;
  deltaX: number;
  deltaY: number;
  draggableLayer: Array<LayerElements>;
  previousEntity: Entity;
  compositor: Compositor;
  canvas: HTMLCanvasElement;
  grid: Map<LayerType, Array<Grid>>;
  droppablePopUpLayer: Array<DroppablePopUpLayer>;
  popupActive: boolean;
  droppablePopUpUILayer: Array<DroppablePopUpUILayer>;
  additionalLayers: AdditionalLayers;

  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>
  ) {
    this.popupActive = false;
    this.grid = grid;
    this.canvas = canvas;
    this.compositor = compositor;
    this.getDraggableAvailability = true;
    this.deltaX = 0;
    this.deltaY = 0;
    this.additionalLayers = new Map();
    this.draggableLayer = [
      {
        elements: [] as Array<Entity>,
        debug: false,
        elements_padding_right: 0,
        elements_padding_top: 0
      }
    ];
    this.droppablePopUpLayer = [
      {
        elements: [] as Array<PopUp>,
        debug: false,
        elements_padding_right: 0,
        elements_padding_top: 0
      }
    ];
    this.droppablePopUpUILayer = [
      {
        elements: [] as Array<Entity>,
        debug: false,
        elements_padding_right: 0,
        elements_padding_top: 0
      }
    ];

    this.define();
  }

  define() {
    const _this = this;
    [
      'mousedown',
      'mousemove',
      'mouseup',
      'touchstart',
      'touchend',
      'touchmove'
    ].forEach(eventName => {
      _this.canvas.addEventListener(eventName, e =>
        _this.update(e as MouseEvent | TouchEvent)
      );
    });

    this.additionalLayers.set('draggable', this.draggableLayer);
    this.additionalLayers.set('droppablePopUp', this.droppablePopUpLayer);
    this.additionalLayers.set('droppablePopUp_UI', this.droppablePopUpUILayer);

    this.setAdditionalBuffers();
  }

  setAdditionalBuffers() {
    const _this = this;
    this.additionalLayers.forEach((layer, name) =>{
      _this.compositor.layers.set(name, layer);
      _this.compositor.addBuffer(name);
    })
  }

  update(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.removeElementFromPopUp(e, 'droppablePopUp_UI');
        this.removeChildrensFromEntityOnPreview(e);
        this.getDraggable(e, 'draggable');
        this.popupHandler(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.moveItem(e, 'draggable');
        break;
      case 'touchend':
      case 'mouseup':
        this.appendToDroppable(e, 'draggable');
        break;
    }
  }

  popupHandler(e: MouseEvent | TouchEvent) {
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;
    
    const popUp_layer_NAME = 'droppablePopUp';
    const popUp_UI_layer_NAME = 'droppablePopUp_UI';
    const popUp_layer = this.additionalLayers.get(popUp_layer_NAME);
    const popUp_UI_layer = this.additionalLayers.get(popUp_UI_layer_NAME);

    if ( this.popupActive && popUp_layer[0].elements[0].checkCoord(x, y)) {
      return;
    }

    popUp_layer[0].elements.length = 0;
    popUp_UI_layer[0].elements.length = 0;

    this.grid.delete(popUp_UI_layer_NAME);

    const availableDroppable = getEntityFromGrid(e, 'drop', this.grid);

    if (availableDroppable.length > 0 && availableDroppable[0].popupAvailabe) {
      this.popupActive = true;
      const popUp = new PopUp(availableDroppable[0].element);
      popUp_layer[0].elements.push(popUp);
      this.popupUIhandler(popUp, popUp_UI_layer_NAME);
    } else {
      this.popupActive = false;
    }

    this.updateBufferLayer([popUp_layer_NAME, popUp_UI_layer_NAME]);
  }

  popupUIhandler(popUp: PopUp, name:LayerType) {
    const layerParam = getParam_Popup_Children_Layer();

    const layer = this.additionalLayers.get(name);

    layer[0].elements = [].concat(popUp.entity.childs);
    layer[0].debug = layerParam.debug;
    layer[0].elements_padding_right = layerParam.children_elements_padding_right;

    _setPopUpChildrenCoordinates(layer[0].elements as Array<Entity>, popUp);

    this.grid.set(name, [
      new Grid(layer[0])
    ]);
  }

  getDraggable(e: MouseEvent | TouchEvent, name:LayerType) {
    if (this.popupActive) {
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
    const draggable = getEntityFromGrid(e, 'drag', this.grid);
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

  moveItem(e: MouseEvent | TouchEvent, name:LayerType) {
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

  appendToDroppable(e: MouseEvent | TouchEvent, name:LayerType) {
    if (this.popupActive) {
      return;
    }
    const layer = this.additionalLayers.get(name);
    const availableDroppable = getEntityFromGrid(e, 'drop', this.grid);
    availableDroppable.forEach(droppable => {
      if (droppable && layer[0].elements.length > 0) {
        layer[0].elements.forEach(element => {
          const entity = element as Entity;
          droppable.element.addChild(entity);
          entity.parentEntity = droppable.element;
        });
      }
    });

    layer[0].elements.length = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.getDraggableAvailability = true;

    this.updateBufferLayer([name, 'drop']);
  }

  removeElementFromPopUp(e: MouseEvent | TouchEvent, name:LayerType) {
    if (!this.popupActive) {
      return;
    }
    const layer = this.additionalLayers.get(name);
    const entityToRemove = getEntityFromGrid(e, name, this.grid);
    
    entityToRemove.forEach(entity => {
      const parent = entity.element.parentEntity;
      parent.removeChild(entity.element);
      layer[0].elements = [].concat(parent.childs);
    })
    
    this.updateBufferLayer([name, 'drop']);
  }

  removeChildrensFromEntityOnPreview(e: MouseEvent | TouchEvent){
    if (this.popupActive) {
      return;
    }
    console.log(this.grid)
    //const entityToRemove = getEntityFromGrid(e, 'droppablePopUp_UI', this.grid);
  }

  updateBufferLayer(names: Array<LayerType>) {
    const _this = this;
    names.forEach(name => _this.compositor.updateBufferLayer(name));
  }
}

function isNotReadyToGetDraggable(e: MouseEvent | TouchEvent, flag: boolean) {
  const touchE = e as TouchEvent;
  const clickE = e as MouseEvent;

  return (
    (touchE.type === 'touchstart' && !flag) ||
    (clickE.type === 'mousedown' &&
      !(clickE.button === 0 && clickE.buttons === 1 && flag))
  );
}
