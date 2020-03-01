import { TileName, LayerType } from "../layout";

// PLEASE NOTE
// PLACING ITEMS ON THE SCREEN NEEDS TO BE VERY PRECISE WITH THE COORDINATES
// THEY SHOULD ALLIGN WITH THE GRID.
// TO TEST PLEASE USE debug = TRUE;

export type LayerParameters = {
    type: LayerType;
    debug: boolean;
    grid:boolean;
    elements_padding_right?: number; //padding is done mannually by defining coordinates, but this parameter is still required for the grid, please use [debug = true] to get elements alligned with the grid correctly
    elements_padding_top?: number; //padding is doen mannually by defining coordinates, but this parameter is still required for the grid, please use [debug = true] to get elements alligned with the grid correctly
    elements: itemLayer;
    display_childrens?: boolean;
    display_totals?: boolean;
    popupAvailable?:boolean;
    delete_childrens_on_preview?:boolean;
}

export type LayerDefinder = Array<LayerParameters>;

export type LabelParameters = {
    font?: string;
    fillStyle?: string;
    textAlign?: CanvasTextAlign;
    offset_x?: number;
    offset_y?: number;
}

export type LabelStyle = {
    label?: LabelParameters,
    total?: {
        label: LabelParameters;
        icon: {
            offset_top?: number;
            offset_left?: number;
            size?: number;
        }
    },
    children?: {
        offset_top?: number,
        offset_left?: number,
        offset_right?: number,
        offset_bottom?: number,
        size?: number
        label?: LabelParameters
    }
};

export type LayerElemen = {
    name: TileName;
    id:string; //is for drop items. ID should be unique per item to have its own layer. This will be used to display dropped items.
    x: number;
    y: number;
    w: number;
    h: number;
    val: number;
    label: string;
    referanceID: string;
    style?: LabelStyle;
};

export type itemLayer = Array<LayerElemen>;

const CALENDAR_PADDING_RIGHT = 10;
const CALENDAR_PADDING_TOP = 5;

export function getLayer_QP4(): LayerDefinder {
    return [
        {
            type: 'item',
            debug: false,
            grid: false,
            elements: [
                {
                    name: 'woman1',
                    id: '',
                    x: 5,
                    y: 5,
                    w: 100,
                    h: 200,
                    val: 0,
                    label:
                        'An older patient who is aged between 36-45 and is on her 2nd or 3rd cycle',
                    referanceID: '',
                    style: {
                        label: {
                            font: '14px serif',
                            offset_y: 10
                        }
                    }
                }
            ]
        },
        {
            type: 'drag',
            debug: false,
            grid: true,
            elements_padding_top: 5,
            elements: [
                {
                    name: 'pen',
                    id: '',
                    x: 360,
                    y: 5,
                    w: 60,
                    h: 60,
                    val: 75,
                    label: '75ml',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                },
                {
                    name: 'pen',
                    id: '',
                    x: 360,
                    y: 70,
                    w: 60,
                    h: 60,
                    val: 95,
                    label: '95ml',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                },
                {
                    name: 'pen',
                    id: '',
                    x: 360,
                    y: 135,
                    w: 60,
                    h: 60,
                    val: 125,
                    label: '125ml',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    x: 480,
                    y: 5,
                    w: 60,
                    h: 60,
                    val: 300,
                    label: '300IU',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    x: 480,
                    y: 70,
                    w: 60,
                    h: 60,
                    val: 600,
                    label: '600IU',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    x: 480,
                    y: 135,
                    w: 60,
                    h: 60,
                    val: 1200,
                    label: '1200IU',
                    referanceID: '',
                    style: {
                        label: {
                            font: '13px serif'
                        }
                    }
                }
            ]
        },
        {
            type: 'drag',
            debug: false,
            grid: true,
            elements_padding_right: 25,
            elements_padding_top: 5,
            elements: [
                {
                    name: 'brand',
                    id: '',
                    x: 140,
                    y: 5,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 1',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 140,
                    y: 40,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 2',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 140,
                    y: 75,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 3',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 140,
                    y: 110,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 4',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 235,
                    y: 5,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 5',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 235,
                    y: 40,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 6',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 235,
                    y: 75,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 7',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                },
                {
                    name: 'brand',
                    id: '',
                    x: 235,
                    y: 110,
                    w: 90,
                    h: 30,
                    val: 0,
                    label: 'Brand 8',
                    referanceID: '',
                    style: {
                        label: {
                            font: 'bold 13px serif',
                            fillStyle: 'white',
                            offset_x: 45,
                            offset_y: -11,
                            textAlign: 'center'
                        }
                    }
                }
            ]
        },
        {
            type: 'drop',
            debug: false,
            grid: true,
            display_totals: true, // debug how this is compatible with display_childrens
            display_childrens: false,
            elements_padding_right: CALENDAR_PADDING_RIGHT,
            elements_padding_top: CALENDAR_PADDING_TOP,
            popupAvailable: true,
            elements: getCalendarElements('calendar', 7, 4, 11, 300, 70, 70)
        }
    ];
}

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
                id: 'droppable_'+x+'_'+y,
                x: x,
                y: y,
                w: element_w,
                h: element_h,
                val: 0,
                label: 'Day 1',
                referanceID: '',
                style: {
                    label: {
                        font: 'bold 10px arial',
                        offset_x: 20,
                        offset_y: -52,
                        fillStyle: 'white'
                    },
                    total: {
                        label: {
                            font: 'bold 12px arial',
                            fillStyle: 'black',
                            offset_x: 0,
                            offset_y: 13,
                        },
                        icon: {
                            offset_top: 25,
                            offset_left: 15,
                            size: 15
                        }
                    }
                }
            });
            x += element_w + CALENDAR_PADDING_RIGHT;
        }
        y += element_h + CALENDAR_PADDING_TOP;
    }
    return calendars;
}