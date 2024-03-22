import { IS_BROWSER } from "$fresh/runtime.ts";
import { get, set } from "idb-keyval";
import { type Inputs, useCallback } from "preact/hooks";
import { usePromise } from "./hooks.ts";

/**
 * Use a value from the IndexedDB.
 * If the value doesn't exist, set it to the default.
 *
 * @remarks
 * Unfortunately, this can't distinguish between nonexistent values and existent undefined values!
 * Use with caution!
 *
 * @param key - The key of the item to fetch.
 * @param def - A function returning a promise that might resolve to the default.
 */
export function useIndexedDB<T>(
  key: string,
  inputs: Inputs,
  def?: () => Promise<T | undefined>,
): T | undefined {
  if (!IS_BROWSER) {
    throw new Error("This is browser-only!");
  }

  const callback = useCallback(async () => {
    const val = await get<T>(key);

    if (val === undefined && def !== undefined) {
      const defaultValue = await def();
      if (defaultValue !== undefined) {
        await set(key, defaultValue);
        return defaultValue;
      }
    }

    return val;
  }, [key, def, inputs]);

  return usePromise(callback());
}
