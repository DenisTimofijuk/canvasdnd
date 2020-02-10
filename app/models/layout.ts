// PLEASE NOTE
// PLACING ITEMS ON THE SCREEN NEEDS TO BE VERY PRECISE WITH THE COORDINATES
// THEY SHOULD ALLIGN WITH THE GRID.
// TO TEST PLEASE USE displayBorderForTest();

export type TileName =
  | 'calendar'
  | 'pen'
  | 'hand'
  | 'document'
  | 'woman1'
  | 'woman2'
  | 'woman3'
  | 'woman4';


type LayerElemen = {
  name: TileName;
  x: number;
  y: number;
  w: number;
  h: number;
  val: number;
  label: string;
  referanceID: string;
};

export type itemLayer = Array<LayerElemen>;
export type LayerType = 'item' | 'drag' | 'drop' | 'grid' | 'draggable';
export type LayerDefinder = Array<{
  type: LayerType;
  debug: boolean;
  elements: itemLayer;
}>;

export function defineLayersWithElements(): LayerDefinder {
  return [
    {
      type: 'item',
      debug: false,
      elements: [
        {
          name: 'woman1',
          x: 5,
          y: 5,
          w: 100,
          h: 200,
          val: 0,
          label:
            'An older patient who is aged between 36-45 and is on her 2nd or 3rd cycle',
          referanceID: ''
        }
      ]
    },
    {
      type: 'drag',
      debug: false,
      elements: [
        {
          name: 'pen',
          x: 355,
          y: 5,
          w: 60,
          h: 60,
          val: 75,
          label: '75ml',
          referanceID: ''
        },
        {
          name: 'pen',
          x: 355,
          y: 70,
          w: 60,
          h: 60,
          val: 95,
          label: '95ml',
          referanceID: ''
        },
        {
          name: 'pen',
          x: 355,
          y: 135,
          w: 60,
          h: 60,
          val: 125,
          label: '125ml',
          referanceID: ''
        },
        {
          name: 'hand',
          x: 495,
          y: 5,
          w: 60,
          h: 60,
          val: 300,
          label: '300IU',
          referanceID: ''
        },
        {
          name: 'hand',
          x: 495,
          y: 70,
          w: 60,
          h: 60,
          val: 600,
          label: '600IU',
          referanceID: ''
        },
        {
          name: 'hand',
          x: 495,
          y: 135,
          w: 60,
          h: 60,
          val: 1200,
          label: '1200IU',
          referanceID: ''
        }
      ]
    },
    {
      type: 'drop',
      debug: false,
      elements: getCalendarElements('calendar', 7, 4, 11, 300, 70, 70)
    }
  ];
}

export const CALENDAR_PADDING_RIGHT = 10;
export const CALENDAR_PADDING_TOP = 5;

function getCalendarElements(
  name: TileName,
  columns: number,
  rows: number,
  start_x: number,
  start_y: number,
  element_w: number,
  element_h: number
): Array<LayerElemen> {
  const calendars: Array<LayerElemen> = [];
  let y = start_y;
  for (let row = 1; row <= rows; row++) {
    let x = start_x;
    for (let col = 1; col <= columns; col++) {
      calendars.push({
        name: name,
        x: x,
        y: y,
        w: element_w,
        h: element_h,
        val: 0,
        label: 'Day 1',
        referanceID: ''
      });
      x += element_w + CALENDAR_PADDING_RIGHT;
    }
    y += element_h + CALENDAR_PADDING_TOP;
  }
  return calendars;
}
