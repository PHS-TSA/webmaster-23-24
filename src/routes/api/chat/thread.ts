import type { Handlers } from "fresh";
import { newThread } from "../../../utils/openai/assistant.ts";
import type { TextContentBlock } from "../../../utils/openai/schemas.ts";

export const handler: Handlers<TextContentBlock | null> = {
  async GET(_ctx): Promise<Response> {
    const thread = await newThread();

    return new Response(JSON.stringify(thread), {
      headers: new Headers([["Content-Type", "application/json"]]),
    });
  },
};
