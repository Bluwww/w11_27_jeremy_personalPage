import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales } from "./lib/i18n";
import type { Locale } from "./lib/i18n";

// Proxy (dulu bernama "middleware") berjalan di server SEBELUM halaman dirender.
// Tugasnya di sini: jika URL belum berawalan bahasa (mis. /about), arahkan ke /id/about atau /en/about.

// Membaca header Accept-Language, contoh: "en-US,en;q=0.9,id;q=0.8".
// Hasilnya bahasa pertama (berdasarkan nilai q tertinggi) yang kita dukung.
function matchAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        // "en-US" -> "en" (kita hanya membedakan bahasa, bukan negara)
        language: tag.trim().toLowerCase().split("-")[0],
        quality: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter((c) => c.language && !Number.isNaN(c.quality) && c.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  const found = candidates.find((c) => hasLocale(c.language));
  return found ? (found.language as Locale) : null;
}

// Urutan prioritas: 1) pilihan yang pernah disimpan (cookie), 2) bahasa browser, 3) bahasa bawaan
function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  return matchAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sudah ada awalan bahasa (/id atau /id/...)? Biarkan lewat
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  // Belum ada: tambahkan awalan lalu redirect. Contoh: /about -> /id/about
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Lewati file internal Next.js (_next), API, dan semua file statis berekstensi
  // (favicon.ico, /images/photo1.jpg, dll.) agar tidak ikut di-redirect
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
