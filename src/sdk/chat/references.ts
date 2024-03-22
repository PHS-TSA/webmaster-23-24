import {
  type FileObject,
  fileObjectSchema,
} from "../../utils/openai/schemas.ts";

export async function getFileData(
  fileId: string,
): Promise<FileObject | undefined> {
  const res = await fetch(
    `/api/chat/references/?file_id=${encodeURIComponent(fileId)}`,
  );
  const json = await res.json();
  const unparsed = fileObjectSchema.safeParse(json);

  if (unparsed.success) {
    return unparsed.data;
  }

  return undefined;
}
