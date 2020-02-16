import { LabelStyle } from "../layout";

export function getStyle_Entity_Total() {
    const CHILDREN_OFFSET_TOP = 25;
    const CHILDREN_OFFSET_LEFT = 15;
    const CHILDREN_OFFSET_RIGHT = 25;
    const CHILDREN_OFFSET_BOTTOM = 15;
    const CHILDREN_SIZE = 15;

    const style: LabelStyle = {
        label_font: 'bold 12px arial',
        label_fillStyle: 'black',
        label_offset_x: 0,
        label_offset_y: CHILDREN_SIZE - 2
    }

    return {
        CHILDREN_OFFSET_TOP: CHILDREN_OFFSET_TOP,
        CHILDREN_OFFSET_LEFT: CHILDREN_OFFSET_LEFT,
        CHILDREN_OFFSET_RIGHT: CHILDREN_OFFSET_RIGHT,
        CHILDREN_OFFSET_BOTTOM: CHILDREN_OFFSET_BOTTOM,
        CHILDREN_SIZE: CHILDREN_SIZE,
        style: style
    }
}

export function getEntity_display_params() {
    return {
        DISPLAY_CHILDRENS: false,
        DISPLAY_TOTALS: true
    }
}