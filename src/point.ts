import { IVector, Vector } from './vector';

// Types
export interface IPoint {
  x: number;
  y: number;
}

export type PointOrderMode = 'xy' | 'yx';

export type PointHolderAttr<N extends string> = `${N}${'X' | 'Y'}`;
export type PointHolder<N extends string> = Record<PointHolderAttr<N>, number>;

// Class
export class Point implements IPoint {
  // Attributes
  x: number;
  y: number;

  // Statics
  static readonly Origin = new Point({ x: 0, y: 0 });

  static from<N extends string>(prefix: N, holder: PointHolder<N>): Point {
    return new Point({ x: holder[`${prefix}X`], y: holder[`${prefix}Y`] });
  }

  static comparator(order: PointOrderMode = 'xy'): (a: IPoint, b: IPoint) => number {
    if (order === 'xy') {
      return (a, b) => {
        const d = new Point(a).sub(b);
        return d.dx === 0 ? d.dy : d.dx;
      };
    } else {
      return (a, b) => {
        const d = new Point(a).sub(b);
        return d.dy === 0 ? d.dx : d.dy;
      };
    }
  }

  // Constructor
  constructor(p: IPoint) {
    this.x = p.x;
    this.y = p.y;
  }

  // Methods
  equals(p: IPoint): boolean {
    return this.x === p.x && this.y === p.y;
  }

  add(v: IVector): Point {
    return new Point({ x: this.x + v.dx, y: this.y + v.dy });
  }

  sub(p: IPoint): Vector {
    return new Vector({ dx: this.x - p.x, dy: this.y - p.y });
  }

  // Properties
  get isOrigin(): boolean {
    return this.x === 0 && this.y === 0;
  }
}

// Utils
export function point(p: IPoint): Point;
export function point(x: number, y: number): Point;
export function point(...args: [IPoint] | [number, number]): Point {
  if (args.length === 1) {
    return new Point(args[0]);
  }

  const [x, y] = args;
  return new Point({ x, y });
}

