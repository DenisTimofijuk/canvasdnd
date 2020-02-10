import { Entity } from './Entity';
import { cursorHandler } from './helpers';
import Compositor from './compositor';
import Grid from './grid';
import { LayerType } from './layout';

type CallbackType = 'add' | 'remove';
export type CallbackArguments = {
  type: CallbackType;
  activitie: Entity;
  target: Entity;
}
export interface EventCallback {
  (result: CallbackArguments): void;
}

export default class EventsHandler {
  flag: boolean;
  deltaX: number;
  deltaY: number;
  draggableLayer: [{ elements: Array<Entity>; debug: boolean }];
  previousEntity: Entity;
  compositor: Compositor;
  canvas: HTMLCanvasElement;
  grid: Map<LayerType, Array<Grid>>;
  callback: EventCallback;
  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>,
    callback: EventCallback
  ) {
    this.callback = callback;
    this.grid = grid;
    this.canvas = canvas;
    this.compositor = compositor;
    this.flag = true;
    this.deltaX = 0;
    this.deltaY = 0;
    this.draggableLayer = [{ elements: [], debug: false }];
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
    this.compositor.layers.set('draggable', this.draggableLayer);
    this.compositor.addBuffer('draggable');
  }

  update(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.getDraggable(e);
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

  getDraggable(e: MouseEvent | TouchEvent) {
    const touchE = e as TouchEvent;
    const clickE = e as MouseEvent;
    if (
      (touchE.type === 'touchstart' && !this.flag) ||
      (clickE.type === 'mousedown' &&
        !(clickE.button === 0 && clickE.buttons === 1 && this.flag))
    ) {
      return;
    }

    let x: number, y: number;
    if (e.type === 'touchstart') {
      x = touchE.touches[0].clientX;
      y = touchE.touches[0].clientY;
    } else {
      x = clickE.offsetX;
      y = clickE.offsetY;
    }

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
          availableEntity.name,
          availableEntity.image,
          availableEntity.x,
          availableEntity.y,
          availableEntity.val,
          availableEntity.label,
          availableEntity.referanceID,
          availableEntity.width,
          availableEntity.height
        );
        _this.deltaX = x - availableEntity.x;
        _this.deltaY = y - availableEntity.y;
        _this.flag = false;
        _this.draggableLayer[0].elements.push(draggable);
      });
    }
  }

  moveItem(e: MouseEvent | TouchEvent) {
    const _this = this;
    const touchE = e as TouchEvent;
    const clickE = e as MouseEvent;

    let x: number, y: number;
    if (e.type === 'touchmove') {
      x = touchE.touches[0].clientX;
      y = touchE.touches[0].clientY;
    } else {
      x = clickE.offsetX;
      y = clickE.offsetY;
    }

    if (this.draggableLayer[0].elements.length > 0) {
      this.draggableLayer[0].elements.forEach(entity => {
        entity.x = x - _this.deltaX;
        entity.y = y - _this.deltaY;
      });
      this.compositor.updateBufferLayer('draggable');
    } else {
      cursorHandler(_this.canvas, _this.grid, x, y);
    }
  }

  appendToDroppable(e: MouseEvent | TouchEvent) {
    const touchE = e as TouchEvent;
    const clickE = e as MouseEvent;

    let x: number, y: number;
    if (e.type === 'touchend') {
      x = touchE.changedTouches[0].clientX; //TODO: touch screen multiple finger at the same time
      y = touchE.changedTouches[0].clientY;
    } else {
      x = clickE.offsetX;
      y = clickE.offsetY;
    }

    const availableDroppable: Entity[] = [];
    this.grid.get('drop').forEach(gridLayer => {
      const droppable = gridLayer.getEntity(x, y);
      if (droppable) {
        availableDroppable.push(droppable);
      }
    });

    availableDroppable.forEach(droppable => {
      if (droppable && this.draggableLayer[0].elements.length > 0) {
        this.draggableLayer[0].elements.forEach(entity =>
          droppable.addChild(entity)
        );
      }
    });         

    const activitie = this.draggableLayer[0].elements[0];
    const droppable = availableDroppable[0];

    this.draggableLayer[0].elements.length = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.flag = true;

    this.fireCallback('add', activitie, droppable);
  }

  fireCallback(type:CallbackType, activitie:Entity, target:Entity){
    this.callback({
      type: type,
      activitie: activitie,
      target: target
    })
  }
}