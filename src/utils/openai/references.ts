import type {
  Annotation,
  Message,
  TextContentBlock,
} from "openai/resources/beta/threads/messages/messages.ts";
import { getFileData } from "../../sdk/chat/references.ts";

type AnnotationReplacement = { regex: RegExp; citation: string };

async function handleAnnotation(
  annotation: Annotation,
): Promise<AnnotationReplacement> {
  const isFullCitation = annotation.type === "file_citation";
  const isEmptyText = isFullCitation && annotation.file_citation.quote === "";

  const fileId = isFullCitation
    ? annotation.file_citation.file_id
    : annotation.file_path.file_id;

  const citedFile = await getFileData(fileId);

  if (citedFile === undefined) {
    throw new Error(`File with ID ${fileId} not found`);
  }

  const citation =
    isFullCitation && !isEmptyText
      ? `(${annotation.file_citation.quote} from ${citedFile.filename})`
      : `(from ${citedFile.filename})`;

  return { regex: new RegExp(annotation.text, "g"), citation: ` ${citation}` };
}

export async function formatRefs(message: Message): Promise<string> {
  const promises: Promise<AnnotationReplacement>[] = [];

  // Iterate over all content blocks
  for (const contentBlock of message.content) {
    if (contentBlock.type !== "text") {
      throw new Error();
    }

    // Extract the message content
    const messageContent = contentBlock.text;

    // Map over the annotations to create an array of promises
    promises.push(...messageContent.annotations.map(handleAnnotation));
  }

  const replacements = await Promise.all(promises);

  // Apply all replacements to the message content
  let formattedMessage = message.content
    .map((contentBlock) => (contentBlock as TextContentBlock).text.value)
    .join(" ");

  for (const { regex, citation } of replacements) {
    formattedMessage = formattedMessage.replace(regex, citation);
  }

  return formattedMessage;
}
