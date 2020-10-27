/**
 * JS doesn't have a real range object so, littel helpe
 * @param {number} len
 * @param {T} fill
 * @return {Array<T>>}
 */
export function range(len, fill = '') {
  return new Array(len).fill(fill);
}
