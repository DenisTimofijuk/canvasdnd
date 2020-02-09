import { SpriteSheet } from "./SpriteSheet";
import { Entity } from "./Entity";
import { itemLayer, defineLayersWithElements, LayerType } from "./layout";

export function createLayers(sprites: SpriteSheet) {
  const layers:Map<LayerType, Array<Entity>> = new Map();

  defineLayersWithElements().forEach(layer => {
    layers.set(layer.type, getLayerElements(layer.elements, sprites));
  })

  return layers;
}

function getLayerElements(layoutItems: itemLayer, sprites: SpriteSheet): Array<Entity> {
  const layer: Entity[] = [];
  layoutItems.forEach(element => {
    let name = element.name;
    let image = sprites.tiles.get(name);

    layer.push(
      new Entity(name, image, element.x, element.y, element.w, element.h)
    );
  });

  return layer;
}