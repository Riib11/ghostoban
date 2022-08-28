import * as ex from 'excalibur';
import { Item } from "../item";
import { Level } from "../level";
import { images } from '../resources';
import { isWeighted, Weighted } from "../Weighted";

export class Barrel extends Item implements Weighted {

  weight: number;

  constructor(args: {
    level: Level,
    pos: ex.Vector
  }) {
    super({
      ...args,
      name: 'Barrel',
      points: [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)],
      offset: ex.Vector.Zero,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
    });
    this.weight = 40;
  }

  onInitialize(engine: ex.Engine): void {
    const sprite = images.barrel.toSprite();
    sprite.scale = ex.vec(5, 4.16);
    this.graphics.add(sprite);
  }

}
