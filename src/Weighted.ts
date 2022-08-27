import { Actor } from "excalibur";

export interface Weighted extends Actor {
  weight: number;
}

export function isWeighted(x: Actor): x is Weighted {
  return 'weight' in x;
}
