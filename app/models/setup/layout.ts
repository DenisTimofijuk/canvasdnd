import { getLayer_QP4, LayerDefinder } from "./layouts/layout_QP4";
import { getLayer_QP3 } from "./layouts/layout_QP3";

export type TileName =
  | 'calendar'
  | 'pen'
  | 'hand'
  | 'document'
  | 'woman1'
  | 'woman2'
  | 'woman3'
  | 'woman4'
  | 'brand';

export type LayerType =
  | 'item'
  | 'drag'
  | 'drop'
  | 'grid'
  | 'draggable'
  | 'droppable_UI'
  | 'droppablePopUp'
  | 'droppablePopUp_UI'
  | 'droppedItems'
  | string;


export function defineLayersWithElements(): LayerDefinder {
  let qid = 'QP'

  switch (qid) {
    case 'QP3':
      return getLayer_QP3();
    default:
      return getLayer_QP4();
  }
}