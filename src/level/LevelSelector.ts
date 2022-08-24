import * as ex from 'excalibur';
import { Level } from '../level';
import { ui } from '../ui';
import { Henry1 } from './Henry1';

export class LevelSelector extends ex.Scene {

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    ui.classList.add('LevelSelector')
    for (const [name, _] of Object.entries(this.engine.scenes)) {
      if (name == 'root') continue;
      const btn = document.createElement('button');
      btn.innerHTML = name;
      btn.className = 'button button--startLevel';
      btn.onclick = (e) => {
        e.preventDefault();
        this.engine.currentScene.clear();
        this.engine.goToScene(name);
      }
      ui.appendChild(btn);
    }
  }

  onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
    ui.classList.remove('LevelSelector');
    ui.innerHTML = '';
  }
}