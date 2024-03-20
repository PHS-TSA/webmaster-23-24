import type { Annotation } from "openai/resources/beta/threads/messages/messages.ts";
import { client } from "../openai.ts";

export async function formatRefs(
  threadId: string,
  messageId: string,
): Promise<string> {
  // Retrieve the message object
  const message = await client.beta.threads.messages.retrieve(
    threadId,
    messageId,
  );

  if (message.content[0]?.type !== "text") {
    throw new Error();
  }

  // Extract the message content
  const messageContent = message.content[0]?.text;
  const annotations = messageContent.annotations;
  const citations: string[] = [];

  // Define an async function that handles each annotation
  async function handleAnnotation(
    annotation: Annotation,
    index: number,
  ): Promise<void> {
    switch (annotation.type) {
      case "file_citation": {
        const fileCitation = annotation.file_citation;
        const citedFile = await client.files.retrieve(fileCitation.file_id);
        citations.push(
          `[${index}] ${fileCitation.quote} from ${citedFile.filename}`,
        );
        break;
      }
      case "file_path": {
        const filePath = annotation.file_path;
        const citedFile = await client.files.retrieve(filePath.file_id);
        citations.push(
          `[${index}] Click <here> to download ${citedFile.filename}`,
        );
        break;
      }
    }
  }

  // Map over the annotations to create an array of promises
  await Promise.all(annotations.map(handleAnnotation));

  // Add footnotes to the end of the message before displaying to user
  messageContent.value += `\n${citations.join("\n")}`;

  return messageContent.value;
}
