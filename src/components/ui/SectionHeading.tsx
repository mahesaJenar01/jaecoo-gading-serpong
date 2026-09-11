import type { ReactNode } from "react";

/**
 * Judul seksi. `level` menjaga struktur heading tetap logis: satu h1 per
 * halaman, dan seksi di bawahnya memakai h2, lalu h3, tanpa melompat.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  level = 2,
  align = "left",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  level?: 1 | 2 | 3;
  align?: "left" | "center";
  className?: string;
}) {
  const Tag = (`h${level}` as const) satisfies "h1" | "h2" | "h3";
  const size = level === 1 ? "t-h1" : level === 2 ? "t-h2" : "t-h3";
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow ? (
        <p className="t-small mb-2 font-semibold tracking-wide text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={size}>
        {title}
      </Tag>
      {description ? (
        <p
          className={`t-body mt-3 text-muted ${align === "center" ? "mx-auto" : ""} measure`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
