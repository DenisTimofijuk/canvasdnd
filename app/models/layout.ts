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
            x: 0,
            y: 0,
            w: 100,
            h: 200
        }
    ]
}

export function getPageLayoutDraggableItems(): itemLayer {
    return [

        {
            name: "pen",
            x: 411,
            y: 11,
            w: 60,
            h: 60
        },
        {
            name: "pen",
            x: 411,
            y: 97,
            w: 60,
            h: 60
        },
        {
            name: "pen",
            x: 411,
            y: 164,
            w: 60,
            h: 60
        },
        {
            name: "hand",
            x: 620,
            y: 12,
            w: 60,
            h: 60
        },
        {
            name: "hand",
            x: 549,
            y: 80,
            w: 60,
            h: 60
        },
        {
            name: "hand",
            x: 633,
            y: 133,
            w: 60,
            h: 60
        }
    ]
}

export function getPageLayoutCalendar(): CalendarLayer {
    return [
        {
            name: "calendar",
            columns: 7,
            rows: 4,
            x: 26,
            y: 280,
            w: 70,
            h: 70
        }
    ]
}