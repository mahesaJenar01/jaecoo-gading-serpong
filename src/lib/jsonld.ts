import { site } from "@/data/site";
import { serviceAreas } from "@/data/serviceAreas";
import type { Faq, Model } from "@/data/types";
import { absoluteUrl } from "./seo";

/**
 * Pembuat structured data.
 *
 * Aturan: nilai yang masih TODO tidak pernah ikut dirender. Menerbitkan
 * schema berisi teks TODO justru membuat data terstruktur dianggap tidak
 * valid oleh mesin pencari. Begitu nilainya diisi di src/data/site.ts,
 * bagian yang bersangkutan muncul dengan sendirinya tanpa mengubah kode.
 */
function isTodo(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith("TODO");
}

function clean<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

const AUTO_DEALER_ID = `${site.url}/#autodealer`;
const PERSON_ID = `${site.url}/#mahesajenar`;
const WEBSITE_ID = `${site.url}/#website`;

function sameAsLinks(): string[] {
  const links: string[] = [
    site.sosial.tiktok.url,
    site.sosial.instagram.url,
    site.sosial.facebook.url,
  ];
  return links.filter((u) => !isTodo(u));
}

function postalAddress() {
  return clean({
    "@type": "PostalAddress",
    streetAddress: isTodo(site.alamat.jalan) ? undefined : site.alamat.jalan,
    addressLocality: isTodo(site.alamat.kota) ? undefined : site.alamat.kota,
    addressRegion: site.alamat.provinsi,
    postalCode: isTodo(site.alamat.kodePos) ? undefined : site.alamat.kodePos,
    addressCountry: site.alamat.negara,
  });
}

function geo() {
  if (isTodo(site.koordinat.lat) || isTodo(site.koordinat.lng)) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: site.koordinat.lat,
    longitude: site.koordinat.lng,
  };
}

const HARI_EN: Record<string, string> = {
  Senin: "Monday",
  Selasa: "Tuesday",
  Rabu: "Wednesday",
  Kamis: "Thursday",
  Jumat: "Friday",
  Sabtu: "Saturday",
  Minggu: "Sunday",
};

/**
 * Jam operasional baru dirender setelah diisi dengan format "HH:MM-HH:MM",
 * contoh "08:00-17:00". Selama masih TODO, bagian ini dilewati.
 */
function openingHours() {
  const spec = site.jamOperasional
    .filter((j) => !isTodo(j.jam) && j.jam.includes("-"))
    .map((j) => {
      const [opens, closes] = j.jam.split("-").map((s) => s.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: HARI_EN[j.hari] ?? j.hari,
        opens,
        closes,
      };
    });
  return spec.length > 0 ? spec : undefined;
}

export function autoDealerSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": AUTO_DEALER_ID,
    name: site.name,
    url: site.url,
    telephone: site.kontak.telepon,
    email: site.kontak.email,
    address: postalAddress(),
    geo: geo(),
    openingHoursSpecification: openingHours(),
    areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a })),
    sameAs: sameAsLinks(),
    employee: { "@id": PERSON_ID },
  });
}

export function personSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.sales.nama,
    jobTitle: site.sales.jabatan,
    url: site.sales.profilUrl,
    telephone: site.kontak.telepon,
    email: site.kontak.email,
    worksFor: { "@id": AUTO_DEALER_ID },
    sameAs: sameAsLinks(),
  });
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "id-ID",
    publisher: { "@id": AUTO_DEALER_ID },
  };
}

export type Crumb = { nama: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.nama,
      item: absoluteUrl(c.path),
    })),
  };
}

export function productSchema(model: Model) {
  const url = absoluteUrl(`/harga/${model.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model.nama,
    description: model.ringkasan,
    brand: { "@type": "Brand", name: "JAECOO" },
    category: model.tipe,
    url,
    offers:
      model.varian.length === 1
        ? {
            "@type": "Offer",
            url,
            priceCurrency: "IDR",
            price: model.varian[0].hargaOtr,
            seller: { "@id": AUTO_DEALER_ID },
          }
        : {
            "@type": "AggregateOffer",
            url,
            priceCurrency: "IDR",
            lowPrice: Math.min(...model.varian.map((v) => v.hargaOtr)),
            highPrice: Math.max(...model.varian.map((v) => v.hargaOtr)),
            offerCount: model.varian.length,
            seller: { "@id": AUTO_DEALER_ID },
          },
  };
}

export function itemListSchema(models: Model[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Harga dan model JAECOO",
    itemListElement: models.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nama,
      url: absoluteUrl(`/harga/${m.slug}`),
    })),
  };
}

export function faqPageSchema(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type ArticleInput = {
  judul: string;
  deskripsi: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
};

export function articleSchema(a: ArticleInput) {
  const url = absoluteUrl(a.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.judul,
    description: a.deskripsi,
    inLanguage: "id-ID",
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: site.sales.nama,
      url: site.sales.profilUrl,
    },
    publisher: { "@id": AUTO_DEALER_ID },
  };
}

export function itemListArticleSchema(
  items: { judul: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Artikel JAECOO Gading Serpong",
    itemListElement: items.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.judul,
      url: absoluteUrl(a.path),
    })),
  };
}
