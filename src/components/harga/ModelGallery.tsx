import { Placeholder } from "@/components/ui/Placeholder";
import type { Model } from "@/data/types";

/**
 * Galeri model: satu foto utama dan empat foto kecil.
 * Semua masih placeholder dan sudah memesan ruang sesuai rasio, sehingga
 * mengganti dengan foto asli tidak akan menggeser tata letak.
 */
const KECIL = [
  { suffix: "interior", label: "Interior dan dasbor", alt: "Interior" },
  { suffix: "samping", label: "Tampak samping", alt: "Tampak samping" },
  { suffix: "belakang", label: "Tampak belakang", alt: "Tampak belakang" },
  { suffix: "bagasi", label: "Ruang bagasi", alt: "Ruang bagasi" },
];

export function ModelGallery({ model }: { model: Model }) {
  return (
    <div className="flex flex-col gap-3">
      <Placeholder
        ratio="16/9"
        id={`${model.slug}-utama.jpg`}
        label={`Foto utama ${model.nama}, tampak tiga perempat depan`}
        alt={`${model.nama}, ${model.tipe}, tampak tiga perempat depan`}
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {KECIL.map((k) => (
          <li key={k.suffix}>
            <Placeholder
              ratio="4/3"
              id={`${model.slug}-${k.suffix}.jpg`}
              label={k.label}
              alt={`${k.alt} ${model.nama}`}
              compact
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Pilihan warna. Kotak warna hanya perkiraan tampilan untuk membantu
 * pengenalan, bukan kode cat resmi. Foto tiap warna masih placeholder.
 */
export function ColorSwatches({ model }: { model: Model }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {model.warna.map((w) => (
          <li key={w.nama} className="flex flex-col gap-2">
            <Placeholder
              ratio="4/3"
              id={`${model.slug}-warna-${w.nama.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              label={`Foto warna ${w.nama}`}
              alt={`${model.nama} warna ${w.nama}`}
              compact
            />
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-6 w-6 shrink-0 overflow-hidden rounded-pill border border-line"
                style={
                  w.hexAtap
                    ? {
                        background: `linear-gradient(160deg, ${w.hexAtap} 0 45%, ${w.hex} 45% 100%)`,
                      }
                    : { background: w.hex }
                }
              />
              <span className="t-small">{w.nama}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="t-small mt-4 text-muted">
        Kotak warna di atas adalah perkiraan tampilan untuk memudahkan
        pengenalan, bukan kode cat resmi. Ketersediaan warna per periode bisa
        dicek Mahesa lebih dulu.
      </p>
    </>
  );
}
