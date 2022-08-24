import * as ex from 'excalibur';
import { Engine, vec } from "excalibur";
import { LightSwitch } from "../item/LightSwitch";
import { Level } from "../level";
import { Battery } from '../item/Battey';

export class Calvin1 extends Level {

  constructor() {
    super({
      player_pos: vec(100, 100)
    });
  }

  onInitialize(_engine: Engine): void {
    this.addItem(new LightSwitch({
      level: this,
      name: 'light',
      pos: vec(300, 300),
      isOn: true
    }))

    const battery2 = new Battery({
      level: this,
      pos: ex.vec(600, 500),
      charged: false
    });

  }

}
