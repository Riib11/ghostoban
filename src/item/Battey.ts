import * as ex from 'excalibur';
import { Activatable } from '../component/Activatable';
import { Level } from '../level';
import { ElectricalItem } from './ElectricalItem';

const points = [ex.vec(0, 20), ex.vec(20, 0), ex.vec(0, -20), ex.vec(-20, 0)];
const offset = ex.vec(0, 0);

export class Battery extends ElectricalItem {

  activatable: Activatable;

  constructor(args: {
    level: Level,
    pos: ex.Vector,
    key: ex.Input.Keys,
    charged: boolean,
  }) {
    super({
      ...args,
      name: 'Battery',
      points,
      offset,
    })

    this.activatable = new Activatable({
      actor: this,
      points: this.points,
      key: args.key,
      onChangeActivated: (isActivated) => {
        super.setCharged(!this.charged)
      },
      isActivated: args.charged,
    })
    this.addComponent(this.activatable);
  }
}