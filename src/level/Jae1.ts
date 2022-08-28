import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Accessory, ElectricalAccessory} from '../accessories/accessory';
import { Level } from '../level';
import { Wall } from '../wall';

export class Jae1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 500),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    // do stuff to setup level
    
    
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
    
    this.addWall(new Wall({
      level: this,
      name: "bed_red",
      pos: ex.vec(500, 400),
      type: "bed_red",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "bookshelf",
      pos: ex.vec(600, 400),
      type: "bookshelf",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "bookshelf_empty",
      pos: ex.vec(700, 400),
      type: "bookshelf_empty",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "chair_blue",
      pos: ex.vec(400, 600),
      type: "chair_blue",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "chair_red",
      pos: ex.vec(500, 600),
      type: "chair_red",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "drawer",
      pos: ex.vec(600, 600),
      type: "drawer",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_1",
      pos: ex.vec(700, 600),
      type: "plant_1",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_2",
      pos: ex.vec(800, 600),
      type: "plant_2",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_3",
      pos: ex.vec(400, 800),
      type: "plant_3",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_4",
      pos: ex.vec(500, 800),
      type: "plant_4",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_5",
      pos: ex.vec(600, 800),
      type: "plant_5",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "plant_6",
      pos: ex.vec(700, 800),
      type: "plant_6",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "television_old",
      pos: ex.vec(800, 800),
      type: "television_old",
    }));
    
  }




  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}
