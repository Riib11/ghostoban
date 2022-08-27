import { Entity } from "excalibur";

export interface Damageable extends Entity {
  health: number;
  onDamage?(amount: number): void;
  onDie?(): void;
}
