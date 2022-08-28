import * as ex from 'excalibur';
import { Bretton1 } from './level/Bretton1';
import { Bretton2 } from './level/Bretton2';
import { Bretton3 } from './level/Bretton3';
import { Bretton4 } from './level/Bretton4';
import { Calvin1 } from './level/Calvin1';
import { Death } from './level/Death';
import { Door1 } from './level/Door1';
import { Henry1 } from './level/Henry1';
import { Henry2 } from './level/Henry2';
import { Henry3 } from './level/Henry3';
import { Henry4 } from './level/Henry4';
import { Henry5 } from './level/Henry5';
import { Henry6 } from './level/Henry6';
import { Jae1 } from './level/Jae1';
import { Jae2 } from './level/Jae2';
import { Jae3 } from './level/Jae3';
import { Main } from './level/Main';
import { Win } from './level/Win';

export const levels = {
  Main: new Main(),
  Death: new Death(),
  Win: new Win(),
  Henry1: new Henry1(),
  Henry2: new Henry2(),
  Henry3: new Henry3(),
  Henry4: new Henry4(),
  Henry5: new Henry5(),
  Henry6: new Henry6(),
  Door1: new Door1(),
  Jae1: new Jae1(),
  Jae2: new Jae2(),
  Jae3: new Jae3(),
  Bretton1: new Bretton1(),
  Bretton2: new Bretton2(),
  Bretton3: new Bretton3(),
  Bretton4: new Bretton4(),
  Calvin1: new Calvin1()
}

export function addLevels(engine: ex.Engine) {
  for (const [name, level] of Object.entries(levels)) {
    engine.addScene(name, level);
  }
}
