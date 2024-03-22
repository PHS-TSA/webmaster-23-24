import { type Thread, threadSchema } from "../../utils/openai/schemas.ts";

export async function getThread(): Promise<Thread | undefined> {
  const res = await fetch("/api/chat/thread/");
  const json = await res.json();
  const unparsed = threadSchema.safeParse(json);

  if (unparsed.success) {
    return unparsed.data;
  }

  return undefined;
}
