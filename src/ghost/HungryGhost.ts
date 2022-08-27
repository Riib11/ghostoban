import { CollisionGroupManager, CollisionType, Color, vec, Vector } from "excalibur";
import { Ghost } from "../ghost";
import { Food } from "../item/Food";
import { Level } from "../level";
import { Player } from "../player";
import { Weighted } from "../Weighted";

export class HungryGhost extends Ghost implements Weighted {

  weight = 0;
  target: Food | Player | undefined;

  constructor(args: {
    level: Level,
    pos: Vector,
    speed: number
  }) {
    super({
      ...args,
      name: 'HungryGhost',
      collisionType: CollisionType.Passive,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      points: [vec(-50, -50), vec(50, -50), vec(50, 50), vec(-50, 50)],
      offset: Vector.Zero,
      color: Color.Orange
    });
  }

  onPreUpdate() {
    const foods = [...this.level.items]
      .filter((item): item is Food => item instanceof Food);
    const target = foods.length > 0
      ? foods.reduce((acc, food) =>
          this.pos.distance(acc.pos) < this.pos.distance(food.pos)
            ? acc : food)
      : this.level.player;
    if (this.target !== target || this.actions.getQueue().isComplete()) {
      this.actions.clearActions();
      this.target = target;
      this.actions.meet(target, this.speed).delay(500)
        .callMethod(() => {
          this.level.damage(target, 20);
          this.weight++;
        });
    }
  }

}
