import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Accessory } from '../accessories/accessory';
import { Level } from '../level';

export class Jae1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 500)
    });
  }

  onInitialize(_engine: ex.Engine): void {
    // do stuff to setup level
    this.addGhost(new TelekinesisGhost({
      level: this,
      path: [ex.vec(100, 100), ex.vec(900, 100), ex.vec(900, 900), ex.vec(100, 900)],
      speed: 100,
    }));


    this.addAccessory(new Accessory(400, 200, "lamp"));
    this.addAccessory(new Accessory(600, 200, "lamp"));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}