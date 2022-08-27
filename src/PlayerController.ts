import * as ex from 'excalibur';
import { Player } from './player';

export class PlayerController extends ex.Entity {
  player: Player;
  speed: number;

  constructor(args: {
    player: Player,
    speed: number
  }) {
    super();
    this.player = args.player;
    this.speed = args.speed;
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    // vertical
    let movement = "idle";
    
    let dy = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      dy = -1;
      movement = "run";
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      dy = 1;
      movement = "run";
    }
    // horizontal
    let dx = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      dx = -1;
      movement = "left";
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      dx = 1;
      movement = "right";
    }
    this.player.run_animation(movement);
    // scale
    if (dx !== 0 || dy !== 0) {
      this.player.vel = ex.vec(dx, dy).normalize().scale(this.speed);
    } else {
      this.player.vel = ex.Vector.Zero;
    }
  }
}