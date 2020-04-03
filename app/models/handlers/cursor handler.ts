import { LayerType } from '../setup/layout';
import Grid from '../grid';

export function cursorHandler(
  canvas: HTMLCanvasElement,
  grid: Map<LayerType, Array<Grid>>,
  x: number,
  y: number,
  popupActive: boolean
) {
  const mouseName = getMouseIconName(grid, x, y, popupActive);
  switch (mouseName) {
    case 'popUIelements':
      //canvas.style.cursor = 'url("./img/mouse_remove.png"), auto';
      canvas.style.cursor = 'crosshair';
      break;
    case 'draggable':
      canvas.style.cursor = 'move';
      break;
    case 'droppable':
      canvas.style.cursor = 'pointer';
      break;
    default:
      canvas.style.cursor = 'default';
      break;
  }
}

function getMouseIconName(
  grid: Map<LayerType, Array<Grid>>,
  x: number,
  y: number,
  popupActive: boolean
) {
  let name = '';
  
  if(popupActive){
    if (isEntityHover(grid, 'droppablePopUp_UI', x, y)) {
      name = 'popUIelements';
    }
  }else {
    if (isEntityHover(grid, 'drag', x, y)) {
      name = 'draggable';
    } else if (isEntityHover(grid, 'drop', x, y)) {
      name = 'droppable';
    }
  }

  return name;
}

function isEntityHover(
  grid: Map<LayerType, Array<Grid>>,
  name: LayerType,
  x: number,
  y: number
) {
  let flag = false;
  if(grid.has(name)){
    grid.get(name).forEach(gridLayer => {
      if (gridLayer.getEntityByCoord(x, y)) {
        flag = true;
      }
    });
  }  
  return flag;
}
