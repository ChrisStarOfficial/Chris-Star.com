// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /community to external Skool URL
  if (request.nextUrl.pathname === '/community') {
    return NextResponse.redirect('https://www.skool.com/starseedcentral/', 307);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/community',
};