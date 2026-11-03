import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Metadata: mengatur <title> dan deskripsi di tab browser (SEO)
export const metadata: Metadata = {
  title: "About Me | Nama Lengkap Kamu",
  description: "Website pribadi About Me untuk tugas kuliah Pemrograman Web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="id" memberi tahu browser bahwa konten berbahasa Indonesia
    <html lang="id">
      {/* body: flex-col + min-h-screen agar footer selalu menempel di bawah layar.
          bg-slate-50 = latar abu sangat muda, text-slate-800 = warna teks default */}
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
        {/* <header>: bagian kepala situs yang tampil di semua halaman.
            sticky top-0 z-10 = menempel di atas saat scroll; border-b = garis bawah tipis */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          {/* Shared navigation bar (berisi <nav>) */}
          <Navbar />
        </header>

        {/* {children} = isi halaman aktif (<main> milik masing-masing page.tsx) */}
        {children}

        {/* <footer>: bagian kaki situs. mt-auto mendorong footer ke dasar halaman */}
        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-500">
            <p>&copy; 2026 Nama Lengkap Kamu. Dibuat dengan Next.js &amp; Tailwind CSS.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}