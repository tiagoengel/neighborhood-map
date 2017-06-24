/**
 * Check if value is a ko observer and executes it or returns
 * the received value otherwise.
 *
 * @param {Function|any} maybeValue function or value.
 */
export function get(maybeValue) {
  return typeof maybeValue === 'function'
     ? maybeValue()
     : maybeValue;
}
