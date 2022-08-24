import * as ex from 'excalibur';
import { Color } from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';

export abstract class ActivatableItem extends Item {

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    color: ex.Color,
    points: ex.Vector[],
    offset: ex.Vector,
  }) {
    super({
      ...args,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
    });
  }

  abstract activate(): void;

  setActivatable() {}
  setNotActivatable() {}

}
