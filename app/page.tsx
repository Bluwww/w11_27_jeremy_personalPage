import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
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
            Halo, saya Jeremy Christian
          </h1>
          {/* max-w-xl = lebar baris dibatasi agar nyaman dibaca; text-ink/75 = ink 75% opak */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
            Mahasiswa Informatika yang suka membangun hal-hal kecil menjadi berguna.
          </p>

          {/* Dua tombol: utama (isi teal) dan sekunder (hanya garis). flex-wrap = turun baris jika sempit */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full bg-lagoon px-6 py-3 font-semibold text-white transition-colors hover:bg-lagoon-dark"
            >
              Kenali saya
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Lihat galeri
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
              border-4 border-white = bingkai putih; relative = tampil di atas blok kuning */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-white bg-ink shadow-xl">
            {/* <Image fill>: gambar mengisi wadah (wadah wajib relative). object-cover = memenuhi tanpa gepeng */}
            <Image
              src="/images/photo1.jpg"
              alt="Foto profil Jeremy: ilustrasi karakter anime berwajah garang dengan emoji tertawa dan tulisan Ijin Tampil"
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
          Jelajahi website ini
        </h2>

        {/* Grid "bento": 1 kolom di mobile, 3 kolom di md. Kartu About memakai md:col-span-2 (selebar 2 kolom)
            sehingga ukuran kartu berbeda-beda dan tata letak tidak monoton */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* Kartu 1 (lebar 2 kolom): seluruh kartu adalah link. group = agar elemen anak bisa bereaksi saat hover */}
          <Link
            href="/about"
            className="group rounded-3xl bg-lagoon p-8 text-white md:col-span-2"
          >
            {/* h3 = turunan h2 */}
            <h3 className="font-display text-2xl font-bold">About</h3>
            <p className="mt-2 max-w-md text-white/85">
              Biografi, riwayat pendidikan, dan keahlian yang sedang saya pelajari.
            </p>
            {/* group-hover:translate-x-1 = teks bergeser sedikit saat kartu di-hover */}
            <span className="mt-6 inline-block font-semibold transition-transform group-hover:translate-x-1">
              Baca selengkapnya
            </span>
          </Link>

          {/* Kartu 2: kuning, teks ink */}
          <Link href="/hobbies" className="group rounded-3xl bg-sun p-8 text-ink">
            <h3 className="font-display text-2xl font-bold">Hobbies</h3>
            <p className="mt-2 text-ink/80">Game, renang, dan film favorit.</p>
            <span className="mt-6 inline-block font-semibold transition-transform group-hover:translate-x-1">
              Lihat hobi
            </span>
          </Link>

          {/* Kartu 3: putih berbingkai tipis */}
          <Link
            href="/gallery"
            className="group rounded-3xl border border-ink/10 bg-white p-8"
          >
            <h3 className="font-display text-2xl font-bold">Gallery</h3>
            <p className="mt-2 text-ink/75">Koleksi foto dan momen favorit.</p>
            <span className="mt-6 inline-block font-semibold text-lagoon transition-transform group-hover:translate-x-1">
              Buka galeri
            </span>
          </Link>

          {/* Kartu 4 (lebar 2 kolom): gelap */}
          <Link
            href="/contact"
            className="group rounded-3xl bg-ink p-8 text-white md:col-span-3"
          >
            <h3 className="font-display text-2xl font-bold">Contact</h3>
            <p className="mt-2 max-w-md text-white/80">
              Ingin berdiskusi atau berkolaborasi? Hubungi saya lewat email atau media sosial.
            </p>
            <span className="mt-6 inline-block font-semibold text-sun transition-transform group-hover:translate-x-1">
              Hubungi saya
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
