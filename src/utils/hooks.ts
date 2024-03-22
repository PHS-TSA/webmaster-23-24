import { useSignal } from "@preact/signals";
import { useCallback, useMemo, useState } from "preact/hooks";

export function usePromise<T>(promise: Promise<T>): T | undefined {
  const status = useSignal<"pending" | "fulfilled" | "rejected">("pending");
  const result = useSignal<T | undefined>(undefined);
  const error = useSignal<unknown>(undefined);

  const fetchData = useCallback(async () => {
    try {
      result.value = await promise;
      status.value = "fulfilled";
    } catch (e) {
      error.value = e;
      status.value = "rejected";
    }
  }, [promise]);

  // Preact Signals dislike promises.
  const [dataPromise] = useState(fetchData);
  const data = useMemo(() => dataPromise, [dataPromise]);

  switch (status.value) {
    case "pending":
      throw data; // Suspend

    case "fulfilled":
      return result.value; // Result is a fulfilled promise

    case "rejected":
      throw error.value; // Result is an error
  }
}
