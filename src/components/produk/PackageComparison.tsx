import { IconCheck } from "@/components/icons";
import { ScrollTable } from "@/components/ui/ScrollTable";
import { paket, semuaItemPaket } from "@/data/catalog";
import { rupiah } from "@/lib/format";

/**
 * Tabel perbandingan isi paket.
 * Baris berisi item, kolom berisi paket. Kolom pertama dikunci saat
 * tabel digeser di layar sempit.
 */
export function PackageComparison() {
  const items = semuaItemPaket();

  return (
    <ScrollTable
      caption="Perbandingan isi tiga paket aksesoris"
      minWidth={680}
      stickyFirstCol
    >
      <thead>
        <tr>
          <th scope="col">Isi paket</th>
          {paket.map((p) => (
            <th key={p.id} scope="col">
              {p.nama}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((nama) => (
          <tr key={nama}>
            <th scope="row">{nama}</th>
            {paket.map((p) => {
              const ada = p.isi.some((i) => i.nama === nama);
              return (
                <td key={p.id}>
                  {ada ? (
                    <>
                      <IconCheck
                        className="text-brand"
                        width={18}
                        height={18}
                      />
                      <span className="sr-only">Termasuk</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-muted">
                        &ndash;
                      </span>
                      <span className="sr-only">Tidak termasuk</span>
                    </>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
        <tr>
          <th scope="row">Harga paket</th>
          {paket.map((p) => (
            <td key={p.id} className="font-semibold text-brand">
              {rupiah(p.harga)}
            </td>
          ))}
        </tr>
        <tr>
          <th scope="row">Estimasi pengerjaan</th>
          {paket.map((p) => (
            <td key={p.id}>{p.estimasiPengerjaan}</td>
          ))}
        </tr>
      </tbody>
    </ScrollTable>
  );
}
