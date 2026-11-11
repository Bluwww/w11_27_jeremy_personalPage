import { getDictionary } from "../dictionaries";

// Class warna tiap kartu hobi (urutan sama dengan daftar hobi di kamus: peringkat 1, 2, 3).
// Teks hobi sendiri ada di kamus agar bisa diterjemahkan; warna tidak perlu diterjemahkan.
// bg-sun memakai text-night (selalu gelap) karena latar kuning tidak berubah di mode gelap
const tones = ["bg-lagoon text-white", "bg-sun text-night", "bg-deep text-white"];

export default async function HobbiesPage() {
  const dict = await getDictionary();
  const t = dict.hobbies;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
      {/* <header> halaman berisi satu-satunya <h1> */}
      <header>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink/75">{t.intro}</p>
      </header>

      {/* SECTION 1: Hobi favorit berperingkat → pakai Ordered List (<ol>) karena urutan bermakna */}
      <section aria-labelledby="judul-top-hobi" className="mt-14">
        <h2 id="judul-top-hobi" className="font-display text-2xl font-bold">
          {t.topTitle}
        </h2>
        {/* <ol>: list-none = hilangkan angka bawaan (diganti angka besar buatan sendiri).
            grid md:grid-cols-3 = tiga kartu berdampingan di layar md ke atas */}
        <ol className="mt-6 grid list-none gap-4 md:grid-cols-3">
          {t.top.map((hobby, index) => (
            // tones[index] = warna kartu sesuai peringkat; rounded-3xl p-8 = sudut besar & padding lega
            <li key={hobby.title} className={`rounded-3xl p-8 ${tones[index]}`}>
              {/* Angka peringkat: index + 1 (mulai dari 1). aria-hidden karena <ol> sudah memberi urutan */}
              <span aria-hidden="true" className="font-display text-6xl font-extrabold opacity-40">
                {index + 1}
              </span>
              {/* h3 = turunan h2 */}
              <h3 className="mt-4 font-display text-2xl font-bold">{hobby.title}</h3>
              <p className="mt-2 leading-relaxed opacity-90">{hobby.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SECTION 2: Kegiatan lain tanpa urutan → pakai Unordered List (<ul>) tampil seperti "chip".
          flex flex-wrap = item berjajar & turun baris otomatis; list-none = tanpa bullet bawaan */}
      <section aria-labelledby="judul-lainnya" className="mt-14">
        <h2 id="judul-lainnya" className="font-display text-2xl font-bold">
          {t.otherTitle}
        </h2>
        <ul className="mt-6 flex list-none flex-wrap gap-3">
          {t.other.map((activity) => (
            // rounded-full bg-mist px-5 py-2.5 = lencana bulat berlatar teal muda; text-mist-ink = teks yang kontras di kedua tema
            <li
              key={activity}
              className="rounded-full bg-mist px-5 py-2.5 font-medium text-mist-ink"
            >
              {activity}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
