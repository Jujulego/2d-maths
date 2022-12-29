import { Rect } from '../rect';
import { IPoint } from '../point';
import { IVector } from '../vector';

// Class
export abstract class Shape {
  // Attributes
  abstract readonly bbox: Rect;

  // Methods
  abstract contains(p: IPoint, precision?: IVector): boolean;
}
