import { CollisionGroupManager, CollisionType, Color, vec, Vector } from "excalibur";
import { Item } from "../item";
import { Level } from "../level";
import { isWeighted } from "../Weighted";

export class PressurePlate extends Item {

  constructor(args: {
    level: Level,
    pos: Vector,
    activationWeight: number,
    onActivate: () => void
  }) {
    super({
      ...args,
      name: 'PressurePlate',
      points: [vec(0, -70), vec(40, -40), vec(70, 0), vec(40, 40),
        vec(0, 70), vec(-40, 40), vec(-70, 0), vec(-40, -40)],
      collisionType: CollisionType.Passive,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      offset: Vector.Zero,
      color: Color.Violet
    });

    this.on('collisionstart', e => {
      if (isWeighted(e.other) && e.other.weight >= args.activationWeight) {
        args.onActivate();
      }
    });
  }

}
