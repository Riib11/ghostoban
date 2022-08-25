import * as ex from 'excalibur';
import { Level } from './level';
import { ActorGraphic } from './ActorGraphic';
import { playerG } from './collision'

export interface IHash {
  [details: string]: ex.Sprite;
}

export interface IHash2 {
  [details: string]: ex.Vector;
}

const img_width = 100;
const img_height = 100;
const col_width = 50;
const col_height = 50;

// const points = [ex.vec(-col_width, -col_height), ex.vec(col_width, -col_height), ex.vec(col_width, col_height), ex.vec(-col_width, col_height)];
// const col_w = collider_list[];
// const points = [ex.vec(-col_width, -col_height), ex.vec(col_width, -col_height), ex.vec(col_width, col_height), ex.vec(-col_width, col_height)];
const offset = ex.vec(0, 0);

// export class Wall extends ActorGraphic {
export class Wall extends ex.Actor {
  level: Level
  type: string

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    type: string,
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
    // let img = wall;
    // if (this.type == "") {
    //   img = wall;
    // } else if (this.type == "LR") {
    //   img = wallLR;
    // } else if (this.type == "L") {
    //   img = wallL;
    // } else if (this.type == "R") {
    //   img = wallR;
    // }
    
    this.graphics.use(image_list[this.type]);
    
    // this.graphics.use( new ex.Sprite({
    //   image: img,
    //   destSize: {
    //     width: 100,
    //     height: 100,
    //   },
    // }));
  }

}



const wall = new ex.ImageSource('./src/resources/wall.png')
const wallLR = new ex.ImageSource('./src/resources/wallLR.png')
const wallL = new ex.ImageSource('./src/resources/wallL.png')
const wallR = new ex.ImageSource('./src/resources/wallR.png')

const dark_table_1 = new ex.ImageSource('./src/resources/dark_table_1.png')

wall.load();
wallLR.load();
wallL.load();
wallR.load();

dark_table_1.load();


const image_list: IHash = {
  "": new ex.Sprite({
    image: wall,
    destSize: {
      width: img_width,
      height: img_height,
    },
  }),
  "LR": new ex.Sprite({
    image: wallLR,
    destSize: {
      width: img_width,
      height: img_height,
    },
  }),
  "L": new ex.Sprite({
    image: wallL,
    destSize: {
      width: img_width,
      height: img_height,
    },
  }),
  "R": new ex.Sprite({
    image: wallR,
    destSize: {
      width: img_width,
      height: img_height,
    },
  }),
  
  "dark_table_1": new ex.Sprite({
    image: dark_table_1,
    destSize: {
      width: 100,
      height: 100,
    },
  }),

}

const collider_list: IHash2 = {
  "": ex.vec(col_width, col_height),
  "LR": ex.vec(col_width, col_height),
  "L": ex.vec(col_width, col_height),
  "R": ex.vec(col_width, col_height),
  
  "dark_table_1": ex.vec(50, 50),
}


