/**
 * Satu satunya sumber tautan WhatsApp di situs ini.
 * Setiap tombol WA wajib memanggil waLink() dengan konteks yang unik
 * (halaman + blok asal klik) supaya percakapan yang masuk bisa dilacak.
 */
export const WA_NUMBER = "6281313232519";
export const WA_DISPLAY = "0813-1323-2519";

export function waLink(context: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(context)}`;
}

/** Nomor telepon untuk tautan tel: */
export const TEL_LINK = `tel:+${WA_NUMBER}`;

/**
 * Normalisasi nomor yang diketik pengunjung:
 * buang spasi, tanda hubung, tanda kurung, dan ubah awalan 0 / +62 menjadi 62.
 */
export function normalizeWaNumber(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/** Konteks WA yang dipakai lebih dari satu tempat. */
export const waContext = {
  beranda: "Halo Mahesa, saya dari website (Beranda). Saya mau tanya JAECOO.",
  berandaTestDrive:
    "Halo Mahesa, saya dari website (Beranda - Test Drive). Saya mau mengatur jadwal test drive JAECOO J5 Premium.",
  berandaKontak:
    "Halo Mahesa, saya dari website (Beranda - Lokasi & Kontak). Saya mau tanya JAECOO.",
  header: "Halo Mahesa, saya dari website (Header). Saya mau tanya JAECOO.",
  stickyBar:
    "Halo Mahesa, saya dari website (Bilah bawah). Saya mau tanya JAECOO.",
  fab: "Halo Mahesa, saya dari website (Tombol melayang). Saya mau tanya JAECOO.",
  footer: "Halo Mahesa, saya dari website (Footer). Saya mau tanya JAECOO.",
  harga:
    "Halo Mahesa, saya dari website (Harga). Saya mau tanya harga dan pilihan unit JAECOO.",
  kredit:
    "Halo Mahesa, saya dari website (Kredit). Saya mau konsultasi kredit JAECOO.",
  tentang:
    "Halo Mahesa, saya dari website (Tentang). Saya mau tanya JAECOO.",
  kontak: "Halo Mahesa, saya dari website (Kontak). Saya mau tanya JAECOO.",
  produkLainnya:
    "Halo Mahesa, saya dari website (Produk Lainnya). Saya mau tanya aksesoris dan perawatan.",
  notFound:
    "Halo Mahesa, saya dari website (halaman tidak ditemukan). Saya mau tanya JAECOO.",
  testDriveUnitLain:
    "Halo Mahesa, saya dari website (Test Drive). Unit yang saya cari belum tersedia untuk test drive. Boleh saya tahu perkiraan jadwalnya?",
} as const;

export function waModel(model: string): string {
  return `Halo Mahesa, saya dari website (Harga). Saya mau tanya ketersediaan JAECOO ${model}.`;
}

export function waModelVarian(model: string, varian: string): string {
  return `Halo Mahesa, saya dari website (Harga - ${model}). Saya mau tanya varian ${varian}.`;
}

export function waPaket(namaPaket: string): string {
  return `Halo Mahesa, saya dari website (Produk Lainnya). Saya tertarik dengan ${namaPaket}.`;
}

export function waProduk(namaProduk: string): string {
  return `Halo Mahesa, saya dari website (Produk Lainnya). Saya mau tanya ${namaProduk}.`;
}

export function waArtikel(judul: string): string {
  return `Halo Mahesa, saya baru baca artikel "${judul}" di website. Saya mau tanya lebih lanjut.`;
}
