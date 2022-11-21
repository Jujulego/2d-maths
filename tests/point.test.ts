import { point, Point } from '../src';

// Utils
describe('point', () => {
  it('should build a Point from an object', () => {
    const p = point({ x: 1, y: 2 });

    expect(p).toBeInstanceOf(Point);
    expect(p).toEqual({ x: 1, y: 2 });
  });

  it('should build a Point from two numbers', () => {
    const p = point(1, 2);

    expect(p).toBeInstanceOf(Point);
    expect(p).toEqual({ x: 1, y: 2 });
  });
});

// Statics
test('Point.from', () => {
  const event = {
    mouseX: 5,
    mouseY: 6,
  };

  expect(Point.from('mouse', event))
    .toEqual({ x: 5, y: 6 });
});

describe('Point.comparator', () => {
  const a = point(2, 3);
  const b = point(1, 4);

  describe('xy mode', () => {
    it('should sort array in x ascending order', () => {
      const arr = [a, b];

      expect(arr.sort(Point.comparator('xy')))
        .toEqual([b, a]);
    });
  });

  describe('yx mode', () => {
    it('should sort array in y ascending order', () => {
      const arr = [a, b];

      expect(arr.sort(Point.comparator('yx')))
        .toEqual([a, b]);
    });
  });
});

// Methods
describe('Point.equals', () => {
  it('should return true', () => {
    const p = point(1, 2);

    expect(p.equals({ x: 1, y: 2 }))
      .toBe(true);
  });

  it('should return false', () => {
    const p = point(1, 2);

    expect(p.equals({ x: 3, y: 4 }))
      .toBe(false);
  });
});

describe('Point.add', () => {
  it('should return new point moved toward a vector', () => {
    const p = point(1, 2);

    expect(p.add({ dx: 3, dy: 4 }))
      .toEqual({ x: 4, y: 6 });
  });
});

describe('Point.sub', () => {
  it('should return the vector going from b to a', () => {
    const a = point(1, 2);

    expect(a.sub(/* b */ { x: 3, y: 4 }))
      .toEqual({ dx: -2, dy: -2 });
  });
});

describe('Point.dot', () => {
  it('should return product with a matrix', () => {
    const a = point(1, 2);

    expect(a.dot({ a: 1, b: 2, c: 3, d: 4 }))
      .toEqual({
        x: 7,
        y: 10
      });
  });
});

// Properties
describe('Point.isOrigin', () => {
  it('should return true for origin', () => {
    expect(Point.Origin.isOrigin).toBe(true);
  });

  it('should return false for other point', () => {
    const p = point(1, 2);

    expect(p.isOrigin).toBe(false);
  });
});
