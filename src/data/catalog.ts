import packagesData from "./packages.json";
import productsData from "./products.json";
import { modelUnggulan } from "./models";
import type {
  LimitedOffer,
  Paket,
  PaketData,
  Produk,
  ProdukData,
} from "./types";

/**
 * Aksesoris, asuransi, dan jasa pemasangan.
 *
 * Dua aturan yang membuat angka di halaman aksesoris tidak pernah saling
 * bertentangan:
 *
 * 1. Item yang harganya mengikuti unit (asuransi all risk) tidak menyimpan
 *    nominal di products.json, melainkan rateOtr. Nominalnya dihitung di
 *    sini dari harga OTR unit unggulan, sehingga ikut berubah sendiri
 *    ketika harga OTR di models.json diperbarui.
 * 2. Paket tidak menyimpan total harga satuan. Totalnya dijumlahkan dari
 *    produkId tiap isi paket, jadi harga coret di kartu paket selalu cocok
 *    dengan harga di katalog satuan.
 *
 * Harga di halaman aksesoris bukan harga mati. catatanHarga di
 * packages.json adalah kalimat yang menyatakan hal itu, dan wajib ikut
 * tampil di setiap tempat yang menyebut harga aksesoris.
 */

/**
 * Unit acuan untuk item yang harganya mengikuti harga OTR. Dipakai unit
 * unggulan karena itu yang paling sering diambil, dan catatan pada item
 * yang bersangkutan sudah menyebut bahwa angkanya mengikuti unit.
 */
export const otrAcuan = modelUnggulan.hargaMulai;
export const namaUnitAcuan = modelUnggulan.nama;

export const limitedOffer = packagesData.limitedOffer as LimitedOffer;

/** Kalimat baku bahwa harga aksesoris masih bisa dinegosiasi. */
export const catatanHarga: string = packagesData.catatanHarga;

export const kategoriProduk = productsData.kategori as string[];

export const produk: Produk[] = (productsData.items as ProdukData[]).map(
  (p) => ({
    ...p,
    hargaMulai: p.hargaMulai ?? Math.round(otrAcuan * (p.rateOtr ?? 0)),
  }),
);

export function getProduk(id: string): Produk | undefined {
  return produk.find((p) => p.id === id);
}

/** Total harga isi paket bila seluruhnya dibeli satuan. */
function totalSatuan(p: PaketData): number {
  return p.isi.reduce((n, item) => n + (getProduk(item.produkId ?? "")?.hargaMulai ?? 0), 0);
}

export const paket: Paket[] = (packagesData.paket as PaketData[]).map((p) => ({
  ...p,
  totalSatuan: totalSatuan(p),
}));

/** Paket yang jadi target penjualan. Selalu tampil pertama di mobile. */
export const paketSorot = paket.find((p) => p.sorot) ?? paket[0];

/**
 * Urutan tampil di mobile: paket sorot lebih dulu, lalu sisanya sesuai urutan data.
 */
export const paketUrutanMobile: Paket[] = [
  ...paket.filter((p) => p.sorot),
  ...paket.filter((p) => !p.sorot),
];

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
