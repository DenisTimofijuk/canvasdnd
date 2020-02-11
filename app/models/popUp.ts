import { drawEntityLabel, drawEntityBorder } from './helpers/helpers for draw';
import { Entity } from './Entity';
import { LabelStyle } from './layout';

const CHILDREN_OFFSET_TOP = 140;
const CHILDREN_OFFSET_LEFT = 50;
const CHILDREN_OFFSET_RIGHT = 80;
const CHILDREN_OFFSET_BOTTOM = 80;
const CHILDREN_SIZE = 35;

export class PopUp {
  entity: Entity;
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    this.x = 100;
    this.y = 100;
    this.width = 400;
    this.height = 400;
    this.padding = 40;
    ctx.beginPath();
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + this.padding, this.y + this.padding, this.width - 2 * this.padding, this.height - 2 * this.padding);
    ctx.drawImage(this.entity.image, this.x, this.y, this.width, this.height);
    if (this.entity.label.length > 0 && this.entity.label !== ' ') {
      const style: LabelStyle = {
        label_font: 'bold 18px arial',
        label_fillStyle: 'white',
        label_textAlign: 'center',
        label_offset_x: 200,
        label_offset_y: -310
      }
      drawEntityLabel(ctx, this.x, this.y, this.width, this.height, this.entity.label, style);
    }
    if (debug) {
      drawEntityBorder(ctx, this.x, this.y, this.width, this.height);
    }
    ctx.closePath();
    this.drawChildrens(ctx);
  }

  drawChildrens(ctx: CanvasRenderingContext2D) {
    const x_start = this.x + CHILDREN_OFFSET_LEFT;
    const y_start = this.y + CHILDREN_OFFSET_TOP;
    const boxHeight = this.height - CHILDREN_OFFSET_BOTTOM - CHILDREN_OFFSET_TOP;
    const rowLen = this.width - CHILDREN_OFFSET_RIGHT - CHILDREN_OFFSET_LEFT;

    for (let index = 0; index < this.entity.childs.length; index++) {
      let entity = this.entity.childs[index];
      const x = (index * CHILDREN_SIZE) % rowLen;
      const y = Math.floor((index * CHILDREN_SIZE) / rowLen) * CHILDREN_SIZE;
      if (y > boxHeight - CHILDREN_SIZE) {
        break;
      }
      ctx.drawImage(
        entity.image,
        x_start + x,
        y_start + y,
        CHILDREN_SIZE,
        CHILDREN_SIZE
      );
      if (entity.label.length > 0 && entity.label !== ' ') {
        const style: LabelStyle = {
          label_font: '8px arial',
          label_fillStyle: 'black',
          label_offset_x: 0,
          label_offset_y: 0
        }
        drawEntityLabel(ctx, x_start + x, y_start + y, CHILDREN_SIZE, CHILDREN_SIZE, entity.label, style);
      }
    }
  }

  checkCoord(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

}