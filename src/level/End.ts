import * as ex from 'excalibur';
import { Label } from 'excalibur';
import { Level } from '../level';
import { title, ui } from '../ui';

export class End extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine): void {
    engine.backgroundColor = ex.Color.White;

    this.add(new Label({
      text: "END",
      pos: ex.vec(500, 500),
      color: ex.Color.Black,
      font: new ex.Font({
        family: 'helvetica',
        size: 64,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));

    this.add(new Label({
      text: "thanks for playing",
      pos: ex.vec(500, 800),
      color: ex.Color.Black,
      font: new ex.Font({
        family: 'helvetica',
        size: 32,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    }));

  }

  onActivate(context: ex.SceneActivationContext<unknown>): void {
    super.onActivate(context);

    const h3 = document.createElement('h3');
    h3.innerHTML = 'Assets used for this game:';
    ui.appendChild(h3);

    const ul_citations = document.createElement('ul');
    const citations = [
      ["Tilation Indoor Tileset", "https://tilation.itch.io/16x16-small-indoor-tileset"],
      ["Pixana Interior Tiles", "https://pixanna.nl/materials/celiannas-parallax-tiles/interior-tiles/"],
      ["Cozy People Asset Pack", "https://shubibubi.itch.io/cozy-people"]
    ];
    citations.forEach(([title, href]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href;
      a.innerHTML = title;
      li.appendChild(a);
      ul_citations.appendChild(li);
    })
    ui.appendChild(ul_citations)
  }

  onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
    title.innerHTML = '';
    ui.innerHTML = '';
  }
}
