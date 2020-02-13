import { SpriteSheet } from "./SpriteSheet";
import { Entity } from "./Entity";
import { itemLayer, defineLayersWithElements, LayerType } from "./setup/layout";
import { PopUp } from "./popUp";

export type LayerElements = {
  elements: Array<Entity | PopUp>, 
  debug:boolean,
  elements_padding_right:number;
  elements_padding_top:number;
}

export type Layer = Map<LayerType, Array<LayerElements>>;

export function createLayers(sprites: SpriteSheet) {
  const layers:Layer = new Map();
  defineLayersWithElements().forEach(layer => {
    if(layers.has(layer.type)){
      layers.get(layer.type).push({
        elements: getLayerElements(layer.elements, sprites), 
        debug:layer.debug,
        elements_padding_right: layer.elements_padding_right !== undefined ? layer.elements_padding_right : 0,
        elements_padding_top: layer.elements_padding_top !== undefined ? layer.elements_padding_top : 0
      })
    }else{
      layers.set(layer.type, [{
        elements: getLayerElements(layer.elements, sprites), 
        debug:layer.debug,
        elements_padding_right: layer.elements_padding_right !== undefined ? layer.elements_padding_right : 0,
        elements_padding_top: layer.elements_padding_top !== undefined ? layer.elements_padding_top : 0
      }]);
    }
  })

  return layers;
}

function getLayerElements(layoutItems: itemLayer, sprites: SpriteSheet): Array<Entity> {
  const layer: Entity[] = [];
  layoutItems.forEach(element => {
    let name = element.name;
    let image = sprites.tiles.get(name);

    layer.push(
      new Entity(image, element)
    );
  });

  return layer;
}