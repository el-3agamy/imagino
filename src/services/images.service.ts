'use server';
import { fetchApi } from '@/utils/fetchApi';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';

import type {
  BackgroundsForImageResponse,
  EnhancedImageResponse,
  BlurredImageResponse,
  ImageResponse,
  ImageDocument,
  NewAngleImageResponse,
  ResizedImageResponse,
  NewBackgroundImageResponse,
  SelectedBackgroundImageResponse,
} from '@/types/images';

import { RemoveBgHistoryItem } from '@/types/removeBgHistory';

import type {
  SuitableBackgroundHistoryItem,
  SuitableBackgroundJobStatus,
} from '@/types/suitableBgHistory';
import { ChangeStyleHistoryItem } from '@/types/changeStyleAnimeHistory';
import { ExtractTextHistoryItem } from '@/types/extractTextFromBgHistory';
import { RecognizeItemsHistoryItem } from '@/types/RecognizeItemsHistory';

const ENHANCE_ENDPOINT = 'image/gen-inhanced-quality-img';
const NEW_DIMENSION_ENDPOINT = 'image/gen-img-with-new-dimension';
const GET_IMAGE_ENDPOINT = 'image/get-image';
const GET_BACKGROUND_VERSIONS_ENDPOINT = 'image/get-last-background-versions';
const BLUR_REGION_ENDPOINT = 'image/blur-image-region';
const RESIZE_IMAGE_ENDPOINT = 'image/gen-resize-img';
const NEW_BACKGROUND_ENDPOINT = 'image/gen-img-with-new-background';
const SELECTED_BACKGROUND_ENDPOINT = 'image/gen-img-with-selected-background';

export async function inhanceImageQuality(file: File): Promise<EnhancedImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetchApi<EnhancedImageResponse>(ENHANCE_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function genImageWithNewDimension(
  file: File,
  angle: string | number
): Promise<NewAngleImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

  const formData = new FormData();
  formData.append('image', file);
  formData.append('angle', String(angle));

  const response = await fetchApi<NewAngleImageResponse>(NEW_DIMENSION_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function getImage(imageId: string): Promise<ImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

  const response = await fetchApi<ImageResponse>(`${GET_IMAGE_ENDPOINT}/${imageId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function getBackgroundVersions(
  imageId: string,
  options: { page?: number; size?: number } = {}
): Promise<BackgroundsForImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

  const params = new URLSearchParams();
  if (typeof options.page !== 'undefined') params.set('page', String(options.page));
  if (typeof options.size !== 'undefined') params.set('size', String(options.size));

  const queryString = params.toString();
  const endpoint = `${GET_BACKGROUND_VERSIONS_ENDPOINT}/${imageId}${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetchApi<BackgroundsForImageResponse>(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function blurRegion(params: {
  file?: File;
  imageId?: string;
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  blurRadius?: number | string;
}): Promise<BlurredImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const { file, imageId, x, y, width, height, blurRadius } = params;

  if (!file && !imageId) {
    throw new Error('Provide either a file or an imageId to blur.');
  }

  const formData = new FormData();
  if (file) formData.append('image', file);
  if (imageId) formData.append('imageId', imageId);
  formData.append('x', String(x));
  formData.append('y', String(y));
  formData.append('width', String(width));
  formData.append('height', String(height));
  if (typeof blurRadius !== 'undefined') {
    formData.append('blurRadius', String(blurRadius));
  }

  const response = await fetchApi<BlurredImageResponse>(BLUR_REGION_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function resizeImage(params: {
  file?: File;
  imageId?: string;
  width?: number | string;
  height?: number | string;
  fit?: string;
  background?: string;
  format?: string;
  quality?: number | string;
  allowUpscale?: boolean | string;
  position?: string;
}): Promise<ResizedImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const { file, imageId, width, height, fit, background, format, quality, allowUpscale, position } =
    params;

  if (!file && !imageId) {
    throw new Error('Provide either a file or an imageId to resize.');
  }

  if (typeof width === 'undefined' && typeof height === 'undefined') {
    throw new Error('Provide at least one dimension: width or height.');
  }

  const formData = new FormData();
  if (file) formData.append('image', file);
  if (imageId) formData.append('imageId', imageId);
  if (typeof width !== 'undefined') formData.append('width', String(width));
  if (typeof height !== 'undefined') formData.append('height', String(height));
  if (typeof fit !== 'undefined') formData.append('fit', fit);
  if (typeof background !== 'undefined') formData.append('background', background);
  if (typeof format !== 'undefined') formData.append('format', format);
  if (typeof quality !== 'undefined') formData.append('quality', String(quality));
  if (typeof allowUpscale !== 'undefined') formData.append('allowUpscale', String(allowUpscale));
  if (typeof position !== 'undefined') formData.append('position', position);

  const response = await fetchApi<ResizedImageResponse>(RESIZE_IMAGE_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function genImgWithNewBackground(params: {
  imageId: string;
  prompt?: string;
  negativePrompt?: string;
  stylePreset?: string;
  seed?: number | string;
  width?: number | string;
  height?: number | string;
}): Promise<NewBackgroundImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const { imageId, prompt, negativePrompt, stylePreset, seed, width, height } = params;

  const formData = new FormData();
  formData.append('imageId', imageId);
  if (typeof prompt !== 'undefined') formData.append('prompt', prompt);
  if (typeof negativePrompt !== 'undefined') formData.append('negativePrompt', negativePrompt);
  if (typeof stylePreset !== 'undefined') formData.append('stylePreset', stylePreset);
  if (typeof seed !== 'undefined') formData.append('seed', String(seed));
  if (typeof width !== 'undefined') formData.append('width', String(width));
  if (typeof height !== 'undefined') formData.append('height', String(height));

  const response = await fetchApi<NewBackgroundImageResponse>(NEW_BACKGROUND_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

export async function genImgWithSelectedBackground(params: {
  productImageId: string;
  backgroundImageId?: string;
  backgroundImageFile?: File;
}): Promise<SelectedBackgroundImageResponse> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const { productImageId, backgroundImageId, backgroundImageFile } = params;

  if (!productImageId) {
    throw new Error('productImageId is required.');
  }

  if (!backgroundImageId && !backgroundImageFile) {
    throw new Error('Provide backgroundImageId or backgroundImageFile.');
  }

  const formData = new FormData();
  formData.append('productImageId', productImageId);
  if (backgroundImageId) formData.append('backgroundImageId', backgroundImageId);
  if (backgroundImageFile) formData.append('backgroundImage', backgroundImageFile);

  const response = await fetchApi<SelectedBackgroundImageResponse>(SELECTED_BACKGROUND_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    cache: 'no-cache',
  });

  return response;
}

// ----------------------
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
  data: UploadImageNoBgResponse['result']
): Promise<RemoveBgHistoryItem> {
  return {
    id: data._id,
    type: 'remove-bg',
    status: 'done',
    createdAt: new Date().toISOString(),
    imageSrc: data.url,
    originalImageSrc: data.url,
    enhancedImageSrc: data.url,
    storageKey: data.storageKey,
    tags: data.aiEdits?.map((edit) => edit.operation) ?? [],
    provider: data.aiEdits?.[0]?.provider || 'custom',
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

export async function mapApiToChangeStyleHistoryItem(data: {
  original: ImageDocument;
  enhanced: ImageDocument;
}): Promise<ChangeStyleHistoryItem> {
  return {
    id: data.enhanced._id || (data.enhanced as unknown as { id?: string }).id || '',
    type: 'change-style',
    status: 'done',
    createdAt: data.enhanced.createdAt || new Date().toISOString(),
    originalImageSrc: data.original.url,
    enhancedImageSrc: data.enhanced.url,
    storageKey: data.enhanced.storageKey,
    version: data.enhanced.version,
    provider: data.enhanced.aiEdits?.[0]?.provider,
    tags: data.enhanced.tags,
  };
}

export async function mapApiToExtractTextHistoryItem(
  data: ExtractTextResponse['result']
): Promise<ExtractTextHistoryItem> {
  return {
    id: Date.now().toString(),
    text: data.text.extractedText,
    createdAt: new Date().toISOString(),
  };
}

export async function mapApiToRecognizeItemsHistoryItem(
  data: RecognizeItemsResponse['result']['text']
): Promise<RecognizeItemsHistoryItem> {
  return {
    id: new Date().getTime().toString(),
    items: data.items,
    totalItemsDetected: data.total_items_detected,
    createdAt: new Date().toISOString(),
  };
}

export async function getImageWithoutBackground(formData: FormData): Promise<RemoveBgHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/gen-img-without-background`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    body: formData,
  });

  console.log('Remove-bg API response status:', response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error('Raw server response:', text);
    return {
      id: '',
      type: 'remove-bg',
      status: 'failed',
      createdAt: new Date().toISOString(),
      imageSrc: undefined,
      originalImageSrc: undefined,
      enhancedImageSrc: undefined,
    };
  }

  const json: UploadImageNoBgResponse = await response.json();
  console.log('Full remove-bg API response:', json);

  if (!json.result) {
    throw new Error('No result returned from remove-bg API');
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

export async function changeImageStyle(file: File, style: string): Promise<ChangeStyleHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);

  const fd = new FormData();
  fd.append('image', file);
  fd.append('style', style);

  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/gen-change-image-style`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `hamada ${token || ''}`,
      Accept: 'application/json',
    },
    body: fd,
  });

  console.log('Change Style API response status:', response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error('Raw server response:', text);
    throw new Error(`Server returned ${response.status}: ${text}`);
  }

  const json = await response.json();
  if (!json.result) {
    console.error('Change Style API result empty:', json);
    throw new Error('No result returned from Change Style API');
  }

  return mapApiToChangeStyleHistoryItem(json.result);
}

export async function extractTextFromImage(formData: FormData): Promise<ExtractTextHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/extract-text-from-img`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    body: formData,
  });

  console.log('Extract-text API Status:', response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error('Extract-text raw error:', text);

    return {
      id: '',
      text: '',
      createdAt: new Date().toISOString(),
    };
  }

  const json: ExtractTextResponse = await response.json();
  console.log('Extract-text API full response:', json);

  if (!json.result?.text) {
    throw new Error('No text returned from extract-text API');
  }

  return mapApiToExtractTextHistoryItem(json.result);
}

export async function recognizeItemsInImage(
  formData: FormData
): Promise<RecognizeItemsHistoryItem> {
  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}image/recognize-items-in-img`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `hamada ${token || ''}`,
    },
    body: formData,
  });

  console.log('Recognize Items API Status:', response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error('Recognize Items raw error:', text);

    return {
      id: '',
      items: [],
      totalItemsDetected: 0,
      createdAt: new Date().toISOString(),
    };
  }

  const json: RecognizeItemsResponse = await response.json();
  console.log('Recognance Items API full ( fulld response:', json);

  if (!json.result?.text?.items) {
    throw new Error('No items returned from recognize-items API');
  }

  return mapApiToRecognizeItemsHistoryItem(json.result.text);
}
