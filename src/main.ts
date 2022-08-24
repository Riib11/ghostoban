import * as ex from 'excalibur';
import { Level } from './level';
import { Henry1 } from './level/Henry1';
import { loader } from './resources';
import { Henry2 } from './level/Henry2';
import { Jae1 } from './level/Jae1';
import { Main } from './level/Main';

// engine
const engine = new ex.Engine({
  canvasElementId: 'game',
  backgroundColor: ex.Color.White,
  resolution: { width: 1000, height: 1000 },
  fixedUpdateFps: 60,
  antialiasing: false // Turn off anti-aliasing for pixel art graphics
});

// physics
ex.Physics.useArcadePhysics();
ex.Physics.acc = ex.vec(0, 0);

// add levels
engine.add('Main', new Main());
engine.add('Henry1', new Henry1());
engine.add('Henry2', new Henry2());
engine.add('Jae1', new Jae1());

// Start the engine
engine.start(loader).then(() => {
  console.log('game start');
  engine.goToScene('Main');
});
