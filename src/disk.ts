import { type IPoint, Point } from './point';
import { Shape } from './shape';
import { Rect } from './rect';
import { isObject } from './utils';

// Types
export interface IDisk {
  /**
   * Center x coordinate
   */
  cx: number;

  /**
   * Center y coordinate
   */
  cy: number;

  /**
   * Radius
   */
  r: number;
}

// Class
/**
 * Represents a disk shape, from a center and a radius
 */
export class Disk extends Shape implements IDisk {
  // Attributes
  /**
   * Center x coordinate
   */
  cx: number;

  /**
   * Center y coordinate
   */
  cy: number;

  /**
   * Radius
   */
  r: number;

  // Constructor
  constructor(d: IDisk) {
    super();

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
  /**
   * Center point
   */
  get center(): Point {
    return new Point({ x: this.cx, y: this.cy });
  }

  /**
   * Bounding box fitted to the disk
   */
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
/**
 * Returns true if object is a disk object
 * @see IDisk
 *
 * @param obj
 */
export function isDisk(obj: unknown): obj is IDisk {
  return isObject(obj) && 'cx' in obj;
}

/**
 * Disk easy builder (from a disk object)
 * @see Disk
 *
 * @param d
 */
export function disk(d: IDisk): Disk;

/**
 * Disk easy builder (from a point object and a radius)
 * @see Disk
 *
 * @param c Center point
 * @param r Radius
 */
export function disk(c: IPoint, r: number): Disk;

/**
 * Disk easy builder
 * @see Disk
 */
export function disk(...args: [IDisk] | [IPoint, number]): Disk {
  if (args.length === 1) {
    return new Disk(args[0]);
  }

  const [c, r] = args;
  return new Disk({ cx: c.x, cy: c.y, r });
}
