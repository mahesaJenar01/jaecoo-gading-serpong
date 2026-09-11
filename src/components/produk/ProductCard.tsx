import { Placeholder } from "@/components/ui/Placeholder";
import { WaButton } from "@/components/wa/WaButton";
import type { Produk } from "@/data/types";
import { rupiah } from "@/lib/format";
import { waProduk } from "@/lib/wa";

export function ProductCard({ produk }: { produk: Produk }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg">
      <Placeholder
        ratio="4/3"
        id={`produk-${produk.id}.jpg`}
        label={`Foto ${produk.nama}`}
        alt={`${produk.nama}, kategori ${produk.kategori}`}
        className="rounded-none border-0 border-b border-dashed"
        compact
      />

      <div className="flex flex-1 flex-col p-4">
        <p className="t-small text-muted">{produk.kategori}</p>
        <h3 className="t-h3 mt-1 text-[16px]">{produk.nama}</h3>
        <p className="t-small mt-1 text-muted">{produk.deskripsiSingkat}</p>

        <p className="t-body mt-3 font-semibold text-brand">
          Mulai {rupiah(produk.hargaMulai)}
        </p>
        <p className="t-small mt-1 text-muted">{produk.catatan}</p>

        <div className="mt-auto pt-4">
          <WaButton
            context={waProduk(produk.nama)}
            ariaLabel={`Chat WhatsApp Mahesa Jenar tentang ${produk.nama}`}
            block
            withIcon={false}
          >
            Tanya produk ini
          </WaButton>
        </div>
      </div>
    </article>
  );
}
