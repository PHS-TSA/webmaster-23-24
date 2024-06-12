import { type WalkEntry, type WalkOptions, walk } from "@std/fs";
import { type Cause, Effect, Stream } from "effect";

export const writeTextFile = (
  path: string | URL,
  data: string | ReadableStream<string>,
  options?: Deno.WriteFileOptions,
): Effect.Effect<void, Cause.UnknownException, never> =>
  Effect.tryPromise(() => Deno.writeTextFile(path, data, options));

export const readTextFile = (
  path: string | URL,
  options?: Deno.ReadFileOptions,
): Effect.Effect<string, Cause.UnknownException, never> =>
  Effect.tryPromise(() => Deno.readTextFile(path, options));

export const walkDir = <E>(
  root: string | URL,
  onError: (e: unknown) => E,
  walkOptions?: WalkOptions,
): Stream.Stream<WalkEntry, E, never> =>
  Stream.fromAsyncIterable(walk(root, walkOptions), onError);
