import * as ex from 'excalibur';

export class MovementController extends ex.Entity {
  actor: ex.Actor;
  speed: number;

  constructor(args: {
    actor: ex.Actor,
    speed: number
  }) {
    super();
    this.actor = args.actor;
    this.speed = args.speed;
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
      this.actor.vel = ex.vec(dx, dy).normalize().scale(this.speed);
    } else {
      this.actor.vel = ex.Vector.Zero;
    }
  }
}