// Data keahlian disimpan di array agar tabel ringkas (dirender dengan .map)
const skills = [
  { name: "HTML & CSS", level: "Menengah", experience: "1 tahun" },
  { name: "JavaScript / TypeScript", level: "Pemula", experience: "1 tahun" },
  { name: "Next.js & Tailwind CSS", level: "Pemula", experience: "Sedang belajar" },
  { name: "Python", level: "Pemula", experience: "1 tahun" },
];

// Data pendidikan untuk <ol>; urutan array = urutan kronologis
const education = [
  { school: "SD Karitas 3", years: "2008 – 2014" },
  { school: "SMP Karitas 3", years: "2014 – 2017" },
  { school: "SMA Karitas 3", years: "2017 – 2020" },
  { school: "S1 Informatika, Universitas Katolik Widya Mandala Surabaya", years: "2023 – sekarang" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* <header> di dalam <main>: kepala halaman berisi judul. Satu-satunya <h1> */}
      <header>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Tentang saya
        </h1>
      </header>

      {/* Layout 2 kolom di lg ke atas: grid 5 bagian → kiri 2 bagian, kanan 3 bagian.
          items-start = kolom tidak dipaksa sama tinggi */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
        {/* KOLOM KIRI (2 bagian): biografi + kutipan. lg:sticky lg:top-24 = menempel saat scroll di desktop */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-2">
          {/* SECTION: Biografi, kartu putih */}
          <section
            aria-labelledby="judul-bio"
            className="rounded-3xl border border-ink/10 bg-white p-7"
          >
            <h2 id="judul-bio" className="font-display text-2xl font-bold">
              Biografi
            </h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              Saya Jeremy Christian, mahasiswa semester 3 yang tertarik pada pengembangan web
              dan pemrograman. Saya senang belajar teknologi baru dan menerapkannya dalam proyek nyata.
            </p>
          </section>

          {/* SECTION: Quote favorit. <blockquote> = kutipan, <cite> = sumber.
              bg-sun-soft + border-l-8 border-sun = latar kuning pucat dengan garis tebal di kiri */}
          <section aria-labelledby="judul-quote">
            <h2 id="judul-quote" className="font-display text-2xl font-bold">
              Quote favorit
            </h2>
            <blockquote className="mt-3 rounded-2xl border-l-8 border-sun bg-sun-soft p-6">
              <p className="text-lg font-medium leading-relaxed">
                &ldquo;Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-ink/70">
                Steve Jobs, <cite>pidato di Stanford, 2005</cite>
              </footer>
            </blockquote>
          </section>
        </div>

        {/* KOLOM KANAN (3 bagian): pendidikan + keahlian */}
        <div className="space-y-12 lg:col-span-3">
          {/* SECTION: Riwayat pendidikan dalam bentuk timeline (garis vertikal).
              <ol> dipakai karena urutan kronologis penting. list-none = hilangkan angka bawaan */}
          <section aria-labelledby="judul-pendidikan">
            <h2 id="judul-pendidikan" className="font-display text-2xl font-bold">
              Riwayat pendidikan
            </h2>
            {/* border-l-2 border-lagoon = garis vertikal timeline; ml-3 pl-8 = geser isi ke kanan garis */}
            <ol className="relative mt-6 ml-3 list-none space-y-8 border-l-2 border-lagoon">
              {education.map((item) => (
                // relative = patokan titik penanda. pl-8 = ruang antara garis dan teks
                <li key={item.school} className="relative pl-8">
                  {/* Titik penanda di garis: absolute, -left-[9px] menariknya tepat ke atas garis */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-paper bg-lagoon"
                  />
                  {/* h3 = turunan h2 */}
                  <h3 className="font-display text-lg font-bold">{item.school}</h3>
                  <p className="text-sm text-ink/70">{item.years}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* SECTION: Tabel keahlian */}
          <section aria-labelledby="judul-skill">
            <h2 id="judul-skill" className="font-display text-2xl font-bold">
              Keahlian
            </h2>
            {/* overflow-x-auto = tabel bisa digeser horizontal di layar kecil; overflow-hidden + rounded = sudut membulat */}
            <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
              <table className="w-full text-left text-sm">
                {/* <caption> = judul tabel (aksesibilitas). sr-only = hanya terbaca screen reader */}
                <caption className="sr-only">Daftar keahlian teknis beserta tingkat penguasaannya</caption>
                {/* <thead> = baris judul kolom. scope="col" = sel header untuk satu kolom */}
                <thead className="bg-ink text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">No</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Keahlian</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Level</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Pengalaman</th>
                  </tr>
                </thead>
                {/* divide-y = garis pemisah antar baris; even:bg-paper = baris genap berwarna beda (zebra) */}
                <tbody className="divide-y divide-ink/10">
                  {skills.map((skill, index) => (
                    <tr key={skill.name} className="even:bg-paper">
                      <td className="px-5 py-3">{index + 1}</td>
                      <th scope="row" className="px-5 py-3 font-semibold">{skill.name}</th>
                      <td className="px-5 py-3">
                        {/* Lencana level: Menengah = teal muda, selain itu = kuning pucat */}
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            skill.level === "Menengah" ? "bg-mist text-lagoon-dark" : "bg-sun-soft text-ink"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </td>
                      <td className="px-5 py-3">{skill.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
