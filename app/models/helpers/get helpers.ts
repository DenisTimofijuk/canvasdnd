import { Entity } from '../Entity';
import { LayerElemen } from '../setup/layout';

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