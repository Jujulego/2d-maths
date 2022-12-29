import { Shape } from './abstracts/shape';
import { Disk, type IDisk, isDisk } from './disk';
import { point, Point } from './point';
import { type IVector, vector } from './vector';
import { type IRect, isRect, Rect } from './rect';
import { type OrderMode } from './types';

// Types
export type IShape = IRect | IDisk;

export interface PointsOfOpts {
  readonly step?: IVector;
  readonly order?: OrderMode;
}

// Utils
export function isShape(obj: unknown): obj is IShape {
  return isDisk(obj) || isRect(obj);
}

export function shape(s: IShape | Shape): Shape {
  if (s instanceof Shape) {
    return s;
  } else if (isDisk(s)) {
    return new Disk(s);
  } else {
    return new Rect(s);
  }
}

export function *pointsOf(area: Shape | IShape, opts: PointsOfOpts = {}): Generator<Point> {
  const { step = vector(1, 1), order = 'xy' } = opts;

  const _area = shape(area);
  const bbox = _area.bbox;

  if (order === 'xy') {
    for (let x = bbox.l; x < bbox.r; x += step.dx) {
      for (let y = bbox.b; y < bbox.t; y += step.dy) {
        if (_area.contains({ x, y }, step)) {
          yield point(x, y);
        }
      }
    }
  } else {
    for (let y = bbox.b; y < bbox.t; y += step.dy) {
      for (let x = bbox.l; x < bbox.r; x += step.dx) {
        if (_area.contains({ x, y }, step)) {
          yield point(x, y);
        }
      }
    }
  }
}
