import * as ex from 'excalibur';
import { addLevels } from './levels';
import { loader } from './resources';

// physics
ex.Physics.useArcadePhysics();
ex.Physics.acc = ex.vec(0, 0);

// engine
const engine = new ex.Engine({
  canvasElementId: 'game',
  backgroundColor: ex.Color.White,
  resolution: { width: 1000, height: 1000 },
  viewport: { width: 800, height: 800 },
  fixedUpdateFps: 60,
  antialiasing: false // Turn off anti-aliasing for pixel art graphics
});

// levels are added in `levels` in `./levels.ts`
addLevels(engine);
// Start the engine
engine.start(loader).then(() => {
  console.log('game start');
  engine.goToScene('Main');
});
