import * as ex from 'excalibur';
import { Level } from './level';
import { ActorGraphic } from './ActorGraphic';
import { playerG } from './collision'
import { image_list, collider_list, IHash, IHash2 } from './resources'

// export interface IHash {
//   [details: string]: ex.Sprite;
// }
// 
// export interface IHash2 {
//   [details: string]: ex.Vector;
// }

// this has been moved to resources
// const img_width = 100;
// const img_height = 100;
// const col_width = 50;
// const col_height = 50;

// const wall_space = 75;//this was wall space for LR walls
const wall_space = 100;


// const points = [ex.vec(-col_width, -col_height), ex.vec(col_width, -col_height), ex.vec(col_width, col_height), ex.vec(-col_width, col_height)];
// const col_w = collider_list[];
// const points = [ex.vec(-col_width, -col_height), ex.vec(col_width, -col_height), ex.vec(col_width, col_height), ex.vec(-col_width, col_height)];
const offset = ex.vec(0, 0);

export class Wall extends ActorGraphic {
// export class Wall extends ex.Actor {
  level: Level
  type: keyof IHash

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    type: keyof IHash,
    // collisionType?: ex.CollisionType,
    // collisionGroup?: ex.CollisionGroup,
  }) {
    const col_w = collider_list[args.type].x;
    const col_h = collider_list[args.type].y;
    const points = [ex.vec(-col_w, -col_h), ex.vec(col_w, -col_h), ex.vec(col_w, col_h), ex.vec(-col_w, col_h)];

    super({
      ...args,
      name: 'wall',
      // points: points,
      // offset: offset,
      color: ex.Color.Black,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: playerG,
      
      // offset: offset,
      // color: ex.Color.Black,
      collider: new ex.PolygonCollider({ points: points, offset: offset }),
      
      // collisionGroup: args.collisionGroup || ghostG
    });
    this.level = args.level;
    this.type = args.type;

    // TMP: this is probably just for debugging
    // this.graphics.use(new ex.Polygon({
    //   points: this.points,
    //   color: args.color,
    // }));
    
    
    
  }

  onInitialize(_engine: ex.Engine): void {
    
    this.graphics.use(image_list[this.type]);
    
  }
  
  public static getSpacer() {
    return wall_space;
  }
  
}






