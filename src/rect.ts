import { IPoint, Point } from './point';
import { IVector, Vector } from './vector';

// Types
export interface IRect {
  t: number;
  l: number;
  r: number;
  b: number;
}

// Class
export class Rect implements IRect {
  // Attributes
  t: number;
  l: number;
  r: number;
  b: number;

  // Constructor
  constructor(r: IRect) {
    this.t = r.t;
    this.l = r.l;
    this.r = r.r;
    this.b = r.b;
  }

  // Methods
  equals(r: IRect): boolean {
    return this.t === r.t && this.l === r.l && this.r === r.r && this.b === r.b;
  }

  contains(p: IPoint) {
    return this.t >= p.y && this.l <= p.x && this.r >= p.x && this.b <= p.y;
  }

  // Properties
  get tl(): Point {
    return new Point({ x: this.l, y: this.t });
  }

  get tr(): Point {
    return new Point({ x: this.r, y: this.t });
  }

  get br(): Point {
    return new Point({ x: this.r, y: this.b });
  }

  get bl(): Point {
    return new Point({ x: this.l, y: this.b });
  }

  get size(): Vector {
    return new Vector({ dx: this.r - this.l, dy: this.t - this.b });
  }
}

// Utils
export function rect(r: IRect): Rect;
export function rect(a: IPoint, b: IPoint): Rect;
export function rect(a: IPoint, s: IVector): Rect;
export function rect(...args: [IRect] | [IPoint, IPoint] | [IPoint, IVector]): Rect {
  if (args.length === 1) {
    return new Rect(args[0]);
  }

  const [a, b] = args;

  if ('dx' in b) { // => b is a vector
    return new Rect({
      t: Math.max(a.x, a.x + b.dx),
      l: Math.min(a.y, a.y + b.dy),
      r: Math.max(a.y, a.y + b.dy),
      b: Math.min(a.x, a.x + b.dx),
    });
  } else { // => b is a point
    return new Rect({
      t: Math.max(a.x, b.x),
      l: Math.min(a.y, b.y),
      r: Math.max(a.y, b.y),
      b: Math.min(a.x, b.x),
    });
  }
}
