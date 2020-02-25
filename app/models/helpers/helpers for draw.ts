import { Entity } from "../Entity";
import { PopUp } from "../popUp";
import { getStyle_Popup_Children, getStyle_Entitie_Children_QP4, getStyle_Entitie_Children_QP3 } from "../setup/style/popup children";
import { LabelStyle, LabelParameters } from "../setup/layouts/layout_QP4";

export function drawEntityBorder(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.closePath();
}

export function drawEntityLabel(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, label: string, style: LabelParameters) {
    const label_offset_x = style && style.offset_x !== undefined ? style.offset_x : 0;
    const label_offset_y = style && style.offset_y !== undefined ? style.offset_y : 0;
    ctx.save();
    if (style) {
        if (style.font) {
            ctx.font = style.font;
        }
        if (style.fillStyle) {
            ctx.fillStyle = style.fillStyle;
        }
        if (style.textAlign) {
            ctx.textAlign = style.textAlign;
        }
    }

    const text = ctx.measureText(label);
    if (text.width > width) {
        const words = label.split(' ');
        let textPerRow = '';
        let rowIndex = 0;
        const rowHeight = 18;
        for (var i = 0; i < words.length; i++) {
            if (ctx.measureText(textPerRow).width < width) {
                textPerRow += words[i] + ' ';
                if (i === words.length - 1) {
                    ctx.fillText(textPerRow, (x + label_offset_x), (y + height + label_offset_y + rowHeight * rowIndex));
                }
            } else {
                ctx.fillText(textPerRow, (x + label_offset_x), (y + height + label_offset_y + rowHeight * rowIndex));
                textPerRow = words[i] + ' ';
                rowIndex++;
            }
        }
    } else {
        ctx.fillText(label, (x + label_offset_x), (y + height + label_offset_y));
    }
    ctx.restore();
}

export function drawTotalLables(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, style: LabelParameters) {
    const label_offset_x = style && style.offset_x !== undefined ? style.offset_x : 0;
    const label_offset_y = style && style.offset_y !== undefined ? style.offset_y : 0;
    ctx.save();
    if (style) {
        if (style.font) {
            ctx.font = style.font;
        }
        if (style.fillStyle) {
            ctx.fillStyle = style.fillStyle;
        }
        if (style.textAlign) {
            ctx.textAlign = style.textAlign;
        }
    }
    ctx.fillText(label, (x + label_offset_x), (y + label_offset_y));
    ctx.restore();
}

export function _setPopUpChildrenCoordinates(entities: Array<Entity>, parent_x:number, parent_y:number, parent_w:number, parent_h:number, isForEntities=false) {
    const popup_UI = isForEntities ? getStyle_Entitie_Children_QP4() : getStyle_Popup_Children();
    const start_x = parent_x + popup_UI.start_x;
    const start_y = parent_y + popup_UI.start_y;
    const container_w = parent_w - popup_UI.margin;
    const container_h = parent_h - popup_UI.margin;
    const CHILDREN_SIZE = popup_UI.CHILDREN_SIZE;
    const padding_x = popup_UI.padding_x;
    const style: LabelStyle = popup_UI.style;

    let x = start_x;
    let y = start_y;

    entities.forEach(entity => {
        entity.visible = true;
        if (y + CHILDREN_SIZE > parent_y + container_h) {
            entity.visible = false;
            return;
        }
        entity.height = CHILDREN_SIZE;
        entity.width = CHILDREN_SIZE;
        entity.x = x;
        entity.y = y;
        x += CHILDREN_SIZE + padding_x;
        if (x + CHILDREN_SIZE > parent_x + container_w) {
            x = start_x;
            y += CHILDREN_SIZE;
        }
        entity.style = style;
    })
}