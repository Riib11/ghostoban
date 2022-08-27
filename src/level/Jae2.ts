import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Accessory } from '../accessories/accessory';
import { Level } from '../level';
import { Wall } from '../wall';
import { Spikes } from '../Spikes';

export class Jae2 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 500),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    // do stuff to setup level
    this.addGhost(new TelekinesisGhost({
      level: this,
      path: [ex.vec(100, 100), ex.vec(900, 100), ex.vec(900, 900), ex.vec(100, 900)],
      speed: 100,
    }));

    // this.addWall(new Wall({
    //   level: this,
    //   name: "wall",
    //   pos: ex.vec(500, 400),
    //   type: "",
    // }));
    // 
    // this.addWall(new Wall({
    //   level: this,
    //   name: "wall",
    //   pos: ex.vec(500+75, 400),
    //   type: "R",
    // }));
    // 
    // this.addWall(new Wall({
    //   level: this,
    //   name: "wall",
    //   pos: ex.vec(500-75, 400),
    //   type: "L",
    // }));
    
    // this.addWallLine(ex.vec(500, 400), 3, 0);
    // this.addWallLine(ex.vec(500, 550), 0, 6);
    
    this.addWallLineH(ex.vec(500, 400), 3);
    this.addWallLineV(ex.vec(700, 200), 2);
    
    this.addSpike(new Spikes({
      level: this,
      pos: ex.vec(200, 700),
    }));
    this.addSpike(new Spikes({
      level: this,
      pos: ex.vec(250, 700),
    }));
    
    this.addSpikes(ex.vec(100, 600), 6, 5, true);
    this.addSpikes(ex.vec(100, 900), 2, 2, true);
    
    
    // this.addWall(new Wall({
    //   level: this,
    //   name: "wall",
    //   pos: ex.vec(500, 550),
    //   type: "LR",
    // }));
    
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(600, 850),
      type: "N",
    }));
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(600+100, 850),
      type: "N",
    }));
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(600+100, 850-100),
      type: "VN",
    }));
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(600+100, 850-200),
      type: "VN",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "dark_table_1",
      pos: ex.vec(400, 250),
      type: "dark_table_1",
    }));

    this.addAccessory(new Accessory({
      level: this,
      name: "lamp",
      pos: ex.vec(400, 200),
      // points: ex.Vector[],
      // offset: ex.Vector,
      image_name: "lamp",
    }).set_z_offset(100));
    // this.addAccessory(new Accessory(600, 200, "lamp"));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
