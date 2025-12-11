'use server';
import { fetchApi } from '@/utils/fetchApi';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';
import type {
  BackgroundsForImageResponse,
  EnhancedImageResponse,
  BlurredImageResponse,
  ImageResponse,
  NewAngleImageResponse,
  ResizedImageResponse,
  NewBackgroundImageResponse,
  SelectedBackgroundImageResponse,
} from '@/types/images';

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
