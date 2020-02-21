import { loadImage, getPleaseWait } from './models/loaders';
import { SpriteSheet } from './models/SpriteSheet';
import EventsHandler from './models/handlers/event handlers';
import Compositor from './models/compositor';
import Grid from './models/grid';
import { TileName, LayerType } from './models/setup/layout';
import { defineTiles, getTiles } from './models/setup/define tiles'; 

export class CanvasCalendar {
  placeHolder: HTMLElement;
  standBy: HTMLDivElement;
  sprites: SpriteSheet;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  compositor: Compositor;
  grid: Map<LayerType, Array<Grid>>;

  constructor() {
    const placeHolderID = 'cdnd_placeHolder';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.placeHolder = document.getElementById(placeHolderID);
    this.standBy = getPleaseWait('Loading Please wait...');
    this.placeHolder.appendChild(this.standBy);
    this.grid = new Map();
    const _this = this;

    this.initLoader().then(async loadTile => {
      // const tiles = (await getTiles('./json/tiles.json')).tiles;
      // tiles.forEach(tile =>
      //   loadTile(tile.name, tile.x, tile.y, tile.w, tile.h)
      // );

      defineTiles().forEach(tile =>
        loadTile(tile.name, tile.x, tile.y, tile.w, tile.h)
      );
      _this.initCompositor();
      _this.initGrid();
      _this.initEventHandler();
      _this.displayGridForDebugging();
      _this.update();
    });
  }

  async initLoader() {
    const image = await loadImage('./img/CanvasDnD_2.png');
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

  initGrid() {
    const gridToLayers: Array<LayerType> = ['drag', 'drop'];
    const _this = this;
    gridToLayers.forEach(name =>
      _this.compositor.layers.get(name).forEach(layer => {
        if (_this.grid.has(name)) {
          _this.grid.get(name).push(new Grid(layer));
        } else {
          _this.grid.set(name, [new Grid(layer)]);
        }
      })
    );
  }

  displayGridForDebugging() {
    this.compositor.addBuffer('grid');
    const _this = this;
    const gridBufferCanv = this.compositor.buffers.get('grid');
    const gridBufferCtx = gridBufferCanv.getContext('2d');
    gridBufferCtx.clearRect(0,0,gridBufferCanv.width, gridBufferCanv.height);
    this.compositor.layers.forEach((compositorlayer, name) => {
      compositorlayer.forEach((layer, layerIndex) => {
        if (layer.debug && _this.grid.has(name)) {
          _this.grid.get(name).forEach((grid, gridIndex) => {
            if(layerIndex === gridIndex){
              grid.debug(gridBufferCtx);
            };      
          })
        }
      })
    })
  }

  update() {
    this.compositor.draw();
    
    // Use below to display grid for additional layers:
    this.displayGridForDebugging();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  initEventHandler() {
    new EventsHandler(this.canvas, this.compositor, this.grid);
  }
}

new CanvasCalendar();
