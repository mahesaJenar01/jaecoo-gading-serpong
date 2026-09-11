import Link from "next/link";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { WaButton } from "@/components/wa/WaButton";
import { site } from "@/data/site";
import { waArtikel } from "@/lib/wa";

/**
 * Kotak penulis. Versi ringkas tampil di bawah judul artikel, versi lengkap
 * di akhir artikel.
 */
export function AuthorBox({
  variant,
  judulArtikel,
}: {
  variant: "ringkas" | "lengkap";
  /** Dipakai untuk konteks WhatsApp pada versi lengkap. */
  judulArtikel: string;
}) {
  if (variant === "ringkas") {
    return (
      <div className="flex items-center gap-3">
        <div className="w-11 shrink-0">
          <ProfilePhoto size={44} bentuk="bulat" />
        </div>
        <p className="t-small text-muted">
          Ditulis oleh{" "}
          <Link href="/tentang" className="font-semibold text-ink hover:text-brand">
            {site.sales.nama}
          </Link>
          , {site.sales.jabatan}
        </p>
      </div>
    );
  }

  return (
    <aside
      aria-label="Tentang penulis"
      className="rounded-card border border-line bg-surface p-5 md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="w-20 shrink-0">
          <ProfilePhoto size={80} bentuk="bulat" />
        </div>
        <div className="min-w-0">
          <p className="t-h3">{site.sales.nama}</p>
          <p className="t-small text-muted">
            {site.sales.jabatan} di {site.sales.lokasi}
          </p>
          <p className="t-body mt-3 text-muted">
            Mahesa mendampingi pembeli JAECOO di Gading Serpong, dari memilih
            varian sampai unitnya diserahkan.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <WaButton
              context={waArtikel(judulArtikel)}
              ariaLabel={`Chat WhatsApp Mahesa setelah membaca artikel ${judulArtikel}`}
            >
              Tanya lewat WhatsApp
            </WaButton>
            <Link
              href="/tentang"
              className="inline-flex min-h-[44px] items-center rounded-btn border border-line bg-bg px-4 font-semibold text-ink hover:bg-surface-2"
            >
              Selengkapnya tentang Mahesa
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
