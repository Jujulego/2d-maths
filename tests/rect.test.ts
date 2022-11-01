import { point, Rect, rect, vector } from '../src';

// Utils
describe('rect', () => {
  it('should build a Rect from an object', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 1, l: 0, r: 1, b: 0 });
  });

  it('should build a Rect from two points', () => {
    const r = rect(point(1, 0), point(0, 1));

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 1, l: 0, r: 1, b: 0 });
  });

  it('should build a Rect from a point and a vector', () => {
    const r = rect(point(0, 0), vector(1, 1));

    expect(r).toBeInstanceOf(Rect);
    expect(r).toEqual({ t: 1, l: 0, r: 1, b: 0 });
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
  it('should return true', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r.contains({ x: 0.5, y: 0.5 }))
      .toBe(true);
  });

  it('should return false', () => {
    const r = rect({ t: 1, l: 0, r: 1, b: 0 });

    expect(r.contains({ x: 1.5, y: 0.5 }))
      .toBe(false);
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
