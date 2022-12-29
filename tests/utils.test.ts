import { isObject } from '../src/utils';

// Tests
describe('isObject', () => {
  it('should return true for an object', () => {
    expect(isObject({ a: true })).toBe(true);
  });

  it('should return false for a number', () => {
    expect(isObject(5)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });
});
