'use server';

const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface FetchServerDataOptions extends RequestInit {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export async function fetchApi<T = unknown>(
  endpoint: string,
  options: FetchServerDataOptions = {},
  tags: string[] = []
): Promise<T> {
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }
  const URL = `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const apiOptions: FetchServerDataOptions = {
    cache: 'force-cache',
    next: {
      revalidate: 1,
      tags: tags,
    },
    ...options,
  };

  try {
    const res = await fetch(URL, apiOptions);

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.error('fetchApi error:', error);
    throw error;
  }
}

export interface resShape {
  message: string;
  data: { accessToken: string; refreshToken: string };
  status: number;
  errors: { [key: string]: string };
  errMsg: string;
}
