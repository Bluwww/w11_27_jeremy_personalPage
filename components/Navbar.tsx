"use client";

// Client Component: dibutuhkan karena memakai hook (usePathname & useState)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { withLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

// Daftar menu disimpan di array agar mudah ditambah/diubah (tanpa copy-paste <Link>)
// path = alamat TANPA awalan bahasa; key = kunci teks di kamus (dict.nav.home, dict.nav.about, dst.)
const menuItems = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/hobbies", key: "hobbies" },
  { path: "/gallery", key: "gallery" },
  { path: "/contact", key: "contact" },
] as const;

export default function Navbar({
  locale,
  labels,
}: {
  locale: Locale; // bahasa aktif, dipakai untuk membuat alamat link (/id/about atau /en/about)
  labels: Dictionary["nav"]; // teks menu & tombol dari kamus (sudah diterjemahkan oleh server)
}) {
  // pathname = URL aktif saat ini (sudah berawalan bahasa, mis. "/id/about"), dipakai untuk menandai menu aktif
  const pathname = usePathname();

  // State menu mobile menyimpan HALAMAN tempat menu dibuka (bukan sekadar true/false).
  // Menu dianggap terbuka hanya jika masih di halaman itu, jadi otomatis tertutup saat pindah halaman
  // atau ganti bahasa, tanpa perlu useEffect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;

  return (
    // <nav>: elemen semantik navigasi utama. aria-label membantu screen reader.
    // mx-auto max-w-6xl = konten rata tengah, lebar maksimal 72rem
    <nav aria-label={labels.ariaLabel} className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Baris atas: logo di kiri, menu + tombol bahasa/tema di kanan. justify-between = ujung kiri & kanan */}
      <div className="flex items-center justify-between gap-3 py-3">
        {/* Logo: kotak kuning berisi huruf J + nama. Pakai <Link> agar bisa diklik ke Home.
            Nama situs bukan <h1>, supaya <h1> hanya ada 1 di tiap halaman */}
        <Link href={withLocale(locale)} className="flex min-w-0 items-center gap-2.5">
          {/* aria-hidden = dekorasi saja, tidak dibacakan screen reader */}
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun font-display text-lg font-extrabold text-night"
          >
            J
          </span>
          {/* Di layar < 480px nama disembunyikan visual (sr-only) agar tombol di kanan muat di HP kecil,
              tetapi tetap terbaca screen reader */}
          <span className="font-display text-lg font-bold text-ink max-[479px]:sr-only">
            Jeremy Christian
          </span>
        </Link>

        {/* Sisi kanan: menu desktop, tombol bahasa, tombol tema, tombol hamburger. gap lebih rapat di HP */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Menu desktop berbentuk "pil": hidden di bawah 1024px, flex di lg ke atas.
              (Memakai lg, bukan md, karena di 768px ruangnya tidak cukup untuk 5 menu + 2 tombol)
              rounded-full bg-mist p-1 = wadah bulat berlatar teal muda */}
          <ul className="hidden gap-1 rounded-full bg-mist p-1 lg:flex">
            {menuItems.map((item) => {
              const href = withLocale(locale, item.path);
              const isActive = pathname === href;
              return (
                <li key={item.path}>
                  {/* Menu aktif: latar deep (gelap) + teks putih. Non-aktif: teks ink, hover jadi latar surface */}
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "bg-deep text-white" : "text-ink hover:bg-surface"
                    }`}
                  >
                    {labels[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <LanguageSwitcher locale={locale} label={labels.switchLanguage} />
          <ThemeToggle label={labels.darkMode} />

          {/* Tombol hamburger: tampil di mobile & tablet saja (lg:hidden = hilang di layar ≥1024px) */}
          <button
            type="button"
            onClick={() => setOpenedAt(isOpen ? null : pathname)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            className="h-11 shrink-0 rounded-full border border-ink/20 px-4 text-sm font-semibold text-ink lg:hidden"
          >
            {isOpen ? labels.menuClose : labels.menuOpen}
          </button>
        </div>
      </div>

      {/* Menu mobile: hanya dirender saat isOpen = true, disusun vertikal (flex-col) */}
      {isOpen && (
        <ul id="menu-mobile" className="flex flex-col gap-1 pb-4 lg:hidden">
          {menuItems.map((item) => {
            const href = withLocale(locale, item.path);
            const isActive = pathname === href;
            return (
              <li key={item.path}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-deep text-white" : "bg-mist text-ink"
                  }`}
                >
                  {labels[item.key]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
