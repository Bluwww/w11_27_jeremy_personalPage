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
    // <nav>: elemen semantik untuk navigasi utama.
    // aria-label membantu screen reader. Tailwind: mx-auto max-w-5xl = konten di tengah, lebar maksimal 64rem
    <nav aria-label="Navigasi utama" className="mx-auto max-w-5xl px-4">
      {/* Baris atas: nama situs di kiri, tombol hamburger (mobile) / menu (desktop) di kanan */}
      <div className="flex items-center justify-between py-4">
        {/* Nama situs: pakai <p>, bukan <h1>, agar <h1> hanya ada 1 di tiap halaman */}
        <p className="text-lg font-bold text-indigo-600">Nama Kamu</p>

        {/* Tombol hamburger: tampil di mobile saja (md:hidden = disembunyikan di layar ≥768px) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="menu-utama"
          className="rounded-md border border-slate-300 px-3 py-1 text-sm md:hidden"
        >
          {isOpen ? "Tutup" : "Menu"}
        </button>

        {/* Menu desktop: hidden di mobile, flex di layar md ke atas */}
        <ul className="hidden gap-2 md:flex">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                {/* Kelas aktif: latar indigo + teks putih; non-aktif: abu-abu dengan efek hover */}
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
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
        <ul id="menu-utama" className="flex flex-col gap-1 pb-4 md:hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)} // tutup menu setelah link diklik
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 hover:bg-indigo-100"
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