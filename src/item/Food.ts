import { CollisionGroupManager, CollisionType, Color, vec, Vector } from "excalibur";
import { Damageable } from "../Damageable";
import { Item } from "../item";
import { Level } from "../level";

export class Food extends Item implements Damageable {

  health = 100;

  constructor(args: {
    level: Level,
    pos: Vector
  }) {
    super({
      ...args,
      name: 'Food',
      points: [vec(-20, -20), vec(20, -20), vec(20, 20), vec(-20, 20)],
      offset: Vector.Zero,
      collisionType: CollisionType.Active,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      color: Color.Magenta
    });
  }

  onDamage(amount: number) {
    this.color = this.color.lighten(amount / 100);
  }

  onDie() {
    this.level.items.delete(this);
  }

}
