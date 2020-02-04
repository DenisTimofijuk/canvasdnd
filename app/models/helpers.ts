import { Entity } from "./Entity";
import { LayerNames } from "./createLayers";

export function getEntityByCoordinates(grid: Array<Entity>, event: MouseEvent): Entity | undefined {
    let result = undefined;
    grid.forEach(entity => {
    if (entity.checkCoord(event.offsetX, event.offsetY)) {
        result = entity;
    }
  });
  return result;
}

export function cursorHandler(e: MouseEvent, canvas: HTMLCanvasElement, grid: Map<LayerNames, Array<Entity>>) {
  const cursor = (entity: Entity) => canvas.getContext('2d').isPointInPath(entity.path, e.offsetX, e.offsetY); //TODO: use this one enstead of getEntityByCoordinates()
  
  if (grid.get('calendar').some(cursor)) {
      canvas.style.cursor = "pointer";
  } else if (grid.get('draggable').some(cursor)) {
      canvas.style.cursor = "move";
  } else {
      canvas.style.cursor = "default";
  }
}