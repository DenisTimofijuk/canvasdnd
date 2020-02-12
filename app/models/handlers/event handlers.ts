import { Entity } from '../Entity';
import { getPossition, getEntityParameters } from '../helpers/get helpers';
import Compositor from '../compositor';
import Grid from '../grid';
import { LayerType } from '../layout';
import { LayerElements } from '../createLayers';
import { PopUp } from '../popUp';
import { cursorHandler } from './cursor handler';

export default class EventsHandler {
  flag: boolean;
  deltaX: number;
  deltaY: number;
  draggableLayer: Array<LayerElements>;
  previousEntity: Entity;
  compositor: Compositor;
  canvas: HTMLCanvasElement;
  grid: Map<LayerType, Array<Grid>>;
  droppablePopUpLayer: {
    elements: PopUp[];
    debug: boolean;
    elements_padding_right: number;
    elements_padding_top: number;
  }[];
  popupActive: boolean;

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
    const availableDroppable = this.getDroppable(e);

    if (availableDroppable.length > 0) {
      this.popupActive = true;
      const popUp = new PopUp(availableDroppable[0]);
      this.droppablePopUpLayer[0].elements.push(popUp);
    } else {
      this.popupActive = false;
    }
    this.compositor.updateBufferLayer('droppablePopUp');
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

function isNotReadyToGetDraggable(e: MouseEvent | TouchEvent, flag:boolean) {
  const touchE = e as TouchEvent;
  const clickE = e as MouseEvent;

  return (
    (touchE.type === 'touchstart' && !flag) ||
    (clickE.type === 'mousedown' &&
      !(clickE.button === 0 && clickE.buttons === 1 && flag))
  );
}
