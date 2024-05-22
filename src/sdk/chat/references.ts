import {
  type FileObject,
  fileObjectSchema,
} from "../../utils/openai/schemas.ts";

export async function getFileData(
  fileId: string,
): Promise<FileObject | undefined> {
  try {
    const res = await fetch(
      `/api/chat/references/?file_id=${encodeURIComponent(fileId)}`,
    );
    const json = await res.json();

    return fileObjectSchema.parse(json);
  } catch {
    return undefined;
  }
}
