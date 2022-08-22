import * as ex from 'excalibur';

const speed = 100;
const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];

export class TelekenesisGhost extends ex.Actor {
  start_pos: ex.Vector;

  constructor(x: number, y: number) {
    super({
      name: 'TelekenesisGhost',
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: new ex.PolygonCollider({ points })
    });
    this.start_pos = new ex.Vector(x, y);

    this.vel.setTo(speed, 0);
  }

  public onInitialize(engine: ex.Engine) {
    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Blue
    }));
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    if (this.pos.x > this.start_pos.x + 200) {
      // go left
      this.vel.setTo(-speed, 0);
    } else if (this.pos.x < this.start_pos.x) {
      // go right
      this.vel.setTo(speed, 0);
    }
  }
}