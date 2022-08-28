import { Engine, vec } from "excalibur";
import { FoodMachine } from "../foodMachine";
import { HungryGhost } from "../ghost/HungryGhost";
import { Food } from "../item/Food";
import { PressurePlate } from "../item/PressurePlate";
import { Level } from "../level";
import { Spikes } from "../Spikes";
import { Wall } from "../wall";
import { Accessory } from "../accessories/accessory";

export class Bretton4 extends Level {

  constructor() {
    super({
      name: 'Hungier...',
      player_pos: vec(75, 150),
      exit_pos: vec(50, 50)
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addWallLineH(vec(0, 0), 11);
    this.addWallLineV(vec(1000, 0), 11);
    this.addWallLineH(vec(0, 1000), 11);
    this.addWallLineV(vec(0, 0), 11);
    this.addWallLineV(vec(150, 0), 9);
    this.addWallLineV(vec(300, 200), 9);
    this.addWallLineH(vec(300, 200), 6);
    this.addWallLineH(vec(500, 400), 6);
    this.addGhost(new HungryGhost({
      level: this,
      pos: vec(1000, 1000),
      speed: 100
    }));
    this.addItem(new FoodMachine({
      level: this,
      pos: vec(700, 800),
      active: true
    }));
    this.addItem(new PressurePlate({
      level: this,
      pos: vec(900, 900),
      onActivate: () => {
        this.setExitActivated(true);
      },
      onDeactivate: () => {
        this.setExitActivated(false);
      }
    }));
    
    this.addWall(new Wall({
      level: this,
      pos: vec(913, 450),
      type: "burner",
      name: "burner",
    }));
    this.addWall(new Wall({
      level: this,
      pos: vec(840, 425),
      type: "fridge",
      name: "fridge",
    }));
    this.addWall(new Wall({
      level: this,
      pos: vec(740, 450),
      type: "counter_white",
      name: "counter_white",
    }));
    
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(900, 750),
      image_name: "lamp_tall",
      name: "lamp_tall",
      range: 100,
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(600, 450),
      image_name: "plant_6",
      name: "plant_6",
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(400, 900),
      image_name: "plant_1",
      name: "plant_1",
      range: 150,
    }));
    
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(500, 900),
      image_name: "plant_1",
      name: "plant_1",
      range: 150,
    }));
    this.addAccessory(new Accessory({
      level: this,
      pos: vec(600, 900),
      image_name: "plant_1",
      name: "plant_1",
      range: 150,
    }));
    
  }

}
