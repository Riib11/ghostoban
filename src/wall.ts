import * as ex from 'excalibur';
import { Level } from './level';
import { ActorGraphic } from './ActorGraphic';
import { playerG } from './collision'

const width = 50;
const height = 50;

const points = [ex.vec(-width, -height), ex.vec(width, -height), ex.vec(width, height), ex.vec(-width, height)];
const offset = ex.vec(0, 0);

const wall = new ex.ImageSource('./src/resources/wall.png')
const wallLR = new ex.ImageSource('./src/resources/wallLR.png')
const wallL = new ex.ImageSource('./src/resources/wallL.png')
const wallR = new ex.ImageSource('./src/resources/wallR.png')
wall.load();
wallLR.load();
wallL.load();
wallR.load();

export class Wall extends ActorGraphic {
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
    let img = wall;
    if (this.type == "") {
      img = wall;
    } else if (this.type == "LR") {
      img = wallLR;
    } else if (this.type == "L") {
      img = wallL;
    } else if (this.type == "R") {
      img = wallR;
    }
    
    this.graphics.use( new ex.Sprite({
      image: img,
      destSize: {
        width: 100,
        height: 100,
      },
    }));
  }

}






