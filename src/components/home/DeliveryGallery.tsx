"use client";

import Image from "next/image";
import { useState } from "react";
import {
  altSerahTerima,
  fotoSerahTerima,
  srcSerahTerima,
} from "@/data/delivery";

/**
 * Galeri foto serah terima.
 *
 * Yang dirender hanya sebanyak yang sedang terlihat, bukan seluruh foto
 * dengan sebagian disembunyikan lewat CSS. Bedanya nyata di kuota data
 * pengunjung: berkas foto yang belum dibuka tidak pernah diminta ke server
 * sama sekali.
 *
 * Tata letaknya memakai kolom CSS, bukan grid dengan rasio seragam, karena
 * foto serah terima datang dalam orientasi campur. Dengan cara ini foto
 * potret tidak terpotong kepalanya demi menyamakan tinggi kotak.
 */
const AWAL = 6;
const TAMBAH = 6;

export function DeliveryGallery({
  /** Batasi jumlah foto yang ikut ditampilkan, misalnya untuk blok ringkas. */
  maks = fotoSerahTerima.length,
}: {
  maks?: number;
}) {
  const semua = fotoSerahTerima.slice(0, maks);
  const [tampil, setTampil] = useState(Math.min(AWAL, semua.length));

  const terlihat = semua.slice(0, tampil);
  const sisa = semua.length - tampil;

  return (
    <div>
      <ul className="columns-2 gap-3 md:columns-3 md:gap-5 [&>li]:mb-3 md:[&>li]:mb-5">
        {terlihat.map((f, i) => (
          <li
            key={f.file}
            className="break-inside-avoid overflow-hidden rounded-card border border-line bg-bg"
          >
            <Image
              src={srcSerahTerima(f)}
              alt={altSerahTerima(f)}
              width={f.width}
              height={f.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              loading={i < 2 ? "eager" : "lazy"}
              className="h-auto w-full"
            />
            <p className="t-small px-3 py-2 text-muted">{f.nama}</p>
          </li>
        ))}
      </ul>

      {sisa > 0 ? (
        <div className="mt-6 flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={() => setTampil((n) => Math.min(n + TAMBAH, semua.length))}
            className="inline-flex min-h-[48px] items-center justify-center rounded-btn border border-line bg-bg px-5 font-semibold text-ink transition-colors duration-150 hover:bg-surface-2"
          >
            Lihat {Math.min(TAMBAH, sisa)} foto lainnya
          </button>
          <p className="t-small text-muted" aria-live="polite">
            Menampilkan {tampil} dari {semua.length} foto.
          </p>
        </div>
      ) : (
        <p className="t-small mt-6 text-muted" aria-live="polite">
          Menampilkan seluruh {semua.length} foto.
        </p>
      )}
    </div>
  );
}
