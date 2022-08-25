import * as ex from 'excalibur';
import { Level } from './level';
import { Nearby } from './nearby';
import { playerG } from './collision';
import { MovementController } from './MovementController';
import { Activator } from './Activator';

const points = [ex.vec(-25, -25), ex.vec(25, -25), ex.vec(25, 25), ex.vec(-25, 25)];
const offset = ex.vec(0, 0);

export class Player extends ex.Actor {
  level: Level;
  health: number;

  constructor(args: {
    level: Level,
    pos: ex.Vector,
  }) {
    super({
      ...args,
      name: 'player',
      collisionType: ex.CollisionType.Active,
      collisionGroup: playerG,
      collider: new ex.PolygonCollider({ points, offset })
    });
    this.level = args.level;
    this.health = 100;
    this.addChild(new MovementController({ actor: this, speed: 500 }));
    this.addChild(new Activator({ radius: 50, }));
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Red,
    }));
  }
}
