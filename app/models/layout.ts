// PLEASE NOTE
// PLACING ITEMS ON THE SCREEN NEEDS TO BE VERY PRECISE WITH THE COORDINATES
// THEY SHOULD ALLIGN WITH THE GRID.
// TO TEST PLEASE USE displayBorderForTest();


export type TileName = 'calendar' | 'pen' | 'hand' | 'document' | 'woman1' | 'woman2' | 'woman3' | 'woman4';

type LayerElemen = {
    name: TileName;
    x: number;
    y: number;
    w: number;
    h: number;
}

export type itemLayer = Array<LayerElemen>;

export type LayerType = 'item' | 'drag' | 'drop' | 'grid' | 'draggable';
export type LayerDefinder = Array<{
    type: LayerType,
    debug: boolean,
    elements: itemLayer
}>

export type CalendarLayer = Array<{
    columns: number;
    rows: number;
    x: number;
    y: number;
    w: number;
    h: number;
    name: TileName;
}>;

export function defineTiles(): itemLayer {
    return [
        {
            name: 'calendar',
            x: 10,
            y: 400,
            w: 90,
            h: 90
        },
        {
            name: 'pen',
            x: 2,
            y: 285,
            w: 96,
            h: 96
        },
        {
            name: 'hand',
            x: 1,
            y: 500,
            w: 110,
            h: 114
        },
        {
            name: 'document',
            x: 444,
            y: 4,
            w: 457,
            h: 615
        },
        {
            name: 'woman1',
            x: 87,
            y: 1,
            w: 142,
            h: 351
        },
        {
            name: 'woman2',
            x: 233,
            y: 1,
            w: 112,
            h: 249
        },
        {
            name: 'woman3',
            x: 356,
            y: 1,
            w: 87,
            h: 315
        },
        {
            name: 'woman4',
            x: 179,
            y: 334,
            w: 235,
            h: 284
        }
    ]
}

export function defineLayersWithElements(): LayerDefinder {
    return [
        {
            type: 'item',
            debug: false, //TODO
            elements: [
                {
                    name: "woman1",
                    x: 5,
                    y: 5,
                    w: 100,
                    h: 200
                }
            ]
        },
        {
            type: 'drag',
            debug: false,  //TODO
            elements: [
                {
                    name: "pen",
                    x: 355,
                    y: 5,
                    w: 60,
                    h: 60
                },
                {
                    name: "pen",
                    x: 355,
                    y: 70,
                    w: 60,
                    h: 60
                },
                {
                    name: "pen",
                    x: 355,
                    y: 135,
                    w: 60,
                    h: 60
                },
                {
                    name: "hand",
                    x: 495,
                    y: 5,
                    w: 60,
                    h: 60
                },
                {
                    name: "hand",
                    x: 495,
                    y: 70,
                    w: 60,
                    h: 60
                },
                {
                    name: "hand",
                    x: 495,
                    y: 135,
                    w: 60,
                    h: 60
                }
            ]
        },
        {
            type: 'drop',
            debug: false,  //TODO
            elements: getCalendarElements('calendar', 7, 4, 11, 300, 70, 70)
        }
    ]
}

export const CALENDAR_PADDING_RIGHT = 10;
export const CALENDAR_PADDING_TOP = 5;

function getCalendarElements(name: TileName, columns: number, rows: number, start_x: number, start_y: number, element_w: number, element_h: number): Array<LayerElemen> {
    const calendars: Array<LayerElemen> = []
    let y = start_y;
    for (let row = 1; row <= rows; row++) {
        let x = start_x;
        for (let col = 1; col <= columns; col++) {
            calendars.push({
                name: name,
                x: x,
                y: y,
                w: element_w,
                h: element_h
            })
            x += element_w + CALENDAR_PADDING_RIGHT;
        }
        y += element_h + CALENDAR_PADDING_TOP;
    }
    return calendars;
}