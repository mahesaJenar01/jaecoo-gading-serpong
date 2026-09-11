/** Pemformat yang dipakai di seluruh situs. Sengaja deterministik supaya
 *  hasil render di server dan di browser selalu sama. */

export function rupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** "2026-09-01" -> "1 September 2026" */
export function tanggalPanjang(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${BULAN[m - 1]} ${y}`;
}
