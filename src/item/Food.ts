import { CollisionGroupManager, CollisionType, Color, vec, Vector } from "excalibur";
import { Damageable } from "../Damageable";
import { Item } from "../item";
import { Level } from "../level";
import { Weighted } from "../Weighted";

export class Food extends Item implements Damageable, Weighted {

  health = 100;
  weight = 5;

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
    this.set_z_offset(1000);
  }

  onDamage(amount: number) {
    this.weight -= amount / 20;
    this.color = this.color.lighten(amount / 100);
  }

  onDie() {
    this.level.removeItem(this);
  }

}
