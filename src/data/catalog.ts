import packagesData from "./packages.json";
import productsData from "./products.json";
import type { LimitedOffer, Paket, Produk } from "./types";

/**
 * Aksesoris dan jasa perawatan.
 *
 * PENTING: seluruh isi packages.json dan products.json masih data contoh.
 * // contoh, ganti nanti  -> nama paket, isi paket, harga paket, total satuan
 * // contoh, ganti nanti  -> estimasi pengerjaan dan ketentuan garansi
 * // contoh, ganti nanti  -> seluruh item katalog satuan beserta harganya
 * JSON tidak bisa memuat komentar, jadi tiap entri di berkas data diberi
 * penanda "contoh": true dan berkas ini menjadi tempat catatannya.
 */

export const limitedOffer = packagesData.limitedOffer as LimitedOffer;

export const paket = packagesData.paket as Paket[];

/** Paket yang jadi target penjualan. Selalu tampil pertama di mobile. */
export const paketSorot = paket.find((p) => p.sorot) ?? paket[0];

/**
 * Urutan tampil di mobile: paket sorot lebih dulu, lalu sisanya sesuai urutan data.
 */
export const paketUrutanMobile: Paket[] = [
  ...paket.filter((p) => p.sorot),
  ...paket.filter((p) => !p.sorot),
];

export const kategoriProduk = productsData.kategori as string[];

export const produk = productsData.items as Produk[];

/** Selisih harga paket terhadap total bila dibeli satuan. */
export function selisihPaket(p: Paket): { rupiah: number; persen: number } {
  const rupiah = p.totalSatuan - p.harga;
  const persen = Math.round((rupiah / p.totalSatuan) * 100);
  return { rupiah, persen };
}

/** Semua nama item yang pernah muncul di paket mana pun, untuk tabel perbandingan. */
export function semuaItemPaket(): string[] {
  const nama: string[] = [];
  for (const p of paket) {
    for (const item of p.isi) {
      if (!nama.includes(item.nama)) nama.push(item.nama);
    }
  }
  return nama;
}
