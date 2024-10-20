import { Schema } from "@effect/schema";
import type { Message } from "openai/resources/beta/threads/messages.ts";
import type { Thread as OThread } from "openai/resources/beta/threads/threads.ts";
import type { FileObject as OFileObject } from "openai/resources/mod.ts";

export type FileObject = typeof FileObjectSchema.Type;
export type Thread = typeof ThreadSchema.Type;
export type ChatThread = typeof ChatThreadSchema.Type;
export type ChatMessage = typeof MessageSchema.Type;

/**
 * @remarks
 * This is a very unsafe stub.
 * It does zero validation.
 *
 * @see {@link OFileObject}
 */
export const FileObjectSchema = Schema.declare<OFileObject>(
  (_): _ is OFileObject => true,
);

/**
 * @remarks
 * This is a very unsafe stub.
 * It does zero validation.
 *
 * @see {@link OThread}
 */
export const ThreadSchema = Schema.declare<OThread>((_): _ is OThread => true);

/**
 * @remarks
 * This is a very unsafe stub.
 * It does zero validation.
 *
 * @see {@link Message}
 */
export const MessageSchema = Schema.declare<Message>((_): _ is Message => true);

/**
 * @remarks
 * This is a very unsafe stub.
 * It does zero validation.
 *
 * @see {@link MessageSchema}
 */
export const ChatThreadSchema = Schema.Array(MessageSchema);

export type {
  Message,
  Annotation,
  TextContentBlock,
} from "openai/resources/beta/threads/messages.ts";
