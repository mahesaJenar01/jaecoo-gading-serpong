import { ArticleCard } from "@/components/article/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { latestArticles } from "@/content/articles/registry";

export function LatestArticles() {
  const items = latestArticles(3);
  if (items.length === 0) return null;

  return (
    <Section tone="surface" labelledBy="artikel-terbaru">
      <SectionHeading
        id="artikel-terbaru"
        eyebrow="Artikel"
        title="Bacaan sebelum memutuskan"
        description="Penjelasan yang biasanya disampaikan Mahesa berulang kali di WhatsApp, ditulis di sini supaya bisa dibaca kapan saja."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((meta) => (
          <ArticleCard key={meta.slug} meta={meta} />
        ))}
      </div>

      <div className="mt-8">
        <Button href="/artikel" variant="secondary">
          Lihat semua artikel
        </Button>
      </div>
    </Section>
  );
}
