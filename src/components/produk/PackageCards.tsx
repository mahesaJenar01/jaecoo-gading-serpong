import { IconCheck } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { WaButton } from "@/components/wa/WaButton";
import { catatanHarga, limitedOffer, paket, selisihPaket } from "@/data/catalog";
import type { Paket } from "@/data/types";
import { rupiah } from "@/lib/format";
import { waPaket } from "@/lib/wa";

/**
 * Bilah penawaran terbatas.
 *
 * Seluruh isinya dibaca dari limitedOffer di packages.json. Saat
 * enabled bernilai false, komponen ini tidak merender apa pun, termasuk
 * badge terkait di kartu paket. Tidak ada hitung mundur dan tidak ada
 * periode yang dikarang di dalam komponen.
 */
export function PackageOfferBar() {
  if (!limitedOffer.enabled) return null;

  return (
    <div className="rounded-card border border-brand bg-brand-soft px-4 py-3 md:px-5">
      <p className="t-small text-ink">
        <span className="font-semibold">{limitedOffer.label}</span>
        {limitedOffer.berlakuSampai ? (
          <> Berlaku sampai {limitedOffer.berlakuSampai}.</>
        ) : null}
        {limitedOffer.kuota !== null ? (
          <> Sisa kuota {limitedOffer.kuota} unit.</>
        ) : null}
      </p>
    </div>
  );
}

/**
 * Catatan bahwa harga aksesoris belum final.
 *
 * Wajib tampil di setiap tempat yang menyebut harga paket atau harga
 * katalog satuan, karena angka di halaman ini adalah harga acuan yang
 * masih bisa dibicarakan lagi, bukan harga mati. Kalimatnya dibaca dari
 * catatanHarga di packages.json supaya cukup diubah di satu tempat.
 */
export function PriceNoteBar() {
  return (
    <div className="rounded-card border border-line bg-surface px-4 py-3 md:px-5">
      <p className="t-small text-muted">
        <span className="font-semibold text-ink">Harga masih bisa dibicarakan.</span>{" "}
        {catatanHarga}
      </p>
    </div>
  );
}

/**
 * Tiga kartu paket.
 *
 * Urutan di data sudah menempatkan paket sorot di tengah untuk desktop.
 * Di mobile kartu sorot dinaikkan ke urutan pertama lewat CSS order,
 * jadi isinya cukup dirender sekali.
 *
 * Halaman ini boleh memakai bahasa harga hemat karena yang dijual adalah
 * aksesoris dan jasa, bukan unit mobil. Tetap tidak ada penyebutan
 * cicilan atau kredit di mana pun.
 */
export function PackageCards() {
  return (
    <div className="grid items-start gap-5 md:grid-cols-3 md:gap-6">
      {paket.map((p) => (
        <PackageCard key={p.id} paket={p} />
      ))}
    </div>
  );
}

function PackageCard({ paket: p }: { paket: Paket }) {
  const selisih = selisihPaket(p);
  // Item bernilai tinggi ditampilkan lebih dulu.
  const isi = [...p.isi].sort(
    (a, b) => Number(b.nilaiTinggi) - Number(a.nilaiTinggi),
  );

  return (
    <div className={p.sorot ? "order-first md:order-none" : ""}>
      {p.sorot ? (
        <div className="mb-2 flex justify-center">
          <Badge>Paling Sesuai untuk Sebagian Besar Pembeli</Badge>
        </div>
      ) : (
        <div className="mb-2 hidden h-[30px] md:block" aria-hidden="true" />
      )}

      <article
        className={`flex h-full flex-col rounded-card p-6 ${
          p.sorot
            ? "border-2 border-brand bg-brand-soft md:pt-8 md:pb-8"
            : "border border-line bg-bg"
        }`}
      >
        <h3 className="t-h3">{p.nama}</h3>
        <p className="t-small mt-2 text-muted">{p.cocokUntuk}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {isi.map((item) => (
            <li key={item.nama} className="flex gap-2">
              <IconCheck
                className="mt-0.5 shrink-0 text-brand"
                width={18}
                height={18}
              />
              <span
                className={`t-small ${item.nilaiTinggi ? "font-semibold text-ink" : "text-muted"}`}
              >
                {item.nama}
              </span>
            </li>
          ))}
        </ul>

        <dl className="t-small mt-5 flex flex-col gap-1 border-t border-line pt-4 text-muted">
          <div className="flex justify-between gap-4">
            <dt>Estimasi pengerjaan</dt>
            <dd className="text-right text-ink">{p.estimasiPengerjaan}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Garansi pemasangan</dt>
            <dd className="text-right text-ink">{p.garansiPemasangan}</dd>
          </div>
        </dl>

        <div className="mt-5">
          <p className="t-small text-muted line-through">
            {rupiah(p.totalSatuan)} bila dibeli satuan
          </p>
          <p className="t-h2 text-brand">{rupiah(p.harga)}</p>
          <p className="t-small mt-1 font-semibold text-ink">
            Hemat {rupiah(selisih.rupiah)} atau sekitar {selisih.persen} persen
          </p>
          <p className="t-small mt-1 text-muted">
            Harga acuan, masih bisa dibicarakan lagi.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <WaButton
            context={waPaket(p.nama)}
            ariaLabel={`Chat WhatsApp Mahesa Jenar tentang ${p.nama}`}
            block
            size={p.sorot ? "lg" : "md"}
            variant={p.sorot ? "primary" : "secondary"}
          >
            Tanya {p.nama}
          </WaButton>
        </div>
      </article>
    </div>
  );
}
