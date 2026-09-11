import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { WaButton } from "@/components/wa/WaButton";
import { modelUnggulan } from "@/data/models";
import { rupiah } from "@/lib/format";
import { KETERANGAN_CICILAN_MULAI, cicilanMulai } from "@/lib/kredit";

/**
 * Blok tersendiri untuk produk unggulan di atas daftar harga umum.
 * Model yang tampil di sini ditentukan oleh flag "unggulan" di
 * models.json, bukan oleh nama yang ditulis di dalam komponen.
 */
export function FeaturedModelBlock() {
  const m = modelUnggulan;
  const bisaTestDrive = m.varian.some((v) => v.testDrive.tersedia);

  return (
    <Card tone="soft" className="overflow-hidden border-brand">
      <div className="grid gap-0 lg:grid-cols-2">
        <Placeholder
          ratio="4/3"
          id={`${m.slug}-sorot-harga.jpg`}
          label={`Foto ${m.nama} untuk blok unggulan halaman harga`}
          alt={`${m.nama}, ${m.tipe}`}
          className="h-full rounded-none border-0 border-b border-dashed lg:border-b-0 lg:border-r"
        />

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Unit Unggulan</Badge>
            {bisaTestDrive ? (
              <Badge tone="outline">Tersedia untuk test drive</Badge>
            ) : null}
          </div>

          <h2 className="t-h2 mt-3">{m.nama}</h2>
          <p className="t-body mt-2 text-muted">{m.ringkasan}</p>

          <p className="t-small mt-5 text-muted">Harga on the road</p>
          <p className="t-h1 text-brand">{rupiah(m.hargaMulai)}</p>
          <p className="t-small mt-1 text-muted">
            Cicilan mulai {rupiah(cicilanMulai(m.hargaMulai))} per bulan,
            simulasi dengan {KETERANGAN_CICILAN_MULAI}
          </p>

          <ul className="mt-5 flex flex-col gap-1.5">
            {m.spesifikasiUtama.map((s) => (
              <li key={s.label} className="t-small text-muted">
                <span className="font-semibold text-ink">{s.label}:</span>{" "}
                {s.nilai}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WaButton
              context={`Halo Mahesa, saya dari website (Harga - blok unggulan). Saya mau tanya ketersediaan ${m.nama}.`}
              ariaLabel={`Chat WhatsApp Mahesa tentang ${m.nama} dari blok unggulan halaman harga`}
            >
              Tanya {m.nama}
            </WaButton>
            <Link
              href={`/harga/${m.slug}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-btn border border-line bg-bg px-4 font-semibold text-ink transition-colors duration-150 hover:bg-surface"
            >
              Lihat spesifikasi lengkap
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
