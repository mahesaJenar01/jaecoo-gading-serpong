import { IconCheck, IconClock, IconShield, IconSparkle } from "@/components/icons";
import { Placeholder } from "@/components/ui/Placeholder";

/** Alasan memasang aksesoris di sini: empat poin tentang pelayanan dan kualitas. */
const alasan = [
  {
    icon: IconClock,
    judul: "Dijadwalkan bersama serah terima",
    isi: "Pemasangan diatur sebelum unit Anda terima, jadi mobil sudah siap pakai sejak hari pertama.",
  },
  {
    icon: IconCheck,
    judul: "Barang dan harga jelas di depan",
    isi: "Merek, tipe, dan harga disebutkan sebelum pengerjaan, tanpa biaya yang muncul belakangan.",
  },
  {
    icon: IconShield,
    judul: "Ada garansi pemasangan",
    isi: "Bila ada yang kurang pas setelah dipasang, tinggal kabari Mahesa dan akan dirapikan kembali.",
  },
  {
    icon: IconSparkle,
    judul: "Satu pintu lewat Mahesa",
    isi: "Anda tidak perlu berurusan dengan banyak pihak. Semua koordinasi lewat satu orang.",
  },
];

export function WhyInstallHere() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {alasan.map(({ icon: Icon, judul, isi }) => (
        <li key={judul} className="flex gap-3">
          <Icon className="mt-1 shrink-0 text-brand" width={20} height={20} />
          <div>
            <h3 className="t-h3">{judul}</h3>
            <p className="t-body mt-1 text-muted">{isi}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const langkah = [
  {
    judul: "Konsultasi",
    isi: "Kita bahas kebutuhan Anda dan menentukan paket atau item satuan yang benar benar diperlukan.",
  },
  {
    judul: "Jadwal",
    isi: "Tanggal pengerjaan disepakati dan disesuaikan dengan perkiraan waktu serah terima unit.",
  },
  {
    judul: "Pengerjaan",
    isi: "Pemasangan dikerjakan sesuai estimasi waktu yang sudah disebutkan di awal.",
  },
  {
    judul: "Serah terima",
    isi: "Hasil pemasangan diperiksa bersama sebelum mobil Anda bawa pulang.",
  },
];

export function WorkflowSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {langkah.map((l, i) => (
        <li key={l.judul}>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-soft font-semibold text-brand tabular-nums"
          >
            {i + 1}
          </span>
          <h3 className="t-h3 mt-3">{l.judul}</h3>
          <p className="t-body mt-1 text-muted">{l.isi}</p>
        </li>
      ))}
    </ol>
  );
}

const hasil = [
  { id: "kaca-film", label: "Kaca film" },
  { id: "nano-coating", label: "Nano coating" },
];

/** Grid sebelum dan sesudah untuk kaca film dan coating. */
export function BeforeAfterGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {hasil.map((h) => (
        <div key={h.id}>
          <h3 className="t-h3">{h.label}</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <figure>
              <Placeholder
                ratio="4/3"
                id={`hasil-${h.id}-sebelum.jpg`}
                label={`Sebelum ${h.label.toLowerCase()}`}
                alt={`Kondisi sebelum pengerjaan ${h.label.toLowerCase()}`}
                compact
              />
              <figcaption className="t-small mt-2 text-muted">Sebelum</figcaption>
            </figure>
            <figure>
              <Placeholder
                ratio="4/3"
                id={`hasil-${h.id}-sesudah.jpg`}
                label={`Sesudah ${h.label.toLowerCase()}`}
                alt={`Hasil setelah pengerjaan ${h.label.toLowerCase()}`}
                compact
              />
              <figcaption className="t-small mt-2 text-muted">Sesudah</figcaption>
            </figure>
          </div>
        </div>
      ))}
    </div>
  );
}
