import { LabelStyle } from "../layouts/layout_QP4";

// PLEASE NOTE
// AFTER CHANGING PARAMETERS NEED TO ENSURE THAT FINAL RESULT WILL ALLIGN WITH THE GRID
// TO TEST PLEASE USE getParam_Popup_Children_Layer().debug = true;

export function getStyle_Popup_Children() {
    const style: LabelStyle = {
        label: {
            font: '9px arial',
            fillStyle: 'black',
        }
    }
    const CHILDREN_SIZE = 43;
    const padding_x = 5;
    const start_x = 45;
    const start_y = 158;

    return {
        style: style,
        CHILDREN_SIZE: CHILDREN_SIZE,
        padding_x: padding_x,
        start_x: start_x,
        start_y: start_y
    }
}

export function getParam_Popup_Children_Layer() {
    return {
        debug: true,
        children_elements_padding_right: 5
    }
}