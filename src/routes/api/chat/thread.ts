import type { Handlers } from "$fresh/server.ts";
import {
  newThread,
  constants as openAiConstants,
} from "../../../utils/openai/assistant.ts";
import type { TextContentBlock } from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(_req, ctx): Promise<Response> {
    if (openAiConstants === undefined) {
      return await ctx.renderNotFound();
    }

    const { client } = openAiConstants;

    const thread = await newThread(client);

    return new Response(JSON.stringify(thread), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
