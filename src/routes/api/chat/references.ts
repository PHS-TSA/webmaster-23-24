import type { Handlers } from "$fresh/server.ts";
import {
  constants as openAiConstants,
  retrieve,
} from "../../../utils/openai/assistant.ts";
import type { TextContentBlock } from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(req, ctx): Promise<Response> {
    const url = new URL(req.url);
    const fileId = url.searchParams.get("file_id");
    if (fileId === null || openAiConstants === undefined) {
      return await ctx.renderNotFound();
    }

    const { client } = openAiConstants;

    const file = await retrieve(fileId, client);

    return new Response(JSON.stringify(file), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
