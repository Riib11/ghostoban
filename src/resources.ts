import * as ex from 'excalibur';
import { ImageSource } from 'excalibur';
import { Wall } from './wall';

export const foodImages = [0, 1, 2, 3, 4].map(i =>
  new ImageSource(`./src/resources/food/food${i}.png`));

export const images = {
  chair: new ImageSource('./src/resources/chair.png'),
  floor: new ImageSource('./src/resources/floor.png'),
  barrel: new ImageSource('./src/resources/barrel.png'),
  button_on: new ImageSource('./src/resources/button_on.png'),
  button_off: new ImageSource('./src/resources/button_off.png'),
}

// make sure to put all the ImageSources here
export const loader = new ex.Loader(Object.values(images).concat(foodImages));



export interface IHash {
  [details: string]: ex.Sprite;
}

export interface IHash2 {
  [details: string]: ex.Vector;
}


const img_width_wall = 100;
const img_height_wall = 100;
const col_width_wall = 50;
const col_height_wall = 50;

const wall = new ex.ImageSource('./src/resources/wall.png')
const wallLR = new ex.ImageSource('./src/resources/wallLR.png')
const wallL = new ex.ImageSource('./src/resources/wallL.png')
const wallR = new ex.ImageSource('./src/resources/wallR.png')

const wallN = new ex.ImageSource('./src/resources/wallN.png')
const wallVN = new ex.ImageSource('./src/resources/wallVN.png')

const dark_table_1 = new ex.ImageSource('./src/resources/dark_table_1.png')
const bed_red = new ex.ImageSource('./src/resources/bed_red.png')
const bookshelf = new ex.ImageSource('./src/resources/bookshelf.png')
const bookshelf_empty = new ex.ImageSource('./src/resources/bookshelf_empty.png')
const chair_blue = new ex.ImageSource('./src/resources/chair_blue.png')
const chair_red = new ex.ImageSource('./src/resources/chair_red.png')
const drawer = new ex.ImageSource('./src/resources/drawer.png')
const plant_1 = new ex.ImageSource('./src/resources/plant_1.png')
const plant_2 = new ex.ImageSource('./src/resources/plant_2.png')
const plant_3 = new ex.ImageSource('./src/resources/plant_3.png')
const plant_4 = new ex.ImageSource('./src/resources/plant_4.png')
const plant_5 = new ex.ImageSource('./src/resources/plant_5.png')
const plant_6 = new ex.ImageSource('./src/resources/plant_6.png')
const television_old = new ex.ImageSource('./src/resources/television_old.png')
const lamp = new ex.ImageSource('./src/resources/lamp.png')
const lamp_on = new ex.ImageSource('./src/resources/lamp_on.png')
const lamp_tall = new ex.ImageSource('./src/resources/lamp_tall.png')
const counter_white = new ex.ImageSource('./src/resources/counter_white.png')
const fridge = new ex.ImageSource('./src/resources/fridge.png')
const burner = new ex.ImageSource('./src/resources/burner.png')

wall.load();
wallLR.load();
wallL.load();
wallR.load();

wallN.load();
wallVN.load();

dark_table_1.load();
bed_red.load();
bookshelf.load();
bookshelf_empty.load();
chair_blue.load();
chair_red.load();
drawer.load();
plant_1.load();
plant_2.load();
plant_3.load();
plant_4.load();
plant_5.load();
plant_6.load();
television_old.load();
lamp.load();
lamp_on.load()
lamp_tall.load();
counter_white.load();
fridge.load();
burner.load();

export const image_list_non_walls: IHash = {
  "dark_table_1": new ex.Sprite({
    image: dark_table_1,
    destSize: {
      width: 100,
      height: 100,
    },
  }),
  "bed_red": new ex.Sprite({
    image: bed_red,
    destSize: {
      width: 75,
      height: 100,
    },
  }),
  "bookshelf": new ex.Sprite({
    image: bookshelf,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
  "bookshelf_empty": new ex.Sprite({
    image: bookshelf_empty,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
  "chair_blue": new ex.Sprite({
    image: chair_blue,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
  "chair_red": new ex.Sprite({
    image: chair_red,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
  "drawer": new ex.Sprite({
    image: drawer,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
  "plant_1": new ex.Sprite({
    image: plant_1,
    destSize: {
      width: 30,
      height: 30,
    },
  }),
  "plant_2": new ex.Sprite({
    image: plant_2,
    destSize: {
      width: 30,
      height: 30,
    },
  }),
  "plant_3": new ex.Sprite({
    image: plant_3,
    destSize: {
      width: 30,
      height: 30,
    },
  }),
  "plant_4": new ex.Sprite({
    image: plant_4,
    destSize: {
      width: 50,
      height: 100,
    },
  }),
  "plant_5": new ex.Sprite({
    image: plant_5,
    destSize: {
      width: 50,
      height: 50,
    },
  }),
  "plant_6": new ex.Sprite({
    image: plant_6,
    destSize: {
      width: 50,
      height: 50,
    },
  }),
  "television_old": new ex.Sprite({
    image: television_old,
    destSize: {
      width: 100,
      height: 100,
    },
  }),
  "lamp": new ex.Sprite({
    image: lamp,
    destSize: {
      width: 50,
      height: 45,
    },
  }),
  "lamp_on": new ex.Sprite({
    image: lamp_on,
    destSize: {
      width: 50,
      height: 45,
    },
  }),
  "lamp_tall": new ex.Sprite({
    image: lamp_tall,
    destSize: {
      width: 50,
      height: 100,
    },
  }),
  "counter_white": new ex.Sprite({
    image: counter_white,
    destSize: {
      width: 125,
      height: 75,
    },
  }),
  "fridge": new ex.Sprite({
    image: fridge,
    destSize: {
      width: 75,
      height: 125,
    },
  }),
  "burner": new ex.Sprite({
    image: burner,
    destSize: {
      width: 75,
      height: 75,
    },
  }),
}

export const image_list: IHash = {
  "": new ex.Sprite({
    image: wall,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  "LR": new ex.Sprite({
    image: wallLR,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  "L": new ex.Sprite({
    image: wallL,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  "R": new ex.Sprite({
    image: wallR,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  
  "N": new ex.Sprite({
    image: wallN,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  "VN": new ex.Sprite({
    image: wallVN,
    destSize: {
      width: img_width_wall,
      height: img_height_wall,
    },
  }),
  
}

export const collider_list: IHash2 = {
  "": ex.vec(col_width_wall, col_height_wall),
  "LR": ex.vec(col_width_wall, col_height_wall),
  "L": ex.vec(col_width_wall, col_height_wall),
  "R": ex.vec(col_width_wall, col_height_wall),

  "N": ex.vec(col_width_wall, col_height_wall),
  "VN": ex.vec(col_width_wall, col_height_wall),

  "dark_table_1": ex.vec(50, 50),
  "bed_red": ex.vec(35, 50),
  "bookshelf": ex.vec(35, 35),
  "bookshelf_empty": ex.vec(35, 35),
  "chair_blue": ex.vec(35, 35),
  "chair_red": ex.vec(35, 35),
  "drawer": ex.vec(35, 35),
  "plant_1": ex.vec(5, 5),
  "plant_2": ex.vec(5, 5),
  "plant_3": ex.vec(5, 5),
  "plant_4": ex.vec(5, 10),
  "plant_5": ex.vec(5, 5),
  "plant_6": ex.vec(5, 5),
  "television_old": ex.vec(50, 50),
  "lamp": ex.vec(5, 5),
  "lamp_on": ex.vec(5, 5),
  "lamp_tall": ex.vec(25, 25),
  "counter_white": ex.vec(50, 25),
  "fridge": ex.vec(25, 35),
  "burner": ex.vec(30, 25),
}







