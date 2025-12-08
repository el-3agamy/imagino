export type RemoveBackgroundArgs = {
  imageFile?: File | Blob | null;
  imageId?: string | null;
};

export type RemoveBackgroundEdit = {
  operation?: string;
  provider?: string;
  [key: string]: unknown;
};

export type RemoveBackgroundResult = {
  id: string | null;
  url: string;
  filename: string;
  aiEdits: RemoveBackgroundEdit[];
  raw: unknown;
};

export class RemoveBackgroundError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "RemoveBackgroundError";
    this.status = status;
  }
}

const FALLBACK_ERROR_MESSAGE = "Failed to remove background";

export async function removeBackground(
  args: RemoveBackgroundArgs,
): Promise<RemoveBackgroundResult> {
  const { imageFile, imageId } = args;

  if (!imageFile && !imageId) {
    throw new RemoveBackgroundError("Provide an image file or an image id to process", 400);
  }

  const formData = new FormData();

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  if (!imageFile && imageId) {
    formData.append("imageId", imageId);
  }

  const response = await fetch("/api/remove-background", {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (data as { message?: string })?.message || FALLBACK_ERROR_MESSAGE;
    throw new RemoveBackgroundError(message, response.status);
  }

  const resultPayload = (data as { result?: any })?.result ?? data;

  const url =
    resultPayload?.url ||
    resultPayload?.imageUrl ||
    resultPayload?.profileImage ||
    resultPayload?.image?.url;

  if (!url) {
    throw new RemoveBackgroundError("No processed image returned from the server", 502);
  }

  const id = resultPayload?._id ?? resultPayload?.image?._id ?? null;
  const filename = resultPayload?.filename ?? resultPayload?.image?.filename ?? "";
  const aiEdits: RemoveBackgroundEdit[] = Array.isArray(resultPayload?.aiEdits)
    ? resultPayload.aiEdits
    : Array.isArray(resultPayload?.image?.aiEdits)
      ? resultPayload.image.aiEdits
      : [];

  return {
    id,
    url,
    filename,
    aiEdits,
    raw: resultPayload,
  };
}
