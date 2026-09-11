import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type Tone = "default" | "surface" | "soft";

const TONE: Record<Tone, string> = {
  default: "bg-bg",
  surface: "bg-surface",
  soft: "bg-brand-soft",
};

/**
 * Jarak antar seksi seragam di seluruh situs: py-12 di mobile, py-20 di desktop.
 * Beri `labelledBy` bila seksi punya judul, supaya landmark punya nama.
 */
export function Section({
  children,
  tone = "default",
  className = "",
  id,
  labelledBy,
  as: Tag = "section",
  bare = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
  as?: ElementType;
  /** true = tanpa Container, dipakai bila isi perlu melebar sampai tepi layar. */
  bare?: boolean;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`py-12 md:py-20 ${TONE[tone]} ${className}`}
    >
      {bare ? children : <Container>{children}</Container>}
    </Tag>
  );
}
