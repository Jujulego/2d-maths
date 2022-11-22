import { IPoint, point, Point } from './point';
import { IVector, vector, Vector } from './vector';

// Types
export interface IRect {
  t: number;
  l: number;
  r: number;
  b: number;
}

export type RectTLRBHolderAttr<N extends string> = `${N}${'Top' | 'Left' | 'Right' | 'Bottom'}`;
export type RectTLWHHolderAttr<N extends string> = `${N}${'Top' | 'Left' | 'Width' | 'Height'}`;

export type RectTLBRHolder<N extends string> = Record<RectTLRBHolderAttr<N>, number>;
export type RectTLWHHolder<N extends string> = Record<RectTLWHHolderAttr<N>, number>;

export type RectHolder<N extends string> = RectTLBRHolder<N> | RectTLWHHolder<N>;

// Utils
export function isRectTLRBHolder<N extends string>(prefix: N, holder: RectHolder<N>): holder is RectTLBRHolder<N> {
  return `${prefix}Bottom` in holder;
}

// Class
export class Rect implements IRect {
  // Attributes
  t: number;
  l: number;
  r: number;
  b: number;

  // Statics
  static from<N extends string>(prefix: N, holder: RectHolder<N>): Rect {
    if (isRectTLRBHolder(prefix, holder)) {
      return new Rect({
        t: holder[`${prefix}Top`],
        l: holder[`${prefix}Left`],
        r: holder[`${prefix}Right`],
        b: holder[`${prefix}Bottom`],
      });
    } else {
      return rect(
        point(holder[`${prefix}Left`], holder[`${prefix}Top`]),
        vector(holder[`${prefix}Width`], -holder[`${prefix}Height`])
      );
    }
  }

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

  contains(r: IRect): boolean;
  contains(p: IPoint): boolean;
  contains(arg: IPoint | IRect): boolean {
    if ('x' in arg) {
      return this.l <= arg.x && this.r > arg.x && this.b <= arg.y && this.t > arg.y;
    } else {
      return arg.t <= this.t && arg.t >= this.b
        && arg.l <= this.r && arg.l >= this.l
        && arg.r <= this.r && arg.r >= this.l
        && arg.b <= this.t && arg.b >= this.b;
    }
  }

  intersect(r: IRect): Rect | null {
    if (r.b > this.t) return null; // r is over this
    if (r.t < this.b) return null; // r is bellow this
    if (r.l > this.r) return null; // r is to the right of this
    if (r.r < this.l) return null; // r is to the left of this

    return new Rect({
      t: Math.min(this.t, r.t),
      l: Math.max(this.l, r.l),
      r: Math.min(this.r, r.r),
      b: Math.max(this.b, r.b),
    });
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
      t: Math.max(a.y, a.y + b.dy),
      l: Math.min(a.x, a.x + b.dx),
      r: Math.max(a.x, a.x + b.dx),
      b: Math.min(a.y, a.y + b.dy),
    });
  } else { // => b is a point
    return new Rect({
      t: Math.max(a.y, b.y),
      l: Math.min(a.x, b.x),
      r: Math.max(a.x, b.x),
      b: Math.min(a.y, b.y),
    });
  }
}
