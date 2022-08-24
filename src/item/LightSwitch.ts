import * as ex from 'excalibur';
import { Level } from '../level';
import { ActivatableItem } from './ActivatableItem';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

export class LightSwitch extends ActivatableItem {
  isOn: boolean;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    isOn: boolean,
  }) {
    super({
      ...args,
      points,
      offset,
      color: ex.Color.Blue
    });
    this.isOn = args.isOn;
  }

  activate() {
    this.isOn = !this.isOn;
    this.level.setLit(this.isOn);
  }

  setActivatable() {
    this.color = ex.Color.Yellow;
  }

  setNotActivatable() {
    this.color = ex.Color.Blue;
  }

}
