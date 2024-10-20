import type { Handlers } from "$fresh/server.ts";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import {
  ask,
  constants as openAiConstants,
} from "../../../utils/openai/assistant.ts";
import type {
  Message,
  TextContentBlock,
} from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(
    req: Request,
    ctx: FreshContextHelper<TextContentBlock | null>,
  ): Promise<Response> {
    const url = new URL(req.url);
    const message = url.searchParams.get("q");
    const thread_id = url.searchParams.get("thread");
    if (
      message === null ||
      thread_id === null ||
      openAiConstants === undefined
    ) {
      return await ctx.renderNotFound();
    }

    const { client, assistant_id } = openAiConstants;

    const response = ask(message, thread_id, assistant_id, client);
    const responses: Message[] = [];
    for await (const res of response) {
      responses.push(res);
    }

    return new Response(JSON.stringify(responses), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
