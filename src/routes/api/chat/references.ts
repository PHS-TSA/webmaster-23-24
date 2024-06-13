import type { Handlers } from "fresh";
import { retrieve } from "../../../utils/openai/assistant.ts";
import type { TextContentBlock } from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(ctx): Promise<Response> {
    const url = new URL(ctx.req.url);
    const fileId = url.searchParams.get("file_id");
    if (fileId === null) {
      return await ctx.renderNotFound();
    }

    const file = await retrieve(fileId);

    return new Response(JSON.stringify(file), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
