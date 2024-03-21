import type { Message } from "openai/resources/beta/threads/messages/messages.ts";
import { z } from "zod";

/**
 * This is very basic, and doesn't check anything beyond that it's an object.
 */
export const messageSchema = z.custom<Message>(
  (val) => z.object({}).safeParse(val).success,
);
