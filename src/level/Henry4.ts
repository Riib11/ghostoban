import * as ex from 'excalibur';
import StalkerGhost1 from '../ghost/StalkerGhost1';
import { LightSwitch } from '../item/LightSwitch';
import { Level } from '../level';

export class Henry4 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(200, 100),
      exit_pos: ex.vec(950, 950),
      isLit: false
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    this.addItem(new LightSwitch({
      level: this,
      name: 'LightSwitch1',
      pos: ex.vec(900, 900),
      isActivated: false,
    }));


    [
      ex.vec(100, 900),
      ex.vec(900, 100),
      ex.vec(500, 100),
      ex.vec(500, 900),
      ex.vec(100, 500),
      ex.vec(900, 500),
    ]
      .forEach(pos => {
        this.addGhost(new StalkerGhost1({
          level: this,
          pos,
          speed: 300,
        }));
      })

  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
