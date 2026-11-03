export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      {/* Judul halaman: satu-satunya <h1> */}
      <h1 className="text-3xl font-extrabold text-slate-900">Tentang Saya</h1>

      {/* SECTION: Biografi. space-y-3 = jarak vertikal antar paragraf */}
      <section aria-labelledby="judul-bio" className="mt-8">
        <h2 id="judul-bio" className="text-2xl font-bold text-slate-900">Biografi</h2>
        <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
          <p>
            Saya Nama Lengkap Kamu, mahasiswa semester 5 yang tertarik pada pengembangan web
            dan pemrograman. Saya senang belajar teknologi baru dan menerapkannya dalam proyek nyata.
          </p>
          <p>
            Di luar kuliah, saya aktif mengikuti kegiatan organisasi dan suka berbagi ilmu
            dengan teman-teman.
          </p>
        </div>
      </section>

      {/* SECTION: Riwayat pendidikan memakai <ol> (urutan kronologis penting) */}
      <section aria-labelledby="judul-pendidikan" className="mt-10">
        <h2 id="judul-pendidikan" className="text-2xl font-bold text-slate-900">Riwayat Pendidikan</h2>
        {/* list-decimal = penomoran angka, list-inside = nomor di dalam kotak */}
        <ol className="mt-3 list-inside list-decimal space-y-4">
          <li>
            {/* h3 untuk tiap jenjang, turunan dari h2 */}
            <h3 className="inline font-semibold">SD Negeri 1 Contoh</h3>
            <p className="ml-6 text-sm text-slate-600">2008 – 2014</p>
          </li>
          <li>
            <h3 className="inline font-semibold">SMP Negeri 1 Contoh</h3>
            <p className="ml-6 text-sm text-slate-600">2014 – 2017</p>
          </li>
          <li>
            <h3 className="inline font-semibold">SMA Negeri 1 Contoh</h3>
            <p className="ml-6 text-sm text-slate-600">2017 – 2020</p>
          </li>
          <li>
            <h3 className="inline font-semibold">S1 Informatika, Universitas Contoh</h3>
            <p className="ml-6 text-sm text-slate-600">2023 – sekarang</p>
          </li>
        </ol>
      </section>

      {/* SECTION: Tabel keahlian */}
      <section aria-labelledby="judul-skill" className="mt-10">
        <h2 id="judul-skill" className="text-2xl font-bold text-slate-900">Keahlian</h2>
        {/* overflow-x-auto = tabel bisa di-scroll horizontal di layar kecil */}
        <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            {/* <caption> = judul tabel (aksesibilitas) */}
            <caption className="p-3 text-left text-sm text-slate-500">
              Daftar keahlian teknis beserta tingkat penguasaannya
            </caption>
            {/* <thead> = baris judul kolom; scope="col" menandakan sel header untuk kolom */}
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th scope="col" className="px-4 py-2">No</th>
                <th scope="col" className="px-4 py-2">Keahlian</th>
                <th scope="col" className="px-4 py-2">Level</th>
                <th scope="col" className="px-4 py-2">Pengalaman</th>
              </tr>
            </thead>
            {/* divide-y = garis pemisah antar baris; odd:bg-slate-50 = belang-belang */}
            <tbody className="divide-y divide-slate-200">
              <tr className="odd:bg-slate-50">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">HTML &amp; CSS</td>
                <td className="px-4 py-2">Menengah</td>
                <td className="px-4 py-2">2 tahun</td>
              </tr>
              <tr className="odd:bg-slate-50">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">JavaScript / TypeScript</td>
                <td className="px-4 py-2">Menengah</td>
                <td className="px-4 py-2">1 tahun</td>
              </tr>
              <tr className="odd:bg-slate-50">
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">Next.js &amp; Tailwind CSS</td>
                <td className="px-4 py-2">Pemula</td>
                <td className="px-4 py-2">Sedang belajar</td>
              </tr>
              <tr className="odd:bg-slate-50">
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">Python</td>
                <td className="px-4 py-2">Menengah</td>
                <td className="px-4 py-2">2 tahun</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: Quote favorit. <blockquote> = kutipan, <cite> = sumber kutipan */}
      <section aria-labelledby="judul-quote" className="mt-10">
        <h2 id="judul-quote" className="text-2xl font-bold text-slate-900">Quote Favorit</h2>
        {/* border-l-4 = garis tebal di kiri, italic = huruf miring */}
        <blockquote className="mt-3 border-l-4 border-indigo-500 bg-indigo-50 p-4 italic text-slate-700">
          <p>&ldquo;Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.&rdquo;</p>
          <footer className="mt-2 text-sm not-italic text-slate-500">
            — <cite>Steve Jobs</cite>
          </footer>
        </blockquote>
      </section>
    </main>
  );
}