import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Eine Liste aller unterstützten Locales
  locales: ['en', 'de'],
  
  // Standard-Locale
  defaultLocale: 'de',
  
  // Optional: Locale in der URL anzeigen
  localePrefix: 'always'
});

export const config = {
  // Matcher für die Routen, die die Middleware behandeln soll
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 