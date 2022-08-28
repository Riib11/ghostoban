import * as ex from 'excalibur';
import { Engine, vec } from "excalibur";
import { ElectricityGhost1 } from '../ghost/ElectricityGhost1';
import { Accessory, ElectricalAccessory } from '../accessories/accessory';
import { Level } from "../level";
import { Battery } from '../item/Battey';

export class Calvin1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 400),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    this.addWallLineH(vec(0, 200), 3);
    this.addWallLineV(vec(200, 0), 2);
    this.addWallLineH(vec(0, 500), 3);
    this.addWallLineH(vec(400, 500), 3);
    this.addWallLineV(vec(800, 500), 6);
    this.addWallLineV(vec(500, 200), 3);

    const battery1 = new Battery({
      level: this,
      pos: ex.vec(100, 100),
      key: ex.Input.Keys.E,
      charged: false,
      onActivate: () => {
        this.setExitActivated(true);
      },
      onDeactivate: () => {
        this.setExitActivated(false);
      }
    });
    battery1.addChild(new ex.Label({
      text: "Door",
      pos: ex.vec(0, 50),
      font: new ex.Font({
        family: 'helvetica',
        size: 24,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }))

    const battery2 = new Battery({
      level: this,
      pos: ex.vec(200, 900),
      key: ex.Input.Keys.E,
      charged: false
    });

    const battery3 = new Battery({
      level: this,
      pos: ex.vec(800, 200),
      key: ex.Input.Keys.E,
      charged: false
    });

    const ghost = new ElectricityGhost1({
      level: this,
      pos: ex.vec(100, 100),
      speed: 200,
      charged: false,
      favorite_electricalItem: battery1,
      electricalItems: [battery2, battery3]
    });

    this.addAccessory(new ElectricalAccessory({
      level: this,
      name: "lamp",
      pos: ex.vec(100, 600),
      image_name: "lamp",
    }));

    this.addAccessory(new ElectricalAccessory({
      level: this,
      name: "lamp",
      pos: ex.vec(900, 100),
      image_name: "lamp",
    }));

    this.addAccessory(new ElectricalAccessory({
      level: this,
      name: "lamp",
      pos: ex.vec(50, 50),
      image_name: "lamp",
    }));

    this.addGhost(ghost);
    this.addItem(battery1);
    this.addItem(battery2);
    this.addItem(battery3);
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }

}
