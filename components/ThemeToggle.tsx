"use client";

// Client Component: butuh event klik, localStorage, dan membaca atribut <html>
import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import type { Theme } from "@/lib/theme";

// ---- Helper kecil (di luar komponen agar tidak dibuat ulang tiap render) ----

// Tema yang sedang AKTIF = nilai atribut data-theme pada <html>
function readActiveTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Pilihan yang disimpan pengunjung (null = belum pernah memilih -> ikuti pengaturan OS)
function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // localStorage bisa diblokir (mode privat / kebijakan browser)
  }
}

function readSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// Agar tombol tahu kapan tema berubah: pantau perubahan atribut data-theme pada <html>
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export default function ThemeToggle({ label }: { label: string }) {
  // useSyncExternalStore = cara resmi React membaca "state di luar React" (di sini: atribut <html>).
  // Argumen ke-3 = nilai saat render di server ("light"); React otomatis menyesuaikan di browser
  // tanpa error hydration.
  const theme = useSyncExternalStore(subscribe, readActiveTheme, () => "light" as Theme);

  useLayoutEffect(() => {
    // 1) Pasang ulang tema. Di mode development, React Strict Mode me-reset atribut <html>;
    //    di production ini tidak berefek apa pun (script di <head> sudah memasangnya).
    applyTheme(readStoredTheme() ?? readSystemTheme());

    // 2) Jika pengunjung belum memilih manual, ikuti perubahan tema OS secara langsung
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readStoredTheme() === null) applyTheme(readSystemTheme());
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next: Theme = readActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next); // ingat pilihan untuk kunjungan berikutnya
    } catch {
      // abaikan: tema tetap berganti, hanya tidak tersimpan
    }
  }

  return (
    // aria-pressed = tombol bergaya "saklar": true saat mode gelap aktif.
    // Label tetap ("Mode gelap") sedangkan status dibacakan lewat aria-pressed.
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-mist"
    >
      {/* Dua ikon selalu ada di HTML; CSS (varian dark:) memilih mana yang tampil.
          Mode terang -> bulan (klik untuk gelap). Mode gelap -> matahari (klik untuk terang) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 dark:hidden"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-5 w-5 dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
