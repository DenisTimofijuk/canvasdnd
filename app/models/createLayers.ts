import { SpriteSheet } from "./SpriteSheet";
import { Entity } from "./Entity";
import { itemLayer, defineLayersWithElements, LayerType } from "./layout";

export type Layer = Map<LayerType, Array<{elements: Array<Entity>, debug:boolean}>>;

export function createLayers(sprites: SpriteSheet) {
  const layers:Layer = new Map();
  defineLayersWithElements().forEach(layer => {
    if(layers.has(layer.type)){
      layers.get(layer.type).push({elements: getLayerElements(layer.elements, sprites), debug:layer.debug})
    }else{
      layers.set(layer.type, [{elements: getLayerElements(layer.elements, sprites), debug:layer.debug}]);
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