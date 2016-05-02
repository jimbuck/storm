/**
 * Returns a random element from the array.
 */
export declare function random<T>(source: T[]): T;
/**
 * Shuffles an array in place.
 * @param {Array} source items The array containing the items.
 */
export declare function shuffle<T>(source: T[]): T[];
/**
 * Sorts the provided array by a particular property.
 */
export declare function sort(source: any[], prop: string, desc?: boolean): any[];
