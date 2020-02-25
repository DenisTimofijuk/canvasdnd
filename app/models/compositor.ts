import { SpriteSheet } from "./SpriteSheet";
import { createLayers, Layer } from "./createLayers";
import { LayerType } from "./setup/layout";

export default class Compositor {
    canvas: HTMLCanvasElement;
    layers: Layer;
    ctx: CanvasRenderingContext2D;
    buffers: Map<LayerType, HTMLCanvasElement>;
    constructor(sprites: SpriteSheet, canvas: HTMLCanvasElement) {
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

    addBuffer(name: LayerType) {
        if(this.buffers.has(name)){
            return;
        }
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = this.canvas.width;
        bufferCanvas.height = this.canvas.height;
        this.buffers.set(name, bufferCanvas);
        this.updateBufferLayer(name);
    }

    updateBufferLayer(name: LayerType) {
        if(!this.buffers.has(name) || !this.layers.has(name)){
            return;
        }
        const bufferCanv = this.buffers.get(name);
        const bufferCtx = bufferCanv.getContext('2d');
        bufferCtx.clearRect(0, 0, bufferCanv.width, bufferCanv.height);
        const layers = this.layers.get(name);
        layers.forEach(layer => {
            layer.elements.forEach(entity => entity.draw(bufferCtx, layer.debug));
        })        
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const _this = this;
        this.buffers.forEach(bufferCanv => _this.ctx.drawImage(bufferCanv, 0, 0));
        

        //temp hack tp have popup drawn allways the last to be on the top
        //TODO: Popup grid layer is under the popup layer now;
        // if(this.buffers.has('droppablePopUp') && this.buffers.has('droppablePopUp_UI')){
        //     this.ctx.drawImage(this.buffers.get('droppablePopUp'), 0, 0);
        //     this.ctx.drawImage(this.buffers.get('droppablePopUp_UI'), 0, 0);
        // }
    }
}