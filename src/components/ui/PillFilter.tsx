"use client";

import { useState, type ReactNode } from "react";

/**
 * Filter kategori berbentuk pill.
 *
 * Komponen client ini sengaja dibuat sekecil mungkin: satu potong state
 * berisi kategori aktif, yang ditulis sebagai atribut data-aktif.
 * Penyembunyian kartu dikerjakan CSS, dan aturannya dibuat dari daftar
 * kategori yang dikirim, jadi menambah kategori baru di data tidak perlu
 * menyentuh berkas CSS mana pun.
 *
 * Akibatnya seluruh item tetap dirender di HTML awal: bisa di-crawl mesin
 * pencari dan tetap terlihat semuanya saat JavaScript dimatikan.
 */
export function PillFilter({
  scope,
  kategori,
  jumlah,
  labelSemua = "Semua",
  ariaLabel,
  children,
  gridClassName = "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
}: {
  /** Pengenal unik per halaman, dipakai pada selector CSS. */
  scope: string;
  kategori: string[];
  jumlah: number;
  labelSemua?: string;
  ariaLabel: string;
  /** Tiap anak wajib punya atribut data-kategori. */
  children: ReactNode;
  gridClassName?: string;
}) {
  const [aktif, setAktif] = useState<string>("semua");

  // Nama kategori berasal dari berkas data milik situs sendiri. Tanda kutip
  // dan garis miring tetap dibuang agar selector selalu valid.
  const aman = (s: string) => s.replace(/["'\\]/g, "");
  const sel = `[data-pf="${aman(scope)}"]`;
  const css = [
    `${sel}:not([data-aktif="semua"]) > [data-kategori]{display:none}`,
    ...kategori.map(
      (k) =>
        `${sel}[data-aktif="${aman(k)}"] > [data-kategori="${aman(k)}"]{display:block}`,
    ),
  ].join("");

  const pills = [{ nilai: "semua", label: `${labelSemua} (${jumlah})` }].concat(
    kategori.map((k) => ({ nilai: k, label: k })),
  );

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        role="group"
        aria-label={ariaLabel}
        className="scroll-x -mx-5 flex gap-2 px-5 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-x-visible lg:px-0"
      >
        {pills.map((p) => {
          const terpilih = aktif === p.nilai;
          return (
            <button
              key={p.nilai}
              type="button"
              onClick={() => setAktif(p.nilai)}
              aria-pressed={terpilih}
              className={`inline-flex min-h-[44px] shrink-0 items-center rounded-pill border px-4 font-semibold transition-colors duration-150 ${
                terpilih
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-bg text-ink hover:bg-surface"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div data-pf={scope} data-aktif={aktif} className={`mt-6 ${gridClassName}`}>
        {children}
      </div>
    </div>
  );
}
