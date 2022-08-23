import * as ex from 'excalibur';
import { Level } from '../level';
import { Player } from '../player';
import { Ghost } from '../ghost';

export interface IHash {
  [details: string] : ex.Sprite;
}

const DETECT_RADIUS = 200;

export class Accessory extends ex.Actor {
  animation_state: number;
  image_name: string;
  is_float: boolean;
  constructor(x: number, y: number, image_name: string) {
    super({
      name: 'Accessor',
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      // collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3))
      radius: DETECT_RADIUS,
    });
    this.image_name = image_name;
    this.animation_state = 0;
    this.is_float = false;
    
    this.on('precollision', (evt: ex.PreCollisionEvent) => {
      let other = evt.other;
      if (other instanceof Ghost) {
        this.is_float = true;
      }
    });
    
    this.on('collisionend', (evt: ex.CollisionEndEvent) => {
      let other = evt.other;
      if (other instanceof Ghost) {
        this.is_float = false;
      }
    });
    
  }

  public changeSprite(image_name: string) {
    this.graphics.use( image_list[image_name] );
  }

  public onInitialize(engine: ex.Engine) {
    // this.graphics.use(sprite)
    this.changeSprite(this.image_name);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    this.vel.setTo(0, 0);
    
    if(engine.input.keyboard.isHeld(ex.Input.Keys.E)) {
      // alert(tester.a)
      // alert(image_list["t"])
      // this.graphics.use(img_lamp_on.toSprite())
    }
    this.floatAnimation();
  }
  
  public floatAnimation() {
    // this.is_float = false;
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
      if(this.is_float) {
        this.animation_state = -1;
        this.actions.runAction(ascend).callMethod(() => {
          this.animation_state = 1;
        });
      }
    } else if (this.animation_state == 1) {
      if(this.is_float) {
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
    
  }//floatAnimation
  
  
}





const img_lamp = new ex.ImageSource('./src/resources/lamp.png')
const img_lamp_on = new ex.ImageSource('./src/resources/lamp_on.png')
img_lamp.load();
img_lamp_on.load();

const image_list: IHash = {
  "lamp": new ex.Sprite({
    image: img_lamp,
    destSize: {
      width: 200,
      height: 200,
    },
  }),

}



