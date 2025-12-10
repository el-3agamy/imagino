'use server';
import { fetchApi } from '@/utils/fetchApi';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';
import { RemoveBgHistoryItem } from '@/types/removeBgHistory';
import { RemoveBgJobStatus, RemoveBgJobType } from "@/types/removeBgHistory";

import type { SuitableBackgroundHistoryItem, SuitableBackgroundJobStatus } from '@/types/suitableBgHistory';
import { ChangeStyleHistoryItem } from '@/types/changeStyleAnimeHistory';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
console.log(baseUrl);

export type UploadImageNoBgResponse = {
    message: string;
    status: number;
    result: {
        original: {
            _id: string;
            url: string;
            storageKey: string;
            createdAt: string;
            status: string;
            aiEdits: any[];
        };
        enhanced: {
            _id: string;
            url: string;
            storageKey: string;
            createdAt: string;
            status: string;
            aiEdits: any[];
        };
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


export async function mapApiToRemoveBgHistoryItem(
    data: UploadImageNoBgResponse["result"]
): Promise<RemoveBgHistoryItem> {
    return {
        id: data.enhanced._id,
        type: "remove-bg",
        status: data.enhanced.status as RemoveBgJobStatus,
        createdAt: data.enhanced.createdAt,
        imageSrc: data.enhanced.url,
        originalImageSrc: data.original.url,
        enhancedImageSrc: data.enhanced.url,
        storageKey: data.enhanced.storageKey,
        tags: data.enhanced.aiEdits?.map((edit: any) => edit.operation) ?? [],
        provider: "cloudinary",
    };
}


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
    console.log("Remove-bg API response not Found:", response);

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

    const json = await response.json();
    console.log("Full remove-bg API response:", json);

    if (!json.result) {
        console.error("No result field in remove-bg API response", json);
        throw new Error("No result returned from remove-bg API");
    }

    const { original, enhanced } = json.result;
    if (!enhanced?.url && !original?.url) {
        console.error("No image URLs found in remove-bg API response", json);
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







