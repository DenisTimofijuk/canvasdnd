import { Entity } from "./Entity";
import { getEntityByCoordinates } from "./helpers";
import Compositor from "./compositor";
import Grid from "./grid";

export default class EventsHandler {
    flag: boolean;
    deltaX: number;
    deltaY: number;
    draggableLayer: Array<Entity>;
    previousEntity: Entity;
    compositor: Compositor;
    canvas: HTMLCanvasElement;
    gridDrop: Grid;
    constructor(canvas:HTMLCanvasElement, compositor:Compositor, gridDrop:Grid) {
        this.gridDrop = gridDrop;
        this.canvas = canvas;
        this.compositor = compositor;
        this.flag = true;
        this.deltaX = 0;
        this.deltaY = 0;
        this.draggableLayer = [];
        this.define();
    }

    define() {
        const _this = this;
        ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchend', 'touchmove'].forEach(eventName => {
            _this.canvas.addEventListener(eventName, e => _this.update(e as MouseEvent | TouchEvent));
        })
        this.compositor.layers.set('draging', this.draggableLayer);
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
        if (touchE.type === 'touchstart' && !this.flag || clickE.type === 'mousedown' && !(clickE.button === 0 && clickE.buttons === 1 && this.flag)) {
            return;
        }

        let x, y;
        if (e.type === 'touchstart') {
            x = touchE.touches[0].clientX;
            y = touchE.touches[0].clientY;
        } else {
            x = clickE.offsetX;
            y = clickE.offsetY;
        }

        const availableEntity = getEntityByCoordinates(this.compositor.layers.get('draggable'), x, y);
        if (availableEntity !== undefined) {
            const draggable = new Entity(
                availableEntity.name,
                availableEntity.image,
                availableEntity.x,
                availableEntity.y,
                availableEntity.width,
                availableEntity.height
            );
            this.deltaX = x - availableEntity.x;
            this.deltaY = y - availableEntity.y;
            this.flag = false;
            this.draggableLayer.push(draggable);
        }

    }

    moveItem(e: MouseEvent | TouchEvent) {
        const _this = this;
        const touchE = e as TouchEvent;
        const clickE = e as MouseEvent;

        let x:number, y:number;
        if (e.type === 'touchmove') {
            x = touchE.touches[0].clientX;
            y = touchE.touches[0].clientY;
        } else {
            x = clickE.offsetX;
            y = clickE.offsetY;
        }

        if (this.draggableLayer.length > 0) {
            this.draggableLayer.forEach(entity => {
                entity.x = x - _this.deltaX;
                entity.y = y - _this.deltaY;
            })
        } else {
            //cursorHandler(this.canvasCalendar.canvas, this.canvasCalendar.compositor, x, y);
        }
    }

    appendToDroppable(e: MouseEvent | TouchEvent) {
        const touchE = e as TouchEvent;
        const clickE = e as MouseEvent;

        let x:number, y:number;
        if (e.type === 'touchend') {
            x = touchE.changedTouches[0].clientX;
            y = touchE.changedTouches[0].clientY;
        } else {
            x = clickE.offsetX;
            y = clickE.offsetY;
        }
        
        const availableEntity = this.gridDrop.get(x, y);
        if (availableEntity && this.draggableLayer.length > 0) {
            this.draggableLayer.forEach(entity => availableEntity.addChild(entity));
        }
        this.draggableLayer.length = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.flag = true;
    }
}