import { loadImage, getPleaseWait } from './models/loaders';
import { SpriteSheet, TileName } from './models/SpriteSheet';
import { Entity } from './models/Entity';
import { createLayers, LayerNames } from './models/createLayers';
import { loadTiles } from './models/tileLoader';
import EventsHandler from './models/event handlers';
import Compositor from './models/compositor';
import Grid from './models/grid';


type MainObject = {
  totalQID: string;
  referenceQIDs: Array<string>;
};
type MainParams = Array<MainObject>;
export type GridName = 'drop' | 'drag'

export class CanvasCalendar {
  placeHolder: HTMLElement;
  standBy: HTMLDivElement;
  sprites: SpriteSheet;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  compositor: Compositor;
  grid: Map<GridName, Grid>

  constructor() {
    const placeHolderID = 'cdnd_placeHolder';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.placeHolder = document.getElementById(placeHolderID);
    this.standBy = getPleaseWait('Loading Please wait...');
    this.placeHolder.appendChild(this.standBy);
    this.grid = new Map();
    const _this = this;

    this.initLoader().then(loadTile => {
      loadTiles(loadTile);
      _this.initCompositor();
      _this.initDroppableGrid();
      _this.initEventHandler();
      _this.test();
      _this.update();
    });
  }

  async initLoader() {
    const image = await loadImage(
      './img/CanvasDnD.png'
    );
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

  initCompositor() {
    this.compositor = new Compositor(this.sprites, this.canvas);

    this.placeHolder.removeChild(this.standBy);
    this.placeHolder.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  initDroppableGrid(){
    const calendar = this.compositor.layers.get('calendar');
    const draggable = this.compositor.layers.get('draggable');
    this.grid.set('drop', new Grid(calendar));
    this.grid.set('drag', new Grid(draggable));
  }

  test(){
    this.compositor.addBuffer('grid');
    const gridBufferCanv = this.compositor.buffers.get('grid');
    const gridBufferCtx = gridBufferCanv.getContext('2d');
    this.grid.get('drag').test(gridBufferCtx);
    this.grid.get('drop').test(gridBufferCtx);
  }

  update(){

    // const _this = this;
    // setInterval(function(){
    //   _this.compositor.draw();
    // }, 1000)

    this.compositor.draw();
    window.requestAnimationFrame(() => {this.update()});
  }

  initEventHandler() {
    new EventsHandler(this.canvas, this.compositor, this.grid);
  }
}

new CanvasCalendar();