import { Entity } from '../Entity';
import { LayerType } from '../setup/layout';
import Grid from '../grid';
import { LayerElemen } from '../setup/layouts/layout_QP4';
import { LayerElements } from '../createLayers';

export function getEntityParameters(availableEntity: Entity): LayerElemen {
  return {
    h: availableEntity.height,
    label: availableEntity.label,
    name: availableEntity.name,
    id: availableEntity.id,
    referanceID: availableEntity.referanceID,
    val: availableEntity.val,
    w: availableEntity.width,
    x: availableEntity.x,
    y: availableEntity.y,
    style: availableEntity.style
  };
}

export function getPossition(e: MouseEvent | TouchEvent) {
  const touchE = e as TouchEvent;
  const clickE = e as MouseEvent;

  let x: number, y: number;
  if (e.type === 'touchmove') {
    x = touchE.touches[0].clientX;
    y = touchE.touches[0].clientY;
  } else {
    x = clickE.offsetX;
    y = clickE.offsetY;
  }

  return {
    x: x,
    y: y
  };
}

export type AvailableDroppable = {
  popupAvailabe: boolean;
  element: Entity;
}[]

export function getEntityFromGrid(
  e: MouseEvent | TouchEvent,
  gridName: LayerType,
  grid: Map<LayerType, Array<Grid>>
) {
  const possition = getPossition(e);
  const x = possition.x;
  const y = possition.y;

  const availableDroppable: AvailableDroppable = [];
  if (grid.has(gridName)) {
    grid.get(gridName).forEach(gridLayer => {
      const droppable = gridLayer.getEntity(x, y);
      if (droppable) {
        availableDroppable.push({
          popupAvailabe: gridLayer.popupAvailable,
          element: droppable
        });
      }
    });
  }
  return availableDroppable;
}

export function getLayerTemplate(): Array<LayerElements> {
  return [
    {
      elements: [] as Array<Entity>,
      debug: false,
      grid: true,
      elements_padding_right: 0,
      elements_padding_top: 0
    }
  ];
}

export function cloneEntities(elements: Array<Entity>) {
  const result: Array<Entity> = [];

  elements.forEach(element => {
    const clone = new Entity(element.image, getEntityParameters(element));
    Object.assign(clone, element);
    result.push(clone);
  });

  return result;
}
