import { Entity } from "./Entity";
import { CALENDAR_PADDING_RIGHT, CALENDAR_PADDING_TOP } from "./layout";

export default class Grid {
    entities: Entity[];
    grid: Entity[][];
    w: number;
    h: number;
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
            const index_y = Math.floor(entity.y / _this.h) % _this.h
            if (!this.grid[index_x]) {
                this.grid[index_x] = [];
            }
            this.grid[index_x][index_y] = entity;
        })
    }

    get(x:number, y:number):Entity | undefined{
        const index_x = Math.floor(x / this.w) % this.w;
        const index_y = (Math.floor(y / this.h) % this.h) - 1; //y index is 1 too bog
        if(this.grid[index_x]){
            if(this.grid[index_x][index_y]){
                const entity = this.grid[index_x][index_y];
                if(entity.checkCoord(x, y)){
                    return entity;
                }
            }
        }
    }
}