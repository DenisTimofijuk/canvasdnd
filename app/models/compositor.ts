import { SpriteSheet } from "./SpriteSheet";
import { createLayers, LayerNames } from "./createLayers";
import { Entity } from "./Entity";

export default class Compositor {
    canvas: HTMLCanvasElement;
    layers: Map<LayerNames, Array<Entity>>;
    ctx: CanvasRenderingContext2D;
    constructor(sprites: SpriteSheet, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.layers = createLayers(sprites);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const _this = this;
        this.layers.forEach(layer => {
            layer.forEach(entity => {
                entity.draw(_this.ctx);
            });
        });
    }
}