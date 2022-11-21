import { IMatrix } from './matrix';
import { IPoint, Point } from './point';
import { IVector, Vector } from './vector';

// Types
export interface ITransformMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

// Class
export class TransformMatrix implements ITransformMatrix {
  // Attributes
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;

  // Statics
  static readonly Zero = new TransformMatrix({
    a: 0, b: 0,
    c: 0, d: 0,
    e: 0, f: 0,
  });
  static readonly Identity = new TransformMatrix({
    a: 1, b: 0,
    c: 0, d: 1,
    e: 0, f: 0,
  });

  // Constructor
  constructor(m: ITransformMatrix) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.e = m.e;
    this.f = m.f;
  }

  // Methods
  equals(m: ITransformMatrix): boolean {
    return this.a === m.a && this.b === m.b && this.c === m.c && this.d === m.d;
  }

  add(m: ITransformMatrix): TransformMatrix {
    return new TransformMatrix({
      a: this.a + m.a, b: this.b + m.b,
      c: this.c + m.c, d: this.d + m.d,
      e: this.e + m.e, f: this.f + m.f,
    });
  }

  sub(m: ITransformMatrix): TransformMatrix {
    return new TransformMatrix({
      a: this.a - m.a, b: this.b - m.b,
      c: this.c - m.c, d: this.d - m.d,
      e: this.e - m.e, f: this.f - m.f,
    });
  }

  dot(k: number): TransformMatrix;
  dot(p: IPoint): Point;
  dot(v: IVector): Vector;
  dot(m: IMatrix): TransformMatrix;
  dot(arg: number | IPoint | IVector | IMatrix) {
    if (typeof arg === 'number') {
      return new TransformMatrix({
        a: this.a * arg, b: this.b * arg,
        c: this.c * arg, d: this.d * arg,
        e: this.e * arg, f: this.f * arg,
      });
    } else if ('x' in arg) {
      return new Point({
        x: arg.x * this.a + arg.y * this.c + this.e,
        y: arg.x * this.b + arg.y * this.d + this.f,
      });
    } else if ('dx' in arg) {
      return new Vector({
        dx: arg.dx * this.a + arg.dy * this.c + this.e,
        dy: arg.dx * this.b + arg.dy * this.d + this.f,
      });
    } else {
      return new TransformMatrix({
        a: this.a * arg.a + this.b * arg.c, b: this.a * arg.b + this.b * arg.d,
        c: this.c * arg.a + this.d * arg.c, d: this.c * arg.b + this.d * arg.d,
        e: this.e * arg.a + this.f * arg.c, f: this.e * arg.b + this.f * arg.d,
      });
    }
  }
}

// Utils
export function transformMatrix(m: ITransformMatrix): TransformMatrix;
export function transformMatrix(a: number, b: number, c: number, d: number, e: number, f: number): TransformMatrix;
export function transformMatrix(...args: [ITransformMatrix] | [number, number, number, number, number, number]): TransformMatrix {
  if (args.length === 1) {
    return new TransformMatrix(args[0]);
  }

  const [a, b, c, d, e, f] = args;
  return new TransformMatrix({ a, b, c, d, e, f });
}
