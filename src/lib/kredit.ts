/**
 * Perhitungan simulasi kredit.
 *
 * Seluruh angka kredit di situs ini berasal dari berkas ini. Jangan menulis
 * angka cicilan atau TDP langsung di komponen.
 *
 *   pokok hutang  = harga OTR - uang muka murni
 *   bunga         = pokok hutang x bunga flat per tahun x tenor tahun
 *   total hutang  = pokok hutang + bunga + provisi
 *
 * Bunga flat mengikuti tenor (BUNGA_PER_TENOR). Provisi ikut dicicil ke
 * dalam angsuran, tetapi sengaja tidak diekspor dan tidak pernah
 * ditampilkan sebagai baris tersendiri.
 *
 * Skema pembayaran:
 *   ADDB  TDP = uang muka + biaya admin + premi TJH seluruh tenor.
 *         Premi asuransi kendaraan ikut dicicil di dalam angsuran.
 *   ADDM  TDP = uang muka + biaya admin + premi TJH + premi asuransi
 *         kendaraan seluruh tenor + angsuran bulan pertama. Karena angsuran
 *         bulan pertama sudah ikut dibayar di TDP, sisa angsuran bulanan
 *         yang masih ditanggung berkurang satu bulan.
 *
 * Premi asuransi kendaraan per tahun = rate x harga OTR, memakai batas
 * bawah rate OJK Wilayah II (DKI Jakarta, Jawa Barat, Banten).
 *
 * Seluruh angka yang keluar dari berkas ini adalah simulasi. Angka final
 * ditentukan bank atau leasing setelah pengajuan disetujui.
 */

export type Tenor = 1 | 2 | 3 | 4 | 5;
export type JenisAsuransi = "kombinasi" | "allrisk";
export type Skema = "ADDB" | "ADDM";

/** Pilihan tenor, dalam tahun. */
export const TENOR_OPSI: readonly Tenor[] = [1, 2, 3, 4, 5];

/** Tenor terpanjang, dipakai untuk angka "cicilan mulai". */
export const TENOR_MAKS: Tenor = 5;

/** Bunga flat per tahun, bergantung pada tenor yang dipilih. */
export const BUNGA_PER_TENOR: Record<Tenor, number> = {
  1: 0.02,
  2: 0.03,
  3: 0.04,
  4: 0.05,
  5: 0.06,
};

/** Pilihan uang muka murni, dalam persen harga OTR. */
export const DP_OPSI = [20, 25, 30, 35, 40, 50] as const;

/** Uang muka baku untuk angka "cicilan mulai" dan nilai awal simulasi. */
export const DP_STANDAR = 30;

/** Biaya administrasi, flat untuk seluruh tenor. */
export const BIAYA_ADMIN = 3_000_000;

/** Tanggung jawab hukum pihak ketiga: nilai pertanggungan dan rate per tahun. */
export const TJH_PERTANGGUNGAN = 10_000_000;
export const TJH_RATE = 0.01;
export const PREMI_TJH_PER_TAHUN = TJH_PERTANGGUNGAN * TJH_RATE;

/** Persentase dari pokok hutang. Tidak diekspor, lihat catatan di atas. */
const PROVISI = 0.03;

/**
 * Rate premi OJK Wilayah II untuk kendaraan non bus dan non truk, batas
 * bawah. Kategori ditentukan harga pertanggungan, yaitu harga OTR.
 * Sumber: https://www.bumida.co.id/media-artikel.html?read=cara-hitung-premi-all-risk-tlo-sesuai-rate-ojk
 */
const RATE_ASURANSI = [
  { hingga: 125_000_000, allRisk: 0.0326, tlo: 0.0065 },
  { hingga: 200_000_000, allRisk: 0.0247, tlo: 0.0044 },
  { hingga: 400_000_000, allRisk: 0.0208, tlo: 0.0038 },
  { hingga: 800_000_000, allRisk: 0.012, tlo: 0.0025 },
  { hingga: Infinity, allRisk: 0.0105, tlo: 0.002 },
] as const;

export const ASURANSI_OPSI: {
  nilai: JenisAsuransi;
  label: string;
  keterangan: string;
}[] = [
  {
    nilai: "kombinasi",
    label: "Kombinasi",
    keterangan: "All risk di tahun pertama, TLO di tahun berikutnya.",
  },
  {
    nilai: "allrisk",
    label: "All risk full tenor",
    keterangan: "All risk selama seluruh tenor berjalan.",
  },
];

export const SKEMA_OPSI: { nilai: Skema; label: string; keterangan: string }[] = [
  {
    nilai: "ADDB",
    label: "ADDB",
    keterangan: "Angsuran dibayar belakang. Angsuran pertama sebulan setelah akad.",
  },
  {
    nilai: "ADDM",
    label: "ADDM",
    keterangan:
      "Angsuran dibayar di muka. Angsuran pertama ikut dibayar di TDP, jadi sisa angsuran bulanannya berkurang satu bulan.",
  },
];

/** Nominal uang muka dari persentase, dibulatkan ke rupiah penuh. */
export function uangMuka(hargaOtr: number, persenDp: number): number {
  return Math.round((hargaOtr * persenDp) / 100);
}

export function rateAsuransi(hargaOtr: number) {
  return RATE_ASURANSI.find((r) => hargaOtr <= r.hingga) ?? RATE_ASURANSI[4];
}

export type PremiTahunan = {
  tahun: number;
  jenis: "All risk" | "TLO";
  rate: number;
  premi: number;
  premiTjh: number;
};

/** Premi asuransi kendaraan dan TJH untuk setiap tahun tenor. */
export function rincianAsuransi(
  hargaOtr: number,
  tenor: Tenor,
  asuransi: JenisAsuransi,
): PremiTahunan[] {
  const r = rateAsuransi(hargaOtr);
  return Array.from({ length: tenor }, (_, i) => {
    const allRisk = asuransi === "allrisk" || i === 0;
    const rate = allRisk ? r.allRisk : r.tlo;
    return {
      tahun: i + 1,
      jenis: allRisk ? "All risk" : "TLO",
      rate,
      premi: Math.round(hargaOtr * rate),
      premiTjh: PREMI_TJH_PER_TAHUN,
    };
  });
}

export type InputSimulasi = {
  hargaOtr: number;
  persenDp: number;
  tenor: Tenor;
  asuransi: JenisAsuransi;
  skema: Skema;
};

export type Simulasi = InputSimulasi & {
  uangMuka: number;
  pokokHutang: number;
  /** Bunga flat per tahun untuk tenor yang dipilih. */
  bunga: number;
  /** Banyaknya angsuran yang menjadi pembagi, yaitu tenor dikali 12. */
  jumlahAngsuran: number;
  /**
   * Angsuran yang masih dibayar bulanan setelah akad. Pada ADDM angsuran
   * bulan pertama sudah ikut dibayar di TDP, jadi bulan yang ditanggung
   * konsumen berkurang satu.
   */
  sisaAngsuran: number;
  asuransiTahunan: PremiTahunan[];
  totalAsuransi: number;
  totalTjh: number;
  biayaAdmin: number;
  angsuran: number;
  tdp: number;
  rincianTdp: { label: string; nilai: number }[];
};

export function simulasiKredit(input: InputSimulasi): Simulasi {
  const { hargaOtr, persenDp, tenor, asuransi, skema } = input;

  const dp = uangMuka(hargaOtr, persenDp);
  const pokokHutang = hargaOtr - dp;
  const bunga = BUNGA_PER_TENOR[tenor];
  const jumlahAngsuran = tenor * 12;

  const asuransiTahunan = rincianAsuransi(hargaOtr, tenor, asuransi);
  const totalAsuransi = asuransiTahunan.reduce((n, a) => n + a.premi, 0);
  const totalTjh = asuransiTahunan.reduce((n, a) => n + a.premiTjh, 0);

  const totalHutang =
    pokokHutang +
    pokokHutang * bunga * tenor +
    pokokHutang * PROVISI +
    (skema === "ADDB" ? totalAsuransi : 0);

  // Dibulatkan ke ribuan terdekat supaya tidak terbaca sebagai angka final.
  const angsuran = Math.round(totalHutang / jumlahAngsuran / 1000) * 1000;

  // Pembaginya tetap seluruh tenor, karena angsuran bulan pertama pada ADDM
  // memang salah satu dari angsuran itu, hanya waktu bayarnya dimajukan ke
  // TDP. Yang berkurang adalah bulan yang masih ditanggung setelah akad.
  const sisaAngsuran = skema === "ADDM" ? jumlahAngsuran - 1 : jumlahAngsuran;

  const rincianTdp = [
    { label: `Uang muka ${persenDp} persen`, nilai: dp },
    { label: "Biaya administrasi", nilai: BIAYA_ADMIN },
    { label: `Premi TJH ${tenor} tahun`, nilai: totalTjh },
    ...(skema === "ADDM"
      ? [
          { label: `Premi asuransi kendaraan ${tenor} tahun`, nilai: totalAsuransi },
          { label: "Angsuran bulan pertama", nilai: angsuran },
        ]
      : []),
  ];

  return {
    ...input,
    uangMuka: dp,
    pokokHutang,
    bunga,
    jumlahAngsuran,
    sisaAngsuran,
    asuransiTahunan,
    totalAsuransi,
    totalTjh,
    biayaAdmin: BIAYA_ADMIN,
    angsuran,
    tdp: rincianTdp.reduce((n, r) => n + r.nilai, 0),
    rincianTdp,
  };
}

/** Parameter angka "cicilan mulai" di kartu dan daftar harga. */
export const PARAM_CICILAN_MULAI = {
  persenDp: DP_STANDAR,
  tenor: TENOR_MAKS,
  asuransi: "kombinasi",
  skema: "ADDM",
} as const satisfies Omit<InputSimulasi, "hargaOtr">;

/** Keterangan singkat yang menyertai angka "cicilan mulai". */
export const KETERANGAN_CICILAN_MULAI = `uang muka ${DP_STANDAR} persen, tenor ${TENOR_MAKS} tahun, skema ADDM`;

export function cicilanMulai(hargaOtr: number): number {
  return simulasiKredit({ hargaOtr, ...PARAM_CICILAN_MULAI }).angsuran;
}

const persenTeks = (n: number) => `${n * 100}`.replace(".", ",");

/** "2 persen untuk tenor 1 tahun, 3 persen untuk tenor 2 tahun, ..." */
export const RINGKASAN_BUNGA = TENOR_OPSI.map(
  (t) => `${persenTeks(BUNGA_PER_TENOR[t])} persen untuk tenor ${t} tahun`,
).join(", ");

/** Kalimat baku yang menyertai setiap angka simulasi kredit. */
export const CATATAN_ESTIMASI =
  "Angka ini hanyalah simulasi dengan bunga flat " +
  `${persenTeks(BUNGA_PER_TENOR[1])} sampai ${persenTeks(BUNGA_PER_TENOR[TENOR_MAKS])} ` +
  "persen per tahun sesuai tenor. Bunga dan biaya bisa berbeda di setiap bank " +
  "dan leasing, dan angka final ditentukan setelah pengajuan disetujui.";
