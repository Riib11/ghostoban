import * as ex from 'excalibur';

// const player_image = new ex.ImageSource('./res/TODO');
// const player_sprite = player_image.toSprite();

const player_shape = new ex.Polygon({
  points: [ex.vec(0, 0), ex.vec(10, 0), ex.vec(10, 10), ex.vec(0, 10)],
  color: ex.Color.Red
})

export class Player extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      name: 'Playe',
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      // collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3))
    });
  }

  public onInitialize(engine: ex.Engine) {
    this.graphics.use(player_shape);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    this.vel.setTo(0, 0);

    // Player input
    if(engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.vel.x = -150;
    } else 
    if(engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
        this.vel.x = 150;
    }
    
    if(engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
        this.vel.y = -150;
    } else
    if(engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
        this.vel.y = 150;
    }
  }
}