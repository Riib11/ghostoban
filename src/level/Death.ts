import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { Level } from '../level';
import { goToCurrentLevel } from '../levels';
import { ui } from '../ui';

export class Death extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
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

  onActivate(context: ex.SceneActivationContext<unknown>): void {
    super.onActivate(context);
    this.engine.backgroundColor = ex.Color.Black;

    const btn = document.createElement('button');
    btn.innerHTML = "restart level";
    btn.onclick = (e) => {
      location.reload();
      // e.preventDefault();
      // goToCurrentLevel(this.engine);
    }
    ui.appendChild(btn);
  }

  onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
    ui.innerHTML = '';
  }
}
