import * as ex from 'excalibur';
import { Level } from '../level';
import { ActivatableItem } from './ActivatableItem';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

export class LightSwitch extends ActivatableItem {
  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    active: boolean,
  }) {
    super({
      ...args,
      points,
      offset,
      color: ex.Color.Blue
    })
  }

  setActive(active: boolean): void {
    super.setActive(active);
    this.level.setLit(active);
  }
}