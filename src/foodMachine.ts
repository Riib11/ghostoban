import { Actor, CollisionGroupManager, CollisionType, Color, Vector, Sprite, ImageSource, vec, Input, ParallelActions, ActionSequence, RepeatForever } from "excalibur";
import { Level } from "./level";
import { Item } from "./item";
import { Food } from "./item/Food";
import { spikes } from "./Spikes";
import { Activatable } from "./component/Activatable";
import { Spinner } from "./spinner";

// image to come here:
// const spikes = new ImageSource('./src/resources/spikes.png')
// spikes.load();

const col_width = 25;
const col_height = 25;
const img_width = 50;
const img_height = 50;

const points = [vec(-col_width, -col_height), vec(col_width, -col_height), vec(col_width, col_height), vec(-col_width, col_height)];
const offset = vec(0, 0);

export class FoodMachine extends Item {

  spinner: Spinner;
  foods: Set<Food>;

  constructor(args: {
    level: Level,
    pos: Vector,
    active: boolean
  }) {
    super({
      ...args,
      name: "food machine",
      color: Color.Transparent,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      collisionType: CollisionType.Fixed,
      points: points,
      offset: offset
    });
    this.foods = new Set();
    this.addComponent(new Activatable({
      actor: this,
      points: this.points,
      key: Input.Keys.E,
      isActivated: args.active,
      onChangeActivated: active => {
        if (active) {
          this.activate();
        } else {
          this.deactivate();
        }
      }
    }));
    this.spinner = new Spinner({ speed: 20 });
    this.addChild(this.spinner);

    if (args.active) {
      this.activate();
    }

    // this.on('collisionstart', e => {
    //   if (e.other === args.level.player) {
    //     args.level.killPlayer();
    //   }
    // });

  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    // this.graphics.use(new Sprite({
    //   image: spikes,
    //   destSize: {
    //     width: img_width,
    //     height: img_height,
    //   },
    // }));
  }

  activate() {
    this.actions.repeatForever(ctx => {
      ctx.delay(3500).callMethod(() => {
        let f :Food = new Food({
          level: this.level,
          pos: this.pos.add(vec(-25, 0))
        });
        this.foods.add(f);
        this.level.addItem(f);
      });
    });
    this.spinner.activate();
  }

  deactivate() {
    this.actions.clearActions();
    this.spinner.deactivate();
  }
  reset(): void {
    this.pos = this.pos_origin;
    this.activate();
    this.foods.forEach(f => {
      f.kill();
    });
    this.foods = new Set();
  }
}
