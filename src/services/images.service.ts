'use server';
import { fetchApi } from '@/utils/fetchApi';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';
import { RemoveBgHistoryItem } from '@/types/removeBgHistory';
import { RemoveBgJobStatus, RemoveBgJobType } from "@/types/removeBgHistory";

import type { SuitableBackgroundHistoryItem, SuitableBackgroundJobStatus } from '@/types/suitableBgHistory';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
console.log(baseUrl);

type UploadImageNoBgResponse = {
    message: string;
    status: number;
    errMsg?: string;
    errors?: Record<string, string>;
    result?: {
        _id: string;
        url: string;
        storageKey: string;
        aiEdits: {
            operation: string;
            provider: string;
            timestamp: string;
            processingTime: number;
            cost: number;
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



export async function mapApiToRemoveBgHistoryItem(
    item: UploadImageNoBgResponse['result']
): Promise<RemoveBgHistoryItem> {
    return {
        id: item?._id || '',
        type: 'remove-bg',
        status: 'done',
        createdAt: item?.aiEdits?.[0]?.timestamp || new Date().toISOString(),
        imageSrc: item?.url || '',
        originalImageSrc: undefined,
        provider: item?.aiEdits?.[0]?.provider || 'custom',
        processingTime: item?.aiEdits?.[0]?.processingTime || 0,
    };
}


export async function getImageWithoutBackground(
    formData: FormData
): Promise<RemoveBgHistoryItem> {
    const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}gen-img-without-background`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `hamada ${token || ""}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("Raw server response:", text);
        throw new Error(`Server returned ${response.status}: ${text}`);
    }

    const json: UploadImageNoBgResponse = await response.json();

    if (!json.result) {
        throw new Error("No result returned from remove-bg API");
    }

    return mapApiToRemoveBgHistoryItem(json.result);
}

export async function genSuitableBackgroundById(
    imageId: string
): Promise<SuitableBackgroundHistoryItem> {
    const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}gen-suitable-background`;

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



