import { Engine, vec } from "excalibur";
import { HungryGhost } from "../ghost/HungryGhost";
import { Food } from "../item/Food";
import { Level } from "../level";

export class Bretton2 extends Level {

  constructor() {
    super({
      player_pos: vec(100, 100),
      exit_pos: vec(950, 950)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    const foodPoss = [vec(200, 200), vec(300, 300), vec(400, 200),
      vec(600, 800), vec(700, 100), vec(900, 900), vec(500, 500), vec(300, 700),
      vec(900, 100), vec(500, 800)];
    for (const pos of foodPoss) {
      this.addItem(new Food({ level: this, pos }));
    }
    this.addGhost(new HungryGhost({
      level: this,
      pos: vec(800, 800),
      speed: 50
    }));
  }

}
