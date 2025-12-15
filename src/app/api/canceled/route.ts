import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const target = new URL('/canceled', req.url);
  return NextResponse.redirect(target);
}
