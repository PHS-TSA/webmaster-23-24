import type { Message } from "openai/resources/beta/threads/messages.ts";
import type { Thread as OThread } from "openai/resources/beta/threads/threads.ts";
import type { FileObject as OFileObject } from "openai/resources/mod.ts";
import { z } from "zod";

export type FileObject = z.infer<typeof fileObjectSchema>;
export type Thread = z.infer<typeof threadSchema>;
export type ChatThread = z.infer<typeof chatThreadSchema>;

/**
 * @remarks
 * This is very basic, and doesn't check anything beyond that it's an object.
 *
 * @see {@link OFileObject}
 */
export const fileObjectSchema = z.custom<OFileObject>(
  (val) => z.object({}).safeParse(val).success,
);

/**
 * @remarks
 * This is very basic, and doesn't check anything beyond that it's an object.
 *
 * @see {@link OThread}
 */
export const threadSchema = z.custom<OThread>(
  (val) => z.object({}).safeParse(val).success,
);

/**
 * @remarks
 * This is very basic, and doesn't check anything beyond that it's an array of objects.
 */
export const chatThreadSchema = z.custom<Message[]>(
  (val) => z.object({}).array().safeParse(val).success,
);

export type {
  Message,
  Annotation,
  TextContentBlock,
} from "openai/resources/beta/threads/messages.ts";
