import type { ElementType, ReactNode } from "react";

/**
 * Kartu dasar. Mengutamakan garis tipis, bukan bayangan.
 * `raised` hanya untuk kartu yang memang perlu sedikit terangkat.
 */
export function Card({
  children,
  className = "",
  tone = "default",
  raised = false,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "soft";
  raised?: boolean;
  as?: ElementType;
  [key: string]: unknown;
}) {
  const toneClass =
    tone === "surface"
      ? "bg-surface"
      : tone === "soft"
        ? "bg-brand-soft"
        : "bg-bg";

  return (
    <Tag
      className={`rounded-card border border-line ${toneClass} ${
        raised ? "shadow-[0_1px_2px_rgba(17,17,17,0.04),0_8px_24px_-16px_rgba(17,17,17,0.18)]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
