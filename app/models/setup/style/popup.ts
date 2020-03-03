import { LabelStyle } from "../layouts/layout_QP4";

export function getStyle_Popup_Label() {
    const style: LabelStyle = {
        label: {
            font: 'bold 18px arial',
            fillStyle: 'white',
            textAlign: 'center',
            offset_x: 200,
            offset_y: -310
        }
    }

    return style;
}

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

    return {
        style: style,
        CHILDREN_SIZE: 43,
        padding_x: 5,
        start_x: 45,
        start_y: 158,
        margin: 50
    }
}