export type SpecRow = { label: string; nilai: string };
export type SpecGroup = { kelompok: string; baris: SpecRow[] };
export type Faq = { q: string; a: string };

export type TestDriveFlag = {
  tersedia: boolean;
  catatan: string;
};

export type Varian = {
  nama: string;
  /** Harga OTR resmi. Hanya angka dari brief bagian 11 yang boleh dipakai. */
  hargaOtr: number;
  testDrive: TestDriveFlag;
};

export type Warna = {
  nama: string;
  /** Perkiraan tampilan untuk kotak warna, bukan kode cat resmi. */
  hex: string;
  /** Warna kedua untuk varian two tone (atap). */
  hexAtap?: string;
};

export type Keunggulan = { judul: string; deskripsi: string };

export type Model = {
  slug: string;
  nama: string;
  /** Label pendek untuk kartu, contoh "SUV listrik murni". */
  tipe: string;
  ringkasan: string;
  hargaMulai: number;
  /** true hanya untuk produk unggulan (JAECOO J5 Premium). */
  unggulan: boolean;
  varian: Varian[];
  spesifikasiUtama: SpecRow[];
  spesifikasiLengkap: SpecGroup[];
  warna: Warna[];
  keunggulan: Keunggulan[];
  faq: Faq[];
};

export type LimitedOffer = {
  enabled: boolean;
  label: string;
  berlakuSampai: string;
  kuota: number | null;
};

export type PaketItem = { nama: string; nilaiTinggi: boolean };

export type Paket = {
  id: string;
  nama: string;
  cocokUntuk: string;
  isi: PaketItem[];
  estimasiPengerjaan: string;
  garansiPemasangan: string;
  harga: number;
  totalSatuan: number;
  sorot: boolean;
};

export type Produk = {
  id: string;
  nama: string;
  kategori: string;
  deskripsiSingkat: string;
  hargaMulai: number;
  catatan: string;
};
