import { getArticle } from "@/content/articles/registry";
import { ArticleCard } from "./ArticleCard";

/**
 * Artikel terkait, dibaca dari meta.related pada berkas artikel.
 * Slug yang tidak ditemukan di registry diabaikan diam diam supaya
 * penulisan artikel baru tidak pernah membuat halaman gagal dibangun.
 */
export function RelatedArticles({
  slugs,
  judul = "Artikel terkait",
}: {
  slugs: string[];
  judul?: string;
}) {
  const items = slugs
    .map((s) => getArticle(s))
    .filter((a) => a !== undefined)
    .map((a) => a.meta);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="artikel-terkait" className="mt-12">
      <h2 id="artikel-terkait" className="t-h2">
        {judul}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {items.map((meta) => (
          <ArticleCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </section>
  );
}
