import * as ex from 'excalibur';
import { ALLOW_LEVEL_SELECTION } from '../options';
import { ui } from '../ui';

export class LevelSelector extends ex.Scene {

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    if (ALLOW_LEVEL_SELECTION) {
      for (const [name, _] of Object.entries(this.engine.scenes)) {
        if (name == 'root') continue;
        const btn = document.createElement('button');
        btn.innerHTML = name;
        btn.className = 'button button--startLevel';
        btn.onclick = (e) => {
          e.preventDefault();
          this.engine.goToScene(name);
        }
        ui.appendChild(btn);
      }
    }
  }
}