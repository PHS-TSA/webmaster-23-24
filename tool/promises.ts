export async function map<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  func: (iter: T) => Promise<U>,
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
