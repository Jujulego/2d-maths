import { matrix, TransformMatrix, transformMatrix } from '../src';

// Utils
describe('transformMatrix', () => {
  it('should build a TransformMatrix from an object', () => {
    const m = transformMatrix({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });

    expect(m).toBeInstanceOf(TransformMatrix);
    expect(m).toEqual({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });
  });
});

// Methods
describe('TransformMatrix.equals', () => {
  it('should return true', () => {
    const m = transformMatrix({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });

    expect(m.equals({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }))
      .toBe(true);
  });

  it('should return false', () => {
    const m = transformMatrix({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });

    expect(m.equals({ a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 }))
      .toBe(false);
  });
});

describe('TransformMatrix.add', () => {
  it('should return sum of two matrices', () => {
    const m = transformMatrix({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });

    expect(m.add({ a: 6, b: 5, c: 4, d: 3, e: 2, f: 1 }))
      .toEqual({
        a: 7, b: 7,
        c: 7, d: 7,
        e: 7, f: 7
      });
  });
});

describe('TransformMatrix.sub', () => {
  it('should return subtraction of two matrices', () => {
    const m = transformMatrix({
      a: 1, b: 2,
      c: 3, d: 4,
      e: 5, f: 6
    });

    expect(m.sub({ a: 6, b: 5, c: 4, d: 3, e: 2, f: 1 }))
      .toEqual({
        a: -5, b: -3,
        c: -1, d:  1,
        e:  3, f:  5
      });
  });
});

describe('TransformMatrix.dot', () => {
  describe('with a number', () => {
    it('should return product with a number', () => {
      const m = transformMatrix(1, 2, 3, 4, 5, 6);

      expect(m.dot(2))
        .toEqual({
          a:  2, b:  4,
          c:  6, d:  8,
          e: 10, f: 12
        });
    });
  });

  describe('with a point', () => {
    it('should return product with a point', () => {
      const m = transformMatrix(
        1, 2,
        3, 4,
        5, 6
      );

      expect(m.dot({ x: 2, y: 3 }))
        .toEqual({ x: 16, y: 22 });
    });
  });

  describe('with a vector', () => {
    it('should return product with a vector', () => {
      const m = transformMatrix(
        1, 2,
        3, 4,
        5, 6
      );

      expect(m.dot({ dx: 2, dy: 3 }))
        .toEqual({ dx: 16, dy: 22 });
    });
  });

  describe('with a matrix', () => {
    it('should return product with a matrix', () => {
      const m1 = transformMatrix(
        1, 2,
        3, 4,
        5, 6,
      );
      const m2 = matrix(
        4, 3,
        2, 1
      );

      expect(m1.dot(m2))
        .toEqual({
          a:  8, b:  5,
          c: 20, d: 13,
          e: 32, f: 21
        });
    });
  });
});
