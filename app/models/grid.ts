import { Entity } from "./Entity";
import { LayerElements } from "./createLayers";

export default class Grid {
    entities: Array<Entity>;
    body: Entity[][];
    w: number;
    h: number;
    trim_x: number;
    trim_y: number;
    PADDING_RIGHT: number;
    PADDING_TOP: number;
    popupAvailable: boolean;
    color: string;
    constructor(layer: LayerElements, color = "green") {
        this.color = color;
        const elements = layer.elements as Array<Entity>;
        this.entities = elements;
        this.PADDING_RIGHT = layer.elements_padding_right;
        this.PADDING_TOP = layer.elements_padding_top;
        this.popupAvailable = layer.popupAvailable;
        this.body = [];
        this.define();
    }

    define() {
        const _this = this;
        this.entities.forEach(entity => {
            _this.w = entity.width + _this.PADDING_RIGHT;
            _this.h = entity.height + _this.PADDING_TOP;
            const index_x = Math.floor(entity.x / _this.w) % _this.w;
            const index_y = Math.floor(entity.y / _this.h) % _this.h;
            if (!_this.body[index_x]) {
                _this.body[index_x] = [];
            }
            _this.body[index_x][index_y] = entity;
        })
    }

    getEntityByCoord(x: number, y: number): Entity | undefined {
        const index_x = Math.floor(x / this.w) % this.w;
        const index_y = (Math.floor(y / this.h) % this.h);
        if (this.body[index_x]) {
            if (this.body[index_x][index_y]) {
                const entity = this.body[index_x][index_y];
                if (entity.checkCoord(x, y)) {
                    return entity;
                }
            }
        }
    }

    getEntityByRefID(refID: string){
        return this.entities.filter(entity => {
            return entity.referanceID === refID;
        })
    }

    debug(ctx: CanvasRenderingContext2D) {
        const _this = this;
        this.body.forEach((col, colindex) => {
            col.forEach((entity, rowindex) => {
                let x = colindex * _this.w;
                let y = rowindex * _this.h;
                ctx.beginPath()
                ctx.strokeStyle = _this.color;
                ctx.rect(x, y, _this.w, _this.h)
                ctx.stroke();
                ctx.closePath();
            })
        })
    }
}