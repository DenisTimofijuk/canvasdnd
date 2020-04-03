import { Entity } from '../Entity';
import Compositor from '../compositor';
import Grid from '../grid';
import { LayerType } from '../setup/layout';
import { _setChildrenCoordinates } from '../helpers/helpers for draw';
import EventHanlder from './EventHanlder';
import { AvailableDroppable } from '../helpers/get helpers';
import { DataHandler } from './DataHandler';

export default class EventsListeners {
  previousEntity: Entity;
  compositor: Compositor;
  canvas: HTMLCanvasElement;
  handler: EventHanlder;
  data: DataHandler;

  constructor(
    canvas: HTMLCanvasElement,
    compositor: Compositor,
    grid: Map<LayerType, Array<Grid>>,
    QID:string
  ) {
    this.canvas = canvas;
    this.compositor = compositor;
    this.handler = new EventHanlder(canvas, compositor, grid, QID);
    this.data = new DataHandler();

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
    const _this = this;
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.handler.remove(e, (parent: Entity) => _this.data.update([{popupAvailabe:true, element:parent}]));
        this.handler.get(e, 'draggable');
        this.handler.displayPopUp(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.handler.move(e, 'draggable');
        break;
      case 'touchend':
      case 'mouseup':
        this.handler.append(e, 'draggable', (parents: AvailableDroppable) => _this.data.update(parents));
        break;
    }
  }
}