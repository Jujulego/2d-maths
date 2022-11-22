import { Matrix, matrix } from '../src';

// Utils
describe('matrix', () => {
  it('should build a Matrix from an object', () => {
    const m = matrix({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 5, ty: 6,
    });

    expect(m).toBeInstanceOf(Matrix);
    expect(m).toEqual({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 5, ty: 6,
    });
  });

  it('should build a Matrix from 4 numbers', () => {
    const m = matrix(
      1, 2,
      3, 4,
    );

    expect(m).toBeInstanceOf(Matrix);
    expect(m).toEqual({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 0, ty: 0,
    });
  });

  it('should build a Matrix from 6 numbers', () => {
    const m = matrix(
      1, 2,
      3, 4,
      5, 6,
    );

    expect(m).toBeInstanceOf(Matrix);
    expect(m).toEqual({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 5, ty: 6,
    });
  });
});

// Methods
describe('Matrix.equals', () => {
  it('should return true', () => {
    const m = matrix({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 0, ty: 0,
    });

    expect(m.equals({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 0, ty: 0
    }))
      .toBe(true);
  });

  it('should return false', () => {
    const m = matrix({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 0, ty: 0
    });

    expect(m.equals({
      a: 1, c: 1,
      b: 1, d: 1,
      tx: 0, ty: 0
    }))
      .toBe(false);
  });
});

describe('Matrix.add', () => {
  it('should return sum of two matrices', () => {
    const m = matrix({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 5, ty: 6
    });

    expect(m.add({
      a: 6, c: 5,
      b: 4, d: 3,
      tx: 2, ty: 1
    }))
      .toEqual({
        a: 7, b: 7,
        c: 7, d: 7,
        tx: 7, ty: 7
      });
  });
});

describe('Matrix.sub', () => {
  it('should return subtraction of two matrices', () => {
    const m = matrix({
      a: 1, c: 2,
      b: 3, d: 4,
      tx: 5, ty: 6
    });

    expect(m.sub({
      a: 6, c: 5,
      b: 4, d: 3,
      tx: 2, ty: 1
    }))
      .toEqual({
        a: -5, c: -3,
        b: -1, d:  1,
        tx: 3, ty: 5,
      });
  });
});

describe('Matrix.dot', () => {
  describe('with a number', () => {
    it('should return product with a number', () => {
      const m = matrix({
        a: 1, c: 2,
        b: 3, d: 4,
        tx: 5, ty: 6
      });

      expect(m.dot(2))
        .toEqual({
          a: 2, c: 4,
          b: 6, d: 8,
          tx: 10, ty: 12
        });
    });
  });

  describe('with a point', () => {
    it('should return product with a point', () => {
      const m = matrix({
        a: 1, c: 2,
        b: 3, d: 4,
        tx: 5, ty: 6
      });

      expect(m.dot({ x: 2, y: 3 }))
        .toEqual({ x: 16, y: 22 });
    });
  });

  describe('with a vector', () => {
    it('should return product with a vector', () => {
      const m = matrix({
        a: 1, c: 2,
        b: 3, d: 4,
        tx: 5, ty: 6
      });

      expect(m.dot({ dx: 2, dy: 3 }))
        .toEqual({ dx: 16, dy: 22 });
    });
  });

  describe('with a matrix', () => {
    it('should return product with a matrix', () => {
      const m1 = matrix({
        a: 1, c: 2,
        b: 3, d: 4,
        tx: 5, ty: 6
      });
      const m2 = matrix({
        a: 6, c: 5,
        b: 4, d: 3,
        tx: 2, ty: 1
      });

      expect(m1.dot(m2))
        .toEqual({
          a: 14, c: 11,
          b: 34, d: 27,
          tx: 56, ty: 44
        });
    });
  });
});
