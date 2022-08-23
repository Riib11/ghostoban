import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Level } from '../level';

export class Henry1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 400)
    });
  }

  onInitialize(_engine: ex.Engine): void {
    // do stuff to setup level
    this.addGhost(new TelekinesisGhost({
      path: [ex.vec(150, 150), ex.vec(650, 150), ex.vec(650, 650), ex.vec(150, 650)]
    }));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}