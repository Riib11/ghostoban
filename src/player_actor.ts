import * as ex from 'excalibur';
import { Color } from 'excalibur';

// const player_image = new ex.ImageSource('./res/TODO');
// const player_sprite = player_image.toSprite();

const speed = 150;
const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];
const radius = 50;

export class PlayerActor extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      name: 'Player',
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: new ex.PolygonCollider({ points, offset: new ex.Vector(-25, -25) })
      // collider: new ex.CircleCollider({ radius })
    });
  }

  public onInitialize(engine: ex.Engine) {
    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Red,
    }));
    // this.graphics.use(new ex.Circle({
    //   radius,
    //   color: Color.Red
    // }));
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    this.vel.setTo(0, 0);

    // Player input
    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.vel.x = -speed;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      this.vel.x = speed;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      this.vel.y = -speed;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      this.vel.y = speed;
    }
  }
}