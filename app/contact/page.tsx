export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* <header> halaman berisi satu-satunya <h1> */}
      <header>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Hubungi saya
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink/75">
          Pilih cara yang paling nyaman. Saya biasanya membalas dalam satu hari.
        </p>
      </header>

      {/* Dua kolom sama lebar di md ke atas; items-stretch (bawaan) = tinggi kedua kartu sama.
          CATATAN: tidak ada <form> di halaman ini sesuai ketentuan tugas */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* SECTION 1: Informasi kontak memakai Description List (<dl>) = pasangan label (dt) & nilai (dd) */}
        <section
          aria-labelledby="judul-info"
          className="rounded-3xl border border-ink/10 bg-white p-8"
        >
          <h2 id="judul-info" className="font-display text-2xl font-bold">
            Informasi kontak
          </h2>
          {/* divide-y = garis pemisah antar item */}
          <dl className="mt-6 divide-y divide-ink/10">
            <div className="py-4 first:pt-0">
              <dt className="text-sm font-semibold text-ink/60">Email</dt>
              {/* mailto: membuka aplikasi email bawaan perangkat */}
              <dd className="mt-1">
                <a
                  href="mailto:jeremy-c.inf25@ukwms.ac.id"
                  className="font-semibold text-lagoon hover:underline"
                >
                  jeremy-c.inf25@ukwms.ac.id
                </a>
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-sm font-semibold text-ink/60">Telepon / WhatsApp</dt>
              {/* tel: membuka aplikasi telepon di HP */}
              <dd className="mt-1">
                <a href="tel:+6281236268929" className="font-semibold text-lagoon hover:underline">
                  +62 812-2672-2340
                </a>
              </dd>
            </div>
            <div className="pt-4">
              <dt className="text-sm font-semibold text-ink/60">Lokasi</dt>
              <dd className="mt-1 font-semibold">Surabaya, Jawa Timur, Indonesia</dd>
            </div>
          </dl>
        </section>

        {/* SECTION 2: Media sosial dalam kartu gelap sebagai kontras.
            Tautan eksternal: target="_blank" = buka tab baru.
            rel="noopener noreferrer" = keamanan agar halaman baru tidak bisa mengakses halaman asal */}
        <section aria-labelledby="judul-sosmed" className="rounded-3xl bg-ink p-8 text-white">
          <h2 id="judul-sosmed" className="font-display text-2xl font-bold">
            Media sosial
          </h2>
          <p className="mt-2 text-white/75">Lihat proyek dan keseharian saya di sini.</p>
          {/* flex-col gap-3 = tombol disusun vertikal dengan jarak */}
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              {/* flex justify-between = nama di kiri, tanda panah di kanan; bg-sun = tombol kuning mencolok */}
              <a
                href="https://github.com/Bluwww"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-sun px-5 py-4 font-semibold text-ink transition-colors hover:bg-white"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              {/* border-white/30 = tombol hanya garis tipis; hover berubah menjadi putih */}
              <a
                href="https://www.instagram.com/jjreee_?obrf=dTc2N2huNms4eGs1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/30 px-5 py-4 font-semibold transition-colors hover:bg-white hover:text-ink"
              >
                Instagram
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
