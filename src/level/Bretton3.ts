import { Engine, vec } from "excalibur";
import { HungryGhost } from "../ghost/HungryGhost";
import { Food } from "../item/Food";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";
import { Spikes } from "../Spikes";
import { Wall } from "../wall";
import { Accessory } from "../accessories/accessory";

export class Bretton3 extends Level {

  constructor() {
    super({
      name: 'Hungry',
      player_pos: vec(150, 500),
      exit_pos: vec(950, 950)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addSpikes(vec(400, 400), 5, 5, true);
    this.addItem(new PressurePlate({
      level: this,
      pos: vec(500, 500),
      onActivate() {
        this.level.setExitActivated(true);
      }
    }));
    for (let x = 100; x < 500; x += 40) {
      this.addItem(new Food({
        level: this,
        pos: vec(x, 900)
      }));
    }
    this.addGhost(new HungryGhost({
      level: this,
      pos: vec(900, 900),
      speed: 100
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: vec(100, 150),
      type: "bed_red",
      name: "bed_red",
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: vec(500, 100),
      type: "television_old",
      name: "television_old",
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: vec(700, 100),
      type: "bookshelf",
      name: "bookshelf",
    }));
    this.addWall(new Wall({
      level: this,
      pos: vec(800, 100),
      type: "bookshelf",
      name: "bookshelf",
    }));
    this.addWall(new Wall({
      level: this,
      pos: vec(900, 100),
      type: "bookshelf_empty",
      name: "bookshelf_empty",
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: vec(800, 400),
      type: "dark_table_1",
      name: "dark_table_1",
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(150, 300),
      image_name: "lamp",
      name: "lamp",
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(300, 800),
      image_name: "plant_5",
      name: "plant_5",
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(800, 350),
      image_name: "plant_2",
      name: "plant_2",
    }).set_z_offset(100));
    
  }

}
