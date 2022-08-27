import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';
import { chair } from '../resources';
import { SpriteItem } from '../SpriteItem';

// const points = [ex.vec(0, 0), ex.vec(16, 0), ex.vec(16, 29), ex.vec(0, 29)];
const points = [ex.vec(0, 0), ex.vec(16, 0), ex.vec(16, 18), ex.vec(0, 18)];
const offset = ex.vec(-16 / 2, -8 / 2);

export class Chair extends SpriteItem {

  constructor(args: {
    level: Level,
    pos: ex.Vector,
  }) {
    super({
      ...args,
      name: 'Chair',
      points,
      offset,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
      imageSource: chair
    });
    this.scale = ex.vec(5, 5);
  }
}