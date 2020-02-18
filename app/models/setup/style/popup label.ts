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