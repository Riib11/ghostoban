import * as ex from 'excalibur';
import { Color } from 'excalibur';

const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];
const radius = 50;

export class GhostActor extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      name: 'Ghost',
      pos,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      // collider: new ex.PolygonCollider({ points })
      collider: new ex.CircleCollider({ radius })
    });
  }

  public onInitialize(engine: ex.Engine) {
    // this.graphics.use(new ex.Polygon({
    //   points,
    //   color: ex.Color.Blue
    // }));
    this.graphics.use(new ex.Circle({
      radius,
      color: Color.Blue
    }));
  }
}