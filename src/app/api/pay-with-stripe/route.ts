import { NextRequest, NextResponse } from 'next/server';
import { getServerCookies } from '@/services/ServerCookies.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '@/utils/Cookies.keys';
import { fetchApi } from '@/utils/fetchApi';

export async function POST(req: NextRequest) {
  const { plan, userCoupon } = await req.json().catch(() => ({ plan: undefined }));

  if (!plan) {
    return NextResponse.json({ message: 'plan is required' }, { status: 400 });
  }

  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  if (!token) {
    return NextResponse.json({ message: 'unauthenticated' }, { status: 401 });
  }

  try {
    const response = await fetchApi<unknown>('user/pay-with-stripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `hamada ${token}`,
      },
      body: JSON.stringify({ plan, userCoupon }),
      cache: 'no-cache',
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('pay-with-stripe proxy error:', error);
    const status = (error as { status?: number })?.status || 500;
    return NextResponse.json({ message: 'Failed to create checkout session' }, { status });
  }
}
