import { WA_DISPLAY, WA_NUMBER } from "@/lib/wa";

/**
 * Satu sumber informasi bisnis untuk seluruh situs: metadata, footer,
 * JSON-LD, dan llms.txt semuanya membaca dari sini.
 *
 * Nilai bertanda TODO belum pernah dikonfirmasi. Jangan mengisinya dengan
 * tebakan: halaman akan menampilkan teks TODO apa adanya sampai diganti.
 */
export const site = {
  name: "JAECOO Gading Serpong",
  shortName: "JAECOO Gading Serpong",
  url: "https://www.jaecoogadingserpong.com",
  locale: "id_ID",

  sales: {
    nama: "Mahesa Jenar",
    jabatan: "Sales Consultant JAECOO",
    lokasi: "Gading Serpong, Tangerang",
    /** Dipakai sebagai author.url seluruh artikel dan JSON-LD Person. */
    profilUrl: "https://www.jaecoogadingserpong.com/tentang",
  },

  kontak: {
    waNumber: WA_NUMBER,
    waDisplay: WA_DISPLAY,
    telepon: `+${WA_NUMBER}`,
    teleponDisplay: WA_DISPLAY,
    email: "mahesajaecoo@gmail.com",
  },

  alamat: {
    jalan: "Jl. Gading Serpong Boulevard",
    kelurahan: "Medang",
    kecamatan: "Pagedangan",
    kota: "Kabupaten Tangerang",
    provinsi: "Banten",
    kodePos: "15334",
    negara: "ID",
    /** Baris tunggal untuk footer dan kartu kontak. */
    lengkap:
      "Jl. Gading Serpong Boulevard, Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten 15334",
  },

  /** TODO: ambil dari pin Google Business, bukan dari perkiraan peta. */
  koordinat: {
    lat: "TODO",
    lng: "TODO",
  },

  /** Buka setiap hari, pukul 10.00 sampai 22.00. */
  jamOperasional: [
    { hari: "Senin", jam: "10:00-22:00" },
    { hari: "Selasa", jam: "10:00-22:00" },
    { hari: "Rabu", jam: "10:00-22:00" },
    { hari: "Kamis", jam: "10:00-22:00" },
    { hari: "Jumat", jam: "10:00-22:00" },
    { hari: "Sabtu", jam: "10:00-22:00" },
    { hari: "Minggu", jam: "10:00-22:00" },
  ],

  /** Ringkasan satu baris untuk hero dan kartu kepercayaan. */
  jamRingkas: "Setiap hari, 10.00 sampai 22.00",

  /** TODO: tempel tautan profil yang benar, jangan menebak URL. */
  sosial: {
    tiktok: { label: "Mahesa Jaecoo", url: "TODO" },
    instagram: { label: "mahesa.jaecoo", url: "TODO" },
    facebook: { label: "Mahesa Jaecoo", url: "TODO" },
  },

  /** TODO: tautan Google Business Profile atau Google Maps dealer. */
  googleMapsUrl: "TODO",

  /**
   * Tanggal daftar harga terakhir diperiksa. Ditampilkan di /harga.
   * Perbarui setiap kali angka OTR di models.json berubah.
   */
  hargaDiperbaruiPada: "2026-09-07",
} as const;

export type Site = typeof site;
