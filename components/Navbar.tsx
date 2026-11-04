"use client";

// Client Component: dibutuhkan karena memakai hook (usePathname & useState)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Daftar menu disimpan di array agar mudah ditambah/diubah (tanpa copy-paste <Link>)
const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  // pathname = URL aktif saat ini, dipakai untuk menandai menu yang sedang dibuka
  const pathname = usePathname();
  // state untuk buka/tutup menu pada tampilan mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <nav>: elemen semantik navigasi utama. aria-label membantu screen reader.
    // mx-auto max-w-6xl = konten rata tengah, lebar maksimal 72rem
    <nav aria-label="Navigasi utama" className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Baris atas: logo di kiri, menu di kanan. justify-between = ujung kiri & kanan */}
      <div className="flex items-center justify-between py-3">
        {/* Logo: kotak kuning berisi huruf J + nama. Pakai <Link> agar bisa diklik ke Home.
            Nama situs bukan <h1>, supaya <h1> hanya ada 1 di tiap halaman */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* aria-hidden = dekorasi saja, tidak dibacakan screen reader */}
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl bg-sun font-display text-lg font-extrabold text-ink"
          >
            J
          </span>
          <span className="font-display text-lg font-bold text-ink">Jeremy Christian</span>
        </Link>

        {/* Tombol hamburger: tampil di mobile saja (md:hidden = hilang di layar ≥768px) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          className="rounded-full border border-ink/20 px-4 py-1.5 text-sm font-semibold md:hidden"
        >
          {isOpen ? "Tutup" : "Menu"}
        </button>

        {/* Menu desktop berbentuk "pil": hidden di mobile, flex di md ke atas.
            rounded-full bg-mist p-1 = wadah bulat berlatar teal muda */}
        <ul className="hidden gap-1 rounded-full bg-mist p-1 md:flex">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                {/* Menu aktif: latar ink (gelap) + teks putih. Non-aktif: teks ink, hover jadi putih */}
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "bg-ink text-white" : "text-ink hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menu mobile: hanya dirender saat isOpen = true, disusun vertikal (flex-col) */}
      {isOpen && (
        <ul id="menu-mobile" className="flex flex-col gap-1 pb-4 md:hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)} // tutup menu setelah link diklik
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-semibold ${
                    isActive ? "bg-ink text-white" : "bg-mist text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
