import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

// Metadata: mengatur <title> dan deskripsi di tab browser (SEO)
export const metadata: Metadata = {
  title: "About Me | Jeremy Christian",
  description: "Website pribadi About Me untuk tugas kuliah Pemrograman Web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="id" = konten berbahasa Indonesia. className memasang kedua variabel font ke seluruh halaman
    <html lang="id" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        {/* Div pembungkus: memegang warna latar & font untuk seluruh situs.
            flex min-h-screen flex-col = footer selalu menempel di bawah layar
            bg-paper text-ink = latar & teks dari tema di globals.css
            font-body = font Figtree sebagai font default */}
        <div className="flex min-h-screen flex-col bg-paper font-body text-ink antialiased">
          {/* <header>: kepala situs di semua halaman.
              sticky top-0 z-20 = menempel di atas saat scroll, selalu di lapisan depan
              border-b border-ink/10 = garis bawah tipis (ink 10% opak)
              bg-white/85 backdrop-blur = putih semi-transparan dengan efek blur */}
          <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/85 backdrop-blur">
            {/* Shared navigation bar (berisi <nav>) */}
            <Navbar />
          </header>

          {/* {children} = isi halaman aktif (<main> milik masing-masing page.tsx) */}
          {children}

          {/* <footer>: kaki situs. mt-auto = terdorong ke dasar halaman; bg-ink = blok gelap penutup */}
          <footer className="mt-auto bg-ink text-mist">
            {/* flex-col di mobile, sejajar kiri-kanan di sm ke atas */}
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm sm:flex-row sm:px-6">
              <p className="font-display text-base font-bold text-white">Jeremy Christian</p>
              <p>&copy; 2026 Dibuat dengan Next.js &amp; Tailwind CSS.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
