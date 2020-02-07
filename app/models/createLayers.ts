import { TileName, SpriteSheet } from "./SpriteSheet";
import { Entity } from "./Entity";
import { getPageLayoutItems, getPageLayoutCalendar, getPageLayoutDraggableItems, itemLayer, CalendarLayer, CALENDAR_PADDING_RIGHT, CALENDAR_PADDING_TOP } from "./layout";

export type LayerNames = 'patient' | 'calendar' | 'draggable' | 'draging' | 'grid';

export function createLayers(sprites: SpriteSheet) {
  const layers:Map<LayerNames, Array<Entity>> = new Map();

  const ItemLayer = getPageLayoutItems() as itemLayer;
  layers.set('patient', getLayerElements(ItemLayer, sprites));

  const calendarLayer = getPageLayoutCalendar() as CalendarLayer;
  layers.set('calendar', getCalendarLayerElements(calendarLayer, sprites));

  const draggableLayer = getPageLayoutDraggableItems() as itemLayer;
  layers.set('draggable', getLayerElements(draggableLayer, sprites));

  return layers;
}

function getLayerElements(layoutItems: itemLayer, sprites: SpriteSheet): Array<Entity> {
  const layer: Entity[] = [];

  layoutItems.forEach(element => {
    let name = element.name;
    let image = sprites.tiles.get(name);

    layer.push(
      new Entity(name, image, element.x, element.y, element.w, element.h)
    );
  });

  return layer;
}

function getCalendarLayerElements(calendarItems: CalendarLayer, sprites: SpriteSheet): Array<Entity> {
  const layer: Entity[] = [];
  
  calendarItems.forEach(element => {
    let y = element.y;
    for (let row = 1; row <= element.rows; row++) {
      let x = element.x;
      for (let col = 1; col <= element.columns; col++) {
        let name = element.name;
        let image = sprites.tiles.get(name);
        layer.push(
          new Entity(name, image, x, y, element.w, element.h)
        );
        x += element.w + CALENDAR_PADDING_RIGHT;
      }
      y += element.h + CALENDAR_PADDING_TOP;
    }
  });

  return layer;
}