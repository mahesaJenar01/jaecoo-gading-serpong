import { IconImage } from "@/components/icons";

/**
 * Pengganti sementara untuk setiap foto yang belum tersedia.
 *
 * Cara menggantinya nanti cukup di satu tempat: ubah isi komponen ini
 * menjadi <Image src={`/img/${id}`} alt={alt} ... /> dari next/image, atau
 * tambahkan prop `src` dan render Image ketika src terisi. Seluruh halaman
 * memakai komponen ini, jadi tidak ada markup gambar yang tersebar.
 *
 * Ruang selalu dipesan sesuai rasio, sehingga tidak terjadi layout shift
 * saat foto asli dipasang.
 */
export type PlaceholderRatio = "16/9" | "4/3" | "3/2" | "1/1" | "21/9";

export function Placeholder({
  ratio = "16/9",
  label,
  alt,
  id,
  className = "",
  compact = false,
}: {
  ratio?: PlaceholderRatio;
  /** Penjelasan foto apa yang harus dipasang di sini. */
  label: string;
  /** Alt text final yang nanti dipakai foto asli. */
  alt: string;
  /** Nama berkas yang disarankan, lihat IMAGES.md. */
  id: string;
  className?: string;
  /** true untuk kotak kecil: label saja, tanpa nama berkas. */
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
      className={`flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-card border border-dashed border-line bg-surface-2 p-4 text-center ${className}`}
    >
      <IconImage className="text-muted" width={compact ? 18 : 22} height={compact ? 18 : 22} />
      <span className="t-small max-w-[40ch] text-muted">{label}</span>
      {!compact ? (
        <span className="text-[12px] leading-4 text-muted/80">{id}</span>
      ) : null}
    </div>
  );
}
