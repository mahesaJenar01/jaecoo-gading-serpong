import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "JAECOO Gading Serpong, sales consultant Mahesa Jenar di Tangerang";

/**
 * Gambar Open Graph bawaan seluruh situs. Halaman model dan artikel
 * menimpanya dengan berkas opengraph-image.tsx miliknya sendiri.
 */
export default function Image() {
  return ogImage({
    eyebrow: "Sales Consultant JAECOO",
    judul: "JAECOO Gading Serpong",
    keterangan:
      "Harga OTR, spesifikasi, test drive, dan pendampingan sampai serah terima.",
  });
}
