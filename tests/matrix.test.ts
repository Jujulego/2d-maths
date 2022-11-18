import { Matrix, matrix } from '../src';

// Utils
describe('matrix', () => {
  it('should build a Matrix from an object', () => {
    const m = matrix({
      a: 1, b: 2,
      c: 3, d: 4
    });

    expect(m).toBeInstanceOf(Matrix);
    expect(m).toEqual({
      a: 1, b: 2,
      c: 3, d: 4
    });
  });
});

// Methods
describe('Matrix.equals', () => {
  it('should return true', () => {
    const m = matrix({
      a: 1, b: 2,
      c: 3, d: 4
    });

    expect(m.equals({ a: 1, b: 2, c: 3, d: 4 }))
      .toBe(true);
  });

  it('should return false', () => {
    const m = matrix({
      a: 1, b: 2,
      c: 3, d: 4
    });

    expect(m.equals({ a: 1, b: 1, c: 1, d: 1 }))
      .toBe(false);
  });
});

describe('Matrix.add', () => {
  it('should return sum of two matrices', () => {
    const m = matrix({
      a: 1, b: 2,
      c: 3, d: 4
    });

    expect(m.add({ a: 4, b: 3, c: 2, d: 1 }))
      .toEqual({
        a: 5, b: 5,
        c: 5, d: 5
      });
  });
});

describe('Matrix.sub', () => {
  it('should return subtraction of two matrices', () => {
    const m = matrix({
      a: 1, b: 2,
      c: 3, d: 4
    });

    expect(m.sub({ a: 4, b: 3, c: 2, d: 1 }))
      .toEqual({
        a: -3, b: -1,
        c:  1, d:  3
      });
  });
});

describe('Matrix.dot', () => {
  describe('with a number', () => {
    it('should return product with a number', () => {
      const m = matrix(1, 2, 3, 4);

      expect(m.dot(2))
        .toEqual({
          a: 2, b: 4,
          c: 6, d: 8
        });
    });
  });

  describe('with a point', () => {
    it('should return product with a point', () => {
      const m = matrix(
        1, 2,
        3, 4
      );

      expect(m.dot({ x: 2, y: 3 }))
        .toEqual({ x: 11, y: 16 });
    });
  });

  describe('with a vector', () => {
    it('should return product with a vector', () => {
      const m = matrix(
        1, 2,
        3, 4
      );

      expect(m.dot({ dx: 2, dy: 3 }))
        .toEqual({ dx: 11, dy: 16 });
    });
  });

  describe('with a matrix', () => {
    it('should return product with a matrix', () => {
      const m1 = matrix(
        1, 2,
        3, 4
      );
      const m2 = matrix(
        4, 3,
        2, 1
      );

      expect(m1.dot(m2))
        .toEqual({
          a:  8, b:  5,
          c: 20, d: 13
        });
    });
  });
});
