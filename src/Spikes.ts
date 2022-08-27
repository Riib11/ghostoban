import { Actor, CollisionGroupManager, CollisionType, Color, Vector, Sprite, ImageSource, vec } from "excalibur";
import { Level } from "./level";
import { Item } from "./item";

const spikes = new ImageSource('./src/resources/spikes.png')
spikes.load();

const col_width = 25;
const col_height = 25;
const img_width = 50;
const img_height = 50;

const spikes_space = 50;

const points = [vec(-col_width, -col_height), vec(col_width, -col_height), vec(col_width, col_height), vec(-col_width, col_height)];
const offset = vec(0, 0);

export class Spikes extends Item {

  constructor(args: {
    level: Level,
    pos: Vector,
  }) {
    super({
      ...args,
      name: "spikes",
      color: Color.Black,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      collisionType: CollisionType.Passive,
      points: points,
      offset: offset,
    });
    this.on('collisionstart', e => {
      if (e.other === args.level.player) {
        args.level.killPlayer();
      }
    });
    
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(new Sprite({
      image: spikes,
      destSize: {
        width: img_width,
        height: img_height,
      },
    }));
  }
  
  public static getSpacer() {
    return spikes_space;
  }

}
