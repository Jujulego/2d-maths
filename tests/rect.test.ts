import { point, Rect, rect, vector } from '../src';

// Utils
describe('rect', () => {
  it('should build a Rect from an object', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 1, l: 0, r: 1, b: 0 });
  });

  it('should build a Rect from two points', () => {
    const r = rect(point(1, 0), point(0, 2));

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 2, l: 0, r: 1, b: 0 });
  });

  it('should build a Rect from a point and a vector', () => {
    const r = rect(point(0, 0), vector(2, 1));

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 1, l: 0, r: 2, b: 0 });
  });
});

// Statics
describe('Rect.from', () => {
  it('should build from tlrb holder (top left right bottom)', () => {
    const dom = {
      screenTop: 10,
      screenLeft: 0,
      screenRight: 10,
      screenBottom: 0,
    };

    expect(Rect.from('screen', dom))
      .toEqual({
        t: 10,
        l: 0,
        r: 10,
        b: 0
      });
  });

  it('should build from tlwh holder (top left width height)', () => {
    const dom = {
      screenTop: 10,
      screenLeft: 0,
      screenWidth: 10,
      screenHeight: 10,
    };

    expect(Rect.from('screen', dom))
      .toEqual({
        t: 10,
        l: 0,
        r: 10,
        b: 0
      });
  });
});

// Methods
describe('Rect.equals', () => {
  it('should return true', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r.equals({ t: 1, l: 0, r: 1, b: 0 }))
      .toBe(true);
  });

  it('should return false', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r.equals({ t: 2, l: 0, r: 1, b: 0 }))
      .toBe(false);
  });
});

describe('Rect.contains', () => {
  describe('a Point', () => {
    it('should return true', () => {
      const r = rect({ t: 1, l: 0, r: 1, b: 0 });

      expect(r.contains({ x: 0.5, y: 0.5 }))
        .toBe(true);
    });

    it('should return false (x > t)', () => {
      const r = rect({ t: 1, l: 0, r: 1, b: 0 });

      expect(r.contains({ x: 1.5, y: 0.5 }))
        .toBe(false);
    });

    it('should return false (y > r)', () => {
      const r = rect({ t: 1, l: 0, r: 1, b: 0 });

      expect(r.contains({ x: 0.5, y: 1.5 }))
        .toBe(false);
    });
  });

  describe('a Rect', () => {
    it('should return true', () => {
      const r = rect({ t: 1, l: 0, r: 1, b: 0 });

      expect(r.contains({ t: 0.75, l: 0.25, r: 0.75, b: 0.25 }))
        .toBe(true);
    });

    it('should return false', () => {
      const r = rect({ t: 1, l: 0, r: 1, b: 0 });

      expect(r.contains({ t: 1.75, l: 0.25, r: 0.75, b: 0.25 }))
        .toBe(false);
    });
  });
});

describe('Rect.intersect', () => {
  it('should return intersection between 2 rects', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: 1.5, l: 0.5, r: 1.5, b: 0.5 });

    expect(a.intersect(b)).toEqual({
      t: 1,
      l: 0.5,
      r: 1,
      b: 0.5
    });
  });

  it('should return b as b is within a', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: 0.75, l: 0.25, r: 0.75, b: 0.25 });

    expect(a.intersect(b)).toEqual(b);
  });

  it('should return null as b is over a', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: 1.75, l: 0.25, r: 0.75, b: 1.25 });

    expect(a.intersect(b)).toBeNull();
  });

  it('should return null as b is bellow a', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: -0.25, l: 0.25, r: 0.75, b: -0.75 });

    expect(a.intersect(b)).toBeNull();
  });

  it('should return null as b is to the right of a', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: 0.75, l: 1.25, r: 1.75, b: 0.25 });

    expect(a.intersect(b)).toBeNull();
  });

  it('should return null as b is to the left of a', () => {
    const a = rect({ t: 1, l: 0, r: 1, b: 0 });
    const b = rect({ t: 0.75, l: -0.75, r: -0.25, b: 0.25 });

    expect(a.intersect(b)).toBeNull();
  });
});

// Properties
test('Rect.tl', () => {
  const r = rect({ t: 1, l: 0, r: 1, b: 0 });
  expect(r.tl).toEqual({ x: 0, y: 1 });
});

test('Rect.tr', () => {
  const r = rect({ t: 1, l: 0, r: 1, b: 0 });
  expect(r.tr).toEqual({ x: 1, y: 1 });
});

test('Rect.br', () => {
  const r = rect({ t: 1, l: 0, r: 1, b: 0 });
  expect(r.br).toEqual({ x: 1, y: 0 });
});

test('Rect.bl', () => {
  const r = rect({ t: 1, l: 0, r: 1, b: 0 });
  expect(r.bl).toEqual({ x: 0, y: 0 });
});

test('Rect.size', () => {
  const r = rect({ t: 1, l: 0, r: 1, b: 0 });
  expect(r.size).toEqual({ dx: 1, dy: 1 });
});
