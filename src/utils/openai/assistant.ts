import { OpenAI } from "openai";
import type { FileObject, Message, Thread } from "./schemas.ts";

export const client: OpenAI = new OpenAI({
  baseURL: Deno.env.get("OPENAI_BASE_URL"),
});
const ASSISTANT_ID = Deno.env.get("ASSISTANT_ID") ?? "";

export async function newThread(): Promise<Thread> {
  return await client.beta.threads.create();
}

export async function* ask(
  q: string,
  thread_id: string,
  assistant_id: string = ASSISTANT_ID,
): AsyncGenerator<Message, void, unknown> {
  await client.beta.threads.messages.create(thread_id, {
    role: "user",
    content: q,
  });
  let run = await client.beta.threads.runs.create(thread_id, {
    assistant_id,
  });

  // TODO(lishaduck): Poll on the client
  while (
    run.status === "in_progress" ||
    run.status === "queued" ||
    run.status === "requires_action"
  ) {
    // Make sure we don't poll too frequently.
    // deno-lint-ignore no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Polling is required, as streaming is not yet supported.
    // deno-lint-ignore no-await-in-loop
    run = await client.beta.threads.runs.retrieve(thread_id, run.id);
  }

  for await (const message of client.beta.threads.messages.list(thread_id)) {
    yield message;
  }
}

export async function retrieve(fileId: string): Promise<FileObject> {
  return await client.files.retrieve(fileId);
}
