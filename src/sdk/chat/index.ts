import { z } from "zod";
import { useFetchData } from "../../utils/hooks.ts";
import { messageContentTextSchema } from "../../utils/openai-schemas.ts";

export type UseChat = z.infer<typeof useChatSchema>;

export const useChatSchema = z.object({
  response: messageContentTextSchema,
  thread_id: z.string(),
});

export function useChat(
  message: string,
  thread: string | undefined,
): UseChat | undefined {
  return useFetchData<UseChat>(
    `/api/chat/?${thread ? `thread=${thread}&` : ""}q=${encodeURIComponent(
      message,
    )}`,
  );
}
