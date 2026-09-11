import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorBox } from "@/components/article/AuthorBox";
import { FaqBlock } from "@/components/article/FaqBlock";
import { KeyTakeaway } from "@/components/article/KeyTakeaway";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { Toc } from "@/components/article/Toc";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { WaButton } from "@/components/wa/WaButton";
import { articles, getArticle } from "@/content/articles/registry";
import { tanggalPanjang } from "@/lib/format";
import { articleSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { waArtikel } from "@/lib/wa";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = getArticle(slug);
  if (!artikel) return {};

  const { meta } = artikel;
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/artikel/${meta.slug}`,
    type: "article",
    publishedTime: meta.publishedAt,
    modifiedTime: meta.updatedAt,
  });
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;
  const artikel = getArticle(slug);
  if (!artikel) notFound();

  const { meta, Content } = artikel;

  return (
    <>
      <Container className="py-10 md:py-14">
        <article className="mx-auto w-full max-w-[760px]">
          <Breadcrumbs
            items={[
              { nama: "Artikel", path: "/artikel" },
              { nama: meta.title, path: `/artikel/${meta.slug}` },
            ]}
          />

          <header className="mt-4">
            <Badge>{meta.category}</Badge>

            <h1 className="t-h1 mt-3">{meta.h1}</h1>

            <p className="t-small mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span>
                Terbit{" "}
                <time dateTime={meta.publishedAt}>
                  {tanggalPanjang(meta.publishedAt)}
                </time>
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>
                Diperbarui{" "}
                <time dateTime={meta.updatedAt}>
                  {tanggalPanjang(meta.updatedAt)}
                </time>
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>{meta.readingTime} menit baca</span>
            </p>

            <div className="mt-5">
              <AuthorBox variant="ringkas" judulArtikel={meta.title} />
            </div>
          </header>

          <div className="mt-8">
            <KeyTakeaway>{meta.keyTakeaway}</KeyTakeaway>
          </div>

          <div className="mt-8">
            <Toc items={meta.toc} />
          </div>

          <div className="mt-8">
            <Content />
          </div>

          <div className="mt-12">
            <AuthorBox variant="lengkap" judulArtikel={meta.title} />
          </div>

          <FaqBlock items={meta.faq} />

          <RelatedArticles slugs={meta.related} />

          <Card tone="soft" className="mt-12 p-6 md:p-8">
            <h2 className="t-h2">Masih ada yang ingin ditanyakan?</h2>
            <p className="t-body mt-3 text-muted">
              Kirim pertanyaan Anda lewat WhatsApp. Mahesa jawab satu per satu,
              tanpa mendesak Anda memutuskan.
            </p>
            <div className="mt-6">
              <WaButton
                context={waArtikel(meta.title)}
                ariaLabel={`Chat WhatsApp Mahesa Jenar setelah membaca artikel ${meta.title}`}
                size="lg"
              >
                Tanya lewat WhatsApp
              </WaButton>
            </div>
          </Card>
        </article>
      </Container>

      <JsonLd
        data={articleSchema({
          judul: meta.title,
          deskripsi: meta.description,
          path: `/artikel/${meta.slug}`,
          publishedAt: meta.publishedAt,
          updatedAt: meta.updatedAt,
        })}
      />
    </>
  );
}
