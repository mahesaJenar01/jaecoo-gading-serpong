import type { Metadata } from "next";
import { site } from "@/data/site";

export const BASE_URL = site.url;

/** URL absolut untuk canonical, JSON-LD, sitemap, dan llms.txt. */
export function absoluteUrl(path: string): string {
  if (path === "/") return BASE_URL;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Path tanpa trailing slash, contoh "/harga" atau "/harga/jaecoo-j5-premium". */
  path: string;
  /** Judul khusus untuk Open Graph bila perlu berbeda dari title halaman. */
  ogTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Metadata standar setiap halaman.
 * Gambar Open Graph sengaja tidak diisi di sini supaya konvensi berkas
 * opengraph-image.tsx yang berlaku (dibuat dengan next/og, teks saja).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
    },
  };
}
