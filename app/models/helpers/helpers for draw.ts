import { Entity } from "../Entity";
import { LabelStyle } from "../setup/layout";

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

export function drawEntityLabel(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, label: string, style:LabelStyle) {
    const label_offset_x = style && style.label_offset_x !== undefined ? style.label_offset_x : 0;
    const label_offset_y = style && style.label_offset_y !== undefined ? style.label_offset_y : 0;
    ctx.save();
    if (style) {
        if (style.label_font) {
            ctx.font = style.label_font;
        }
        if (style.label_fillStyle) {
            ctx.fillStyle = style.label_fillStyle;
        }
        if (style.label_textAlign) {
            ctx.textAlign = style.label_textAlign;
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

export function drawTotalLables(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, style:LabelStyle) {
    const label_offset_x = style && style.label_offset_x !== undefined ? style.label_offset_x : 0;
    const label_offset_y = style && style.label_offset_y !== undefined ? style.label_offset_y : 0;
    ctx.save();
    if (style) {
        if (style.label_font) {
            ctx.font = style.label_font;
        }
        if (style.label_fillStyle) {
            ctx.fillStyle = style.label_fillStyle;
        }
        if (style.label_textAlign) {
            ctx.textAlign = style.label_textAlign;
        }
    }
    ctx.fillText(label, (x + label_offset_x), (y + label_offset_y));
    ctx.restore();
}