import { LabelStyle } from "../layouts/layout_QP4"

export function getStyle_Entitie_Children_QP4() {
    const style: LabelStyle = {
        label: {
            font: '9px arial',
            fillStyle: 'black',
        }
    }

    return {
        style: style,
        CHILDREN_SIZE: 20,
        padding_x: 5,
        start_x: 0,
        start_y: 0,
        margin: 5
    }
}

export function getStyle_Entitie_Children_QP3() {
    const style: LabelStyle = {
        label: {
            font: '9px arial',
            fillStyle: 'black',
        }
    }

    return {
        style: style,
        CHILDREN_SIZE: 40,
        padding_x: 5,
        start_x: 40,
        start_y: 35,
        margin: 50
    }
}