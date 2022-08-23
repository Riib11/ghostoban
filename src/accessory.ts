import * as ex from 'excalibur';

// const player_image = new ex.ImageSource('./res/TODO');
// const player_sprite = player_image.toSprite();

const acc_shape = new ex.Polygon({
  points: [ex.vec(0, 0), ex.vec(10, 0), ex.vec(10, 20), ex.vec(0, 20)],
  color: ex.Color.Green
})
const lamp = new ex.ImageSource('./src/resources/lamp.png')
const lamp_on = new ex.ImageSource('./src/resources/lamp.png')
lamp.load();
lamp_on.load();
const sprite = lamp.toSprite()


export class Accessory extends ex.Actor {
  animation_state: number;
  constructor(x: number, y: number) {
    super({
      name: 'Accessor',
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("accessory"),
      // collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3))
    });
    this.animation_state = 0;
  }

  public onInitialize(engine: ex.Engine) {
    this.graphics.use(sprite)
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    this.vel.setTo(0, 0);
    
    if(engine.input.keyboard.isHeld(ex.Input.Keys.E)) {
      alert("hi")
      // sprite = lamp_on.toSprite()
      this.graphics.use(lamp_on.toSprite())
      
    }
    
    const rotateAroundBackAndForth = new ex.ActionSequence(this, ctx => {
      ctx.rotateTo(Math.PI/8, Math.PI*2, ex.RotationType.Clockwise);
      // ctx.delay(100);
      ctx.rotateTo(-Math.PI/8, Math.PI*2, ex.RotationType.CounterClockwise);
      // ctx.delay(100);
      ctx.rotateTo(0, Math.PI*2, ex.RotationType.Clockwise);
    });
    
    const ascend = new ex.ActionSequence(this, ctx => {
      ctx.moveBy(0, -5, 30);
    });
    const descend = new ex.ActionSequence(this, ctx => {
      ctx.moveBy(0, 5, 30);
    });
    
    if (this.animation_state == 0) {
      if(engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
        this.animation_state = -1;
        this.actions.runAction(ascend).callMethod(() => {
          this.animation_state = 1;
        });
      }
    } else if (this.animation_state == 1) {
      if(engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
        this.animation_state = -1;
        this.actions.runAction(rotateAroundBackAndForth).callMethod(() => {
          this.animation_state = 1;
        });
      } else {
        this.animation_state = -1;
        this.actions.runAction(descend).callMethod(() => {
          this.animation_state = 0;
        });
      }
    }
    
    
  }
  
}




