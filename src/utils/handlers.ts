import type { FreshContext } from "$fresh/server.ts";

export type FreshContextHelper<T> = FreshContext<Record<string, unknown>, T, T>;
