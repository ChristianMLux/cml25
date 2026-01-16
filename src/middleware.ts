import { NextRequest, NextResponse } from 'next/server';

import {
  locales,
  defaultLocale,
  isValidLocale,
  Locale,
} from '../config/i18n-config';

function isStaticResource(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/locales')
  );
}

function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLanguageHeader = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().substring(0, 2))
    .find(isValidLocale);

  if (preferredLanguageHeader) {
    return preferredLanguageHeader;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isStaticResource(pathname)) {
    return NextResponse.next();
  }

  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const preferredLocale = getPreferredLocale(request);

  const newPath = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
  const newUrl = new URL(newPath, request.url);

  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', preferredLocale, {
    maxAge: 365 * 24 * 60 * 60, // 1 Jahr
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|locales|favicon.ico|.*\\.).*)'],
};
