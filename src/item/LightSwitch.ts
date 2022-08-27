import * as ex from 'excalibur';
import { Activatable } from '../component/Activatable';
import { Item } from '../item';
import { Level } from '../level';

const points = [ex.vec(-25, -25), ex.vec(25, -25), ex.vec(25, 25), ex.vec(-25, 25)];
const offset = ex.vec(0, 0);

export class LightSwitch extends Item {

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    isActivated: boolean // starts on or off
  }) {
    super({
      ...args,
      points,
      offset,
      collisionType: ex.CollisionType.Fixed,
      color: computeColor(args.isActivated)
    });

    this.addComponent(new Activatable({
      actor: this,
      points: this.points,
      key: ex.Input.Keys.E,
      onChangeActivated: (isActivated) => {
        this.level.setLit(isActivated);
        this.color = computeColor(isActivated);
      },
      isActivated: args.isActivated
    }))
  }

}

function computeColor(isActivated: boolean): ex.Color {
  return isActivated ? ex.Color.Yellow : ex.Color.Black;
}