import type { MetadataRoute } from "next";
import { articles } from "@/content/articles/registry";
import { models } from "@/data/models";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap dibangun dari data dan registry artikel, jadi menambah model atau
 * artikel otomatis ikut terdaftar tanpa menyentuh berkas ini.
 * Konsisten tanpa trailing slash, sama seperti seluruh tautan internal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const diperbarui = new Date(site.hargaDiperbaruiPada);

  const halamanUtama: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: diperbarui, priority: 1 },
    { url: absoluteUrl("/harga"), lastModified: diperbarui, priority: 0.9 },
    { url: absoluteUrl("/produk-lainnya"), lastModified: diperbarui, priority: 0.8 },
    { url: absoluteUrl("/test-drive"), lastModified: diperbarui, priority: 0.8 },
    { url: absoluteUrl("/kredit"), lastModified: diperbarui, priority: 0.7 },
    { url: absoluteUrl("/artikel"), lastModified: diperbarui, priority: 0.7 },
    { url: absoluteUrl("/tentang"), lastModified: diperbarui, priority: 0.6 },
    { url: absoluteUrl("/kontak"), lastModified: diperbarui, priority: 0.6 },
  ];

  const halamanModel: MetadataRoute.Sitemap = models.map((m) => ({
    url: absoluteUrl(`/harga/${m.slug}`),
    lastModified: diperbarui,
    priority: m.unggulan ? 0.9 : 0.8,
  }));

  const halamanArtikel: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/artikel/${a.meta.slug}`),
    lastModified: new Date(a.meta.updatedAt),
    priority: 0.6,
  }));

  return [...halamanUtama, ...halamanModel, ...halamanArtikel];
}
