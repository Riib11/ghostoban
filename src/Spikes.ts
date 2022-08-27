import { Actor, CollisionGroupManager, CollisionType, Color, Vector } from "excalibur";
import { Level } from "./level";

export class Spikes extends Actor {

  constructor(args: {
    level: Level,
    pos: Vector,
    width: number,
    height: number
  }) {
    super({
      ...args,
      color: Color.Black,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      collisionType: CollisionType.Passive
    });
    this.on('collisionstart', e => {
      if (e.other === args.level.player) {
        args.level.killPlayer();
      }
    });
  }

}
