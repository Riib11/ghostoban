import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { goToCurrentLevel, incrementProgress } from '../levels';
import { ui } from '../ui';

export class Win extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
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

  onActivate(context: ex.SceneActivationContext<unknown>): void {
    super.onActivate(context);
    this.engine.backgroundColor = ex.Color.White;

    const btn_progress = document.createElement('button');
    btn_progress.innerHTML = "go to next level";
    btn_progress.onclick = (e) => {
      e.preventDefault();
      incrementProgress();
      goToCurrentLevel(this.engine);
    }
    ui.appendChild(btn_progress);

    const btn_reset = document.createElement('button');
    btn_reset.innerHTML = "restart level";
    btn_reset.onclick = (e) => {
      e.preventDefault();
      goToCurrentLevel(this.engine);
    }
    ui.appendChild(btn_reset);
  }

  onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
    ui.innerHTML = '';
  }
}
