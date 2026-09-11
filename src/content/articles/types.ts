import type { ComponentType } from "react";
import type { Faq } from "@/data/types";

export type TocItem = {
  /** id yang dipasang pada heading di dalam artikel. */
  id: string;
  teks: string;
};

export type ArticleMeta = {
  slug: string;
  /** Judul untuk metadata dan kartu daftar artikel. */
  title: string;
  /** H1 di halaman artikel. Boleh berbeda dari title metadata. */
  h1: string;
  description: string;
  category: string;
  /** Format ISO, contoh "2026-09-01". */
  publishedAt: string;
  updatedAt: string;
  /** Perkiraan waktu baca dalam menit. */
  readingTime: number;
  /** Jawaban singkat 80 sampai 120 kata untuk cuplikan pencarian. */
  keyTakeaway: string;
  faq: Faq[];
  /** Slug artikel lain yang relevan, minimal dua bila tersedia. */
  related: string[];
  /**
   * Daftar heading untuk daftar isi. Ditulis sekali di berkas artikel lalu
   * dipakai bersama oleh komponen Toc dan oleh heading di dalam isi, jadi
   * keduanya tidak mungkin berbeda.
   */
  toc: TocItem[];
};

export type Article = {
  meta: ArticleMeta;
  Content: ComponentType;
};
