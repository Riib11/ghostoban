import * as ex from 'excalibur';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Accessory } from '../accessories/accessory';
import { Level } from '../level';
import { Wall } from '../wall';

export class Jae1 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(100, 500)
    });
  }

  onInitialize(_engine: ex.Engine): void {
    // do stuff to setup level
    this.addGhost(new TelekinesisGhost({
      level: this,
      path: [ex.vec(100, 100), ex.vec(900, 100), ex.vec(900, 900), ex.vec(100, 900)],
      speed: 100,
    }));

    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(500, 400),
      type: "",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(500+75, 400),
      type: "R",
    }));
    
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(500-75, 400),
      type: "L",
    }));
    
    
    this.addWall(new Wall({
      level: this,
      name: "wall",
      pos: ex.vec(500, 550),
      type: "LR",
    }));

    this.addAccessory(new Accessory({
      level: this,
      name: "lamp",
      pos: ex.vec(400, 200),
      // points: ex.Vector[],
      // offset: ex.Vector,
      image_name: "lamp",
    }));
    // this.addAccessory(new Accessory(600, 200, "lamp"));
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}