import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 인증이 필요 없는 공개 경로
  const publicPaths = ['/', '/login', '/chat'];
  const isPublicPath = publicPaths.includes(pathname);

  // 세션 쿠키 확인 (connect.sid)
  const hasSession = request.cookies.has('connect.sid');

  // 1. 비로그인 사용자 접근 제어
  if (!hasSession && !isPublicPath) {
    // API(BFF) 요청인 경우 리다이렉트 대신 401 반환 (fetcher 에러 방지)
    if (pathname.startsWith('/bff')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 그 외(페이지 접근)는 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. 로그인 사용자 접근 제어 (로그인 페이지 진입 시 홈으로 이동)
  if (hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
