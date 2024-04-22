import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname
  const response = NextResponse.rewrite(`http://localhost:1337/${path}`)

  response.headers.set('Authorization', `Bearer ${process.env.API_TOKEN}`)

  return response

}

export const config = {
  matcher: '/api/:path*',
}