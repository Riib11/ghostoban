import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Level } from '../level';

export class Henry1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 500),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    // do stuff to setup level
    this.addGhost(new TelekinesisGhost({
      level: this,
      path: [ex.vec(100, 100), ex.vec(900, 100), ex.vec(900, 900), ex.vec(100, 900)],
      speed: 100,
    }));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
