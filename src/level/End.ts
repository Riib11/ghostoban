import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { Level } from '../level';

export class End extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
    engine.backgroundColor = ex.Color.White;

    this.add(new Label({
      text: "END",
      pos: ex.vec(500, 500),
      color: ex.Color.Black,
      font: new ex.Font({
        family: 'helvetica',
        size: 64,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));

    this.add(new Label({
      text: "thanks for playing",
      pos: ex.vec(500, 800),
      color: ex.Color.Black,
      font: new ex.Font({
        family: 'helvetica',
        size: 32,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));

  }
}
