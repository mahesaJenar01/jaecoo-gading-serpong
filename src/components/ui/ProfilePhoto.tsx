import Image from "next/image";
import { site } from "@/data/site";

/**
 * Foto profil Mahesa. Satu komponen untuk seluruh situs supaya berkas,
 * alt text, dan bingkainya tidak pernah berbeda antar halaman.
 *
 * Berkas aslinya potret beresolusi tinggi, jadi selalu dipotong ke bentuk
 * yang diminta lewat object-cover dan diperkecil oleh next/image sesuai
 * ukuran tampilnya.
 */
export function ProfilePhoto({
  /** Lebar tampil dalam piksel CSS. Tinggi mengikuti bentuk yang dipilih. */
  size,
  bentuk = "kotak",
  className = "",
  priority = false,
}: {
  size: number;
  bentuk?: "kotak" | "bulat";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/mahesa-jenar.jpg"
      alt={`Foto ${site.sales.nama}, ${site.sales.jabatan} di ${site.sales.lokasi}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={`aspect-square w-full object-cover object-top ${
        bentuk === "bulat" ? "rounded-pill" : "rounded-card"
      } border border-line bg-surface-2 ${className}`}
    />
  );
}
