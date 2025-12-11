'use server';
import { fetchApi } from '@/utils/fetchApi';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';
import { RemoveBgHistoryItem } from '@/types/removeBgHistory';
import { RemoveBgJobStatus, RemoveBgJobType } from "@/types/removeBgHistory";

import type { SuitableBackgroundHistoryItem, SuitableBackgroundJobStatus } from '@/types/suitableBgHistory';
import { ChangeStyleHistoryItem } from '@/types/changeStyleAnimeHistory';
import { ExtractTextHistoryItem } from '@/types/extractTextFromBgHistory';
import { RecognizeItemsHistoryItem } from '@/types/RecognizeItemsHistory';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
console.log(baseUrl);

type UploadImageNoBgResponse = {
  message: string;
  status: number;
  result: {
    _id: string;
    url: string;
    storageKey: string;
    aiEdits?: {
      operation: string;
      provider: string;
      timestamp: string;
      processingTime: number;
      cost: number;
      _id: string;
      id: string;
    }[];
  };
};


type SuitableBackgroundApiResponse = {
    message: string;
    status: number;
    errMsg?: string;
    errors?: Record<string, string>;
    result?: {
        sourceImage: {
            _id: string;
            url: string;
            // ...other fields as needed
        };
        backgroundImage: {
            _id: string;
            url: string;
            createdAt: string;
            status?: string;
            aiEdits?: { timestamp: string }[];
            // ...other fields as needed
        };
    };
};


type ChangeImageStyleResponse = {
    message: string;
    status: number;
    result: {
        original: {
            _id: string;
            url: string;
            storageKey: string;
            filename: string;
            originalFilename: string;
            mimeType: string;
            size: number;
            aiEdits: any[];
            status: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            id: string;
        };
        enhanced: {
            _id: string;
            url: string;
            storageKey: string;
            filename: string;
            originalFilename: string;
            mimeType: string;
            size: number;
            aiEdits: any[];
            status: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            id: string;
            version?: number;

        };
    };
};


type ExtractTextResponse = {
  message: string;
  status: number;
  result: {
    text: {
      containsText: boolean;
      extractedText: string;
    };
  };
};


export type RecognizeItemsResponse = {
  message: string;
  status: number;
  result: {
    text: {
      items: {
        item_name: string;
        category: string;
        count: number;
        description: string;
      }[];
      total_items_detected: number;
    };
  };
};



export async function mapApiToRemoveBgHistoryItem(
  data: UploadImageNoBgResponse["result"]
): Promise<RemoveBgHistoryItem> {
  return {
    id: data._id,
    type: "remove-bg",
    status: "done",
    createdAt: new Date().toISOString(),
    imageSrc: data.url,
    originalImageSrc: data.url,
    enhancedImageSrc: data.url,
    storageKey: data.storageKey,
    tags: data.aiEdits?.map((edit) => edit.operation) ?? [],
    provider: data.aiEdits?.[0]?.provider || "custom",
  };
};


export async function mapApiToSuitableBackgroundHistoryItem(
    result: SuitableBackgroundApiResponse['result']
): Promise<SuitableBackgroundHistoryItem> {
    return {
        id: result?.backgroundImage?._id || '',
        type: 'suitable-bg',
        status: (result?.backgroundImage?.status as SuitableBackgroundJobStatus) || 'done',
        createdAt:
            result?.backgroundImage?.aiEdits?.[0]?.timestamp ||
            result?.backgroundImage?.createdAt ||
            new Date().toISOString(),
        imageSrc: result?.backgroundImage?.url || '',
        sourceImageSrc: result?.sourceImage?.url || '',
    };
}


export async function mapApiToChangeStyleHistoryItem(
    data: { original: any; enhanced: any }
): Promise<ChangeStyleHistoryItem> {
    return {
        id: data.enhanced.id,
        type: "change-style",
        status: "done",
        createdAt: data.enhanced.createdAt,
        originalImageSrc: data.original.url,
        enhancedImageSrc: data.enhanced.url,
        storageKey: data.enhanced.storageKey,
        version: data.enhanced.version,
        provider: data.enhanced.aiEdits?.[0]?.provider,
        tags: data.enhanced.tags,
    };
}


export async function mapApiToExtractTextHistoryItem(
  data: ExtractTextResponse["result"]
): Promise<ExtractTextHistoryItem> {
  return {
    id: Date.now().toString(),
    text: data.text.extractedText,
    createdAt: new Date().toISOString(),
  };
}

export async function mapApiToRecognizeItemsHistoryItem(
  data: RecognizeItemsResponse["result"]["text"]
): Promise<RecognizeItemsHistoryItem> {
  return {
    id: new Date().getTime().toString(),
    items: data.items,
    totalItemsDetected: data.total_items_detected,
    createdAt: new Date().toISOString(),
  };
}

export async function getImageWithoutBackground(
  formData: FormData
): Promise<RemoveBgHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/gen-img-without-background`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `hamada ${token || ""}`,
    },
    body: formData,
  });

  console.log("Remove-bg API response status:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("Raw server response:", text);
    return {
      id: "",
      type: "remove-bg",
      status: "failed",
      createdAt: new Date().toISOString(),
      imageSrc: undefined,
      originalImageSrc: undefined,
      enhancedImageSrc: undefined,
    };
  }

  const json: UploadImageNoBgResponse = await response.json();
  console.log("Full remove-bg API response:", json);

  if (!json.result) {
    throw new Error("No result returned from remove-bg API");
  }

  return mapApiToRemoveBgHistoryItem(json.result);
}

export async function genSuitableBackgroundById(
    imageId: string
): Promise<SuitableBackgroundHistoryItem> {
    const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/gen-suitable-background`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `hamada ${token || ''}`,
        },
        body: JSON.stringify({ imageId }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text}`);
    }

    const json: SuitableBackgroundApiResponse = await response.json();
    if (!json.result) {
        throw new Error('No result returned from suitable-background API');
    }

    return mapApiToSuitableBackgroundHistoryItem(json.result);
}


export async function changeImageStyle(
    file: File,
    style: string
): Promise<ChangeStyleHistoryItem> {
    const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

    const fd = new FormData();
    fd.append("image", file);
    fd.append("style", style);

    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/gen-change-image-style`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `hamada ${token || ""}`,
            Accept: "application/json",
        },
        body: fd,
    });

    console.log("Change Style API response status:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("Raw server response:", text);
        throw new Error(`Server returned ${response.status}: ${text}`);
    }

    const json = await response.json();
    if (!json.result) {
        console.error("Change Style API result empty:", json);
        throw new Error("No result returned from Change Style API");
    }

    return mapApiToChangeStyleHistoryItem(json.result);
}


export async function extractTextFromImage(
    formData: FormData
): Promise<ExtractTextHistoryItem> {
    const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/extract-text-from-img`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `hamada ${token || ""}`,
        },
        body: formData,
    });

    console.log("Extract-text API Status:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("Extract-text raw error:", text);

        return {
            id: "",
            text: "",
            createdAt: new Date().toISOString(),
        };
    }

    const json: ExtractTextResponse = await response.json();
    console.log("Extract-text API full response:", json);

    if (!json.result?.text) {
        throw new Error("No text returned from extract-text API");
    }

    return mapApiToExtractTextHistoryItem(json.result);
}

export async function recognizeItemsInImage(
  formData: FormData
): Promise<RecognizeItemsHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/recognize-items-in-img`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `hamada ${token || ""}`,
        },
        body: formData,
    });

    console.log("Recognize Items API Status:", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("Recognize Items raw error:", text);

        return {
            id: "",
            items: [],
            totalItemsDetected: 0,
            createdAt: new Date().toISOString(),
        };
    }

    const json: RecognizeItemsResponse = await response.json();
    console.log("Recognance Items API full ( fulld response:", json);

    if (!json.result?.text?.items) {
        throw new Error("No items returned from recognize-items API");
    }

    return mapApiToRecognizeItemsHistoryItem(json.result.text);
}


