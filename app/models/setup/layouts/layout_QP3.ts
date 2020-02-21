import { LayerDefinder } from "./layout_QP4";

export function getLayer_QP3(): LayerDefinder {
    return [
        {
            type: 'drop',
            debug: false,
            grid: true,
            elements_padding_right: 5,
            display_childrens: false, //TODO remove from Entity. Should be on a different layer.
            display_totals: true,
            delete_childrens_on_preview: true,
            elements: [
                {
                    name: 'document',
                    id: '',
                    label: '',
                    referanceID: '',
                    val: 0,
                    x: 5,
                    y: 5,
                    h: 600,
                    w: 400,
                    style: {
                        total: {
                            label: {
                                font: 'bold 14px arial',
                                offset_x: 10,
                                offset_y: 20,
                            },
                            icon: {
                                offset_top: 400,
                                offset_left: 300,
                                size: 35
                            }
                        },
                        children: {
                            offset_left: 50,
                            offset_top: 50,
                            offset_right: 50,
                            offset_bottom: 50,
                            size: 40,
                            label:{
                                fillStyle: 'red',
                                font: '12px arial',
                            }
                        }
                    }
                }
            ]
        },
        {
            type: 'drag',
            debug: false,
            grid: true,
            elements_padding_top: 10,
            elements: [
                {
                    name: 'pen',
                    id: '',
                    label: '75ml',
                    referanceID: '',
                    val: 75,
                    x: 455,
                    y: 10,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                },
                {
                    name: 'pen',
                    id: '',
                    label: '95ml',
                    referanceID: '',
                    val: 95,
                    x: 455,
                    y: 85,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                },
                {
                    name: 'pen',
                    id: '',
                    label: '125ml',
                    referanceID: '',
                    val: 125,
                    x: 455,
                    y: 160,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    label: '300IU',
                    referanceID: '',
                    val: 300,
                    x: 455,
                    y: 235,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    label: '600IU',
                    referanceID: '',
                    val: 600,
                    x: 455,
                    y: 310,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                },
                {
                    name: 'hand',
                    id: '',
                    label: '1200IU',
                    referanceID: '',
                    val: 1200,
                    x: 455,
                    y: 385,
                    w: 65,
                    h: 65,
                    style: {
                        label: {
                            font: '14px sefif'
                        }
                    }
                }
            ]
        }
    ]
}