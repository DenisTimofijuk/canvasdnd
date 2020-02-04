import { Entity } from "./Entity";
import { getEntityByCoordinates, cursorHandler } from "./helpers";
import { LayerNames } from "./createLayers";
import { CanvasCalendar } from "../app";

export default class EventsHandler {
    canvasCalendar: CanvasCalendar;
    flag: boolean;
    deltaX: number;
    deltaY: number;
    draggableLayer: Array<Entity>;
    onHover: (e: MouseEvent) => void;
    previousEntity: Entity;
    constructor(canvasCalendar: CanvasCalendar) {
        this.canvasCalendar = canvasCalendar;
        this.flag = true;
        this.deltaX = 0;
        this.deltaY = 0;
        this.draggableLayer = [];
        this.define();
    }

    define() {
        const _this = this;
        ['mousedown', 'mousemove', 'mouseup'].forEach(eventName => {
            _this.canvasCalendar.canvas.addEventListener(eventName, e => _this.update(e as MouseEvent));
        })
        this.canvasCalendar.grid.set('draging', this.draggableLayer);
    }

    update(e: MouseEvent) {
        switch (e.type) {
            case 'mousedown':
                this.getItem(e);
                break;
            case 'mousemove':
                this.moveItem(e);
                this.animationHandler(e);
                break;
            case 'mouseup':
                this.fnishDrag(e);
                break;
        }
    }

    getItem(e: MouseEvent) {
        if (e.button === 0 && e.buttons === 1 && this.flag) {
            const availableEntity = getEntityByCoordinates(this.canvasCalendar.grid.get('draggable'), e);
            if (availableEntity !== undefined) {
                const draggable = new Entity(
                    availableEntity.name,
                    availableEntity.image,
                    availableEntity.x,
                    availableEntity.y,
                    availableEntity.width,
                    availableEntity.height
                );
                this.deltaX = e.offsetX - availableEntity.x;
                this.deltaY = e.offsetY - availableEntity.y;
                this.flag = false;
                this.draggableLayer.push(draggable);
            }
        }
    }

    animationHandler(e: MouseEvent) {
        const grid = this.canvasCalendar.grid;
        const availableEntity = getEntityByCoordinates(grid.get('calendar'), e);
        if (availableEntity) {
            this.previousEntity = availableEntity;
            availableEntity.hoverOver();
        } else if (this.previousEntity) {
            this.previousEntity.hoverOut();
        }
    }

    moveItem(e: MouseEvent) {
        const _this = this;
        if (this.draggableLayer.length > 0) {
            this.draggableLayer.forEach(entity => {
                entity.x = e.offsetX - _this.deltaX;
                entity.y = e.offsetY - _this.deltaY;
            })
        } else {
            cursorHandler(e, this.canvasCalendar.canvas, this.canvasCalendar.grid);
        }
    }

    fnishDrag(e: MouseEvent) {
        const availableEntity = getEntityByCoordinates(this.canvasCalendar.grid.get('calendar'), e);
        if (availableEntity && this.draggableLayer.length > 0) {
            this.draggableLayer.forEach(entity => availableEntity.addChild(entity));
        }
        this.draggableLayer.length = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.flag = true;
    }
}