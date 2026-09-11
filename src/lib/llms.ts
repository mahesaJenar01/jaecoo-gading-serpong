import { articles } from "@/content/articles/registry";
import { paket, produk } from "@/data/catalog";
import { modelsUrut } from "@/data/models";
import { serviceAreas } from "@/data/serviceAreas";
import { site } from "@/data/site";
import { rupiah, tanggalPanjang } from "./format";
import {
  KETERANGAN_CICILAN_MULAI,
  RINGKASAN_BUNGA,
  cicilanMulai,
} from "./kredit";
import { absoluteUrl } from "./seo";

/**
 * Isi llms.txt dan llms-full.txt dibangun dari data dan registry artikel,
 * sehingga tidak pernah basi ketika harga berubah atau artikel bertambah.
 * Keduanya disajikan lewat route handler force-static, jadi hasilnya berupa
 * berkas statis yang bisa diakses di /llms.txt dan /llms-full.txt.
 */

const HALAMAN = [
  {
    path: "/harga",
    nama: "Harga & Model",
    ringkas:
      "daftar harga OTR seluruh model JAECOO beserta varian dan cicilan",
    panjang:
      "Hub daftar harga. Memuat harga on the road resmi seluruh varian beserta estimasi cicilannya, perbandingan spesifikasi antar model, dan panduan memilih varian.",
  },
  {
    path: "/produk-lainnya",
    nama: "Produk Lainnya",
    ringkas: "paket dan katalog aksesoris serta perawatan",
    panjang:
      "Paket aksesoris dan katalog satuan beserta jasa pemasangan dan perawatan. Pemasangan dijadwalkan bersamaan dengan serah terima unit. Pembelian aksesoris terpisah dari pembelian unit dan tidak dapat digabungkan ke skema kredit unit.",
  },
  {
    path: "/test-drive",
    nama: "Test Drive",
    ringkas: "pengajuan jadwal test drive",
    panjang:
      "Formulir pengajuan test drive yang hasilnya dikirim sebagai pesan WhatsApp. Ketersediaan unit dibaca dari data model.",
  },
  {
    path: "/kredit",
    nama: "Kredit",
    ringkas: "alur pengajuan kredit dan dokumen yang perlu disiapkan",
    panjang:
      "Alur pengajuan kredit dalam empat langkah, daftar dokumen untuk karyawan dan wiraswasta, serta simulasi kredit dengan pilihan uang muka, tenor, asuransi kombinasi atau all risk full tenor, dan skema ADDB atau ADDM.",
  },
  {
    path: "/artikel",
    nama: "Artikel",
    ringkas: "panduan pembelian dan kepemilikan mobil JAECOO",
    panjang:
      "Indeks artikel panduan pembelian dan kepemilikan, ditulis oleh sales consultant yang bersangkutan.",
  },
  {
    path: "/tentang",
    nama: "Tentang",
    ringkas: `profil ${site.sales.nama}, ${site.sales.jabatan}`,
    panjang: `Profil personal ${site.sales.nama}, ${site.sales.jabatan} di ${site.sales.lokasi}, beserta cara kerja saat mendampingi pembeli.`,
  },
  {
    path: "/kontak",
    nama: "Kontak",
    ringkas: "kontak, alamat, jam operasional, dan area layanan",
    panjang:
      "Kontak WhatsApp, telepon, dan email, beserta alamat, jam operasional, dan area layanan.",
  },
];

function daftarModel(): string {
  return modelsUrut
    .map(
      (m) =>
        `- [${m.nama}](${absoluteUrl(`/harga/${m.slug}`)}): ${m.tipe}, ${rupiah(
          m.hargaMulai,
        )} OTR`,
    )
    .join("\n");
}

export function llmsTxt(): string {
  return `# JAECOO Gading Serpong

> Situs sales consultant JAECOO di Gading Serpong, Tangerang. Berisi daftar harga
> dan spesifikasi model JAECOO, simulasi cicilan, layanan test drive, aksesoris
> dan perawatan mobil, serta artikel panduan pembelian dan kepemilikan.

## Informasi kontak
- Sales consultant: ${site.sales.nama}, ${site.sales.jabatan}
- WhatsApp: ${site.kontak.waDisplay}
- Email: ${site.kontak.email}
- Area layanan: ${serviceAreas.join(", ")}

## Halaman utama
${HALAMAN.map(
  (h) => `- [${h.nama}](${absoluteUrl(h.path)}): ${h.ringkas}`,
).join("\n")}

## Model yang dijual
Harga on the road, terakhir diperbarui ${tanggalPanjang(site.hargaDiperbaruiPada)}.

${daftarModel()}

## Artikel
${articles
  .map(
    (a) =>
      `- [${a.meta.title}](${absoluteUrl(`/artikel/${a.meta.slug}`)}): ${a.meta.description}`,
  )
  .join("\n")}
`;
}

export function llmsFullTxt(): string {
  const spekModel = modelsUrut
    .map((m) => {
      const spek = m.spesifikasiUtama
        .map((s) => `  - ${s.label}: ${s.nilai}`)
        .join("\n");
      const varian = m.varian
        .map(
          (v) =>
            `  - Varian ${v.nama}: ${rupiah(
              v.hargaOtr,
            )} OTR, cicilan mulai ${rupiah(
              cicilanMulai(v.hargaOtr),
            )} per bulan (${KETERANGAN_CICILAN_MULAI}). Test drive: ${
              v.testDrive.tersedia ? "tersedia" : v.testDrive.catatan
            }.`,
        )
        .join("\n");
      const warna = m.warna.map((w) => w.nama).join(", ");

      return `### ${m.nama}
URL: ${absoluteUrl(`/harga/${m.slug}`)}
Jenis: ${m.tipe}
Harga OTR mulai: ${rupiah(m.hargaMulai)}
${m.ringkasan}

Varian:
${varian}

Spesifikasi utama:
${spek}

Pilihan warna: ${warna}`;
    })
    .join("\n\n");

  const daftarPaket = paket
    .map(
      (p) =>
        `- ${p.nama}: ${rupiah(p.harga)}, estimasi pengerjaan ${p.estimasiPengerjaan}. ${p.cocokUntuk}`,
    )
    .join("\n");

  const kategoriRingkas = Array.from(new Set(produk.map((p) => p.kategori)))
    .map((k) => {
      const items = produk.filter((p) => p.kategori === k);
      return `- ${k}: ${items.map((i) => i.nama).join(", ")}`;
    })
    .join("\n");

  const daftarArtikel = articles
    .map(
      (a) => `### ${a.meta.title}
URL: ${absoluteUrl(`/artikel/${a.meta.slug}`)}
Kategori: ${a.meta.category}
Terbit: ${a.meta.publishedAt}, diperbarui: ${a.meta.updatedAt}
${a.meta.keyTakeaway}`,
    )
    .join("\n\n");

  return `# JAECOO Gading Serpong, versi lengkap

> Situs sales consultant JAECOO di Gading Serpong, Tangerang. Berkas ini adalah
> versi panjang dari /llms.txt, berisi ringkasan tiap halaman, spesifikasi
> utama tiap model, daftar paket aksesoris, dan ringkasan tiap artikel.
> Seluruh isinya dibangun langsung dari data situs.

## Informasi bisnis
- Nama tampilan: ${site.name}
- Sales consultant: ${site.sales.nama}, ${site.sales.jabatan}
- Lokasi: ${site.sales.lokasi}
- WhatsApp: ${site.kontak.waDisplay}
- Email: ${site.kontak.email}
- Alamat: ${site.alamat.lengkap}
- Jam operasional: ${site.jamRingkas}
- Area layanan: ${serviceAreas.join(", ")}
- Situs: ${site.url}

## Ringkasan halaman
${HALAMAN.map(
  (h) => `### ${h.nama}
URL: ${absoluteUrl(h.path)}
${h.panjang}`,
).join("\n\n")}

## Model yang dijual
Hanya tiga unit berikut yang dijual. Harga on the road, terakhir diperbarui ${tanggalPanjang(
    site.hargaDiperbaruiPada,
  )}. Angka cicilan yang disebutkan hanyalah simulasi dengan bunga flat per tahun sesuai tenor (${RINGKASAN_BUNGA}), bukan angka final dari bank atau leasing. Bunga bisa berbeda di setiap bank. Angka pajak dan biaya kepemilikan tahunan belum tersedia dan tidak boleh diperkirakan.

${spekModel}

## Paket aksesoris
Harga paket berikut adalah harga aksesoris beserta jasa pemasangan, terpisah dari harga unit mobil, dan tidak dapat digabungkan ke skema kredit unit. Data paket dan katalog masih berupa contoh.

${daftarPaket}

## Katalog aksesoris satuan
${kategoriRingkas}

## Artikel
${daftarArtikel}

## Catatan ketelitian
- Harga unit yang berlaku hanya angka yang tercantum di atas.
- Tidak ada promo, diskon, atau potongan harga untuk unit mobil di situs ini.
- Sebagian data pada halaman aksesoris masih berupa contoh dan akan diganti.
`;
}
