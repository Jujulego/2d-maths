import { type IPoint, point, Point } from './point';
import { Rect } from './rect';
import { type IVector, vector } from './vector';
import { type OrderMode } from './types';

// Types
export interface PointsOfOpts {
  readonly step?: IVector;
  readonly order?: OrderMode;
}

export abstract class Shape {
  // Attributes
  abstract readonly bbox: Rect;

  // Methods
  abstract contains(p: IPoint, precision?: IVector): boolean;
}

// Utils
export function *pointsOf(shape: Shape, opts: PointsOfOpts = {}): Generator<Point> {
  const { step = vector(1, 1), order = 'xy' } = opts;
  const bbox = shape.bbox;

  if (order === 'xy') {
    for (let x = bbox.l; x < bbox.r; x += step.dx) {
      for (let y = bbox.b; y < bbox.t; y += step.dy) {
        if (shape.contains({ x, y }, step)) {
          yield point(x, y);
        }
      }
    }
  } else {
    for (let y = bbox.b; y < bbox.t; y += step.dy) {
      for (let x = bbox.l; x < bbox.r; x += step.dx) {
        if (shape.contains({ x, y }, step)) {
          yield point(x, y);
        }
      }
    }
  }
}
