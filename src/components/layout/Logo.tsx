import Image from "next/image";

/**
 * Wordmark JAECOO.
 *
 * Berkas aslinya berwarna putih dengan latar transparan, jadi versi untuk
 * permukaan terang dibalik dengan filter CSS. Cara ini menjaga situs tetap
 * memakai satu berkas logo saja: tidak ada dua versi yang bisa berbeda
 * versi ketika logonya diperbarui.
 */
const RASIO = 1399 / 216;

export function Logo({
  height = 20,
  /** "gelap" untuk logo hitam di permukaan terang, "terang" untuk sebaliknya. */
  tone = "gelap",
  className = "",
  priority = false,
}: {
  height?: number;
  tone?: "gelap" | "terang";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/jaecoo-white-logo-1400x217.webp"
      alt="JAECOO"
      width={Math.round(height * RASIO)}
      height={height}
      priority={priority}
      className={`${tone === "gelap" ? "invert" : ""} ${className}`}
      style={{ height, width: "auto" }}
    />
  );
}
