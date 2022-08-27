import * as ex from 'excalibur';
import { Label } from 'excalibur';

export class Win extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
    engine.backgroundColor = ex.Color.White;

    this.add(new Label({
      text: "WIN",
      pos: ex.vec(500, 500),
      color: ex.Color.Black,
      font: new ex.Font({
        family: 'helvetica',
        size: 64,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));
  }
}
