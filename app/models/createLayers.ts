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

// export function createLayers(sprites: SpriteSheet) {
//   const layers: Layer = new Map();
//   defineLayersWithElements().forEach(layer => {
//     if(layer.type === 'drop' && layer.display_childrens){
//       layer.elements.forEach(element => {
//         if (layers.has(element.id)) {
//           layers.get(element.id).push(getLAyerParametersByLayerElemen(element, layer, sprites));
//         } else {
//           layers.set(element.id, [getLAyerParametersByLayerElemen(element, layer, sprites)]);
//         }
//       })
//     }else {
//       if (layers.has(layer.type)) {
//         layers.get(layer.type).push(getLayerParameters(layer, sprites));
//       } else {
//         layers.set(layer.type, [getLayerParameters(layer, sprites)]);
//       }
//     }
//   })

//   return layers;
// }

export function createLayers(sprites: SpriteSheet) {
  const layers: Layer = new Map();
  defineLayersWithElements().forEach(layer => {
    //we need to have master grid layer for DROP items to be able to get entity ID to get falowing grid by that ID
    if (layers.has(layer.type)) {
      layers.get(layer.type).push(getLayerParameters(layer, sprites));
    } else {
      layers.set(layer.type, [getLayerParameters(layer, sprites)]);
    }
    if (layer.type === 'drop' && layer.display_childrens) {
      layer.elements.forEach(element => {
        if (layers.has(element.id)) {
          layers
            .get(element.id)
            .push(getLAyerParametersByLayerElemen(element, layer, sprites));
        } else {
          layers.set(element.id, [
            getLAyerParametersByLayerElemen(element, layer, sprites)
          ]);
        }
      });
    }
  });

  return layers;
}

function getLAyerParametersByLayerElemen(
  element: LayerElemen,
  layer: LayerParameters,
  sprites: SpriteSheet
) {
  const entityOptions: EntityOptions = {
    display_totals: layer.display_totals,
    delete_childrens_on_preview: layer.delete_childrens_on_preview
  };
  return {
    elements: getLayerElements([element], sprites, entityOptions),
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
      layer.display_childrens !== undefined ? layer.display_childrens : false //TODO: maybe it is not needed at all to be passed further?
  };
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
      layer.display_childrens !== undefined ? layer.display_childrens : false //TODO: maybe it is not needed at all to be passed further?
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

//create leayer per entety for drop only if parameter is enabled naudot display_childrens
