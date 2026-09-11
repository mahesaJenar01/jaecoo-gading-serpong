/**
 * Foto serah terima unit.
 *
 * Berkasnya ada di public/delivery. Lebar dan tinggi dicatat di sini supaya
 * next/image bisa memesan ruang lebih dulu dan tata letak tidak bergeser saat
 * foto selesai dimuat.
 *
 * Angkanya adalah ukuran setelah orientasi EXIF diterapkan, bukan ukuran
 * mentah di dalam berkas. Sebagian foto diambil dengan kamera ponsel yang
 * menyimpan gambar melintang lalu menandainya untuk diputar, sehingga kedua
 * angka itu bisa tertukar bila dibaca langsung dari header JPEG.
 *
 * Menambah foto baru: taruh berkasnya di public/delivery, lalu tambahkan
 * satu baris di array ini. Tidak ada komponen yang perlu diubah.
 */
export type FotoSerahTerima = {
  /** Nama berkas di dalam public/delivery. */
  file: string;
  /** Nama pemilik unit seperti yang ditulis pada sapaan sehari hari. */
  nama: string;
  /** Lebar tampil setelah orientasi EXIF diterapkan. */
  width: number;
  /** Tinggi tampil setelah orientasi EXIF diterapkan. */
  height: number;
};

export const fotoSerahTerima: FotoSerahTerima[] = [
  { file: "pak-adit.jpg", nama: "Pak Adit", width: 2252, height: 4000 },
  { file: "ibu-linda.jpg", nama: "Ibu Linda", width: 4080, height: 2296 },
  { file: "ibu-eti.jpg", nama: "Ibu Eti", width: 1200, height: 1600 },
  { file: "pak-irsan.jpg", nama: "Pak Irsan", width: 2296, height: 4080 },
  { file: "pak-ardian.jpg", nama: "Pak Ardian", width: 4000, height: 2252 },
  { file: "kak-vivian.jpg", nama: "Kak Vivian", width: 2252, height: 4000 },
  { file: "pak-roby.jpg", nama: "Pak Roby", width: 3024, height: 4032 },
  { file: "ko-jimmy.jpg", nama: "Ko Jimmy", width: 1200, height: 1600 },
  { file: "pak-fachmi.jpg", nama: "Pak Fachmi", width: 2252, height: 4000 },
  { file: "ibu-dita.jpg", nama: "Ibu Dita", width: 3060, height: 4080 },
  { file: "kak-aqeel.jpg", nama: "Kak Aqeel", width: 2296, height: 4080 },
  { file: "pak-zulfikar.jpg", nama: "Pak Zulfikar", width: 720, height: 1280 },
  { file: "ibu-irma.jpg", nama: "Ibu Irma", width: 2252, height: 4000 },
  { file: "pak-taufik.jpg", nama: "Pak Taufik", width: 2252, height: 4000 },
  { file: "kak-firna.jpg", nama: "Kak Firna", width: 900, height: 1600 },
  { file: "ibu-marissa.jpg", nama: "Ibu Marissa", width: 2252, height: 4000 },
  { file: "pak-ikram.jpg", nama: "Pak Ikram", width: 2252, height: 4000 },
];

/** Alt text yang dipakai di seluruh situs untuk foto serah terima. */
export function altSerahTerima(f: FotoSerahTerima): string {
  return `Serah terima unit JAECOO kepada ${f.nama} di Gading Serpong, Tangerang`;
}

/** Path publik berkas foto. */
export function srcSerahTerima(f: FotoSerahTerima): string {
  return `/delivery/${f.file}`;
}
