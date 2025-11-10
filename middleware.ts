// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PREVIEW_COOKIE = 'vr_preview';   // 프리뷰 on/off 표시
const PREVIEW_MAX_AGE = 60 * 60 * 24;  // 1일(원하면 조정)

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams, host } = url;

  // 1) preview=off → 쿠키 삭제하고 원래 규칙으로(=리다이렉트)
  if (searchParams.get('preview') === 'off') {
    const res = NextResponse.redirect(`https://vrook.io${pathname}`);
    res.cookies.delete(PREVIEW_COOKIE);
    return res;
  }

  // 2) preview=1 → 쿠키 세팅하고 우회 허용
  if (searchParams.get('preview') === '1') {
    const res = NextResponse.next();
    res.cookies.set(PREVIEW_COOKIE, 'on', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: PREVIEW_MAX_AGE,
      secure: true,
    });
    // 프리뷰 페이지가 검색에 안 잡히도록
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  // 3) 이미 쿠키 있음 → 우회 허용(계속 보기)
  if (req.cookies.get(PREVIEW_COOKIE)?.value === 'on') {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  // 4) 그 외 전부 vrook.io 로 리다이렉트
  const dest = `https://vrook.io${pathname}${url.search ? url.search : ''}`;
  return NextResponse.redirect(dest, 308);
}

export const config = {
  matcher: '/:path*',
};
