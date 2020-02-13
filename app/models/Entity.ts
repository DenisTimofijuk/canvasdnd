import { TileName, LayerElemen, LabelStyle } from './setup/layout';
import { drawEntityLabel, drawEntityBorder, drawTotalLables } from './helpers/helpers for draw';

const CHILDREN_OFFSET_TOP = 25;
const CHILDREN_OFFSET_LEFT = 15;
const CHILDREN_OFFSET_RIGHT = 25;
const CHILDREN_OFFSET_BOTTOM = 15;
const CHILDREN_SIZE = 15;

export class Entity {
  image: HTMLCanvasElement;
  x: number;
  y: number;
  name: TileName;
  width: number;
  height: number;
  val: number;
  label: string;
  referanceID: string;
  childs: Array<Entity>;
  EXPAND_SIZE: number;
  style: LabelStyle;

  constructor(
    image: HTMLCanvasElement,
    p: LayerElemen
  ) {
    this.name = p.name;
    this.image = image;
    this.width = p.w ? p.w : image.width;
    this.height = p.h ? p.h : image.height;
    this.x = p.x;
    this.y = p.y;
    this.val = p.val;
    this.label = p.label;
    this.style = p.style;
    this.referanceID = p.referanceID;
    this.childs = [];
    this.EXPAND_SIZE = 0;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    const DISPLAY_CHILDRENS = false;
    const DISPLAY_TOTALS = true;
    const x = this.x - this.EXPAND_SIZE;
    const y = this.y - this.EXPAND_SIZE;
    const width = this.width + this.EXPAND_SIZE;
    const height = this.height + this.EXPAND_SIZE;
    ctx.drawImage(this.image, x, y, width, height);
    if (this.label.length > 0 && this.label !== ' ') {
      drawEntityLabel(ctx, x, y, width, height, this.label, this.style);
    }
    if (debug) {
      drawEntityBorder(ctx, x, y, width, height);
    }
    if(DISPLAY_CHILDRENS){
      this.drawChildrens(ctx);
    }
    if(DISPLAY_TOTALS){
      this.drawTotals(ctx);
    }
  }

  hoverOver() {
    //currently not using
    this.EXPAND_SIZE = 1;
  }

  hoverOut() {
    //currently not using
    this.EXPAND_SIZE = 0;
  }

  checkCoord(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  drawTotals(ctx: CanvasRenderingContext2D) {
    const x_start = this.x + CHILDREN_OFFSET_LEFT;
    const y_start = this.y + CHILDREN_OFFSET_TOP;

    const totals: Map<TileName, { image: HTMLCanvasElement, total: number }> = new Map();
    for (let index = 0; index < this.childs.length; index++) {
      let entity = this.childs[index];
      let currentTotal = 0;
      if (totals.has(entity.name)) {
        currentTotal = totals.get(entity.name).total;
      }
      totals.set(entity.name, {
        image: entity.image,
        total: currentTotal + entity.val
      })
    }
    
    const style: LabelStyle = {
      label_font: 'bold 12px arial',
      label_fillStyle: 'black',
      label_offset_x: 0,
      label_offset_y: CHILDREN_SIZE - 2
    }
    let y = 0;
    totals.forEach(total => {
      ctx.drawImage(
        total.image,
        x_start,
        y_start + y,
        CHILDREN_SIZE,
        CHILDREN_SIZE
      );
      drawTotalLables(ctx, x_start + CHILDREN_SIZE, y_start + y, total.total.toString(), style);
      y += CHILDREN_SIZE;
    })
  }

  drawChildrens(ctx: CanvasRenderingContext2D) {
    const x_start = this.x + CHILDREN_OFFSET_LEFT;
    const y_start = this.y + CHILDREN_OFFSET_TOP;
    const boxHeight = this.height - CHILDREN_OFFSET_BOTTOM - CHILDREN_OFFSET_TOP;
    const rowLen = this.width - CHILDREN_OFFSET_RIGHT - CHILDREN_OFFSET_LEFT;

    for (let index = 0; index < this.childs.length; index++) {
      let entity = this.childs[index];
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
    }
  }

  addChild(element: Entity) {
    this.childs.push(element);
  }
}