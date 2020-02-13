import { TileName } from "./setup/layout";


export class SpriteSheet {
    image: HTMLImageElement;
    tiles: Map<TileName, HTMLCanvasElement>;
    constructor(img: HTMLImageElement) {
        this.image = img;
        this.tiles = new Map();
    }

    define(name: TileName, x: number, y: number, width: number, height: number) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        var ctx = buffer.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);

        this.tiles.set(name, buffer);
    }
}
