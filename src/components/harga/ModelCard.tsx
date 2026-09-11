import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { WaButton } from "@/components/wa/WaButton";
import type { Model } from "@/data/types";
import { rupiah } from "@/lib/format";
import { KETERANGAN_CICILAN_MULAI, cicilanMulai } from "@/lib/kredit";
import { waModel } from "@/lib/wa";

/**
 * Kartu model, dipakai di beranda dan di halaman /harga.
 * Tidak ada badge diskon atau bahasa promo di sini: kartu unit mobil
 * hanya menampilkan harga OTR resmi dan dua spesifikasi kunci.
 */
export function ModelCard({
  model,
  className = "",
}: {
  model: Model;
  className?: string;
}) {
  const cicilan = cicilanMulai(model.hargaMulai);

  return (
    <Card
      as="article"
      className={`flex h-full flex-col overflow-hidden ${
        model.unggulan ? "border-brand" : ""
      } ${className}`}
      raised={model.unggulan}
    >
      <Placeholder
        ratio="4/3"
        id={`${model.slug}-kartu.jpg`}
        label={`Foto ${model.nama} tampak tiga perempat depan`}
        alt={`${model.nama}, ${model.tipe}`}
        className="rounded-none border-0 border-b border-dashed"
      />

      <div className="flex flex-1 flex-col p-5">
        {model.unggulan ? (
          <Badge className="mb-3 self-start">Unit Unggulan</Badge>
        ) : null}

        <h3 className="t-h3">{model.nama}</h3>
        <p className="t-small mt-1 text-muted">{model.tipe}</p>

        <dl className="mt-4">
          <dt className="t-small text-muted">Harga OTR mulai</dt>
          <dd className="t-h3 text-brand">{rupiah(model.hargaMulai)}</dd>
          <dt className="t-small mt-2 text-muted">Cicilan mulai</dt>
          <dd className="t-body">{rupiah(cicilan)} per bulan</dd>
          <dd className="t-small text-muted">
            Simulasi, {KETERANGAN_CICILAN_MULAI}
          </dd>
        </dl>

        <ul className="mt-4 flex flex-col gap-1">
          {model.spesifikasiUtama.slice(0, 2).map((s) => (
            <li key={s.label} className="t-small text-muted">
              <span className="font-semibold text-ink">{s.label}:</span> {s.nilai}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2 pt-1 sm:flex-row">
          <Link
            href={`/harga/${model.slug}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-btn border border-line bg-bg px-4 font-semibold text-ink transition-colors duration-150 hover:bg-surface"
          >
            Lihat detail
          </Link>
          <WaButton
            context={waModel(model.nama)}
            ariaLabel={`Chat WhatsApp Mahesa tentang ${model.nama}`}
            className="flex-1"
          >
            Tanya unit ini
          </WaButton>
        </div>
      </div>
    </Card>
  );
}
