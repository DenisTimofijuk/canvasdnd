import { Entity } from "../Entity";

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

export function drawEntityLabel(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, entity: Entity) {
    const label_offset_x = entity.style && entity.style.label_offset_x !== undefined ? entity.style.label_offset_x : 0;
    const label_offset_y = entity.style && entity.style.label_offset_y !== undefined ? entity.style.label_offset_y : 0;
    ctx.save();
    if (entity.style) {
        if (entity.style.label_font) {
            ctx.font = entity.style.label_font;
        }
        if (entity.style.label_fillStyle) {
            ctx.fillStyle = entity.style.label_fillStyle;
        }
        if (entity.style.label_textAlign) {
            ctx.textAlign = entity.style.label_textAlign;
        }
    }

    const text = ctx.measureText(entity.label);
    if (text.width > width) {
        const words = entity.label.split(' ');
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
        ctx.fillText(entity.label, (x + label_offset_x), (y + height + label_offset_y));
    }
    ctx.restore();
}