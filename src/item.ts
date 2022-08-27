import * as ex from "excalibur";
import { Level } from "./level";
import { itemG } from "./collision";
import { ActorGraphic } from "./ActorGraphic";

export class Item extends ActorGraphic {
  level: Level;
  points: ex.Vector[];

  constructor(args: {
    level: Level;
    name: string;
    pos: ex.Vector;
    points: ex.Vector[];
    collisionType: ex.CollisionType;
    collisionGroup?: ex.CollisionGroup;
    offset: ex.Vector;
    color?: ex.Color;
  }) {
    super({
      ...args,
      collider: new ex.PolygonCollider({
        points: args.points,
        offset: args.offset,
      }),
      collisionGroup: args.collisionGroup || itemG,
    });
    this.level = args.level;
    this.points = args.points;
  }

  onInitialize(_engine: ex.Engine): void {
    const color = this.color;
    if (color !== undefined) {
      // TMP: this is probably just for debugging
      this.graphics.use(
        new ex.Polygon({
          points: this.points,
          color: this.color,
        })
      );
    }
  }
}
