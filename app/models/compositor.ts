import { SpriteSheet } from "./SpriteSheet";
import { createLayers, LayerNames } from "./createLayers";
import { Entity } from "./Entity";
import { getPageLayoutCalendar } from "./layout";

export default class Compositor {
    canvas: HTMLCanvasElement;
    layers: Map<LayerNames, Array<Entity>>;
    ctx: CanvasRenderingContext2D;
    buffers: Map<LayerNames, HTMLCanvasElement>;
    debug: boolean;
    constructor(sprites: SpriteSheet, canvas: HTMLCanvasElement, debug?:boolean) {
        this.debug = debug !== undefined ? debug : false;
        this.canvas = canvas;
        this.buffers = new Map();
        this.ctx = canvas.getContext('2d');
        this.layers = createLayers(sprites);
        this.defineBuffers();
    }

    defineBuffers() {
        const _this = this;
        this.layers.forEach((layer, name) => _this.addBuffer(name))
    }

    addBuffer(name: LayerNames) {
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = this.canvas.width;
        bufferCanvas.height = this.canvas.height;
        this.buffers.set(name, bufferCanvas);
        this.updateBufferLayer(name);
    }

    updateBufferLayer(name: LayerNames) {
        if(!this.buffers.has(name) || !this.layers.has(name)){
            return;
        }
        const bufferCanv = this.buffers.get(name);
        const bufferCtx = bufferCanv.getContext('2d');
        bufferCtx.clearRect(0, 0, bufferCanv.width, bufferCanv.height);
        const _this = this;
        this.layers.get(name).forEach(entity => entity.draw(bufferCtx, _this.debug));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const _this = this;
        this.buffers.forEach(bufferCanv => _this.ctx.drawImage(bufferCanv, 0, 0));
    }
}