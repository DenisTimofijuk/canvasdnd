import { TileName } from './layout';

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

  constructor(
    name: TileName,
    image: HTMLCanvasElement,
    x: number,
    y: number,
    val: number,
    label: string,
    referanceID: string,
    width?: number,
    height?: number
  ) {
    this.name = name;
    this.image = image;
    this.width = width ? width : image.width;
    this.height = height ? height : image.height;
    this.x = x;
    this.y = y;
    this.val = val;
    this.label = label;
    this.referanceID = referanceID;
    this.childs = [];
    this.EXPAND_SIZE = 0;
  }

  draw(ctx: CanvasRenderingContext2D, debug?: boolean) {
    const x = this.x - this.EXPAND_SIZE;
    const y = this.y - this.EXPAND_SIZE;
    const width = this.width + this.EXPAND_SIZE;
    const height = this.height + this.EXPAND_SIZE;
    ctx.drawImage(this.image, x, y, width, height);
    if (debug) {
      drawBorder(ctx, x, y, width, height);
    }
    this.drawChildrens(ctx);
  }

  hoverOver() {
    this.EXPAND_SIZE = 1;
  }

  hoverOut() {
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

  drawChildrens(ctx: CanvasRenderingContext2D) {
    const x_start = this.x + CHILDREN_OFFSET_LEFT;
    const y_start = this.y + CHILDREN_OFFSET_TOP;
    const boxHeight =
      this.height - CHILDREN_OFFSET_BOTTOM - CHILDREN_OFFSET_TOP;
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

function drawBorder(
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
