import * as ex from 'excalibur';
import { Level } from '../level';
import { Player } from '../player';
import { Ghost } from '../ghost';
import { ElectricityGhost1 } from '../ghost/ElectricityGhost1';
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
  range: number;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    // points: ex.Vector[],
    // offset: ex.Vector,
    collisionGroup?: ex.CollisionGroup,
    image_name: string,
    range?: number
  }) {
    super({
      ...args,
      points: points,
      offset: offset,
      color: ex.Color.Black,
      collisionType: ex.CollisionType.Active,
      collisionGroup: args.collisionGroup ?? accessoryG,
      // color: chargedColor(args.charged)
    });

    this.image_name = args.image_name;
    this.animation_state = 0;
    this.is_float = false;
    this.range = args.range ?? 200;

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

    this.is_float = false;
    this.level.ghosts.forEach(g => {
      if (Level.getDistance(this.pos, g.pos) <= this.range) {
        this.is_float = true;
      }
    });

    this.floatAnimation();
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


export class ElectricalAccessory extends Accessory {
  animation_state_electric: number;
  is_on: boolean;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    // points: ex.Vector[],
    // offset: ex.Vector,
    collisionGroup?: ex.CollisionGroup,
    image_name: string,
  }) {
    super({
      ...args
    });

    this.animation_state_electric = 0;
    this.is_on = false;
  }//constructer

  public changeSprite(image_name: string) {
    super.changeSprite(image_name);
    const flicker = new ex.Animation({
      frames: [
        {
          graphic: image_list[this.image_name + "_on"],
          duration: 200,
        },
        {
          graphic: image_list[this.image_name],
          duration: 600,
        },
        {
          graphic: image_list[this.image_name + "_on"],
          duration: 100,
        },
        {
          graphic: image_list[this.image_name],
          duration: 300,
        },
        {
          graphic: image_list[this.image_name + "_on"],
          duration: 100,
        },
        {
          graphic: image_list[this.image_name],
          duration: 300,
        },
      ],
    });//animation
    this.graphics.add("flicker", flicker);
  }

  // public onInitialize(engine: ex.Engine) {
  //   super.onInitialize(engine);
  //   this.changeSprite(this.image_name);
  // }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // reset vel.x
    super.onPreUpdate(engine, delta);

    this.is_on = false;
    this.level.ghosts.forEach(g => {
      if (g instanceof ElectricityGhost1 && Level.getDistance(this.pos, g.pos) <= this.range) {
        this.is_on = true;
      }
    });

    this.flickerAnimation();
  }

  flickerAnimation() {
    if (this.is_on) {
      this.graphics.use("flicker");
    } else {
      this.graphics.use(image_list[this.image_name]);
    }
  }
}





const img_lamp = new ex.ImageSource('./src/resources/lamp.png')
const img_lamp_on = new ex.ImageSource('./src/resources/lamp_on.png')
img_lamp.load();
img_lamp_on.load();

const test = new ex.ImageSource('./src/resources/left.gif')
test.load();

const image_list: IHash = {
  "lamp": new ex.Sprite({
    image: img_lamp,
    destSize: {
      width: 50,
      height: 40,
    },
  }),
  "lamp_on": new ex.Sprite({
    image: img_lamp_on,
    destSize: {
      width: 50,
      height: 40,
    },
  }),

}



