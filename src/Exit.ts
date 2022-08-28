import { Actor, CollisionGroupManager, CollisionType, Color, Vector } from "excalibur";
import { ActorGraphic } from "./ActorGraphic";
import { Level } from "./level";

export class Exit extends Actor {

  activated: boolean;

  constructor(args: {
    level: Level,
    pos: Vector,
    activated?: boolean
  }) {
    super({
      ...args,
      radius: 50,
      color: Color.White,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      collisionType: CollisionType.Passive,
      z: 10000
    });

    this.activated = args.activated ?? false;
    this.updateColor();

    this.on('collisionstart', e => {
      if (this.activated && e.other === args.level.player) {
        args.level.win();
      }
    });
  }

  setActivated(activated: boolean) {
    this.activated = activated;
    this.updateColor();
  }

  private updateColor() {
    this.color = this.activated ? Color.Green : Color.LightGray;
  }

}
