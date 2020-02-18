import { Entity } from '../Entity';
import { LayerType } from '../setup/layout';
import Grid from '../grid';
import { LayerElemen } from '../setup/layouts/layout_QP4';

export function getEntityParameters(availableEntity: Entity): LayerElemen {
  return {
    h: availableEntity.height,
    label: availableEntity.label,
    name: availableEntity.name,
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

export function getEntityFromGrid(e: MouseEvent | TouchEvent, gridName: LayerType, grid: Map<LayerType, Array<Grid>>) {
  const possition = getPossition(e);
  const x = possition.x;
  const y = possition.y;

  const availableDroppable: Array<{popupAvailabe:boolean, element:Entity}> = [];
  grid.get(gridName).forEach(gridLayer => {
    const droppable = gridLayer.getEntity(x, y);
    if (droppable) {
      availableDroppable.push({
        popupAvailabe: gridLayer.popupAvailable,
        element: droppable
      });
    }
  });
  return availableDroppable;
}