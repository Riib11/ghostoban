import * as ex from 'excalibur';
import { Ghost } from '../ghost';
import { ElectricalItem } from '../item/ElectricalItem';
import { Level } from '../level';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

export class ElectricityGhost2 extends Ghost {

  constructor(args: {
    level: Level,
    pos: ex.Vector,
    speed: number,
  }) {
    super({
      ...args,
      name: 'ElectricityGhost2',
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      points,
      offset,
      color: ex.Color.Yellow
    });
  }

}