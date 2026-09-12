import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { catatanHarga, paketSorot, selisihPaket } from "@/data/catalog";
import { rupiah } from "@/lib/format";

/**
 * Kartu ringkas aksesoris.
 *
 * Ini satu satunya blok di luar /produk-lainnya yang boleh menyebut harga
 * paket dan selisih hemat. Karena itu setiap kalimat di sini menegaskan
 * bahwa yang dimaksud adalah paket aksesoris dan jasa pemasangan, bukan
 * harga unit mobil. Tidak ada penyebutan cicilan atau kredit sama sekali,
 * karena aksesoris tidak bisa masuk skema kredit unit.
 */
export function AccessoryTeaser() {
  const selisih = selisihPaket(paketSorot);

  return (
    <Section labelledBy="aksesoris-beranda" className="border-t border-line">
      <Card tone="surface" className="overflow-hidden">
        <div className="grid gap-0 md:grid-cols-2">
          <Placeholder
            ratio="4/3"
            id="paket-aksesoris-ringkas.jpg"
            label="Foto proses pemasangan aksesoris di bengkel"
            alt="Pemasangan aksesoris pada unit JAECOO sebelum serah terima"
            className="h-full rounded-none border-0 border-b border-dashed md:border-b-0 md:border-r"
          />

          <div className="p-6 md:p-8">
            <Badge tone="brand">Aksesoris dan perawatan</Badge>

            <h2 id="aksesoris-beranda" className="t-h2 mt-3">
              Paket aksesoris untuk mobil baru Anda
            </h2>

            <p className="t-body mt-3 text-muted">
              Kaca film Solargard Black Phantom, nano coating, sampai asuransi.
              Dipasang rapi dan dijadwalkan bersamaan dengan proses serah
              terima, sehingga mobil sudah siap pakai saat Anda terima.
            </p>

            <div className="mt-5 rounded-card border border-line bg-bg p-4">
              <p className="t-small text-muted">Paket yang paling sering dipilih</p>
              <p className="t-h3 mt-1">{paketSorot.nama}</p>
              <p className="t-body mt-2">
                <span className="font-semibold text-brand">
                  {rupiah(paketSorot.harga)}
                </span>{" "}
                <span className="text-muted line-through">
                  {rupiah(paketSorot.totalSatuan)}
                </span>
              </p>
              <p className="t-small mt-1 text-muted">
                Hemat {rupiah(selisih.rupiah)} atau sekitar {selisih.persen}{" "}
                persen dibanding membeli item paket ini satuan.
              </p>
            </div>

            <p className="t-small mt-4 text-muted">
              Harga di atas adalah harga paket aksesoris beserta jasa
              pemasangannya, terpisah dan tidak memengaruhi harga on the road
              unit mobil. {catatanHarga}
            </p>

            <div className="mt-6">
              <Button href="/produk-lainnya">Lihat paket dan katalog</Button>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
