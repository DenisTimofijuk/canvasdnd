import { drawEntityLabel, drawEntityBorder } from './helpers/helpers for draw';
import { Entity } from './Entity';
import { getStyle_Popup_Label } from './setup/style/popup label';
import { LabelStyle } from './setup/layouts/layout_QP4';

export class PopUp {
  entity: Entity;
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;

  constructor(entity: Entity) {
    this.entity = entity;
    this.x = 100;
    this.y = 100;
    this.width = 400;
    this.height = 400;
    this.padding = 40;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    ctx.beginPath();
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + this.padding, this.y + this.padding, this.width - 2 * this.padding, this.height - 2 * this.padding);
    ctx.drawImage(this.entity.image, this.x, this.y, this.width, this.height);
    if (this.entity.label.length > 0 && this.entity.label !== ' ') {
      const style: LabelStyle = getStyle_Popup_Label();
      drawEntityLabel(ctx, this.x, this.y, this.width, this.height, this.entity.label, style.label);
    }
    if (debug) {
      drawEntityBorder(ctx, this.x, this.y, this.width, this.height);
    }
    ctx.closePath();
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