import * as ex from 'excalibur';
import { Level } from './level';

export class Ghost extends ex.Actor {
  level: Level;
  points: ex.Vector[];
  speed: number;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    collisionType: ex.CollisionType,
    collisionGroup: ex.CollisionGroup,
    offset: ex.Vector,
    color: ex.Color,
    speed: number,
  }) {
    super({
      ...args,
      collider: new ex.PolygonCollider({ points: args.points, offset: args.offset })
    });
    this.level = args.level;
    this.points = args.points;
    this.speed = args.speed;

    // TMP: this is probably just for debugging
    this.graphics.use(new ex.Polygon({
      points: this.points,
      color: args.color,
    }));
  }

  onInitialize(_engine: ex.Engine): void {

  }

  setVelTowards(pos: ex.Vector) {
    let v = pos.sub(this.pos);
    this.vel = v.normalize().scale(this.speed)
  }
}