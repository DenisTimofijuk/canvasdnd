import { TileName } from "./layout";

type Tile = {
  name: TileName;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function defineTiles(): Array<Tile> {
  return [
    {
      name: 'calendar',
      x: 10,
      y: 400,
      w: 90,
      h: 90
    },
    {
      name: 'pen',
      x: 2,
      y: 285,
      w: 96,
      h: 96
    },
    {
      name: 'hand',
      x: 1,
      y: 500,
      w: 110,
      h: 114
    },
    {
      name: 'document',
      x: 444,
      y: 4,
      w: 457,
      h: 615
    },
    {
      name: 'woman1',
      x: 87,
      y: 1,
      w: 142,
      h: 351
    },
    {
      name: 'woman2',
      x: 233,
      y: 1,
      w: 112,
      h: 249
    },
    {
      name: 'woman3',
      x: 356,
      y: 1,
      w: 87,
      h: 315
    },
    {
      name: 'woman4',
      x: 179,
      y: 334,
      w: 235,
      h: 284
    },
    {
      name: 'brand',
      x: 8,
      y: 641,
      w: 148,
      h: 40
    }
  ];
}

//TODO: implement fetching at the very end of the project
export function getTiles(url: string) {
  return fetch(url).then(r => r.json() as Promise<{ tiles: Array<Tile> }>);
}