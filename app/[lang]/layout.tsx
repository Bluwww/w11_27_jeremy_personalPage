import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { locales } from "@/lib/i18n";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { getDictionary, getLocale } from "./dictionaries";

// next/font/google: mengunduh font saat build lalu menyajikannya dari server sendiri (cepat & tanpa layout shift).
// variable = nama CSS variable yang dipakai di globals.css (--font-bricolage & --font-figtree)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage", // font judul: tegas dan berkarakter
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree", // font isi: bersih dan mudah dibaca
});

// Layout ini berada di dalam segmen [lang], jadi tiap bahasa dibuat sebagai halaman statis saat build.
// (Wajib ada untuk cacheComponents: tiap parameter root harus punya minimal satu nilai.)
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Metadata: mengatur <title> dan deskripsi di tab browser (SEO), sekarang mengikuti bahasa aktif
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    // lang={locale} = bahasa dokumen mengikuti URL ("id" atau "en"); dipakai screen reader & mesin pencari.
    // className memasang kedua variabel font ke seluruh halaman.
    // data-theme="light" = tema bawaan dari server. Script di <head> bisa mengubahnya ke "dark"
    // sebelum halaman dicat, maka suppressHydrationWarning dipasang agar React tidak menganggapnya error.
    <html
      lang={locale}
      data-theme="light"
      className={`${bricolage.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Script awal: memasang tema tersimpan / tema OS SEBELUM halaman tampil, supaya tidak berkedip terang-lalu-gelap */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* Div pembungkus: memegang warna latar & font untuk seluruh situs.
            flex min-h-screen flex-col = footer selalu menempel di bawah layar
            overflow-x-clip = memotong hiasan yang sedikit keluar layar (mis. blok kuning miring di foto)
            agar HP tidak bisa digeser ke samping (clip, bukan hidden, supaya header sticky tetap berfungsi)
            bg-paper text-ink = latar & teks dari tema di globals.css (otomatis berubah di mode gelap)
            font-body = font Figtree sebagai font default */}
        <div className="flex min-h-screen flex-col overflow-x-clip bg-paper font-body text-ink antialiased">
          {/* <header>: kepala situs di semua halaman.
              sticky top-0 z-20 = menempel di atas saat scroll, selalu di lapisan depan
              border-b border-ink/10 = garis bawah tipis (ink 10% opak)
              bg-surface/85 backdrop-blur = warna kartu semi-transparan dengan efek blur */}
          <header className="sticky top-0 z-20 border-b border-ink/10 bg-surface/85 backdrop-blur">
            {/* Shared navigation bar (berisi <nav>). Teks menu diterjemahkan di server lalu dioper lewat props */}
            <Navbar locale={locale} labels={dict.nav} />
          </header>

          {/* {children} = isi halaman aktif (<main> milik masing-masing page.tsx) */}
          {children}

          {/* <footer>: kaki situs. mt-auto = terdorong ke dasar halaman; bg-deep = blok gelap penutup */}
          <footer className="mt-auto bg-deep text-white/80">
            {/* flex-col di mobile, sejajar kiri-kanan di sm ke atas */}
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-center text-sm sm:flex-row sm:px-6 sm:text-left">
              <p className="font-display text-base font-bold text-white">Jeremy Christian</p>
              <p>{dict.footer.copyright}</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
