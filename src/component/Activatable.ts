import * as ex from 'excalibur';

export class Activatable extends ex.Component<'activatable'> {
  public readonly type = 'activatable';

  isActivated: boolean;
  label: ex.Label;
  onChangeActivated: (isActivated: boolean) => void;

  constructor(
    actor: ex.Actor,
    points: ex.Vector[],
    onChangeActivated: (isActivated: boolean) => void,
    isActivated: boolean = false,
  ) {
    super();
    this.onChangeActivated = onChangeActivated;
    this.isActivated = isActivated;

    let topPoint = points.reduce((prev, curr) => curr.y < prev.y ? curr : prev);
    let rightPoint = points.reduce((prev, curr) => curr.x > prev.x ? curr : prev);
    let leftPoint = points.reduce((prev, curr) => curr.x < prev.x ? curr : prev);
    this.label = new ex.Label({
      text: "E",
      pos: ex.vec((rightPoint.x + leftPoint.x) / 2, topPoint.y - 20),
      font: new ex.Font({
        family: 'helvetica',
        size: 48,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    });
    this.label.graphics.visible = false;
    actor.addChild(this.label);
  }

  setActivated(isActivated: boolean) {
    let wasActivated = this.isActivated;
    this.isActivated = isActivated;
    if (wasActivated !== this.isActivated)
      this.onChangeActivated(this.isActivated);
  }

  toggleActivated() {
    this.setActivated(!this.isActivated);
  }

  setShowTrigger(showTrigger: boolean) {
    this.label.graphics.visible = showTrigger;
  }
}
