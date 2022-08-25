import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { Level } from '../level';

export class Death extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
    engine.backgroundColor = ex.Color.Black;

    this.add(new Label({
      text: "DEATH",
      pos: ex.vec(500, 500),
      color: ex.Color.White,
      font: new ex.Font({
        family: 'helvetica',
        size: 64,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));
  }
}