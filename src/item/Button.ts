import * as ex from "excalibur";
import { Activatable } from "../component/Activatable";
import { Item } from "../item";
import { Level } from "../level";
import { images } from "../resources";

const points = [
  ex.vec(-25, -25),
  ex.vec(25, -25),
  ex.vec(25, 25),
  ex.vec(-25, 25),
];
const offset = ex.vec(0, 0);

export class Button extends Item {

  activatable: Activatable;
  graphic_on: ex.Graphic;
  graphic_off: ex.Graphic;

  constructor(args: {
    level: Level;
    pos: ex.Vector;
    key: ex.Input.Keys,
    isActivated: boolean,  // starts on or off
    onChangeActivated: (isActivated: boolean) => void,
    graphic_on?: ex.Graphic,
    graphic_off?: ex.Graphic,
  }) {
    super({
      ...args,
      name: 'Button',
      points,
      offset,
      collisionType: ex.CollisionType.Fixed,
    });

    this.graphic_on = args.graphic_on ?? images.button_on.toSprite();
    this.graphic_off = args.graphic_off ?? images.button_off.toSprite();
    this.graphics.add('isActivated', this.graphic_on);
    this.graphics.add('!isActivated', this.graphic_off);

    this.activatable = new Activatable({
      actor: this,
      points: this.points,
      key: args.key,
      onChangeActivated: (isActivated) => {
        this.graphics.use(isActivated ? 'isActivated' : '!isActivated');
        args.onChangeActivated(isActivated);
      },
      isActivated: args.isActivated,
    })
    this.addComponent(this.activatable);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    this.graphics.use(this.activatable.isActivated ? 'isActivated' : '!isActivated');
  }

}

