# Daftar TODO untuk Pemilik Situs

Semua yang tidak tersedia saat pembangunan sengaja ditulis `TODO`, bukan
ditebak. Daftar ini disusun dari yang paling menghambat.

---

## A. Wajib diisi sebelum situs dipublikasikan

### A1. Informasi bisnis — `src/data/site.ts`

| Item | Berkas | Akibat bila kosong |
|---|---|---|
| Koordinat lat dan lng dari pin Google Business | `site.koordinat` | `geo` tidak dirender di JSON-LD |
| URL profil TikTok, Instagram, Facebook | `site.sosial` | Ikon sosial tampil nonaktif dengan garis putus putus. `sameAs` kosong di JSON-LD |
| Tautan Google Maps atau Google Business | `site.googleMapsUrl` | Tombol "Buka di Google Maps" tidak muncul |

Sudah terisi: alamat lengkap, jam operasional (setiap hari 10.00 sampai 22.00),
dan ringkasan jamnya.

Begitu nilai TODO diganti, bagian JSON-LD yang bersangkutan muncul sendiri.
Ini disengaja: menerbitkan structured data berisi teks "TODO" membuat data
terstruktur dianggap tidak valid oleh mesin pencari.

### A2. Janji waktu respon

Sudah terisi dengan "dibalas pada hari yang sama untuk pesan yang masuk pada
jam operasional", di dua tempat yang harus selalu sama:

- `src/components/home/TrustRow.tsx` baris "Waktu respon"
- `src/app/kontak/page.tsx`, catatan jam respon di blok penutup

Bila janji ini berubah, ubah keduanya sekaligus.

### A3. Garansi resmi

- FAQ ketiga model di `src/data/models.json`: "Berapa lama masa garansi
  kendaraan dan baterainya?"

Isi sesuai kebijakan APM yang berlaku.

### A4. Lama proses sampai serah terima

- `src/data/faq.json`, pertanyaan terakhir.

---

## B. Angka

### Sudah dihitung otomatis

Seluruh angka kredit berasal dari `src/lib/kredit.ts`. Tidak ada satu pun
angka cicilan yang ditulis manual, jadi ketika harga OTR di `models.json`
berubah, seluruh simulasi ikut berubah sendiri.

| Yang dihitung | Rumusnya |
|---|---|
| Uang muka murni | persentase dikali harga OTR |
| Pokok hutang | harga OTR dikurangi uang muka murni |
| Bunga flat | 2, 3, 4, 5, 6 persen per tahun untuk tenor 1 sampai 5 tahun (`BUNGA_PER_TENOR`) |
| Biaya admin | Rp 3.000.000 flat (`BIAYA_ADMIN`) |
| TJH | pertanggungan Rp 10.000.000, premi 1 persen, jadi Rp 100.000 per tahun |
| Asuransi kendaraan | rate OJK Wilayah II batas bawah dikali harga OTR, per tahun. Kombinasi: all risk tahun pertama, TLO sisanya. All risk full tenor: all risk setiap tahun |
| Provisi | 3 persen dari pokok hutang, masuk angsuran, **tidak ditampilkan** |
| TDP ADDB | uang muka + admin + TJH. Asuransi kendaraan dicicil di angsuran |
| TDP ADDM | uang muka + admin + TJH + asuransi kendaraan + angsuran pertama |
| "Cicilan mulai" di kartu dan daftar harga | uang muka 30 persen, tenor 5 tahun, skema ADDM |

Angka ini **simulasi**, bukan angka final leasing, dan setiap tempat yang
menampilkannya sudah menyertakan keterangan itu (`CATATAN_ESTIMASI`). Bila
nanti ada angka resmi dari leasing rekanan, ganti isi `src/lib/kredit.ts`,
bukan komponennya.

### Yang masih kosong

| Item | Tempat |
|---|---|
| Tabel biaya kepemilikan di artikel kedua | `src/content/articles/biaya-kepemilikan-mobil-listrik-di-tangerang/index.tsx` |

Tabel estimasi biaya kepemilikan tahunan di halaman model sudah dihapus.

## C. Teks yang harus ditulis sendiri oleh Mahesa

| Bagian | Berkas | Panduan |
|---|---|---|
| FAQ test drive: syarat dan durasi | `src/app/test-drive/page.tsx` | |

Sudah ditulis: profil di `/tentang`, profil ringkas di `/kontak`, kalimat
perkenalan di kotak penulis artikel, panduan memilih varian di
`src/components/harga/VariantGuide.tsx`, pengantar blok Bukti nyata, serta
dokumen dan FAQ kredit di `/kredit`.

**Catatan penting soal suara tulisan.** Seluruh situs menyebut Mahesa dengan
namanya, bukan "saya". Kata "saya" hanya muncul di dua tempat, dan keduanya
memang suara pengunjung: teks pertanyaan pada FAQ, dan pesan WhatsApp yang
sudah terisi ketika pengunjung menekan tombol chat. Jangan mengubah keduanya
menjadi "Mahesa".

## D. Data contoh yang wajib diganti

Ditandai `"contoh": true` pada setiap entri, dan dijelaskan di
`src/data/catalog.ts`.

| Berkas | Isi contoh |
|---|---|
| `src/data/packages.json` | Tiga nama paket, seluruh isi paket, harga paket, total harga satuan, estimasi pengerjaan, ketentuan garansi |
| `src/data/packages.json` → `limitedOffer` | Label penawaran dan tanggal berlaku masih `TODO`. Bila belum ada penawaran, cukup ubah `enabled` menjadi `false` dan seluruh bilah penawaran hilang |
| `src/data/products.json` | 19 item katalog beserta harga dan catatannya |
| FAQ `/produk-lainnya` | "Apakah harga di halaman ini sudah final?" |

Selama data ini masih contoh, jangan mempromosikan halaman `/produk-lainnya`.

---

## E. Foto

Sudah terpasang: logo, favicon, foto profil, dan 17 foto serah terima. Rincian
dan cara menambahnya ada di `IMAGES.md`.

Yang belum ada: foto unit (hero, kartu model, galeri halaman model, foto per
warna) serta foto katalog aksesoris. Daftar lengkapnya beserta rasio, ukuran
piksel, dan alt text ada di `IMAGES.md`. Prioritas: hero beranda, tiga foto
kartu model, lalu foto utama tiga halaman model.

Testimoni tertulis sengaja tidak dipakai. Bukti sosial di situs ini berupa foto
serah terima saja, dan seluruhnya dipasang atas izin pemilik unit.

## F. Setelah live

1. Kirim `sitemap.xml` ke Google Search Console.
2. Uji structured data untuk beranda, satu halaman model, dan satu artikel.
3. Perbarui `hargaDiperbaruiPada` di `site.ts` setiap kali harga OTR berubah.
4. Bila menambah kategori produk baru di `products.json`, tidak perlu
   menyentuh CSS: filter kategori membuat aturannya sendiri dari data.
