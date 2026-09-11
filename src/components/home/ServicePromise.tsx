import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Janji pelayanan. Blok inti beranda, dan pengganti blok promo.
 * Seluruh isinya berbicara tentang cara kerja, bukan tentang potongan harga.
 */
const poin = [
  {
    judul: "Konsultasi tanpa didesak",
    isi: "Anda boleh bertanya berkali kali sebelum memutuskan. Tidak ada kejar setoran di percakapan kita.",
  },
  {
    judul: "Hitungan yang terbuka sejak awal",
    isi: "Perkiraan cicilan, uang muka, dan hal yang perlu disiapkan di luar harga unit dibuka sejak awal.",
  },
  {
    judul: "Pendampingan berkas dan pengajuan kredit",
    isi: "Dari menyiapkan kelengkapan dokumen sampai mengajukan ke leasing, Mahesa bantu langkah demi langkah.",
  },
  {
    judul: "Test drive yang bisa diatur",
    isi: "Jadwal dan lokasi menyesuaikan Anda, termasuk di area domisili, selama unitnya tersedia.",
  },
  {
    judul: "Kabar berkala tentang progres unit",
    isi: "Setelah pemesanan, Anda tidak perlu menagih kabar. Mahesa yang mengabari perkembangannya.",
  },
  {
    judul: "Pendampingan sampai servis pertama",
    isi: "Serah terima bukan akhir. Pertanyaan setelah unit diterima tetap dijawab Mahesa.",
  },
];

export function ServicePromise() {
  return (
    <Section labelledBy="janji-pelayanan" tone="default">
      <SectionHeading
        id="janji-pelayanan"
        eyebrow="Cara Mahesa bekerja"
        title="Yang Anda dapatkan saat membeli lewat Mahesa"
        description="Yang ditawarkan Mahesa adalah pelayanannya. Enam hal berikut berlaku untuk setiap pembeli, tanpa terkecuali."
      />

      <ol className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:gap-y-8">
        {poin.map((p, i) => (
          <li key={p.judul} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-brand-soft font-semibold text-brand tabular-nums"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="t-h3">{p.judul}</h3>
              <p className="t-body mt-1 text-muted">{p.isi}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
