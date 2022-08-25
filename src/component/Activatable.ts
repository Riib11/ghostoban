import * as ex from 'excalibur';

export class Activatable extends ex.Component<'activatable'> {
  public readonly type = 'activatable';

  isActivated: boolean;
  label: ex.Label;
  key: ex.Input.Keys;
  onChangeActivated: (isActivated: boolean) => void;

  constructor(args: {
    actor: ex.Actor,
    points: ex.Vector[],
    key: ex.Input.Keys,
    onChangeActivated: (isActivated: boolean) => void,
    isActivated?: boolean
  }) {
    super();
    this.onChangeActivated = args.onChangeActivated;
    this.isActivated = args.isActivated ?? false;

    let topPoint = args.points.reduce((prev, curr) => curr.y < prev.y ? curr : prev);
    let rightPoint = args.points.reduce((prev, curr) => curr.x > prev.x ? curr : prev);
    let leftPoint = args.points.reduce((prev, curr) => curr.x < prev.x ? curr : prev);
    this.label = new ex.Label({
      text: args.key,
      pos: ex.vec((rightPoint.x + leftPoint.x) / 2, topPoint.y - 20),
      font: new ex.Font({
        family: 'helvetica',
        size: 48,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    });
    this.label.graphics.visible = false;
    this.key = args.key
    args.actor.addChild(this.label);
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

  setShowLabel(showTrigger: boolean) {
    this.label.graphics.visible = showTrigger;
  }
}
