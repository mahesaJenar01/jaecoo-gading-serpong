import type { TocItem } from "@/content/articles/types";

/**
 * Daftar isi. Hanya dirender bila artikel punya lebih dari tiga heading,
 * sesuai ketentuan brief. Sumbernya adalah daftar SECTIONS di berkas
 * artikel, jadi tidak ada heading yang tertinggal.
 */
export function Toc({ items }: { items: TocItem[] }) {
  if (items.length <= 3) return null;

  return (
    <nav
      aria-labelledby="daftar-isi"
      className="rounded-card border border-line bg-surface p-5"
    >
      <p id="daftar-isi" className="t-h3 text-[16px]">
        Daftar isi
      </p>
      <ol className="mt-3 flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-[40px] items-center gap-2 text-muted hover:text-brand"
            >
              <span className="t-small tabular-nums text-brand">{i + 1}.</span>
              <span className="t-body">{item.teks}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
