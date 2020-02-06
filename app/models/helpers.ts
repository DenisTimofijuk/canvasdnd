import { Entity } from "./Entity";
import { LayerNames } from "./createLayers";

export function getEntityByCoordinates(grid: Array<Entity>, x:number, y:number): Entity | undefined {
    let result = undefined;
    grid.forEach(entity => {
    if (entity.checkCoord(x, y)) {
        result = entity;
    }
  });
  return result;
}

// export function cursorHandler(canvas: HTMLCanvasElement, grid: Map<LayerNames, Array<Entity>>, x:number, y:number) {
//   const cursor = (entity: Entity) => canvas.getContext('2d').isPointInPath(entity.path, x, y); //TODO: use this one enstead of getEntityByCoordinates()
  
//   if (grid.get('calendar').some(cursor)) {
//       canvas.style.cursor = "pointer";
//   } else if (grid.get('draggable').some(cursor)) {
//       canvas.style.cursor = "move";
//   } else {
//       canvas.style.cursor = "default";
//   }
// }