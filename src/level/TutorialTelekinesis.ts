import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Accessory } from '../accessories/accessory';
import { Level } from '../level';
import { Wall } from '../wall';
import { Spikes } from '../Spikes';
import { Barrel } from '../item/Barrel';
import { PressurePlate } from '../item/PressurePlate';

export class TutorialTelekinesis extends Level {
  constructor() {
    super({
      player_pos: ex.vec(150, 750),
      exit_pos: ex.vec(150, 850)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    // do stuff to setup level
    
    
    this.addWallLineH(ex.vec(50, 50), 10);
    this.addWallLineH(ex.vec(50, 950), 10);
    this.addWallLineV(ex.vec(50, 75), 9);
    this.addWallLineV(ex.vec(950, 75), 9);
    
    this.addSpikes(ex.vec(125, 300), 4, 1);
    this.addSpikes(ex.vec(300, 125), 1, 4);
    
    // this.addGhost(new CleaningGhost({
    //   level: this,
    //   pos: ex.vec(275, 450),
    //   speed: 300,
    //   items: objs,
    // }));
    
    const barrel = new Barrel({ level: this, pos: ex.vec(500, 600) });
    this.addItem(barrel);
    
    this.addItem(new PressurePlate({
      level: this,
      pos: ex.vec(200, 200),
      onActivate: () => { this.setExitActivated(true) },
      onDeactivate: () => { this.setExitActivated(false) }
    }));
    
    const ghost = new TelekinesisGhost({
      level: this,
      path: [ex.vec(250, 200), ex.vec(700, 200)],
      speed: 100
    });
    this.addGhost(ghost);
    
    this.addAccessory(new Accessory({
      level: this,
      pos: ex.vec(400, 150),
      image_name: "plant_1",
      name: "plant_1",
    }));
    this.addAccessory(new Accessory({
      level: this,
      pos: ex.vec(600, 250),
      image_name: "plant_3",
      name: "plant_3",
    }));
    this.addAccessory(new Accessory({
      level: this,
      pos: ex.vec(800, 200),
      image_name: "plant_6",
      name: "plant_6",
    }));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
