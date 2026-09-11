import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";
import type { ArticleMeta } from "@/content/articles/types";
import { tanggalPanjang } from "@/lib/format";

export function ArticleCard({
  meta,
  besar = false,
}: {
  meta: ArticleMeta;
  /** Kartu artikel terbaru boleh tampil lebih besar di halaman indeks. */
  besar?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg ${
        besar ? "md:flex-row" : ""
      }`}
    >
      <div className={besar ? "md:w-1/2" : ""}>
        <Placeholder
          ratio="16/9"
          id={`artikel-${meta.slug}.jpg`}
          label={`Gambar utama artikel: ${meta.title}`}
          alt={meta.title}
          className="rounded-none border-0 border-b border-dashed"
        />
      </div>

      <div className={`flex flex-1 flex-col p-5 ${besar ? "md:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{meta.category}</Badge>
          <span className="t-small text-muted">{meta.readingTime} menit baca</span>
        </div>

        <h3 className={`mt-3 ${besar ? "t-h2" : "t-h3"}`}>
          <Link
            href={`/artikel/${meta.slug}`}
            className="after:absolute after:inset-0 hover:text-brand"
          >
            {meta.title}
          </Link>
        </h3>

        <p className="t-small mt-2 text-muted">{meta.description}</p>

        <p className="t-small mt-4 text-muted">
          <time dateTime={meta.publishedAt}>{tanggalPanjang(meta.publishedAt)}</time>
        </p>
      </div>
    </article>
  );
}
