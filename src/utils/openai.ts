import { OpenAI } from "openai";
import type { Message } from "openai/resources/beta/threads/messages/messages.ts";
import type { Thread } from "openai/resources/beta/threads/threads.ts";

export let client: OpenAI;
let ASSISTANT_ID: string;

// Try to connect to the real OpenAI API, if it fails, use the mock API.
try {
  client = new OpenAI();
  ASSISTANT_ID = getAssistantId();
} catch {
  client = new OpenAI({
    baseURL: "https://mockgpt.wiremockapi.cloud/v1",
    apiKey: "sk-3eo4svsr4bah2qc9h70sdbvrf12du8o4",
  });
  ASSISTANT_ID = "";
}

function getAssistantId(): string {
  const id = Deno.env.get("ASSISTANT_ID");
  if (id === undefined) {
    throw new Error("ASSISTANT_ID is not set");
  }

  return id;
}

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
