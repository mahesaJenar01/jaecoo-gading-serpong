import type { ReactNode } from "react";

/**
 * Lebar konten maksimum 1120px dengan padding samping 20px di mobile.
 * Semua blok halaman dibungkus komponen ini supaya sisi kiri kanan konsisten.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-5 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
