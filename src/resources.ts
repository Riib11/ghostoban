import * as ex from 'excalibur';
import { ImageSource } from 'excalibur';

export const images = {
  chair: new ImageSource('./src/resources/chair.png'),
  floor: new ImageSource('./src/resources/floor.png'),
  barrel: new ImageSource('./src/resources/barrel.png'),
  button_on: new ImageSource('./src/resources/button_on.png'),
  button_off: new ImageSource('./src/resources/button_off.png'),
}

// make sure to put all the ImageSources here
export const loader = new ex.Loader(Object.values(images));
