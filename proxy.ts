import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userStr = request.cookies.get('user')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need auth
  const publicPaths = ['/login', '/contact', '/admissions', '/about', '/gallery', '/'];
  if (publicPaths.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const user = JSON.parse(userStr || '{}');
    const role = user.role?.name;

    // Route protection by role
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/teacher') && role !== 'teacher' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/student') && role !== 'student' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|_next/webpack-hmr|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|js|css)$).*)'],
};
