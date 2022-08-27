import * as ex from "excalibur";
import { Button } from "../item/Button";
import { Door } from "../item/Door";
import { Level } from "../level";
import { images } from "../resources";

export class Door1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 100),
      exit_pos: ex.vec(900, 900),
    });
  }

  onInitialize(engine: ex.Engine): void {
    const door = new Door({
      level: this,
      pos: ex.vec(500, 500),
      direction: 'right',
      speed: 100,
    });
    this.add(door);

    const btn = new Button({
      level: this,
      pos: ex.vec(100, 200),
      key: ex.Input.Keys.E,
      isActivated: false,
      onChangeActivated: (isActivated) => door.setOpen(isActivated),
    });
    this.add(btn);
  }
}
