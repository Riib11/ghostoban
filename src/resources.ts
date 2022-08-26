import * as ex from 'excalibur';
import { ImageSource } from 'excalibur';

export const chair = new ImageSource('./src/resources/chair.png');

// make sure to put all the ImageSources here
export const loader = new ex.Loader([
  chair
]);