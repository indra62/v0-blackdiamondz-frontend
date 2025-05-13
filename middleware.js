import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/club-diamondz')) {
    const accessToken = request.cookies.get('access_token')?.value

    if (!accessToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/club-diamondz/:path*'],
}