import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { CleaningGhost } from '../ghost/CleaningGhost';
import { Accessory } from '../accessories/accessory';
import { Level } from '../level';
import { Wall } from '../wall';
import { Spikes } from '../Spikes';
import { Barrel } from '../item/Barrel';
import { MovableObject } from '../item/MovableObject';
import { PressurePlate } from '../item/PressurePlate';

export class Jae3 extends Level {
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
    
    // this.addWallLineV(ex.vec(450, 75), 3);
    this.addWallLineH(ex.vec(450, 350), 5);
    
    // let x:MovableObject = new MovableObject({
    //   level: this,
    //   pos: ex.vec(300, 300),
    //   image_name: "plant_1",
    // });
    // this.addMovableObject(x);
    
    var objs: MovableObject[] = [];
    // objs.push(chair);
    
    let chair_1: MovableObject = new MovableObject({
      level: this,
      pos: ex.vec(150, 350),
      image_name: "chair_red",
    });
    objs.push(chair_1);
    this.addMovableObject(chair_1);
    
    let chair_2: MovableObject = new MovableObject({
      level: this,
      pos: ex.vec(350, 350),
      image_name: "chair_red",
    });
    objs.push(chair_2);
    this.addMovableObject(chair_2);
    
    let lamp_1: MovableObject = new MovableObject({
      level: this,
      pos: ex.vec(850, 500),
      image_name: "lamp",
    });
    objs.push(lamp_1);
    this.addMovableObject(lamp_1);
    
    let lamp_2: MovableObject = new MovableObject({
      level: this,
      pos: ex.vec(150, 550),
      image_name: "lamp_tall",
    });
    objs.push(lamp_2);
    this.addMovableObject(lamp_2);
    
    let plant: MovableObject = new MovableObject({
      level: this,
      pos: ex.vec(750, 250),
      image_name: "plant_4",
    });
    objs.push(plant);
    this.addMovableObject(plant);
    
    this.addGhost(new CleaningGhost({
      level: this,
      pos: ex.vec(275, 450),
      speed: 300,
      items: objs,
    }));
    
    const barrel = new Barrel({ level: this, pos: ex.vec(500, 150) });
    this.addItem(barrel);
    
    this.addItem(new PressurePlate({
      level: this,
      pos: ex.vec(200, 200),
      onActivate: () => { this.setExitActivated(true) },
      onDeactivate: () => { this.setExitActivated(false) }
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: ex.vec(250, 350),
      type: "dark_table_1",
      name: "dark_table_1",
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: ex.vec(600, 400),
      type: "television_old",
      name: "television_old",
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: ex.vec(800, 800),
      type: "bed_red",
      name: "bed_red",
    }));
    
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
