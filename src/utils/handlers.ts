import type { FreshContext } from "$fresh/server.ts";

/**
 * A helper type for a fresh context.
 * Use this type in the generic in {@link Handlers}.
 *
 * @typeParam T - The type of the request.
 */
export type FreshContextHelper<T> = FreshContext<Record<string, unknown>, T, T>;
