import { Engine, vec } from "excalibur";
import { LightSwitch } from "../item/LightSwitch";
import { Level } from "../level";

export class Bretton1 extends Level {

  constructor() {
    super({
      player_pos: vec(100, 100)
    });
  }

  onInitialize(_engine: Engine): void {
    this.addItem(new LightSwitch({
      level: this,
      name: 'light',
      pos: vec(600, 600),
      isOn: true
    }))
  }

}
