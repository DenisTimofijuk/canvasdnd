import { Entity } from "./Entity";
import { CALENDAR_PADDING_RIGHT, CALENDAR_PADDING_TOP } from "./layout";

export default class Grid {
    entities: Entity[];
    grid: Entity[][];
    w: number;
    h: number;
    trim_x:number;
    trim_y:number;
    constructor(entities: Array<Entity>) {
        this.entities = entities;
        this.grid = [];
        this.define();
    }

    define() {
        const _this = this;
        this.entities.forEach(entity => {
            _this.w = entity.width + CALENDAR_PADDING_RIGHT;
            _this.h = entity.height + CALENDAR_PADDING_TOP;
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