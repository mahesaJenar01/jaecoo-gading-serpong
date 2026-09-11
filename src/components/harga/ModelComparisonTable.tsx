import { ScrollTable } from "@/components/ui/ScrollTable";
import { modelsUrut } from "@/data/models";
import type { Model } from "@/data/types";
import { rupiah } from "@/lib/format";

/**
 * Perbandingan antar model dalam satu tabel yang bisa digeser.
 * Nilai diambil langsung dari spesifikasiLengkap di models.json, jadi
 * menambah atau mengubah spesifikasi cukup dilakukan di berkas data.
 */
function spec(model: Model, ...labels: string[]): string {
  for (const label of labels) {
    for (const grup of model.spesifikasiLengkap) {
      const baris = grup.baris.find((b) => b.label === label);
      if (baris) return baris.nilai;
    }
  }
  return "-";
}

const BARIS: { label: string; nilai: (m: Model) => string }[] = [
  { label: "Jenis", nilai: (m) => m.tipe },
  { label: "Harga OTR", nilai: (m) => rupiah(m.hargaMulai) },
  {
    label: "Tenaga",
    nilai: (m) => spec(m, "Tenaga gabungan", "Tenaga maksimum"),
  },
  {
    label: "Torsi",
    nilai: (m) => spec(m, "Torsi gabungan", "Torsi maksimum"),
  },
  { label: "Kapasitas baterai", nilai: (m) => spec(m, "Kapasitas baterai") },
  {
    label: "Jarak tempuh listrik",
    nilai: (m) => spec(m, "Jarak tempuh mode listrik", "Jarak tempuh"),
  },
  {
    label: "Dimensi",
    nilai: (m) => spec(m, "Panjang x lebar x tinggi"),
  },
  { label: "Kapasitas penumpang", nilai: (m) => spec(m, "Kapasitas penumpang") },
  { label: "Airbag", nilai: (m) => spec(m, "Airbag") },
  { label: "ADAS", nilai: (m) => spec(m, "ADAS") },
  {
    label: "Test drive",
    nilai: (m) =>
      m.varian.some((v) => v.testDrive.tersedia)
        ? "Tersedia"
        : (m.varian[0]?.testDrive.catatan ?? "-"),
  },
];

export function ModelComparisonTable() {
  return (
    <ScrollTable
      caption="Perbandingan spesifikasi tiga model JAECOO"
      minWidth={760}
      stickyFirstCol
    >
      <thead>
        <tr>
          <th scope="col">Spesifikasi</th>
          {modelsUrut.map((m) => (
            <th key={m.slug} scope="col">
              {m.nama}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {BARIS.map((b) => (
          <tr key={b.label}>
            <th scope="row">{b.label}</th>
            {modelsUrut.map((m) => (
              <td key={m.slug}>{b.nilai(m)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </ScrollTable>
  );
}
