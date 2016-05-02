
/**
 * Returns a random element from the array.
 */
export function random<T>(source: T[]): T {
  if (!source || source.length === 0) {
    throw new Error(`'source' must have at least one element!`);
  }

  return source[Math.floor(Math.random() * source.length)];
}

/**
 * Shuffles an array in place.
 * @param {Array} source items The array containing the items.
 */
export function shuffle<T>(source: T[]): T[] {
  let result = new Array(source.length);
  let randomIndex: number, temp: T, end: number;
  for (end = source.length; end; end -= 1) {
    randomIndex = Math.floor(Math.random() * end);
    temp = source[end - 1];
    source[end - 1] = source[randomIndex];
    source[randomIndex] = temp;
  }

  return source;
}

/**
 * Sorts the provided array by a particular property.
 */
export function sort(source: any[], prop: string, desc?: boolean) {
  return source.sort((a, b) => {
    return (a[prop] - b[prop]) * (desc ? -1 : 1);
  });
}