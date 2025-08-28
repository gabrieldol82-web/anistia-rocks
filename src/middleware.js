import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('admin-auth');
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};