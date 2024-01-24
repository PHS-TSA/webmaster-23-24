/**
 * Maps each element of an iterable or async iterable to a new value using the provided function.
 *
 * @template T The type of the elements in the iterable.
 * @template U The type of the resulting values after mapping.
 * @param iterable The iterable or async iterable to map.
 * @param func The mapping function to apply to each element.
 * @param run The optional predicate function to determine if an element should be mapped.
 * @returns A promise that resolves to an array of the mapped values.
 */
export async function map<T, U>(
  iterable: AsyncIterable<T> | Iterable<T>,
  func: (iter: T) => Promise<U> | U,
  run: (iter: T) => boolean = (_) => true,
): Promise<U[]> {
  const promises = [];
  for await (const entry of iterable) {
    if (run(entry)) {
      const promise = func(entry);
      promises.push(promise);
    }
  }

  return Promise.all(promises);
}
