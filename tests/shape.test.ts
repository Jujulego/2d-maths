import { IPoint, IShape, pointsOf, Rect } from '../src';

// Utils
const shape: IShape = {
  bbox: new Rect({
    t: 3,
    l: 0,
    b: 0,
    r: 3
  }),
  contains(p: IPoint): boolean {
    return 0 <= p.x && p.x < 3 && 0 <= p.y && p.y < 3 && p.x <= p.y;
  }
};

// Tests
describe('pointsOf', () => {
  it('should return all points within the given shape (in xy order)', () => {
    expect(Array.from(pointsOf(shape)))
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
    expect(Array.from(pointsOf(shape, { order: 'yx' })))
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
    expect(Array.from(pointsOf(shape, { order: 'yx', step: { dx: 2, dy: 1 } })))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ]);
  });

  it('should return all points within the given shape ([1, 2] step)', () => {
    expect(Array.from(pointsOf(shape, { order: 'yx', step: { dx: 1, dy: 2 } })))
      .toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]);
  });
});
