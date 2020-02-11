import { drawEntityLabel, drawEntityBorder } from './helpers/helpers for draw';
import { Entity } from './Entity';


export class PopUp {
  entity: Entity;
  
  constructor(entity:Entity) {
    this.entity = entity;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    const x = 100;
    const y = 100;
    const width = 400;
    const height = 400;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.entity.image, x, y, width, height);
    if (this.entity.label.length > 0 && this.entity.label !== ' ') {
      drawEntityLabel(ctx, x, y, width, height, this.entity);
    }
    if (debug) {
      drawEntityBorder(ctx, x, y, width, height);
    }
   
  }

}