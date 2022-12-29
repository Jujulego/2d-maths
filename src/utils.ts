/**
 * Returns true if `obj` is an object
 * @param obj
 *
 * @internal
 */
export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj !== null;
}
