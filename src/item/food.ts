import { CollisionGroupManager, CollisionType, Shape, Vector } from "excalibur";
import { Item } from "../item";
import { Level } from "../level";

export class Food extends Item {

  // constructor(args: {
  //   level: Level,
  //   pos: Vector
  // }) {
  //   super({
  //     ...args,
  //     name: 'Food',
  //     collisionType: CollisionType.Passive,
  //     collisionGroup: CollisionGroupManager.groupByName('player'),
  //     collider: Shape.Box(50, 50)
  //   })
  // }

}
