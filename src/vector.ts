import { type IMatrix } from './matrix';
import { type OrderMode } from './types';
import { isObject } from './utils';

// Types
export interface IVector {
  dx: number;
  dy: number;
}

// Class
export class Vector implements IVector {
  // Attributes
  dx: number;
  dy: number;

  // Statics
  static readonly Null = new Vector({ dx: 0, dy: 0 });

  static comparator(order: OrderMode = 'xy'): (a: IVector, b: IVector) => number {
    if (order === 'xy') {
      return (a, b) => {
        const d = new Vector(a).sub(b);
        return d.dx === 0 ? d.dy : d.dx;
      };
    } else {
      return (a, b) => {
        const d = new Vector(a).sub(b);
        return d.dy === 0 ? d.dx : d.dy;
      };
    }
  }

  // Constructor
  constructor(v: IVector) {
    this.dx = v.dx;
    this.dy = v.dy;
  }

  // Methods
  equals(v: IVector): boolean {
    return this.dx === v.dx && this.dy === v.dy;
  }

  add(v: IVector): Vector {
    return new Vector({ dx: this.dx + v.dx, dy: this.dy + v.dy });
  }

  sub(v: IVector): Vector {
    return new Vector({ dx: this.dx - v.dx, dy: this.dy - v.dy });
  }

  dot(k: number): Vector;
  dot(v: IVector): number;
  dot(v: IMatrix): Vector;
  dot(arg: number | IVector | IMatrix) {
    if (typeof arg === 'number') {
      return new Vector({ dx: this.dx * arg, dy: this.dy * arg });
    } else if ('dx' in arg) {
      return this.dx * arg.dx + this.dy * arg.dy;
    } else {
      return new Vector({
        dx: this.dx * arg.a + this.dy * arg.b + arg.tx,
        dy: this.dx * arg.c + this.dy * arg.d + arg.ty,
      });
    }
  }

  div(k: number): Vector {
    return new Vector({ dx: this.dx / k, dy: this.dy / k });
  }

  // Properties
  get isNull(): boolean {
    return this.dx === 0 && this.dy === 0;
  }

  get squareNorm(): number {
    return this.dx * this.dx + this.dy * this.dy;
  }

  get norm(): number {
    return Math.sqrt(this.squareNorm);
  }

  get manhattan(): number {
    return Math.abs(this.dx) + Math.abs(this.dy);
  }

  get normal(): Vector {
    return new Vector({ dx: this.dy, dy: -this.dx });
  }

  get unit(): Vector {
    if (this.isNull) {
      return Vector.Null;
    }

    return this.div(this.norm);
  }

  get ceil(): Vector {
    return new Vector({ dx: Math.ceil(this.dx), dy: Math.ceil(this.dy) });
  }

  get floor(): Vector {
    return new Vector({ dx: Math.floor(this.dx), dy: Math.floor(this.dy) });
  }
}

// Utils
/**
 * Returns true if object is a vector object
 * @see IVector
 *
 * @param obj
 */
export function isVector(obj: unknown): obj is IVector {
  return isObject(obj) && 'dx' in obj;
}

export function vector(v: IVector): Vector;
export function vector(dx: number, dy: number): Vector;
export function vector(...args: [IVector] | [number, number]): Vector {
  if (args.length === 1) {
    return new Vector(args[0]);
  }

  const [dx, dy] = args;
  return new Vector({ dx, dy });
}
