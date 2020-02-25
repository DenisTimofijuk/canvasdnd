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
    const margin = 50;

    return {
        style: style,
        CHILDREN_SIZE: CHILDREN_SIZE,
        padding_x: padding_x,
        start_x: start_x,
        start_y: start_y,
        margin: margin
    }
}

export function getStyle_Entitie_Children_QP3() {
    const style: LabelStyle = {
        label: {
            font: '9px arial',
            fillStyle: 'black',
        }
    }
    const CHILDREN_SIZE = 40;
    const padding_x = 5;
    const start_x = 40;
    const start_y = 35;
    const margin = 50;

    return {
        style: style,
        CHILDREN_SIZE: CHILDREN_SIZE,
        padding_x: padding_x,
        start_x: start_x,
        start_y: start_y,
        margin: margin
    }
}

export function getStyle_Entitie_Children_QP4() {
    const style: LabelStyle = {
        label: {
            font: '9px arial',
            fillStyle: 'black',
        }
    }
    const CHILDREN_SIZE = 20;
    const padding_x = 5;
    const start_x = 0;
    const start_y = 0;
    const margin = 5;

    return {
        style: style,
        CHILDREN_SIZE: CHILDREN_SIZE,
        padding_x: padding_x,
        start_x: start_x,
        start_y: start_y,
        margin: margin
    }
}

export function getParam_Popup_Children_Layer() {
    return {
        debug: true,
        children_elements_padding_right: 5
    }
}