import * as ex from 'excalibur';
import { Accessory } from '../accessories/accessory';
import { CleaningGhost } from '../ghost/CleaningGhost';
import { Item } from '../item';
import { Chair } from '../item/Chair';
import { Level } from '../level';

export class Henry5 extends Level {
  constructor() {
    super({
      player_pos: ex.vec(150, 50),
      lit: true
    });
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    // furniture_positions: ex.Vector[] = [];
    var chair_poss = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 3; y++) {
        chair_poss.push(ex.vec(x * 200 + 200, y * 300 + 200));
      }
    }

    var chairs: Chair[] = []
    chair_poss.forEach(pos => {
      const chair = new Chair({ level: this, pos });
      chairs.push(chair);
      this.addItem(chair)
    });

    var accessory_poss =
      [
        ex.vec(50, 100),
        ex.vec(50, 300),
        ex.vec(50, 500),
        ex.vec(50, 700),
        ex.vec(50, 900),

        ex.vec(950, 100),
        ex.vec(950, 300),
        ex.vec(950, 9500),
        ex.vec(950, 700),
        ex.vec(950, 900),
      ];
    var accessories: Accessory[] = [];
    accessory_poss.forEach(pos => {
      const acc = new Accessory({
        level: this,
        name: 'Accessory',
        pos,
        image_name: 'lamp',
      });
      accessories.push(acc);
      this.addItem(acc)
    });

    this.addGhost(new CleaningGhost({
      level: this,
      pos: ex.vec(500, 500),
      speed: 250,
      items: chairs
    }));

  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // TODO
  }
}