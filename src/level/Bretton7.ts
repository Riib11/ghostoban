import { Engine, Input, vec } from "excalibur";
import { Accessory } from "../accessories/accessory";
import StalkerGhost1 from "../ghost/StalkerGhost1";
import { Barrel } from "../item/Barrel";
import { Button } from "../item/Button";
import { LightSwitch } from "../item/LightSwitch";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";
import { image_list_non_walls } from "../resources";

export class Bretton7 extends Level {

  constructor() {
    super({
      name: 'Fear your Shadow',
      player_pos: vec(100, 100),
      exit_pos: vec(950, 950),
      exit_activated: false,
      isLit: true
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    const imageNames = Object.keys(image_list_non_walls);
    for (let i = 0; i < 50; i++) {
      this.addItem(new Accessory({
        level: this,
        name: 'Accessory',
        pos: vec(Math.random() * 1000, Math.random() * 1000),
        image_name: imageNames[Math.floor(Math.random() * imageNames.length)]
      }));
    }
    this.addItem(new Button({
      level: this,
      pos: vec(100, 500),
      key: Input.Keys.E,
      isActivated: true,
      onChangeActivated: isActivated => {
        this.setLit(isActivated);
        this.setExitActivated(!isActivated);
      }
    }));
    this.addGhost(new StalkerGhost1({
      level: this,
      pos: vec(1000, 0),
      speed: 300
    }));
  }

}
