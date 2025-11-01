// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the community page
  if (request.nextUrl.pathname === '/community') {
    return NextResponse.redirect('https://www.skool.com/starseedcentral/');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/community',
};