import * as ex from 'excalibur';
import { ElectricityGhost1 } from '../ghost/ElectricityGhost1';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Battery } from '../item/Battey';
import { Accessory, ElectricalAccessory} from '../accessories/accessory';
import { ElectricalItem } from '../item/ElectricalItem';
import { Level } from '../level';

export class Henry2 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 400),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    
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

    const ghost = new ElectricityGhost1({
      level: this,
      pos: ex.vec(100, 500),
      speed: 200,
      charged: false,
      favorite_electricalItem: battery1,
      electricalItems: [battery2, battery3]
    });

    this.addGhost(ghost);
    this.addItem(battery1);
    this.addItem(battery2);
    this.addItem(battery3);
    
    this.addAccessory(new ElectricalAccessory({
      level: this,
      name: "lamp",
      pos: ex.vec(100, 350),
      // points: ex.Vector[],
      // offset: ex.Vector,
      image_name: "lamp",
    }));
    
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
