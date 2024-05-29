import type { Handlers } from "fresh";
import type { FreshContextHelper } from "../../../utils/handlers.ts";
import { ask } from "../../../utils/openai/assistant.ts";
import type {
  Message,
  TextContentBlock,
} from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(
    ctx: FreshContextHelper<TextContentBlock | null>,
  ): Promise<Response> {
    const url = new URL(ctx.req.url);
    const message = url.searchParams.get("q");
    const thread_id = url.searchParams.get("thread");
    if (message === null || thread_id === null) {
      return await ctx.renderNotFound();
    }

    const response = ask(message, thread_id);
    const responses: Message[] = [];
    for await (const res of response) {
      responses.push(res);
    }

    return new Response(JSON.stringify(responses), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
