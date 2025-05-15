import { NextResponse } from 'next/server'

const protectedRoutes = ['/club-diamondz', '/saved-properties'];

function isProtectedRoute(pathname) {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  if (isProtectedRoute(pathname) && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/club-diamondz/:path*',
    '/saved-properties/:path*',
  ],
}