import { articles, getArticle } from "@/content/articles/registry";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Artikel JAECOO Gading Serpong";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.meta.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = getArticle(slug);

  return ogImage({
    eyebrow: artikel ? artikel.meta.category : "Artikel",
    judul: artikel ? artikel.meta.title : "Artikel",
  });
}
