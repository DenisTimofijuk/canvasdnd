import { SpriteSheet } from './SpriteSheet';
import { Entity, EntityOptions } from './Entity';
import { defineLayersWithElements, LayerType } from './setup/layout';
import { PopUp } from './popUp';
import {
  itemLayer,
  LayerParameters,
  LayerElemen
} from './setup/layouts/layout_QP4';

export type LayerElements = {
  elements: Array<Entity | PopUp>;
  debug: boolean;
  grid: boolean;
  elements_padding_right: number;
  elements_padding_top: number;
  popupAvailable?: boolean;
  display_childrens?: boolean;
};

export type Layer = Map<LayerType, Array<LayerElements>>;

export function createLayers(sprites: SpriteSheet, qID:string) {
  const layers: Layer = new Map();
  defineLayersWithElements(qID).forEach(layer => {
    if (layers.has(layer.type)) {
      layers.get(layer.type).push(getLayerParameters(layer, sprites));
    } else {
      layers.set(layer.type, [getLayerParameters(layer, sprites)]);
    }
  });

  return layers;
}

function getLayerParameters(layer: LayerParameters, sprites: SpriteSheet) {
  const entityOptions: EntityOptions = {
    display_totals: layer.display_totals,
    delete_childrens_on_preview: layer.delete_childrens_on_preview
  };
  return {
    elements: getLayerElements(layer.elements, sprites, entityOptions),
    debug: layer.debug,
    grid: layer.grid,
    elements_padding_right:
      layer.elements_padding_right !== undefined
        ? layer.elements_padding_right
        : 0,
    elements_padding_top:
      layer.elements_padding_top !== undefined ? layer.elements_padding_top : 0,
    popupAvailable:
      layer.popupAvailable !== undefined ? layer.popupAvailable : false,
    display_childrens:
      layer.display_childrens !== undefined ? layer.display_childrens : false
  };
}

function getLayerElements(
  layoutItems: itemLayer,
  sprites: SpriteSheet,
  entityOptions: EntityOptions
): Array<Entity> {
  const layer: Entity[] = [];
  layoutItems.forEach(element => {
    let name = element.name;
    let image = sprites.tiles.get(name);
    
    layer.push(new Entity(image, element, entityOptions));
  });

  return layer;
}