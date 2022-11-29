import { type IPoint, Point } from './point';
import { type IShape } from './shape';
import { Rect } from './rect';

// Types
export interface IDisk {
  cx: number;
  cy: number;
  r: number;
}

// Class
export class Disk implements IShape, IDisk {
  // Attributes
  cx: number;
  cy: number;
  r: number;

  // Constructor
  constructor(d: IDisk) {
    this.cx = d.cx;
    this.cy = d.cy;
    this.r = d.r;
  }

  // Methods
  equals(d: IDisk): boolean {
    return this.cx === d.cx && this.cy === d.cy && this.r === d.r;
  }

  contains(p: IPoint, precision = { dx: 0, dy: 0 }): boolean {
    const { dx: pdx, dy: pdy } = precision;
    return this.center.sub(p).squareNorm <= this.r * this.r + pdx * pdx + pdy * pdy;
  }

  // Properties
  get center(): Point {
    return new Point({ x: this.cx, y: this.cy });
  }

  get bbox(): Rect {
    return new Rect({
      t: this.cy + this.r + 1,
      l: this.cx - this.r,
      b: this.cy - this.r,
      r: this.cx + this.r + 1,
    });
  }
}

// Utils
export function disk(d: IDisk): Disk;
export function disk(c: IPoint, r: number): Disk;
export function disk(...args: [IDisk] | [IPoint, number]): Disk {
  if (args.length === 1) {
    return new Disk(args[0]);
  }

  const [c, r] = args;
  return new Disk({ cx: c.x, cy: c.y, r });
}
