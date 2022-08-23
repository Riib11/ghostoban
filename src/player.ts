import * as ex from 'excalibur';
import { Level } from './level';

const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];
const offset = ex.vec(-25, -25);

export class Player extends ex.Actor {
  level: Level;
  health: number;
  speed: number;

  constructor(args: {
    level: Level,
    pos: ex.Vector,
  }) {
    let actorArgs: ex.ActorArgs = {
      name: 'player',
    };
    actorArgs.pos = args.pos;
    actorArgs.collisionType = ex.CollisionType.Active;
    actorArgs.collisionGroup = ex.CollisionGroupManager.groupByName("player"),
      actorArgs.collider = new ex.PolygonCollider({ points, offset })
    super(actorArgs);
    this.level = args.level;
    this.health = 100;
    this.speed = 200;

    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Red,
    }));
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    // vertical
    let dy = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      dy = -1;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      dy = 1;
    }
    // horizontal
    let dx = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      dx = -1;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      dx = 1;
    }
    // scale
    if (dx !== 0 || dy !== 0) {
      this.vel = ex.vec(dx, dy).normalize().scale(this.speed);
    } else {
      this.vel = ex.Vector.Zero;
    }

  }
}