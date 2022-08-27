import { Engine, vec } from "excalibur";
import { HungryGhost } from "../ghost/HungryGhost";
import { Food } from "../item/Food";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";
import { Spikes } from "../Spikes";

export class Bretton3 extends Level {

  constructor() {
    super({
      player_pos: vec(100, 100),
      exit_pos: vec(950, 950)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.add(new Spikes({
      level: this,
      pos: vec(500, 500),
      width: 300,
      height: 300
    }));
    this.addItem(new PressurePlate({
      level: this,
      pos: vec(500, 500),
      activationWeight: 20,
      onActivate() {
        this.level.setExitActivated(true);
      }
    }));
    for (let x = 100; x < 500; x += 50) {
      this.addItem(new Food({
        level: this,
        pos: vec(x, 900)
      }));
    }
    this.addGhost(new HungryGhost({
      level: this,
      pos: vec(900, 900),
      speed: 50
    }));
  }

}
