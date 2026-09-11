import modelsData from "./models.json";
import faqData from "./faq.json";
import type { Faq, Model, Varian } from "./types";

/**
 * Hanya tiga unit yang dijual: J5 Premium, J7 SHS, dan J8 SHS ARDIS.
 * Harga OTR di models.json adalah satu satunya harga yang boleh dipakai.
 */
export const models = modelsData as Model[];

/** Produk unggulan. Tampil pertama di beranda dan diberi blok sendiri di /harga. */
export const modelUnggulan: Model =
  models.find((m) => m.unggulan) ?? (models[0] as Model);

/** Unggulan lebih dulu, sisanya mengikuti urutan data. */
export const modelsUrut: Model[] = [
  ...models.filter((m) => m.unggulan),
  ...models.filter((m) => !m.unggulan),
];

export function getModel(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

export function hargaTerendah(): number {
  return Math.min(...models.map((m) => m.hargaMulai));
}

export type VarianDenganModel = Varian & { modelNama: string; modelSlug: string };

/** Semua varian dari semua model, dipakai di tabel harga dan formulir test drive. */
export function semuaVarian(): VarianDenganModel[] {
  return modelsUrut.flatMap((m) =>
    m.varian.map((v) => ({ ...v, modelNama: m.nama, modelSlug: m.slug })),
  );
}

/** Varian yang boleh dipilih untuk test drive. Dibaca dari data, tidak di-hardcode. */
export function varianTestDrive(): VarianDenganModel[] {
  return semuaVarian().filter((v) => v.testDrive.tersedia);
}

export const faqGlobal = faqData as Faq[];

export type OpsiUnit = {
  value: string;
  label: string;
  tersedia: boolean;
  catatan: string;
};

/**
 * Daftar unit untuk formulir test drive.
 *
 * Ketersediaan dibaca murni dari flag testDrive di models.json. Unit yang
 * sedang tidak tersedia tetap ditampilkan dalam keadaan nonaktif, supaya
 * pengunjung tahu unitnya ada dan tetap terdorong bertanya.
 * Jangan pernah menuliskan nama unit secara keras di dalam komponen.
 */
export function opsiUnitTestDrive(): OpsiUnit[] {
  return modelsUrut.flatMap((m) =>
    m.varian.map((v) => ({
      value: m.varian.length > 1 ? `${m.nama} ${v.nama}` : m.nama,
      label: m.varian.length > 1 ? `${m.nama} ${v.nama}` : m.nama,
      tersedia: v.testDrive.tersedia,
      catatan: v.testDrive.catatan,
    })),
  );
}
