import { Entity } from '../Entity';
import Compositor from '../compositor';
import Grid from '../grid';
import { LayerType } from '../setup/layout';
import { _setPopUpChildrenCoordinates } from '../helpers/helpers for draw';
import EventHanlder from './EventHanlder';

export default class EventsListeners {
  previousEntity: Entity;
  compositor: Compositor;
  canvas: HTMLCanvasElement;
  handler: EventHanlder;

  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>
  ) {
    this.canvas = canvas;
    this.compositor = compositor;
    this.handler = new EventHanlder(canvas, compositor, grid);

    this.initiate();
  }

  initiate() {
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
  }

  update(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.handler.removeElementFromPopUp(e, 'droppablePopUp_UI');
        this.handler.getDraggable(e, 'draggable');
        this.handler.displayPopUp(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.handler.moveItem(e, 'draggable');
        break;
      case 'touchend':
      case 'mouseup':
        this.handler.appendToDroppable(e, 'draggable');
        break;
    }
  }
}