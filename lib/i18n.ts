// Konfigurasi i18n yang dipakai bersama oleh proxy.ts, Server Component, dan Client Component.
// File ini sengaja "murni" (tanpa import khusus server) supaya aman diimpor dari mana saja.

// Daftar bahasa yang didukung. "as const" = tipe dikunci menjadi "id" | "en", bukan sekadar string
export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

// Bahasa bawaan: dipakai jika preferensi pengunjung tidak diketahui / tidak didukung
export const defaultLocale: Locale = "id";

// Nama cookie untuk mengingat pilihan bahasa pengunjung (dibaca proxy.ts, ditulis LanguageSwitcher)
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Type guard: memastikan sebuah string benar-benar locale yang didukung
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Membuat URL berawalan bahasa. withLocale("en", "/about") -> "/en/about"; withLocale("en") -> "/en"
export function withLocale(locale: Locale, path = "/"): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Mengganti bahasa pada pathname aktif, supaya pengunjung tetap di halaman yang sama.
// switchLocalePath("/id/about", "en") -> "/en/about"
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = first && hasLocale(first) ? rest : [first, ...rest].filter(Boolean);
  return `/${[target, ...tail].join("/")}`;
}
