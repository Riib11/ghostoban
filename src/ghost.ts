import * as ex from 'excalibur';

export class Ghost extends ex.Actor {
  points: ex.Vector[];
  health: number;
  speed: number;

  constructor(args: {
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    collisionType: ex.CollisionType,
    collisionGroup: ex.CollisionGroup,
    offset: ex.Vector,
    health: number,
    speed: number,
  }) {
    super({
      ...args,
      collider: new ex.PolygonCollider({ points: args.points, offset: args.offset })
    });

    this.points = args.points;
    this.health = args.health;
    this.speed = args.speed;
  }

  onInitialize(_engine: ex.Engine): void {
    // TMP: this is probably just for debugging
    this.graphics.use(new ex.Polygon({
      points: this.points,
      color: ex.Color.Black,
    }));
  }
}