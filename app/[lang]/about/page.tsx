import { getDictionary } from "../dictionaries";

// Data keahlian & pendidikan sekarang ada di kamus (dictionaries/id.json & en.json)
// agar bisa diterjemahkan; di sini tinggal dirender dengan .map

export default async function AboutPage() {
  const dict = await getDictionary();
  const t = dict.about; // singkatan: t.title, t.bio, dst.

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* <header> di dalam <main>: kepala halaman berisi judul. Satu-satunya <h1> */}
      <header>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          {t.title}
        </h1>
      </header>

      {/* Layout 2 kolom di lg ke atas: grid 5 bagian → kiri 2 bagian, kanan 3 bagian.
          items-start = kolom tidak dipaksa sama tinggi */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
        {/* KOLOM KIRI (2 bagian): biografi + kutipan. lg:sticky lg:top-24 = menempel saat scroll di desktop */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-2">
          {/* SECTION: Biografi, kartu (surface = putih di mode terang) */}
          <section
            aria-labelledby="judul-bio"
            className="rounded-3xl border border-ink/10 bg-surface p-7"
          >
            <h2 id="judul-bio" className="font-display text-2xl font-bold">
              {t.bioTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/80">{t.bio}</p>
          </section>

          {/* SECTION: Quote favorit. <blockquote> = kutipan, <cite> = sumber.
              bg-sun-soft + border-l-8 border-sun = latar kuning pucat dengan garis tebal di kiri */}
          <section aria-labelledby="judul-quote">
            <h2 id="judul-quote" className="font-display text-2xl font-bold">
              {t.quoteTitle}
            </h2>
            <blockquote className="mt-3 rounded-2xl border-l-8 border-sun bg-sun-soft p-6">
              <p className="text-lg font-medium leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-ink/70">
                {t.quoteAuthor}, <cite>{t.quoteSource}</cite>
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
              {t.educationTitle}
            </h2>
            {/* border-l-2 border-lagoon = garis vertikal timeline; ml-3 pl-8 = geser isi ke kanan garis */}
            <ol className="relative mt-6 ml-3 list-none space-y-8 border-l-2 border-lagoon">
              {t.education.map((item) => (
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
              {t.skillsTitle}
            </h2>
            {/* overflow-x-auto = tabel bisa digeser horizontal di layar kecil; overflow-hidden + rounded = sudut membulat */}
            <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-surface">
              <table className="w-full text-left text-sm">
                {/* <caption> = judul tabel (aksesibilitas). sr-only = hanya terbaca screen reader */}
                <caption className="sr-only">{t.skillsCaption}</caption>
                {/* <thead> = baris judul kolom. scope="col" = sel header untuk satu kolom */}
                <thead className="bg-deep text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.skillsHeaders.no}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.skillsHeaders.skill}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.skillsHeaders.level}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.skillsHeaders.experience}</th>
                  </tr>
                </thead>
                {/* divide-y = garis pemisah antar baris; even:bg-paper = baris genap berwarna beda (zebra) */}
                <tbody className="divide-y divide-ink/10">
                  {t.skills.map((skill, index) => (
                    <tr key={skill.name} className="even:bg-paper">
                      <td className="px-5 py-3">{index + 1}</td>
                      <th scope="row" className="px-5 py-3 font-semibold">{skill.name}</th>
                      <td className="px-5 py-3">
                        {/* Lencana level: tingkat menengah = teal muda, selain itu = kuning pucat.
                            Penanda "intermediate" dari kamus (bukan membandingkan teks "Menengah"),
                            sehingga tetap benar di semua bahasa */}
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            skill.intermediate ? "bg-mist text-mist-ink" : "bg-sun-soft text-ink"
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
