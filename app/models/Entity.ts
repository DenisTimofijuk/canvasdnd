import { TileName } from './setup/layout';
import { drawEntityLabel, drawEntityBorder, drawTotalLables } from './helpers/helpers for draw';
import { LabelStyle, LayerElemen } from './setup/layouts/layout_QP4';

export type EntityOptions = {
  display_childrens?: boolean;
  display_totals?: boolean;
  delete_childrens_on_preview?:boolean;
}

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
  style: LabelStyle;
  visible: boolean;
  parentEntity: Entity;
  options?: EntityOptions;

  constructor(
    image: HTMLCanvasElement,
    p: LayerElemen,
    options?: EntityOptions
  ) {
    this.options = options ? options : {};
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
    this.visible = true;
    this.parentEntity = undefined;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    if (!this.visible) {
      return;
    }
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;
    ctx.drawImage(this.image, x, y, width, height);
    if (this.label.length > 0 && this.label !== ' ') {
      drawEntityLabel(ctx, x, y, width, height, this.label, this.style.label);
    }
    if (debug) {
      drawEntityBorder(ctx, x, y, width, height);
    }
    if (this.options.display_childrens) {
      this.drawChildrens(ctx);
    }
    if (this.options.display_totals) {
      this.drawTotals(ctx);
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

  drawTotals(ctx: CanvasRenderingContext2D) {
    const childrenStyle = this.style && this.style.total ? this.style.total : {
      icon: {
        offset_top: 0,
        offset_left: 0,
        size: 35
      },
      label:{

      }
    };
    const x_start = this.x + childrenStyle.icon.offset_left;
    const y_start = this.y + childrenStyle.icon.offset_top;

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

    let y = 0;
    totals.forEach(total => {
      ctx.drawImage(
        total.image,
        x_start,
        y_start + y,
        childrenStyle.icon.size,
        childrenStyle.icon.size
      );
      drawTotalLables(ctx, x_start + childrenStyle.icon.size, y_start + y, total.total.toString(), childrenStyle.label);
      y += childrenStyle.icon.size;
    })
  }

  drawChildrens(ctx: CanvasRenderingContext2D) {
    //use same approach as PopUpUI - grid system - different layer...
    const childrenStyle = this.style && this.style.children ? this.style.children : {
      offset_top: 0,
      offset_left: 0,
      offset_right: 0,
      offset_bottom: 0,
      size: 35,
      label:{

      }
    };
    const x_start = this.x + childrenStyle.offset_left;
    const y_start = this.y + childrenStyle.offset_top;
    const boxHeight = this.height - childrenStyle.offset_bottom - childrenStyle.offset_top;
    const rowLen = this.width - childrenStyle.offset_right - childrenStyle.offset_left;

    for (let index = 0; index < this.childs.length; index++) {
      let entity = this.childs[index];
      const x = (index * childrenStyle.size) % rowLen;
      const y = Math.floor((index * childrenStyle.size) / rowLen) * childrenStyle.size;
      if (y > boxHeight - childrenStyle.size) {
        break;
      }
      ctx.drawImage(
        entity.image,
        x_start + x,
        y_start + y,
        childrenStyle.size,
        childrenStyle.size
      );
      if (entity.label.length > 0 && entity.label !== ' ') {
        drawEntityLabel(ctx, x_start + x, y_start + y, childrenStyle.size, childrenStyle.size, entity.label, childrenStyle.label);
      }
    }
  }

  addChild(element: Entity) {
    this.childs.push(element);
  }

  removeChild(element: Entity) {
    const index = this.childs.indexOf(element);
    if (index > -1) {
      this.childs.splice(index, 1);
    }
  }
}