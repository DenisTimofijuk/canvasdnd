import { Entity } from "./Entity";
import { LayerElements } from "./createLayers";

export default class Grid {
    entities: Array<Entity>;
    grid: Entity[][];
    w: number;
    h: number;
    trim_x:number;
    trim_y:number;
    PADDING_RIGHT: number;
    PADDING_TOP: number;
    constructor(layer: LayerElements) {
        const elements = layer.elements as Array<Entity>;
        this.entities = elements;
        this.PADDING_RIGHT = layer.elements_padding_right;
        this.PADDING_TOP = layer.elements_padding_top;
        this.grid = [];
        this.define();
    }

    define() {
        const _this = this;
        this.entities.forEach(entity => {
            _this.w = entity.width + _this.PADDING_RIGHT;
            _this.h = entity.height + _this.PADDING_TOP;
            const index_x = Math.floor(entity.x / _this.w) % _this.w;
            const index_y = Math.floor(entity.y / _this.h) % _this.h;
            if (!_this.grid[index_x]) {
                _this.grid[index_x] = [];
            }
            _this.grid[index_x][index_y] = entity;
        })
    }

    getEntity(x:number, y:number):Entity | undefined{
        const index_x = Math.floor(x / this.w) % this.w;
        const index_y = (Math.floor(y / this.h) % this.h);
        if(this.grid[index_x]){
            if(this.grid[index_x][index_y]){
                const entity = this.grid[index_x][index_y];
                if(entity.checkCoord(x, y)){
                    return entity;
                }
            }
        }
    }

    debug(ctx:CanvasRenderingContext2D){
        const _this = this;
        this.grid.forEach((col, colindex) => {
            col.forEach((entity, rowindex) => {
                let x = colindex * _this.w;
                let y = rowindex * _this.h;
                ctx.beginPath()
                ctx.strokeStyle = "green";
                ctx.rect(x, y, _this.w, _this.h)
                ctx.stroke();
                ctx.closePath();
            })
        })
    }
}