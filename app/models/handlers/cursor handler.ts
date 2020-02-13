import { LayerType } from "../setup/layout";
import Grid from "../grid";

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
  