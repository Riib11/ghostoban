import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { Button } from '../item/Button';
import { Level } from '../level';
import { images } from '../resources';

export class Main extends Level {
  constructor() {
    super({
      name: 'Ghostoban',
      player_pos: ex.vec(500, 500),
      exit_pos: ex.vec(950, 950)
    });
  }

  onInitialize(engine: ex.Engine): void {
    // this.add(new Label({
    //   text: "-- GHOSTOBAN --",
    //   pos: ex.vec(500, 500),
    //   color: ex.Color.Black,
    //   font: new ex.Font({
    //     family: 'helvetica',
    //     size: 86,
    //     unit: ex.FontUnit.Px,
    //     textAlign: ex.TextAlign.Center
    //   })
    // }));

    this.addItem(new Button({
      level: this,
      pos: ex.vec(100, 100),
      key: ex.Input.Keys.E,
      onChangeActivated: (isActivated) => this.exit.setActivated(isActivated),
      isActivated: false,
      graphic_on: images.button_on.toSprite(),
      graphic_off: images.button_off.toSprite()
    }))
  }
}
