// Memuat kamus terjemahan (dictionary) sesuai bahasa pada URL (/id/... atau /en/...).
// next/root-params: "lang" adalah parameter segmen [lang] di atas root layout, sehingga bisa dibaca
// dari Server Component mana pun tanpa dioper lewat props satu per satu.
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type idDictionary from "./dictionaries/id.json";

// Bentuk (struktur) kamus mengikuti id.json. en.json WAJIB punya kunci yang sama;
// jika ada yang kurang, TypeScript akan menolak saat build.
// "import type" = hanya dipakai untuk tipe, tidak ikut masuk ke bundle.
export type Dictionary = typeof idDictionary;

// import() dinamis: hanya file bahasa yang dibutuhkan yang dimuat (bukan keduanya sekaligus)
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("./dictionaries/id.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

// Bahasa aktif dari URL. Jika bukan bahasa yang didukung -> halaman 404
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

// Kamus untuk bahasa aktif. Dipanggil tanpa argumen: const dict = await getDictionary()
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
