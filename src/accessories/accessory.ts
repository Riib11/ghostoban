import * as ex from 'excalibur';
import { Level } from '../level';
import { Player } from '../player';
import { Ghost } from '../ghost';
import { Item } from '../item'
import { accessoryG } from '../collision'

export interface IHash {
  [details: string]: ex.Sprite;
}


const points = [ex.vec(-25, -25), ex.vec(25, -25), ex.vec(25, 25), ex.vec(-25, 25)];
const offset = ex.vec(0, 0);

const DETECT_RADIUS = 200;

export class Accessory extends Item {
  animation_state: number;
  image_name: string;
  is_float: boolean;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    // points: ex.Vector[],
    // offset: ex.Vector,
    image_name: string,
  }) {
    super({
      ...args,
      points: points,
      offset: offset,
      color: ex.Color.Black,
      collisionType: ex.CollisionType.Active,
      collisionGroup: accessoryG,
      // color: chargedColor(args.charged)
    });

    this.image_name = args.image_name;
    this.animation_state = 0;
    this.is_float = false;

    // this.on('precollision', (evt: ex.PreCollisionEvent) => {
    //   let other = evt.other;
    //   if (other instanceof Ghost) {
    //     this.is_float = true;
    //   }
    // 
    // });

    // this.on('collisionend', (evt: ex.CollisionEndEvent) => {
    //   let other = evt.other;
    //   if (other instanceof Ghost) {
    //     this.is_float = false;
    //   }
    // });

  }//constructer

  public changeSprite(image_name: string) {
    this.graphics.use(image_list[image_name]);
  }

  public onInitialize(engine: ex.Engine) {
    // this.graphics.use(sprite)
    this.changeSprite(this.image_name);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    super.onPreUpdate(engine, delta);
    this.vel.setTo(0, 0);
    
    if (engine.input.keyboard.isHeld(ex.Input.Keys.E)) {
      alert(this.z)
      alert(this.level.player.z)
      // alert(image_list["t"])
      // this.graphics.use(img_lamp_on.toSprite())
    }

    this.is_float = false;
    this.level.ghosts.forEach(g => {
      if (Level.getDistance(this.pos, g.pos) <= DETECT_RADIUS) {
        this.is_float = true;
      }
    });
    
    this.floatAnimation();
    // this.setZIndex(this.pos.y);
  }

  public floatAnimation() {
    // this.is_float = false;
    const rotateAroundBackAndForth = new ex.ActionSequence(this, ctx => {
      ctx.rotateTo(Math.PI / 8, Math.PI * 1, ex.RotationType.Clockwise);
      // ctx.delay(100);
      ctx.rotateTo(-Math.PI / 8, Math.PI * 1, ex.RotationType.CounterClockwise);
      // ctx.delay(100);
      ctx.rotateTo(0, Math.PI * 2, ex.RotationType.Clockwise);
    });

    const ascend = new ex.ActionSequence(this, ctx => {
      ctx.moveBy(0, -5, 30);
    });
    const descend = new ex.ActionSequence(this, ctx => {
      ctx.moveBy(0, 5, 30);
    });


    if (this.animation_state == 0) {
      if (this.is_float) {
        this.animation_state = -1;
        this.actions.runAction(ascend).callMethod(() => {
          this.animation_state = 1;
        });
      }
    } else if (this.animation_state == 1) {
      if (this.is_float) {
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



