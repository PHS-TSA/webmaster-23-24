import {
  type ChatThread,
  chatThreadSchema,
} from "../../utils/openai/schemas.ts";

export async function chat(
  thread: string,
  message: string,
): Promise<ChatThread | undefined> {
  const res = await fetch(
    `/api/chat/?thread=${encodeURIComponent(thread)}&q=${encodeURIComponent(
      message,
    )}`,
  );
  const json = await res.json();
  const unparsed = chatThreadSchema.safeParse(json);

  if (unparsed.success) {
    return unparsed.data;
  }

  return undefined;
}
