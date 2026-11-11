import Image from "next/image";
import { getDictionary } from "../dictionaries";

// Berkas foto disimpan di array (alamat gambar tidak perlu diterjemahkan).
// alt & caption diambil dari kamus dengan urutan yang sama (dict.gallery.photos[index])
const photoSources = ["/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg"];

export default async function GalleryPage() {
  const dict = await getDictionary();
  const t = dict.gallery;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* <header> halaman berisi satu-satunya <h1> */}
      <header>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          {t.title}
        </h1>
      </header>

      {/* SECTION: Koleksi foto. h2 mengikuti h1 */}
      <section aria-labelledby="judul-koleksi" className="mt-10">
        <h2 id="judul-koleksi" className="font-display text-2xl font-bold">
          {t.collectionTitle}
        </h2>

        {/* Grid responsif: 1 kolom (mobile), 2 kolom (sm ≥640px), 3 kolom (lg ≥1024px); gap-8 = jarak antar kartu */}
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.photos.map((photo, index) => (
            // <figure> + <figcaption> = pasangan semantik gambar & keterangannya.
            // Gaya "foto polaroid": bingkai (bg-surface) tebal (p-3), bayangan, dan sedikit miring di layar sm ke atas
            // sm:odd:-rotate-2 sm:even:rotate-2 = kartu ganjil miring kiri, genap miring kanan
            // hover:-translate-y-1 = kartu terangkat sedikit saat kursor di atasnya
            <figure
              key={photoSources[index]}
              className="rounded-2xl bg-surface p-3 shadow-lg transition-transform sm:odd:-rotate-2 sm:even:rotate-2 hover:-translate-y-1"
            >
              {/* Wadah relative: wajib untuk <Image fill>. aspect-[4/3] = semua kotak seragam.
                  bg-mist = warna di sisi kosong; overflow-hidden rounded-xl = sudut membulat */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                {/* object-contain = gambar tampil UTUH (tidak terpotong) */}
                <Image
                  src={photoSources[index]}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
              {/* Caption: font-display = font judul, text-center = rata tengah, py-3 = jarak atas-bawah.
                  Caption sengaja tidak diterjemahkan: itu kutipan tulisan yang ada di dalam fotonya */}
              <figcaption className="py-3 text-center font-display text-lg font-bold">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
