import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { WaButton } from "@/components/wa/WaButton";
import type { Model } from "@/data/types";
import { rupiah } from "@/lib/format";
import {
  DP_STANDAR,
  KETERANGAN_CICILAN_MULAI,
  cicilanMulai,
  uangMuka,
} from "@/lib/kredit";
import { waModelVarian } from "@/lib/wa";

/** Ringkasan harga per varian, termasuk status ketersediaan test drive. */
export function VariantPriceCards({ model }: { model: Model }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {model.varian.map((v) => (
        <li key={v.nama}>
          <Card className="flex h-full flex-col p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="t-h3">
                {model.nama} {v.nama}
              </h3>
              <Badge tone={v.testDrive.tersedia ? "brand" : "neutral"}>
                {v.testDrive.tersedia
                  ? "Tersedia untuk test drive"
                  : v.testDrive.catatan}
              </Badge>
            </div>

            <dl className="mt-4 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="t-small text-muted">Harga OTR</dt>
                <dd className="t-h3 text-brand">{rupiah(v.hargaOtr)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="t-small text-muted">
                  Uang muka {DP_STANDAR} persen
                </dt>
                <dd className="t-body text-right">
                  {rupiah(uangMuka(v.hargaOtr, DP_STANDAR))}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="t-small text-muted">Cicilan mulai</dt>
                <dd className="t-body text-right">
                  {rupiah(cicilanMulai(v.hargaOtr))} per bulan
                </dd>
              </div>
            </dl>

            <p className="t-small mt-3 text-muted">
              Cicilan mulai dihitung dari {KETERANGAN_CICILAN_MULAI}. Uang
              muka, tenor, asuransi, dan skemanya bisa diatur di simulasi
              kredit di bawah.
            </p>

            <WaButton
              context={waModelVarian(model.nama, v.nama)}
              ariaLabel={`Chat WhatsApp Mahesa tentang ${model.nama} varian ${v.nama}`}
              block
              className="mt-5"
            >
              Tanya varian ini
            </WaButton>
          </Card>
        </li>
      ))}
    </ul>
  );
}
