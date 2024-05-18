import { type Thread, threadSchema } from "../../utils/openai/schemas.ts";

export async function getThread(): Promise<Thread | undefined> {
  try {
    const res = await fetch("/api/chat/thread/");
    const json = await res.json();

    return threadSchema.parse(json);
  } catch {
    return undefined;
  }
}
