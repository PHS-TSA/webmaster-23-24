import type { FreshContext } from "fresh";

/**
 * A helper type for a fresh context.
 * Use this type in the generic in {@linkcode Handlers}.
 *
 * @typeParam T - The type of the request.
 */
export type FreshContextHelper<T> = FreshContext<Record<string, unknown>, T, T>;
