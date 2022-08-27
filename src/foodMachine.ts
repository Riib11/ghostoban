import { Actor, CollisionGroupManager, CollisionType, Color, Vector, Sprite, ImageSource, vec } from "excalibur";
import { Level } from "./level";
import { Item } from "./item";
import { Food } from "./item/Food";

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
  foodCount: number;
  foods: Set<Food>;
  /*
   * if foodCount is -1, it means this is infinite food machine.
   * it spawns food with infinite health. If there already is an infinite food,
   * it does not spawn.
   *
   * if foodCount is above 0, it spawns exactly that number of food when activated.
   * if activated again while some foods spawned from this machine exists,
   * it deletes those associated food. (resets all previous foods)
   */
  
  
  constructor(args: {
    level: Level,
    pos: Vector,
    foodCount: number,
  }) {
    super({
      ...args,
      name: "food machine",
      color: Color.Black,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      collisionType: CollisionType.Fixed,
      points: points,
      offset: offset,
    });
    this.foodCount: args.foodCount,
    this.foods = new Set();
    
    // this.on('collisionstart', e => {
    //   if (e.other === args.level.player) {
    //     args.level.killPlayer();
    //   }
    // });
    
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
  

}
