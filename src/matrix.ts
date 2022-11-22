import { IPoint, Point } from './point';
import { IVector, Vector } from './vector';

// Types
/**
 * 3x3 matrix for any transformation in 2d plan
 *  [ a  c  0]
 *  [ b  d  0]
 *  [tx ty  1]
 */
export interface IMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
}

// Class
/**
 * 3x3 matrix for any transformation in 2d plan
 *  [ a  c  0]
 *  [ b  d  0]
 *  [tx ty  1]
 */
export class Matrix implements IMatrix {
  // Attributes
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;

  // Statics
  static readonly Zero = new Matrix({
    a: 0, c: 0,
    b: 0, d: 0,
    tx: 0, ty: 0,
  });
  static readonly Identity = new Matrix({
    a: 1, c: 0,
    b: 0, d: 1,
    tx: 0, ty: 0,
  });

  // Constructor
  constructor(m: IMatrix) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.tx = m.tx;
    this.ty = m.ty;
  }

  // Methods
  equals(m: IMatrix): boolean {
    return this.a === m.a && this.b === m.b && this.c === m.c && this.d === m.d && this.tx === m.tx && this.ty === m.ty;
  }

  add(m: IMatrix): Matrix {
    return new Matrix({
      a: this.a + m.a, c: this.c + m.c,
      b: this.b + m.b, d: this.d + m.d,
      tx: this.tx + m.tx, ty: this.ty + m.ty,
    });
  }

  sub(m: IMatrix): Matrix {
    return new Matrix({
      a: this.a - m.a, c: this.c - m.c,
      b: this.b - m.b, d: this.d - m.d,
      tx: this.tx - m.tx, ty: this.ty - m.ty,
    });
  }

  dot(k: number): Matrix;
  dot(p: IPoint): Point;
  dot(v: IVector): Vector;
  dot(m: IMatrix): Matrix;
  dot(arg: number | IPoint | IVector | IMatrix) {
    if (typeof arg === 'number') {
      return new Matrix({
        a: this.a * arg, c: this.c * arg,
        b: this.b * arg, d: this.d * arg,
        tx: this.tx * arg, ty: this.ty * arg,
      });
    } else if ('x' in arg) {
      return new Point({
        x: arg.x * this.a + arg.y * this.b + this.tx,
        y: arg.x * this.c + arg.y * this.d + this.ty,
      });
    } else if ('dx' in arg) {
      return new Vector({
        dx: arg.dx * this.a + arg.dy * this.b + this.tx,
        dy: arg.dx * this.c + arg.dy * this.d + this.ty,
      });
    } else {
      return new Matrix({
        a: this.a * arg.a + this.c * arg.b, c: this.a * arg.c + this.c * arg.d,
        b: this.b * arg.a + this.d * arg.b, d: this.b * arg.c + this.d * arg.d,
        tx: this.tx * arg.a + this.ty * arg.b + arg.tx, ty: this.tx * arg.c + this.ty * arg.d + arg.ty,
      });
    }
  }
}

// Utils
export function matrix(m: IMatrix): Matrix;
export function matrix(a: number, c: number, b: number, d: number): Matrix;
export function matrix(a: number, c: number, b: number, d: number, tx: number, ty: number): Matrix;
export function matrix(...args: [IMatrix] | [number, number, number, number] | [number, number, number, number, number, number]): Matrix {
  if (args.length === 1) {
    return new Matrix(args[0]);
  }

  // Parse numbers
  const [a, c, b, d, tx = 0, ty = 0] = args;

  return new Matrix({ a, c, b, d, tx, ty });
}
