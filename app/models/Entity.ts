import { TileName } from './SpriteSheet';

export class Entity {
  image: HTMLCanvasElement;
  x: number;
  y: number;
  name: TileName;
  width: number;
  height: number;
  childs: Array<Entity>;
  path: Path2D;
  EXPAND_SIZE: number;

  constructor(
    name: TileName,
    image: HTMLCanvasElement,
    x: number,
    y: number,
    width?: number,
    height?: number
  ) {
    this.name = name;
    this.image = image;
    this.width = width ? width : image.width;
    this.height = height ? height : image.height;
    this.x = x;
    this.y = y;
    this.childs = [];
    this.EXPAND_SIZE = 0;
    this.path = new Path2D(); //not supported with IE
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.x - this.EXPAND_SIZE;
    const y = this.y - this.EXPAND_SIZE;
    const width = this.width + this.EXPAND_SIZE;
    const height = this.height + this.EXPAND_SIZE;
    this.path.rect(x, y, width, height);
    ctx.drawImage(this.image, x, y, width, height);
    this.drawChildrens(ctx);
  }

  hoverOver(){
    this.EXPAND_SIZE = 1;
  }

  hoverOut(){
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
    const OFFSET_TOP = 25;
    const OFFSET_LEFT = 15;
    const OFFSET_RIGHT = 25;
    const OFFSET_BOTTOM = 15;
    const x_start = this.x + OFFSET_LEFT;
    const y_start = this.y + OFFSET_TOP;
    const boxHeight = this.height - OFFSET_BOTTOM - OFFSET_TOP;
    const rowLen = this.width - OFFSET_RIGHT - OFFSET_LEFT;
    const size = 15;

    this.childs.forEach((entity, index) => {
      const x = (index * size) % rowLen;
      const y = Math.floor((index * size) / rowLen) * size;
      if (y <= boxHeight - size) {
        ctx.drawImage(entity.image, x_start + x, y_start + y, size, size);
      }
    });
  }

  addChild(element: Entity) {
    this.childs.push(element);
  }
}
