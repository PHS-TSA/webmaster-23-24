import type { Handlers } from "$fresh/server.ts";
import type { MessageContentText } from "openai/resources/beta/threads/messages/messages.ts";
import { newThread } from "../../../utils/openai.ts";
import { ask } from "../../../utils/openai.ts";

export const handler: Handlers<MessageContentText | null> = {
  async GET(req, ctx): Promise<Response> {
    const url = new URL(req.url);
    const message = url.searchParams.get("q");
    if (message === null) {
      return ctx.renderNotFound();
    }

    const thread = url.searchParams.get("thread");
    const thread_id = thread || (await newThread()).id;

    const response = await ask(message, thread_id);

    return new Response(JSON.stringify({ response }), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
