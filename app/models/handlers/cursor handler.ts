import { LayerType } from "../setup/layout";
import Grid from "../grid";

export function cursorHandler(
    canvas: HTMLCanvasElement,
    grid: Map<LayerType, Array<Grid>>,
    x: number,
    y: number,
    popupActive:boolean
  ) {
    let flag = false;
    if(popupActive){
      grid.get('droppablePopUp_UI').forEach(popupUILayer => {
        if (popupUILayer.getEntity(x, y)) {
          canvas.style.cursor = 'url("./img/mouse_remove.png"), auto';
          flag = !flag;
        }
      })
      if (flag) {
        return;
      }
      canvas.style.cursor = 'default';
      return;
    }
    
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
  