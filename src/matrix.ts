import { IVector, Vector } from './vector';
import { IPoint, Point } from './point';

// Types
export interface IMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

// Class
export class Matrix implements IMatrix {
  // Attributes
  a: number;
  b: number;
  c: number;
  d: number;

  // Statics
  static readonly Zero = new Matrix({
    a: 0, b: 0,
    c: 0, d: 0,
  });
  static readonly Identity = new Matrix({
    a: 1, b: 0,
    c: 0, d: 1,
  });

  // Constructor
  constructor(m: IMatrix) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
  }

  // Methods
  equals(m: IMatrix): boolean {
    return this.a === m.a && this.b === m.b && this.c === m.c && this.d === m.d;
  }

  add(m: IMatrix): Matrix {
    return new Matrix({
      a: this.a + m.a, b: this.b + m.b,
      c: this.c + m.c, d: this.d + m.d,
    });
  }

  sub(m: IMatrix): Matrix {
    return new Matrix({
      a: this.a - m.a, b: this.b - m.b,
      c: this.c - m.c, d: this.d - m.d,
    });
  }

  dot(k: number): Matrix;
  dot(p: IPoint): Point;
  dot(v: IVector): Vector;
  dot(m: IMatrix): Matrix;
  dot(arg: number | IPoint | IVector | IMatrix) {
    if (typeof arg === 'number') {
      return new Matrix({
        a: this.a * arg, b: this.b * arg,
        c: this.c * arg, d: this.d * arg,
      });
    } else if ('x' in arg) {
      return new Point({
        x: arg.x * this.a + arg.y * this.c,
        y: arg.x * this.b + arg.y * this.d,
      });
    } else if ('dx' in arg) {
      return new Vector({
        dx: arg.dx * this.a + arg.dy * this.c,
        dy: arg.dx * this.b + arg.dy * this.d,
      });
    } else {
      return new Matrix({
        a: this.a * arg.a + this.b * arg.c, b: this.a * arg.b + this.b * arg.d,
        c: this.c * arg.a + this.d * arg.c, d: this.c * arg.b + this.d * arg.d,
      });
    }
  }
}

// Utils
export function matrix(m: IMatrix): Matrix;
export function matrix(a: number, b: number, c: number, d: number): Matrix;
export function matrix(...args: [IMatrix] | [number, number, number, number]): Matrix {
  if (args.length === 1) {
    return new Matrix(args[0]);
  }

  const [a, b, c, d] = args;
  return new Matrix({ a, b, c, d });
}
