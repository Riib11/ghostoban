import * as ex from 'excalibur';
import { ElectricityGhost } from '../ghost/ElectricityGhost';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Battery } from '../item/Battey';
import { ElectricalItem } from '../item/ElectricalItem';
import { Level } from '../level';

export class Henry2 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 400)
    });

    // do stuff to setup level

    // this.add()

    const battery1 = new Battery({
      level: this,
      pos: ex.vec(400, 500),
      charged: false
    });
    battery1.addChild(new ex.Label({
      text: "favorite",
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
      pos: ex.vec(600, 500),
      charged: false
    });

    const battery3 = new Battery({
      level: this,
      pos: ex.vec(800, 500),
      charged: true
    });

    const ghost = new ElectricityGhost({
      level: this,
      pos: ex.vec(100, 500),
      speed: 200,
      charged: false,
      favorite_electricalItem: battery1
    });

    this.addGhost(ghost);
    this.addItem(battery1);
    this.addItem(battery2);
    this.addItem(battery3);
  }

  onInitialize(_engine: ex.Engine): void {

  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}