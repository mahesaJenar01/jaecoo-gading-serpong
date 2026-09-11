import type { ReactNode } from "react";
import type { TocItem } from "@/content/articles/types";

/**
 * Pembungkus isi artikel. Tipografi diatur lewat kelas .prose-id di
 * globals.css, jadi berkas artikel cukup menulis p, ul, ol, dan sebagainya
 * tanpa memberi kelas apa pun.
 */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-id ${className}`}>{children}</div>;
}

/**
 * Heading artikel. Terima objek dari daftar SECTIONS di berkas artikel
 * supaya id dan teksnya selalu sama dengan yang dipakai daftar isi.
 */
export function H2({ item }: { item: TocItem }) {
  return <h2 id={item.id}>{item.teks}</h2>;
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return <h3 id={id}>{children}</h3>;
}
