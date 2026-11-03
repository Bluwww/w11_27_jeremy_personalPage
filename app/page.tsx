import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    // <main>: konten utama halaman. flex-1 = mengisi sisa tinggi layar. mx-auto max-w-5xl = rata tengah
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      {/* SECTION 1: Hero/intro. Di mobile tersusun vertikal, di md ke atas berdampingan (md:flex-row) */}
      <section
        aria-labelledby="judul-home"
        className="flex flex-col items-center gap-8 md:flex-row"
      >
        {/* Foto profil: wadah relative + ukuran tetap karena <Image fill> mengisi parent-nya.
            rounded-full = lingkaran, overflow-hidden memotong gambar, ring = bingkai berwarna */}
        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full ring-4 ring-indigo-200">
          <Image
            src="/images/photo1.jpg"
            alt="Foto profil Nama Kamu tersenyum menghadap kamera"
            fill
            sizes="224px"
            priority
            className="object-cover"
          />
        </div>

        {/* Teks intro. text-center di mobile, rata kiri di md ke atas */}
        <div className="text-center md:text-left">
          {/* Satu-satunya <h1> di halaman ini */}
          <h1 id="judul-home" className="text-4xl font-extrabold tracking-tight text-slate-900">
            Halo, saya Nama Lengkap Kamu
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Mahasiswa Informatika yang suka membangun hal-hal kecil menjadi berguna.
          </p>
          {/* Tombol ajakan (call-to-action) menuju halaman About */}
          <Link
            href="/about"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Kenali Saya Lebih Jauh
          </Link>
        </div>
      </section>

      {/* SECTION 2: Ringkasan menu. h2 mengikuti h1 (hierarki berurutan) */}
      <section aria-labelledby="judul-jelajah" className="mt-14">
        <h2 id="judul-jelajah" className="text-2xl font-bold text-slate-900">
          Jelajahi Website Ini
        </h2>
        {/* Grid responsif: 1 kolom (mobile), 3 kolom (md ke atas) dengan jarak gap-4 */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Kartu 1. Judul kartu memakai h3 (turunan h2) */}
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-indigo-600">About</h3>
            <p className="mt-2 text-sm text-slate-600">Biografi, pendidikan, dan keahlian saya.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-indigo-600">Hobbies &amp; Gallery</h3>
            <p className="mt-2 text-sm text-slate-600">Kegiatan favorit dan koleksi foto saya.</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-indigo-600">Contact</h3>
            <p className="mt-2 text-sm text-slate-600">Cara menghubungi saya dan media sosial.</p>
          </article>
        </div>
      </section>
    </main>
  );
}