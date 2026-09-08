import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "ru", "ar", "fr"];
const defaultLocale = "tr";

// Basit bir Accept-Language parser'ı
function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // accept-language header: "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of preferred) {
    if (locales.includes(code)) return code;
  }

  return defaultLocale;
}

function resolveLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;
  return getPreferredLocale(request);
}

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dosya uzantısı olan (resim, css vs.) yolları atla
  if (
    pathname.match(/\.(.*)$/) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // URL'nin başında desteklenen bir dil var mı kontrol et
  const localeInPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (localeInPath) {
    // Adres çubuğunda dil öneki görünmesin: dil önekini kaldırıp yönlendir
    const bareUrl = request.nextUrl.clone();
    bareUrl.pathname = pathname.slice(`/${localeInPath}`.length) || "/";
    const response = NextResponse.redirect(bareUrl, 308);
    response.cookies.set("NEXT_LOCALE", localeInPath, { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE });
    return response;
  }

  // Dil öneki yoksa, tercih edilen dile göre içeriği içeride yeniden yaz (rewrite)
  const locale = resolveLocale(request);
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.rewrite(rewriteUrl);
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE });
  return response;
}

export const config = {
  matcher: [
    // Bütün yolları yakala, ancak statik dosyaları atla
    '/((?!_next/static|_next/image|favicon.ico|images/|icons/).*)',
  ],
};
