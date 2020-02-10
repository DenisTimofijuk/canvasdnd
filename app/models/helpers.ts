import { Entity } from './Entity';
import Grid from './grid';
import { LayerType } from './layout';

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
  grid: Map<LayerType, Array<Grid>>,
  x: number,
  y: number
) {
  let flag = false;
  grid.get('drag').forEach(gridLayer => {
    if (gridLayer.getEntity(x, y)) {
      canvas.style.cursor = 'move';
      flag = !flag;
    }
  });
  if (flag) {
    return;
  }
  grid.get('drop').forEach(gridLayer => {
    if (gridLayer.getEntity(x, y)) {
      canvas.style.cursor = 'pointer';
      flag = !flag;
    }
  });
  if (flag) {
    return;
  }
  canvas.style.cursor = 'default';
}
