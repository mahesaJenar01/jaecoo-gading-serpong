import type { ReactNode } from "react";

type BadgeTone = "brand" | "neutral" | "outline";

/* Palet situs hanya hitam, putih, dan abu-abu, jadi pembeda antar tone
   dikerjakan oleh kontras: "brand" dibalik menjadi teks putih di atas
   hitam supaya tetap terbaca berbeda dari "neutral" yang abu-abu. */
const TONE: Record<BadgeTone, string> = {
  brand: "bg-ink text-bg",
  neutral: "bg-surface-2 text-muted",
  outline: "border border-line text-muted",
};

export function Badge({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-[13px] leading-5 font-semibold ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
