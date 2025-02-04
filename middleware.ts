import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const pathname:string=request.nextUrl.pathname;
  if (pathname.startsWith('/midadmin')) {
    return NextResponse.rewrite(new URL('/midadmin/123456', request.url))
  }
  return NextResponse.redirect(new URL('/midadmin/123456', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/midadmin/:path*'],
}