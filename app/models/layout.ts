//PLEASE NOTE
// PLACING ITEMS ON THE SCREEN NEEDS TO BE VERY PRECISE WITH THE COORDINATES
// THEY SHOULD ALLIGN WITH THE GRID.
// TO TEST PLEASE USE displayBorderForTest();

import { TileName } from "./SpriteSheet";

export type itemLayer = Array<{
    name: TileName;
    x: number;
    y: number;
    w?: number;
    h?: number;
}>;
export type CalendarLayer = Array<{
    columns: number;
    rows: number;
    x: number;
    y: number;
    w: number;
    h: number;
    name: TileName;
}>;

export function getPageLayoutItems(): itemLayer {
    return [
        {
            name: "woman1",
            x: 5,
            y: 5,
            w: 100,
            h: 200
        }
    ]
}

export function getPageLayoutDraggableItems(): itemLayer {
    return [

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
}

export const CALENDAR_PADDING_RIGHT = 10;
export const CALENDAR_PADDING_TOP = 5;

export function getPageLayoutCalendar(): CalendarLayer {
    return [
        {
            name: "calendar",
            columns: 7,
            rows: 4,
            x: 11,
            y: 300,
            w: 70,
            h: 70
        }
    ]
}