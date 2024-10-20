import { OpenAI } from "openai";
import type { FileObject, Message, Thread } from "./schemas.ts";

function getClient(): { client: OpenAI; assistant_id: string } | undefined {
  try {
    const client: OpenAI = new OpenAI({
      baseURL: Deno.env.get("OPENAI_BASE_URL"),
    });
    const assistant_id = Deno.env.get("ASSISTANT_ID");

    if (!assistant_id) {
      // Goes to the catch, then returns undefined.
      throw new Error("ASSISTANT_ID is required.");
    }

    return { client, assistant_id };
  } catch {
    return undefined;
  }
}

export const constants = getClient();

export async function newThread(client: OpenAI): Promise<Thread> {
  return await client.beta.threads.create();
}

export async function* ask(
  q: string,
  thread_id: string,
  assistant_id: string,
  client: OpenAI,
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

export async function retrieve(
  fileId: string,
  client: OpenAI,
): Promise<FileObject> {
  return await client.files.retrieve(fileId);
}
