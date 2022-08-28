import { Engine, vec } from "excalibur";
import { Barrel } from "../item/Barrel";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";

export class Bretton5 extends Level {

  constructor() {
    super({
      name: 'Heavy barrel',
      player_pos: vec(100, 100),
      exit_pos: vec(950, 950)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addItem(new PressurePlate({
      level: this,
      pos: vec(500, 500),
      onActivate() {
        this.level.setExitActivated(true);
      },
      onDeactivate() {
        this.level.setExitActivated(false);
      }
    }));
    this.addItem(new Barrel({
      level: this,
      pos: vec(200, 900)
    }));
  }

}
