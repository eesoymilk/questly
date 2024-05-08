// CamelCase conversion utility
export type CamelCase<S extends string> =
  S extends `${infer P}_${infer Q}${infer R}`
    ? `${P}${Capitalize<CamelCase<`${Q}${R}`>>}`
    : S;

// Recursive Snake to Camel Case conversion utility
export type SnakeToCamelCase<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K] extends (infer U)[]
    ? SnakeToCamelCase<U>[]
    : T[K] extends object
      ? SnakeToCamelCase<T[K]>
      : T[K];
};
