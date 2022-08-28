import * as ex from 'excalibur';
import { images } from '../resources';
import { z } from '../constants';
import { Level } from '../level';

export class LevelFloor extends ex.Entity {
  level: Level

  constructor(args: {
    level: Level
  }) {
    super();
    this.level = args.level;
  }

  onInitialize(_engine: ex.Engine): void {
    const scale = 2;
    const sprite = images.floor.toSprite();
    sprite.scale = ex.vec(scale, scale);
    const tilemap = new ex.TileMap({
      pos: ex.vec(-1000, -1000),
      rows: 4 * Math.ceil(1000 / sprite.height),
      columns: 4 * Math.ceil(1000 / sprite.width),
      tileWidth: sprite.width,
      tileHeight: sprite.height,
    });
    for (const tile of tilemap.tiles) {
      tile.addGraphic(sprite);
    }
    tilemap.z = z.LevelFloor;
    // this.addChild(tilemap);
    this.level.add(tilemap);
  }
}