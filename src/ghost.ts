import * as ex from 'excalibur';
import { Level } from './level';
import { ghostG } from './collision';
import { DEBUG_GHOSTS } from './options';

export class Ghost extends ex.Actor {
  level: Level;
  points: ex.Vector[];
  speed: number;
  pos_origin: ex.Vector;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    collisionType?: ex.CollisionType,
    collisionGroup?: ex.CollisionGroup,
    offset: ex.Vector,
    color: ex.Color,
    speed: number,
  }) {
    super({
      ...args,
      collider: new ex.PolygonCollider({ points: args.points, offset: args.offset }),
      collisionGroup: args.collisionGroup || ghostG
    });
    this.level = args.level;
    this.points = args.points;
    this.speed = args.speed;
    this.pos_origin = args.pos.clone();

    if (DEBUG_GHOSTS) {
      this.graphics.use(new ex.Polygon({
        points: this.points,
        color: args.color,
      }));
    }
  }

  onInitialize(_engine: ex.Engine): void {

  }

  setVelTowards(pos: ex.Vector) {
    let v = pos.sub(this.pos);
    this.vel = v.normalize().scale(this.speed)
  }

  reset(): void {
    this.pos = this.pos_origin;
    this.actions.clearActions();
  }
}
