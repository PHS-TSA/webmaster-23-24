import type { MessageContentText } from "openai/resources/beta/threads/messages/messages.ts";
import { z } from "zod";

/**
 * This is very basic, and doesn't check anything beyond that it's an object.
 */
export const messageContentTextSchema = z.custom<MessageContentText>(
  (val) => z.object({}).safeParse(val).success,
);
