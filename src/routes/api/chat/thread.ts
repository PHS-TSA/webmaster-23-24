import type { Handlers } from "$fresh/server.ts";
import type { TextContentBlock } from "openai/resources/beta/threads/messages/messages.ts";
import { newThread } from "../../../utils/openai.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(_req, _ctx): Promise<Response> {
    const thread = await newThread();

    return new Response(JSON.stringify({ thread_id: thread.id }), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
