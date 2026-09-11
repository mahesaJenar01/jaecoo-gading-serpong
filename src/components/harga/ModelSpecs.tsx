import { IconCheck } from "@/components/icons";
import { ScrollTable } from "@/components/ui/ScrollTable";
import type { Model } from "@/data/types";

/**
 * Spesifikasi lengkap dalam tabel berkelompok yang bisa digeser.
 * Setiap kelompok jadi satu tabel tersendiri supaya tetap terbaca di layar
 * sempit tanpa memaksa pengguna menggeser terlalu jauh.
 */
export function SpecTable({ model }: { model: Model }) {
  return (
    <div className="flex flex-col gap-8">
      {model.spesifikasiLengkap.map((grup) => (
        <div key={grup.kelompok}>
          <h3 className="t-h3">{grup.kelompok}</h3>
          <div className="mt-3">
            <ScrollTable
              caption={`Spesifikasi ${grup.kelompok} ${model.nama}`}
              minWidth={480}
              hint={false}
            >
              <tbody>
                {grup.baris.map((b) => (
                  <tr key={b.label}>
                    <th scope="row" className="w-[45%]">
                      {b.label}
                    </th>
                    <td>{b.nilai}</td>
                  </tr>
                ))}
              </tbody>
            </ScrollTable>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HighlightList({ model }: { model: Model }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {model.keunggulan.map((k) => (
        <li key={k.judul} className="flex gap-3">
          <IconCheck className="mt-1 shrink-0 text-brand" width={20} height={20} />
          <div>
            <h3 className="t-h3">{k.judul}</h3>
            <p className="t-body mt-1 text-muted">{k.deskripsi}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
