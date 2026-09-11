import type { Metadata } from "next";
import { ArticleCard } from "@/components/article/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PillFilter } from "@/components/ui/PillFilter";
import { Section } from "@/components/ui/Section";
import { articleCategories, articles } from "@/content/articles/registry";
import { itemListArticleSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Artikel dan Panduan JAECOO",
  description:
    "Panduan memilih model, biaya kepemilikan, dan hal yang perlu disiapkan sebelum membeli JAECOO, ditulis oleh sales consultant JAECOO Gading Serpong.",
  path: "/artikel",
});

export default function ArtikelPage() {
  const items = articles.map((a) => a.meta);

  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Artikel", path: "/artikel" }]} />

        <h1 className="t-h1 mt-4">Artikel dan Panduan JAECOO</h1>
        <p className="t-body measure mt-4 text-muted">
          Penjelasan yang biasanya disampaikan Mahesa berulang kali lewat
          WhatsApp, ditulis di sini supaya bisa Anda baca kapan saja, tanpa perlu
          bertanya lebih dulu.
        </p>
      </Section>

      <Section>
        <PillFilter
          scope="artikel"
          kategori={articleCategories}
          jumlah={items.length}
          ariaLabel="Saring artikel berdasarkan kategori"
          gridClassName="grid gap-5 md:grid-cols-2"
        >
          {items.map((meta, i) => (
            <div
              key={meta.slug}
              data-kategori={meta.category}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ArticleCard meta={meta} besar={i === 0} />
            </div>
          ))}
        </PillFilter>
      </Section>

      <JsonLd
        data={itemListArticleSchema(
          items.map((m) => ({ judul: m.title, path: `/artikel/${m.slug}` })),
        )}
      />
    </>
  );
}
