import { IPoint, Shape, pointsOf, Rect, isShape, shape, Disk } from '../src';

// Utils
const area = new class extends Shape {
  // Attributes
  readonly bbox = new Rect({
    t: 3,
    l: 0,
    b: 0,
    r: 3
  });

  // Methods
  contains(p: IPoint): boolean {
    return 0 <= p.x && p.x < 3 && 0 <= p.y && p.y < 3 && p.x <= p.y;
  }
};

// Tests
describe('isShape', () => {
  it('should return true for a disk object', () => {
    expect(isShape({ cx: 1, cy: 2, r: 3 })).toBe(true);
  });

  it('should return true for a rect object', () => {
    expect(isShape({ t: 1, l: 0, r: 1, b: 0 })).toBe(true);
  });

  it('should return false for something else', () => {
    expect(isShape({ x: 1, y: 2 })).toBe(false);
  });
});

describe('shape', () => {
  it('should return the given Shape instance', () => {
    expect(shape(area)).toBe(area);
  });

  it('should return a Disk instance', () => {
    expect(shape({ cx: 1, cy: 2, r: 3 })).toBeInstanceOf(Disk);
  });

  it('should return a Rect instance', () => {
    expect(shape({ t: 1, l: 2, r: 3, b: 4 })).toBeInstanceOf(Rect);
  });
});

describe('pointsOf', () => {
  it('should return all points within the given shape (in xy order)', () => {
    expect(Array.from(pointsOf(area)))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]);
  });

  it('should return all points within the given shape (in yx order)', () => {
    expect(Array.from(pointsOf(area, { order: 'yx' })))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]);
  });

  it('should return all points within the given shape ([2, 1] step)', () => {
    expect(Array.from(pointsOf(area, { order: 'yx', step: { dx: 2, dy: 1 } })))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ]);
  });

  it('should return all points within the given shape ([1, 2] step)', () => {
    expect(Array.from(pointsOf(area, { order: 'yx', step: { dx: 1, dy: 2 } })))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]);
  });
});
