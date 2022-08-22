import { Console } from 'console';
import * as ex from 'excalibur';
import { Player } from './player';
import { loader } from './resources';
// import { Level } from './level';

// engine
const engine = new ex.Engine({
  backgroundColor: ex.Color.White,
  width: 800,
  height: 800,
  fixedUpdateFps: 60,
  antialiasing: false // Turn off anti-aliasing for pixel art graphics
});

// global gravity
ex.Physics.acc = new ex.Vector(0, 0);

// create player
const player = new Player(300, 200);

const level1 = new ex.Scene();
level1.add(player);

engine.add('level1', level1);

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
  engine.goToScene('level1');
});

