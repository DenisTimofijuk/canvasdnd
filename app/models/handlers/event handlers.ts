import { Entity } from '../Entity';
import { getPossition, getEntityParameters } from '../helpers/get helpers';
import Compositor from '../compositor';
import Grid from '../grid';
import { LayerType } from '../setup/layout';
import { LayerElements } from '../createLayers';
import { PopUp } from '../popUp';
import { cursorHandler } from './cursor handler';
import { _setPopUpChildrenCoordinates } from '../helpers/helpers for draw';
import { getParam_Popup_Children_Layer } from '../setup/style/popup children';

export type DroppablePopUpUILayer = { elements: Entity[]; debug: boolean; elements_padding_right: number; elements_padding_top: number; };
type DroppablePopUpLayer = { elements: PopUp[]; debug: boolean; elements_padding_right: number; elements_padding_top: number; };

export default class EventsHandler {
  flag: boolean;
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

  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>
  ) {
    this.popupActive = false;
    this.grid = grid;
    this.canvas = canvas;
    this.compositor = compositor;
    this.flag = true;
    this.deltaX = 0;
    this.deltaY = 0;
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
    this.setAdditionalBuffers();
  }

  setAdditionalBuffers() {
    this.compositor.layers.set('draggable', this.draggableLayer);
    this.compositor.addBuffer('draggable');
    this.compositor.layers.set('droppablePopUp', this.droppablePopUpLayer);
    this.compositor.addBuffer('droppablePopUp');
    this.compositor.layers.set('droppablePopUp_UI', this.droppablePopUpUILayer);
    this.compositor.addBuffer('droppablePopUp_UI');

  }

  update(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.getDraggable(e);
        this.popupHandler(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.moveItem(e);
        break;
      case 'touchend':
      case 'mouseup':
        this.appendToDroppable(e);
        break;
    }
  }

  popupHandler(e: MouseEvent | TouchEvent) {
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    if (
      this.popupActive &&
      this.droppablePopUpLayer[0].elements[0].checkCoord(x, y)
    ) {
      return;
    }

    this.droppablePopUpLayer[0].elements.length = 0;
    this.droppablePopUpUILayer[0].elements.length = 0;
    this.grid.delete('droppablePopUp_UI');

    const availableDroppable = this.getDroppable(e);

    if (availableDroppable.length > 0) {
      this.popupActive = true;
      const popUp = new PopUp(availableDroppable[0]);
      this.droppablePopUpLayer[0].elements.push(popUp);
      this.popupUIhandler(popUp);
    } else {
      this.popupActive = false;
    }
    this.compositor.updateBufferLayer('droppablePopUp');
    this.compositor.updateBufferLayer('droppablePopUp_UI');
  }

  popupUIhandler(popUp: PopUp) {
    const layerParam = getParam_Popup_Children_Layer();
    this.droppablePopUpUILayer[0].elements = [].concat(popUp.entity.childs);
    this.droppablePopUpUILayer[0].debug = layerParam.debug;
    this.droppablePopUpUILayer[0].elements_padding_right = layerParam.children_elements_padding_right;

    _setPopUpChildrenCoordinates(this.droppablePopUpUILayer[0].elements, popUp);

    this.grid.set('droppablePopUp_UI', [new Grid(this.droppablePopUpUILayer[0])]);
  }

  getDraggable(e: MouseEvent | TouchEvent) {
    if (this.popupActive) {
      return;
    }
    if (isNotReadyToGetDraggable(e, this.flag)) {
      return;
    }

    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    const availableDraggable: Entity[] = [];
    const _this = this;
    this.grid.get('drag').forEach(gridLayer => {
      const draggable = gridLayer.getEntity(x, y);
      if (draggable) {
        availableDraggable.push(draggable);
      }
    });
    if (availableDraggable.length > 0) {
      availableDraggable.forEach(availableEntity => {
        const draggable = new Entity(
          availableEntity.image,
          getEntityParameters(availableEntity)
        );
        _this.deltaX = x - availableEntity.x;
        _this.deltaY = y - availableEntity.y;
        _this.flag = false;
        _this.draggableLayer[0].elements.push(draggable);
      });
    }
  }

  moveItem(e: MouseEvent | TouchEvent) {
    if (this.popupActive) {
      return;
    }
    const _this = this;
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    if (this.draggableLayer[0].elements.length > 0) {
      this.draggableLayer[0].elements.forEach(element => {
        const entity = element as Entity;
        entity.x = x - _this.deltaX;
        entity.y = y - _this.deltaY;
      });
      this.compositor.updateBufferLayer('draggable');
    } else {
      cursorHandler(_this.canvas, _this.grid, x, y);
    }
  }

  appendToDroppable(e: MouseEvent | TouchEvent) {
    if (this.popupActive) {
      return;
    }
    const availableDroppable = this.getDroppable(e);

    availableDroppable.forEach(droppable => {
      if (droppable && this.draggableLayer[0].elements.length > 0) {
        this.draggableLayer[0].elements.forEach(element => {
          const entity = element as Entity;
          droppable.addChild(entity);
          entity.parentEntity = droppable;
        });
      }
    });

    this.draggableLayer[0].elements.length = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.flag = true;

    this.compositor.updateBufferLayer('drop');
    this.compositor.updateBufferLayer('draggable');
  }

  getDroppable(e: MouseEvent | TouchEvent) {
    const possition = getPossition(e);
    const x = possition.x;
    const y = possition.y;

    const availableDroppable: Array<Entity> = [];
    this.grid.get('drop').forEach(gridLayer => {
      const droppable = gridLayer.getEntity(x, y);
      if (droppable) {
        availableDroppable.push(droppable);
      }
    });
    return availableDroppable;
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
