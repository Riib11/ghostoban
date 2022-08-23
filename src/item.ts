import * as ex from 'excalibur';
import { Level } from './level';

export class Item extends ex.Actor {
  level: Level;
  points: ex.Vector[];

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    collisionType: ex.CollisionType,
    collisionGroup: ex.CollisionGroup,
    offset: ex.Vector,
  }) {
    super({
      ...args,
      collider: new ex.PolygonCollider({ points: args.points, offset: args.offset })
    });
    this.level = args.level;
    this.points = args.points;
  }

  onInitialize(_engine: ex.Engine): void {
    // TMP: this is probably just for debugging
    this.graphics.use(new ex.Polygon({
      points: this.points,
      color: ex.Color.Black,
    }));
  }
}