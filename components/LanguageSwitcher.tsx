"use client";

// Client Component: butuh usePathname (halaman aktif) dan onClick (menyimpan cookie)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string; // teks untuk screen reader, mis. "Ganti bahasa ke English"
}) {
  const pathname = usePathname();

  // Bahasa tujuan = bahasa berikutnya di daftar (dengan 2 bahasa: id <-> en)
  const target = locales[(locales.indexOf(locale) + 1) % locales.length];

  return (
    // <Link> ke halaman yang SAMA dalam bahasa lain, mis. /id/about -> /en/about.
    // Saat diklik, pilihan disimpan di cookie supaya kunjungan berikutnya (lewat proxy.ts) langsung memakai bahasa ini.
    // hrefLang = memberi tahu browser/mesin pencari bahwa tautan ini mengarah ke versi bahasa lain.
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      aria-label={label}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; SameSite=Lax`;
      }}
      className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-ink/20 px-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
      {/* Teks yang terlihat = kode bahasa tujuan ("EN" saat ini berbahasa Indonesia, dan sebaliknya) */}
      <span aria-hidden="true">{target.toUpperCase()}</span>
    </Link>
  );
}
