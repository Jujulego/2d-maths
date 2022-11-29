import { Disk, disk } from '../src';

// Utils
describe('disk', () => {
  it('should build a Disk from an object', () => {
    const d = disk({ cx: 1, cy: 2, r: 3 });

    expect(d).toBeInstanceOf(Disk);
    expect(d).toEqual({ cx: 1, cy: 2, r: 3 });
  });

  it('should build a Disk from a point and a rayon', () => {
    const d = disk({ x: 1, y: 2 }, 3);

    expect(d).toBeInstanceOf(Disk);
    expect(d).toEqual({ cx: 1, cy: 2, r: 3 });
  });
});

// Methods
describe('Disk.equals', () => {
  it('should return true', () => {
    const d = new Disk({ cx: 1, cy: 2, r: 3 });

    expect(d.equals({ cx: 1, cy: 2, r: 3 }))
      .toBe(true);
  });

  it('should return false', () => {
    const d = new Disk({ cx: 1, cy: 2, r: 3 });

    expect(d.equals({ cx: 1, cy: 1, r: 1 }))
      .toBe(false);
  });
});

describe('Disk.contains', () => {
  it('should return true', () => {
    const d = new Disk({ cx: 1, cy: 2, r: 3 });

    expect(d.contains({ x: 1, y: 2 })).toBe(true);
    expect(d.contains({ x: 4, y: 2 })).toBe(true);
    expect(d.contains({ x: 1, y: 5 })).toBe(true);
    expect(d.contains({ x: 4, y: 3 }, { dx: 1, dy: 1 })).toBe(true);
    expect(d.contains({ x: 2, y: 5 }, { dx: 1, dy: 1 })).toBe(true);
  });

  it('should return false', () => {
    const d = new Disk({ cx: 1, cy: 2, r: 3 });

    expect(d.contains({ x: 10, y: 10 })).toBe(false);
    expect(d.contains({ x: 5, y: 2 })).toBe(false);
    expect(d.contains({ x: 1, y: 6 })).toBe(false);
    expect(d.contains({ x: 4, y: 3 })).toBe(false);
    expect(d.contains({ x: 2, y: 5 })).toBe(false);
    expect(d.contains({ x: 4, y: 4 }, { dx: 1, dy: 1 })).toBe(false);
    expect(d.contains({ x: 3, y: 5 }, { dx: 1, dy: 1 })).toBe(false);
  });
});

// Properties
test('Disk.center', () => {
  const d = new Disk({ cx: 1, cy: 2, r: 3 });
  expect(d.center).toEqual({ x: 1, y: 2 });
});

test('Disk.r', () => {
  const d = new Disk({ cx: 1, cy: 2, r: 3 });
  expect(d.r).toBe(3);
});

test('Disk.bbox', () => {
  const d = new Disk({ cx: 1, cy: 2, r: 3 });
  expect(d.bbox).toEqual({ t: 6, l: -2, r: 5, b: -1 });
});
