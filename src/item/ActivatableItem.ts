import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';
import { Player } from '../player';

export class ActivatableItem extends Item {
  active: boolean;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    color: ex.Color,
    points: ex.Vector[],
    offset: ex.Vector,
    active: boolean,
  }) {
    super({
      ...args,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
    });
    this.active = args.active;
  }

  setActive(active: boolean) {
    this.active = active;
  }
}
