import Image from "next/image";
import Link from "next/link";
import { withLocale } from "@/lib/i18n";
import { getDictionary, getLocale } from "./dictionaries";

export default async function HomePage() {
  // Bahasa aktif + kamus terjemahannya (dibaca dari URL /id atau /en)
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.home; // singkatan: t.title, t.tagline, dst.

  return (
    // <main>: konten utama. flex-1 = mengisi sisa tinggi layar; mx-auto max-w-6xl = rata tengah
    // py-10 md:py-16 = jarak atas-bawah, lebih longgar di layar besar
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* SECTION 1: Hero. Grid 12 kolom di md ke atas: teks 7 kolom (kiri), foto 5 kolom (kanan).
          items-center = sejajar vertikal di tengah; gap-12 = jarak antar kolom */}
      <section aria-labelledby="judul-home" className="grid items-center gap-12 md:grid-cols-12">
        {/* Kolom teks. order-2 di mobile = tampil SETELAH foto; md:order-1 = di kiri pada desktop */}
        <div className="order-2 md:order-1 md:col-span-7">
          {/* Satu-satunya <h1> di halaman ini. text-5xl → md:text-7xl = membesar di layar lebar
              font-display = font Bricolage; leading-[1.05] = jarak baris rapat; tracking-tight = huruf rapat */}
          <h1
            id="judul-home"
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            {t.title}
          </h1>
          {/* max-w-xl = lebar baris dibatasi agar nyaman dibaca; text-ink/75 = ink 75% opak */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{t.tagline}</p>

          {/* Dua tombol: utama (isi teal) dan sekunder (hanya garis). flex-wrap = turun baris jika sempit */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={withLocale(locale, "/about")}
              className="rounded-full bg-lagoon px-6 py-3 font-semibold text-white transition-colors hover:bg-lagoon-dark"
            >
              {t.ctaAbout}
            </Link>
            {/* hover:bg-ink hover:text-paper = saat di-hover, warna latar & teks saling bertukar (aman di mode terang maupun gelap) */}
            <Link
              href={withLocale(locale, "/gallery")}
              className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {t.ctaGallery}
            </Link>
          </div>
        </div>

        {/* Kolom foto. relative = patokan untuk elemen dekorasi absolute di dalamnya.
            max-w-sm mx-auto = lebar maksimal 24rem & rata tengah */}
        <div className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:col-span-5">
          {/* Blok kuning dekoratif di belakang foto: absolute inset-0 = ukuran sama dengan foto,
              rotate-3 + translate = miring & bergeser. aria-hidden = diabaikan screen reader */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-sun"
          />
          {/* Bingkai foto: aspect-square = persegi; overflow-hidden rounded-[2rem] = sudut membulat besar
              border-4 border-surface = bingkai warna kartu (putih di mode terang); relative = tampil di atas blok kuning */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-surface bg-deep shadow-xl">
            {/* <Image fill>: gambar mengisi wadah (wadah wajib relative). object-cover = memenuhi tanpa gepeng */}
            <Image
              src="/images/photo1.jpg"
              alt={t.photoAlt}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Pintasan ke halaman lain. mt-20 = jarak dari hero */}
      <section aria-labelledby="judul-jelajah" className="mt-20">
        {/* h2 mengikuti h1 (hierarki berurutan) */}
        <h2 id="judul-jelajah" className="font-display text-3xl font-bold">
          {t.exploreTitle}
        </h2>

        {/* Grid "bento": 1 kolom di mobile, 3 kolom di md. Kartu About memakai md:col-span-2 (selebar 2 kolom)
            sehingga ukuran kartu berbeda-beda dan tata letak tidak monoton */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* Kartu 1 (lebar 2 kolom): seluruh kartu adalah link. group = agar elemen anak bisa bereaksi saat hover */}
          <Link
            href={withLocale(locale, "/about")}
            className="group rounded-3xl bg-lagoon p-8 text-white md:col-span-2"
          >
            {/* h3 = turunan h2 */}
            <h3 className="font-display text-2xl font-bold">{t.cards.about.title}</h3>
            <p className="mt-2 max-w-md text-white/85">{t.cards.about.desc}</p>
            {/* group-hover:translate-x-1 = teks bergeser sedikit saat kartu di-hover */}
            <span className="mt-6 inline-block font-semibold transition-transform group-hover:translate-x-1">
              {t.cards.about.cta}
            </span>
          </Link>

          {/* Kartu 2: kuning, teks night (selalu gelap, karena latar kuning tidak berubah di mode gelap) */}
          <Link href={withLocale(locale, "/hobbies")} className="group rounded-3xl bg-sun p-8 text-night">
            <h3 className="font-display text-2xl font-bold">{t.cards.hobbies.title}</h3>
            <p className="mt-2 text-night/80">{t.cards.hobbies.desc}</p>
            <span className="mt-6 inline-block font-semibold transition-transform group-hover:translate-x-1">
              {t.cards.hobbies.cta}
            </span>
          </Link>

          {/* Kartu 3: latar surface berbingkai tipis */}
          <Link
            href={withLocale(locale, "/gallery")}
            className="group rounded-3xl border border-ink/10 bg-surface p-8"
          >
            <h3 className="font-display text-2xl font-bold">{t.cards.gallery.title}</h3>
            <p className="mt-2 text-ink/75">{t.cards.gallery.desc}</p>
            <span className="mt-6 inline-block font-semibold text-link transition-transform group-hover:translate-x-1">
              {t.cards.gallery.cta}
            </span>
          </Link>

          {/* Kartu 4 (lebar penuh): blok gelap (deep) */}
          <Link
            href={withLocale(locale, "/contact")}
            className="group rounded-3xl bg-deep p-8 text-white md:col-span-3"
          >
            <h3 className="font-display text-2xl font-bold">{t.cards.contact.title}</h3>
            <p className="mt-2 max-w-md text-white/80">{t.cards.contact.desc}</p>
            <span className="mt-6 inline-block font-semibold text-sun transition-transform group-hover:translate-x-1">
              {t.cards.contact.cta}
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
