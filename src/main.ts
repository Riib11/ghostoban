import * as ex from 'excalibur';
import { Level } from './level';
import { Henry1 } from './level/Henry1';
import { loader } from './resources';
import { Henry2 } from './level/Henry2';
import { Jae1 } from './level/Jae1';
import { Jae2 } from './level/Jae2';
import { Main } from './level/Main';
import { Bretton1 } from './level/Bretton1';
import { Calvin1 } from './level/Calvin1';
import { Henry3 } from './level/Henry3';
import { Death } from './level/Death';
import { Henry4 } from './level/Henry4';

// engine
const engine = new ex.Engine({
  canvasElementId: 'game',
  backgroundColor: ex.Color.White,
  resolution: { width: 1000, height: 1000 },
  viewport: { width: 800, height: 800 },
  fixedUpdateFps: 60,
  antialiasing: false // Turn off anti-aliasing for pixel art graphics
});

// physics
ex.Physics.useArcadePhysics();
ex.Physics.acc = ex.vec(0, 0);

// add levels
engine.add('Main', new Main());
engine.add('Death', new Death());
engine.add('Henry1', new Henry1());
engine.add('Henry2', new Henry2());
engine.add('Henry3', new Henry3());
engine.add('Henry4', new Henry4());
engine.add('Jae1', new Jae1());
engine.add('Jae2', new Jae2());
engine.add('Bretton1', new Bretton1());
engine.add('Calvin1', new Calvin1());
// Start the engine
engine.start(loader).then(() => {
  console.log('game start');
  engine.goToScene('Main');
});
