import { loadImage, getPleaseWait } from './models/helpers/loaders';
import { SpriteSheet } from './models/SpriteSheet';
import EventsListeners from './models/handlers/EventsListeners';
import Compositor from './models/compositor';
import Grid from './models/grid';
import { TileName, LayerType } from './models/setup/layout';
import { defineTiles, getTiles } from './models/setup/define tiles'; 
import './img/CanvasDnD_2.png';
import './img/mouse_remove.png';
import { createInputs } from './models/test/createInputs';
import { getNotEmptyinputs, simulateEvent } from './models/helpers/get helpers';
import { Entity } from './models/Entity';

export class CanvasCalendar {
  placeHolder: HTMLElement;
  standBy: HTMLDivElement;
  sprites: SpriteSheet;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  compositor: Compositor;
  grid: Map<LayerType, Array<Grid>>;
  eventListener: EventsListeners;
  qID: string;

  constructor(qID:string) {
    this.qID = qID;
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
      defineTiles().forEach(tile =>
        loadTile(tile.name, tile.x, tile.y, tile.w, tile.h)
      );
      _this.initCompositor();
      _this.initGrid();
      _this.initEventHandler();
      _this.displayGridForDebugging();
      _this.displaySavedData();
      _this.update();
    });
  }

  displaySavedData(){
    const inputs = getNotEmptyinputs(this.qID);
    const droppables = this.grid.get('drop');
    const draggable = this.grid.get('drag');
    const _this = this;
    inputs.forEach( input  => {
      const htmlInput = input as HTMLInputElement;
      droppables.forEach(grid => {
        const parentEntity = grid.getEntityByRefID(input.id);
        
        if(parentEntity.length === 0){
          console.log("Warning. Parent Element by ID was not found:", input.id);
          return;
        }

        const savedIDs = htmlInput.value.split('|');
        savedIDs.forEach(child_id => {
          if(!child_id){
            return;
          }

          let entity: Entity[] = [];
          draggable.forEach(grid => {
            const result = grid.getEntityByID(child_id);
            if(result.length > 0){
              entity = result;
            }            
          })
          
          if(entity.length === 0){
            console.log("Warning. Child Element by ID was not found:", child_id);
            return;
          }

          _this.eventListener.update(simulateEvent('mousedown', entity[0]));          
          _this.eventListener.update(simulateEvent('mouseup', parentEntity[0]));
        })
      })
    })
    
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
    this.compositor = new Compositor(this.sprites, this.canvas, this.qID);
    this.placeHolder.removeChild(this.standBy);
    this.placeHolder.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  initGrid() {
    const _this = this;
    this.compositor.layers.forEach((layers, name) => {
      layers.forEach(layer => {
        if(layer.grid){
          if (_this.grid.has(name)) {
            _this.grid.get(name).push(new Grid(layer));
          } else {
            _this.grid.set(name, [new Grid(layer)]);
          }
        }        
      })
    })
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
    // this.displayGridForDebugging();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  initEventHandler() {
    this.eventListener = new EventsListeners(this.canvas, this.compositor, this.grid, this.qID);
  }
}

createInputs('QP4');

//layout.ts has hardcoded QID cases
new CanvasCalendar('QP4');