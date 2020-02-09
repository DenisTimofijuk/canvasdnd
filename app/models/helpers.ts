import { Entity } from './Entity';
import { GridName } from '../app';
import Grid from './grid';

export function getEntityByCoordinates(
  grid: Array<Entity>,
  x: number,
  y: number
): Entity | undefined {
  let result = undefined;
  grid.forEach(entity => {
    if (entity.checkCoord(x, y)) {
      result = entity;
    }
  });
  return result;
}

export function cursorHandler(
  canvas: HTMLCanvasElement,
  grid: Map<GridName, Grid>,
  x: number,
  y: number
) {
  if (grid.get('drag').getEntity(x, y)) {
    canvas.style.cursor = 'move';
  } else if (grid.get('drop').getEntity(x, y)) {
    canvas.style.cursor = 'pointer';
  } else {
    canvas.style.cursor = 'default';
  }
}
