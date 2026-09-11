/**
 * Area layanan. Dipakai di footer, beranda, /kontak, /test-drive, dan llms.txt.
 * Urutan sengaja dimulai dari area terdekat dealer.
 */
export const serviceAreas = [
  "Gading Serpong",
  "BSD",
  "Alam Sutera",
  "Serpong",
  "Karawaci",
  "Tangerang",
  "Tangerang Selatan",
  "Jakarta Barat",
] as const;

export type ServiceArea = (typeof serviceAreas)[number];

/** "Gading Serpong, BSD, Alam Sutera, ..." untuk teks satu baris. */
export const serviceAreasText = serviceAreas.join(", ");
