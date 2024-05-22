import { OpenAI } from "openai";
import type { FileObject, Message, Thread } from "./schemas.ts";

const client: OpenAI = new OpenAI({
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
  await client.beta.threads.runs.createAndPoll(thread_id, {
    assistant_id,
  });

  for await (const message of client.beta.threads.messages.list(thread_id)) {
    yield message;
  }
}

export async function retrieve(fileId: string): Promise<FileObject> {
  return await client.files.retrieve(fileId);
}
