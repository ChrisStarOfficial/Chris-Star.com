// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only redirect /community to external Skool URL in production, not during development
  if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname === '/community') {
    return NextResponse.redirect(new URL('https://www.skool.com/starseedcentral/', request.url), 307);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/community',
};