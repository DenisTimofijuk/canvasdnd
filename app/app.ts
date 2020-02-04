import { loadImage, getPleaseWait } from './models/loaders';
import { SpriteSheet, TileName } from './models/SpriteSheet';
import { Entity } from './models/Entity';
import { createLayers, LayerNames } from './models/createLayers';
import { loadTiles } from './models/tileLoader';
import EventsHandler from './models/event handlers';


type MainObject = {
  totalQID: string;
  referenceQIDs: Array<string>;
};
type MainParams = Array<MainObject>;

export class CanvasCalendar {
  placeHolder: HTMLElement;
  standBy: HTMLDivElement;
  sprites: SpriteSheet;
  grid: Map<LayerNames, Array<Entity>>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    const placeHolderID = 'cdnd_placeHolder';
    this.placeHolder = document.getElementById(placeHolderID);
    this.standBy = getPleaseWait('Loading Please wait...');
    this.placeHolder.appendChild(this.standBy);
    const _this = this;

    this.initLoader().then(loadTile => {
      loadTiles(loadTile);
      _this.initGrid();
    });
  }

  async initLoader() {
    const image = await loadImage(
      './img/CanvasDnD.png'
    );
    this.placeHolder.removeChild(this.standBy);
    this.sprites = new SpriteSheet(image);
    const _this = this;

    return function loadTile(
      name: TileName,
      x: number,
      y: number,
      width: number,
      height: number
    ) {
      _this.sprites.define(name, x, y, width, height);
    };
  }

  initGrid() {
    this.grid = createLayers(this.sprites);
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.placeHolder.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.drawTiles();
    this.initEventHandler();
  }

  drawTiles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const _this = this;
    this.grid.forEach(layer => {
      layer.forEach(entity => {
        entity.draw(_this.ctx);
      });
    });
  }

  update(){
    this.drawTiles();
    window.requestAnimationFrame(() => {this.update()});
  }

  initEventHandler() {
    new EventsHandler(this);
    this.update();
  }
}

new CanvasCalendar();