import { vector, Vector } from '../src';

// Utils
describe('vector', () => {
  it('should build a Vector from an object', () => {
    const v = vector({ dx: 1, dy: 2 });

    expect(v).toBeInstanceOf(Vector);
    expect(v).toEqual({ dx: 1, dy: 2 });
  });

  it('should build a Vector from two numbers', () => {
    const v = vector(1, 2);

    expect(v).toBeInstanceOf(Vector);
    expect(v).toEqual({ dx: 1, dy: 2 });
  });
});

// Statics
describe('Vector.comparator', () => {
  const a = vector(2, 3);
  const b = vector(1, 4);

  describe('xy mode', () => {
    it('should sort array in x ascending order', () => {
      const arr = [a, b];

      expect(arr.sort(Vector.comparator('xy')))
        .toEqual([b, a]);
    });
  });

  describe('yx mode', () => {
    it('should sort array in y ascending order', () => {
      const arr = [a, b];

      expect(arr.sort(Vector.comparator('yx')))
        .toEqual([a, b]);
    });
  });
});

// Methods
describe('Vector.equals', () => {
  it('should return true', () => {
    const v = vector(1, 2);

    expect(v.equals({ dx: 1, dy: 2 }))
      .toBe(true);
  });

  it('should return false', () => {
    const v = vector(1, 2);

    expect(v.equals({ dx: 3, dy: 4 }))
      .toBe(false);
  });
});

describe('Vector.add', () => {
  it('should return sum of two vectors', () => {
    const v = vector(1, 2);

    expect(v.add({ dx: 3, dy: 4 }))
      .toEqual({ dx: 4, dy: 6 });
  });
});

describe('Vector.sub', () => {
  it('should return subtraction of two vectors', () => {
    const v = vector(1, 2);

    expect(v.sub({ dx: 3, dy: 4 }))
      .toEqual({ dx: -2, dy: -2 });
  });
});

describe('Vector.dot', () => {
  describe('with a number', () => {
    it('should return product with a number', () => {
      const v = vector(1, 2);

      expect(v.dot(3))
        .toEqual({ dx: 3, dy: 6 });
    });
  });

  describe('with a vector', () => {
    it('should return scalar product of two vectors', () => {
      const v = vector(1, 2);

      expect(v.dot({ dx: 3, dy: 4 }))
        .toBe(11);
    });
  });

  describe('with a matrix', () => {
    it('should return product with a matrix', () => {
      const v = vector(1, 2);

      expect(v.dot({ a: 1, c: 2, b: 3, d: 4, tx: 5, ty: 6 }))
        .toEqual({
          dx: 12,
          dy: 16
        });
    });
  });
});

describe('Vector.div', () => {
  it('should return division with a number', () => {
    const v = vector(1, 2);

    expect(v.div(4))
      .toEqual({ dx: 0.25, dy: 0.5 });
  });
});

// Properties
describe('Vector.isNull', () => {
  it('should return true for null vector', () => {
    expect(Vector.Null.isNull).toBe(true);
  });

  it('should return false for other vector', () => {
    const v = vector(1, 2);

    expect(v.isNull).toBe(false);
  });
});

describe('Vector.squareNorm', () => {
  it('should return squared norm of vector', () => {
    const v = vector(1, 2);

    expect(v.squareNorm).toBe(5);
  });
});

describe('Vector.norm', () => {
  it('should return norm of vector', () => {
    const v = vector(1, 2);

    expect(v.norm).toBe(Math.sqrt(5));
  });
});

describe('Vector.manhattan', () => {
  it('should return manhattan norm of vector', () => {
    const v = vector(1, 2);

    expect(v.manhattan).toBe(3);
  });
});

describe('Vector.normal', () => {
  it('should return a normal vector', () => {
    const v = vector(1, 2);

    expect(v.normal).toEqual({ dx: 2, dy: -1 });
  });
});

describe('Vector.unit', () => {
  it('should return an unit vector', () => {
    const v = vector(1, 2);

    expect(v.unit).toEqual({
      dx: 1 / Math.sqrt(5),
      dy: 2 / Math.sqrt(5)
    });
  });

  it('should a null vector for a null vector', () => {
    expect(Vector.Null.unit).toEqual(Vector.Null);
  });
});

describe('Vector.ceil', () => {
  it('should return a ceil rounded vector', () => {
    const v = new Vector({ dx: 1.5, dy: 2.5 });

    expect(v.ceil).toEqual({ dx: 2, dy: 3 });
  });
});

describe('Vector.floor', () => {
  it('should return a floor rounded vector', () => {
    const v = new Vector({ dx: 1.5, dy: 2.5 });

    expect(v.floor).toEqual({ dx: 1, dy: 2 });
  });
});
