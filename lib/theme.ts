// Konstanta tema terang/gelap, dipakai oleh layout.tsx (script awal) dan ThemeToggle.tsx (tombol).

export type Theme = "light" | "dark";

// Kunci penyimpanan pilihan tema di localStorage
export const THEME_STORAGE_KEY = "theme";

// Script kecil yang dijalankan browser SEBELUM halaman pertama kali dicat (dipasang di <head>).
// Tujuannya mencegah "kedip": tanpa script ini halaman tampil terang dulu, baru berubah gelap
// setelah React selesai dimuat.
// Aturan: pakai pilihan tersimpan (localStorage); jika belum ada, ikuti pengaturan OS (prefers-color-scheme).
// Dua blok try terpisah supaya jika localStorage diblokir browser, pengaturan OS tetap dipakai.
export const THEME_INIT_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)})()`;
