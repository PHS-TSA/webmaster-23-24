/**
 * Capitalize the first letter of each word in a string.
 *
 * @description
 * This function is a type-safe way to capitalize the first letter of each word in a string.
 *
 * @remarks
 * This function is very naïve and does not take into account any special cases like _the_ or _a_.
 * It simply capitalizes the first letter of each and every word.
 *
 *
 * @param str - the string to capitalize.
 * @returns the capitalized string.
 *
 */
export function capitalize<const T extends string>(str: T): ToCaps<T> {
  return str.replace(/\b\w/g, (char) => char.toUpperCase()) as ToCaps<T>;
}

export type ToCaps<S extends string> = S extends `${infer Head} ${infer Tail}`
  ? `${Capitalize<Head>} ${ToCaps<Tail>}`
  : Capitalize<S>;
