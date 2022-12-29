import { type IPoint } from '../point';
import { Rect } from '../rect';
import { type IVector } from '../vector';

// Class
export abstract class Shape {
  // Attributes
  abstract readonly bbox: Rect;

  // Methods
  abstract contains(p: IPoint, precision?: IVector): boolean;
}
