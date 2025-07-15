export { chunk, chunkString, zip, pad, mapObject, mapToObject };
declare function chunk<T>(array: T[], size: number): T[][];
declare function chunkString(str: string, size: number): string[];
declare function zip<T, S>(a: T[], b: S[]): [T, S][];
declare function pad<T>(array: T[], size: number, value: T): T[];
declare function mapObject<T extends Record<string, any>, F extends <K extends keyof T>(value: T[K], key: K, i: number) => any>(t: T, fn: F): { [K in keyof T]: ReturnType<F>; };
declare function mapToObject<Key extends string | number | symbol, F extends <K extends Key>(key: K, i: number) => any>(keys: Key[], fn: F): { [K in Key]: ReturnType<F>; };
