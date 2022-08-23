import * as ex from 'excalibur';
import { Level } from '../level';
import { ElectricalItem } from './ElectricalItem';

const points = [ex.vec(0, 20), ex.vec(20, 0), ex.vec(0, -20), ex.vec(-20, 0)];
const offset = ex.vec(0, 0);

export class Battery extends ElectricalItem {
  constructor(args: {
    level: Level,
    pos: ex.Vector,
    charged: boolean,
  }) {
    super({
      ...args,
      name: 'Battery',
      points,
      offset,
    })
  }
}