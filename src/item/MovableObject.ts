import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';
import { images } from '../resources';
import { SpriteItem } from '../SpriteItem';
import { image_list, collider_list, IHash, IHash2 } from '../resources'

// const points = [ex.vec(0, 0), ex.vec(16, 0), ex.vec(16, 29), ex.vec(0, 29)];
// const points = [ex.vec(0, 0), ex.vec(16, 0), ex.vec(16, 18), ex.vec(0, 18)];
// const offset = ex.vec(-16 / 2, -8 / 2);
const offset = ex.vec(0, 0);

export class MovableObject extends Item {
  image_name: string
  
  constructor(args: {
    level: Level,
    pos: ex.Vector,
    image_name: string,
  }) {
    const col_w = collider_list[args.image_name].x;
    const col_h = collider_list[args.image_name].y;
    const points = [ex.vec(-col_w, -col_h), ex.vec(col_w, -col_h), ex.vec(col_w, col_h), ex.vec(-col_w, col_h)];
    
    super({
      ...args,
      name: args.image_name,
      points,
      offset,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
      collider: new ex.PolygonCollider({ points: points, offset: offset }),
    });
    this.image_name = args.image_name;
  }
  
  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    this.graphics.use(image_list[this.image_name]);
  }
  
}