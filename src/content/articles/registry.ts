import BiayaKepemilikan, {
  meta as metaBiayaKepemilikan,
} from "./biaya-kepemilikan-mobil-listrik-di-tangerang";
import PanduanVarianJ5, {
  meta as metaPanduanVarianJ5,
} from "./panduan-memilih-varian-jaecoo-j5-premium";
import type { Article } from "./types";

/**
 * Sumber tunggal seluruh artikel: halaman /artikel, /artikel/[slug],
 * sitemap, llms.txt, dan blok artikel terkait semuanya membaca dari sini.
 *
 * Menambah artikel baru: buat folder di src/content/articles/<slug>/index.tsx
 * lalu tambahkan satu baris di array di bawah. Tidak ada tempat lain yang
 * perlu diubah.
 *
 * Urutan array adalah urutan tampil, terbaru lebih dulu.
 */
export const articles: Article[] = [
  { meta: metaPanduanVarianJ5, Content: PanduanVarianJ5 },
  { meta: metaBiayaKepemilikan, Content: BiayaKepemilikan },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.meta.slug === slug);
}

export const articleSlugs = articles.map((a) => a.meta.slug);

/** Kategori unik untuk filter di halaman indeks artikel. */
export const articleCategories = Array.from(
  new Set(articles.map((a) => a.meta.category)),
);

/** Artikel terbaru untuk beranda. */
export function latestArticles(jumlah = 3) {
  return articles.slice(0, jumlah).map((a) => a.meta);
}
