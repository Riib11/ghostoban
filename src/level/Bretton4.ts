import { Engine, vec } from "excalibur";
import { FoodMachine } from "../foodMachine";
import { HungryGhost } from "../ghost/HungryGhost";
import { Food } from "../item/Food";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";
import { Spikes } from "../Spikes";

export class Bretton4 extends Level {

  constructor() {
    super({
      player_pos: vec(800, 200),
      exit_pos: vec(50, 50)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    for (let x = 100; x < 300; x += 50) {
      this.addItem(new Food({
        level: this,
        pos: vec(x, 900)
      }));
    }
    this.addGhost(new HungryGhost({
      level: this,
      pos: vec(700, 700),
      speed: 50
    }));
    this.addItem(new FoodMachine({
      level: this,
      pos: vec(800, 900),
      active: true
    }));
  }

}
