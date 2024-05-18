import {
  type ChatThread,
  chatThreadSchema,
} from "../../utils/openai/schemas.ts";

export async function chat(
  thread: string,
  message: string,
): Promise<ChatThread | undefined> {
  try {
    const res = await fetch(
      `/api/chat/?thread=${encodeURIComponent(thread)}&q=${encodeURIComponent(
        message,
      )}`,
    );
    const json = await res.json();

    return chatThreadSchema.parse(json);
  } catch {
    return undefined;
  }
}
