import type { z } from "zod";
import { messageSchema } from "../../utils/openai-schemas.ts";

export type ChatThread = z.infer<typeof chatThreadSchema>;

export const chatThreadSchema = messageSchema.array();

export async function chat(
  thread: string,
  message: string,
): Promise<ChatThread | undefined> {
  const res = await fetch(
    `/api/chat/?thread=${thread}&q=${encodeURIComponent(message)}`,
  );

  return await res.json();
}
