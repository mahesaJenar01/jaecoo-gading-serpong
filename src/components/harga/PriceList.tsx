import { Card } from "@/components/ui/Card";
import { ScrollTable } from "@/components/ui/ScrollTable";
import { WaButton } from "@/components/wa/WaButton";
import { semuaVarian } from "@/data/models";
import { rupiah } from "@/lib/format";
import {
  CATATAN_ESTIMASI,
  KETERANGAN_CICILAN_MULAI,
  cicilanMulai,
} from "@/lib/kredit";
import { waModelVarian } from "@/lib/wa";

/**
 * Daftar harga seluruh varian.
 *
 * Di mobile berupa kartu bertumpuk, bukan tabel yang dipaksa mengecil.
 * Mulai lebar md barulah tampil sebagai tabel. Keduanya dibangun dari
 * data yang sama, jadi tidak mungkin berbeda isi.
 *
 * Tidak ada kolom potongan harga, promo, atau harga coret di sini.
 */
export function PriceList() {
  const varian = semuaVarian();

  return (
    <>
      {/* Mobile: kartu bertumpuk */}
      <ul className="mt-6 flex flex-col gap-4 md:hidden">
        {varian.map((v) => (
          <li key={`${v.modelSlug}-${v.nama}`}>
            <Card className="p-5">
              <p className="t-h3">{v.modelNama}</p>
              <p className="t-small mt-0.5 text-muted">Varian {v.nama}</p>

              <dl className="mt-4 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="t-small text-muted">Harga OTR</dt>
                  <dd className="t-h3 text-brand">{rupiah(v.hargaOtr)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="t-small text-muted">Cicilan mulai</dt>
                  <dd className="t-body text-right">
                    {rupiah(cicilanMulai(v.hargaOtr))} per bulan
                  </dd>
                </div>
              </dl>

              <WaButton
                context={waModelVarian(v.modelNama, v.nama)}
                ariaLabel={`Chat WhatsApp Mahesa tentang ${v.modelNama} varian ${v.nama}`}
                block
                className="mt-4"
              >
                Tanya varian ini
              </WaButton>
            </Card>
          </li>
        ))}
      </ul>

      {/* md ke atas: tabel */}
      <div className="mt-8 hidden md:block">
        <ScrollTable
          caption="Daftar harga on the road seluruh varian JAECOO"
          minWidth={720}
          hint={false}
        >
          <thead>
            <tr>
              <th scope="col">Model</th>
              <th scope="col">Varian</th>
              <th scope="col">Harga OTR</th>
              <th scope="col">Cicilan mulai</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {varian.map((v) => (
              <tr key={`${v.modelSlug}-${v.nama}`}>
                <th scope="row">{v.modelNama}</th>
                <td>{v.nama}</td>
                <td className="font-semibold text-brand">{rupiah(v.hargaOtr)}</td>
                <td>{rupiah(cicilanMulai(v.hargaOtr))} per bulan</td>
                <td>
                  <WaButton
                    context={waModelVarian(v.modelNama, v.nama)}
                    ariaLabel={`Chat WhatsApp Mahesa tentang ${v.modelNama} varian ${v.nama}`}
                    withIcon={false}
                  >
                    Tanya varian ini
                  </WaButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </div>

      <p className="t-small mt-4 text-muted">
        Kolom cicilan mulai memakai {KETERANGAN_CICILAN_MULAI}. Simulasi
        lengkapnya ada di halaman masing masing model. {CATATAN_ESTIMASI}
      </p>
    </>
  );
}
