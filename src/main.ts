import * as ex from 'excalibur';
import { Level } from './level';
import { Henry1 } from './level/Henry1';
import { loader } from './resources';

ex.Physics.useArcadePhysics();

// engine
const engine = new ex.Engine({
  backgroundColor: ex.Color.White,
  width: 800,
  height: 800,
  fixedUpdateFps: 60,
  antialiasing: false // Turn off anti-aliasing for pixel art graphics
});

// global gravity
ex.Physics.acc = ex.vec(0, 0);

// construct level
// TMP: this is an example level
const level = new Henry1();

// start level
engine.add('main', level);

// Game events to handle
engine.on('hidden', () => {
  console.log('pause');
  engine.stop();
});
engine.on('visible', () => {
  console.log('start');
  engine.start();
});

// Start the engine
engine.start(loader).then(() => {
  console.log('game start');
  engine.goToScene('main');
});

