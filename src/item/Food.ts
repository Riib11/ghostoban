import { CollisionGroupManager, CollisionType, Color, vec, Vector } from "excalibur";
import { Damageable } from "../Damageable";
import { Item } from "../item";
import { Level } from "../level";
import { foodImages } from "../resources";
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
      collisionGroup: CollisionGroupManager.groupByName('player')
    });
    this.set_z_offset(1000);
    foodImages.forEach((img, i) => {
      this.graphics.add(i.toString(), img.toSprite());
    });
    this.graphics.use((foodImages.length - 1).toString());
  }

  onDamage(amount: number) {
    this.weight -= amount / 20;
    if (this.weight >= 1) {
      this.graphics.use((this.weight - 1).toString());
    }
  }

  onDie() {
    this.level.removeItem(this);
  }

}
