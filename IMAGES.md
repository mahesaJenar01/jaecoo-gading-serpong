# Daftar Foto yang Dibutuhkan

## Yang sudah terpasang

| Berkas | Dipakai di |
|---|---|
| `public/jaecoo-white-logo-1400x217.webp` | Wordmark header dan footer, lewat `src/components/layout/Logo.tsx`. Berkasnya berwarna putih dan dibalik dengan filter CSS untuk permukaan terang |
| `public/jaecoo-logo.ico` (disalin ke `src/app/icon.png`) | Favicon |
| `public/mahesa-jenar.jpg` | Foto profil di Tentang, Kontak, dan kotak penulis artikel, lewat `src/components/ui/ProfilePhoto.tsx` |
| `public/delivery/*.jpg` (17 berkas) | Galeri serah terima di beranda dan Tentang, didaftarkan di `src/data/delivery.ts` |

Menambah foto serah terima: taruh berkasnya di `public/delivery`, lalu tambah
satu baris di `src/data/delivery.ts` beserta lebar dan tinggi tampilnya. Catat
ukuran **setelah** orientasi EXIF diterapkan, karena sebagian foto ponsel
disimpan melintang lalu ditandai untuk diputar.

## Yang masih dibutuhkan

Sisa daftar di bawah belum ada fotonya. Setiap tempat foto memakai komponen
`<Placeholder />` yang sudah memesan ruang sesuai rasio, jadi memasang foto
asli nanti tidak akan menggeser tata letak.

**Cara memasang nanti.** Simpan berkas di `public/img/` dengan nama persis
seperti kolom "Nama berkas" di bawah, lalu ubah isi satu komponen saja:
`src/components/ui/Placeholder.tsx`. Ganti isinya menjadi `next/image` yang
membaca `/img/{id}`. Seluruh halaman memakai komponen itu, jadi tidak ada
markup gambar yang tersebar di banyak berkas.

**Format.** Simpan sebagai JPG kualitas tinggi (atau WebP). Ukuran piksel di
bawah adalah ukuran minimum yang disarankan; lebih besar boleh, lebih kecil
akan terlihat pecah di layar beresolusi tinggi.

**Izin.** Untuk foto serah terima dan foto pembeli, pastikan sudah ada izin
tertulis dari orang yang tampak di foto sebelum dipasang.

---

## 1. Beranda

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
| `hero-jaecoo-j5-premium.jpg` | Hero beranda. Satu berkas dipakai untuk dua rasio: dipotong 4/3 di mobile dan 16/9 di desktop, jadi sisakan ruang kosong di kiri kanan objek | 4/3 dan 16/9 | 1920 x 1080 | JAECOO J5 Premium di Gading Serpong, Tangerang |
| `paket-aksesoris-ringkas.jpg` | Kartu ringkas aksesoris | 4/3 | 1200 x 900 | Pemasangan aksesoris pada unit JAECOO sebelum serah terima |
| `peta-lokasi-dealer.jpg` | Blok Lokasi dan kontak. Tangkapan layar peta, bukan iframe | 16/9 | 1600 x 900 | Peta lokasi dealer JAECOO Gading Serpong |

Kartu model di beranda memakai berkas yang sama dengan bagian 2 di bawah
(`{slug}-kartu.jpg`).

## 2. Kartu model (beranda dan /harga)

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
| `jaecoo-j5-premium-kartu.jpg` | Kartu model | 4/3 | 1200 x 900 | JAECOO J5 Premium, SUV listrik murni |
| `jaecoo-j7-shs-kartu.jpg` | Kartu model | 4/3 | 1200 x 900 | JAECOO J7 SHS, SUV plug-in hybrid |
| `jaecoo-j8-shs-ardis-kartu.jpg` | Kartu model | 4/3 | 1200 x 900 | JAECOO J8 SHS ARDIS, SUV plug-in hybrid kelas atas |
| `jaecoo-j5-premium-sorot-harga.jpg` | Blok unit unggulan di atas daftar harga `/harga` | 4/3 | 1400 x 1050 | JAECOO J5 Premium, SUV listrik murni |

## 3. Halaman model `/harga/[slug]`

Untuk **setiap** dari tiga model, dibutuhkan lima foto berikut. Ganti `{slug}`
dengan `jaecoo-j5-premium`, `jaecoo-j7-shs`, atau `jaecoo-j8-shs-ardis`.

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
| `{slug}-utama.jpg` | Foto utama galeri | 16/9 | 1920 x 1080 | {Nama model}, {jenis}, tampak tiga perempat depan |
| `{slug}-interior.jpg` | Galeri kecil | 4/3 | 1000 x 750 | Interior {nama model} |
| `{slug}-samping.jpg` | Galeri kecil | 4/3 | 1000 x 750 | Tampak samping {nama model} |
| `{slug}-belakang.jpg` | Galeri kecil | 4/3 | 1000 x 750 | Tampak belakang {nama model} |
| `{slug}-bagasi.jpg` | Galeri kecil | 4/3 | 1000 x 750 | Ruang bagasi {nama model} |

Total 15 berkas.

### Foto per warna

Nama berkas dibentuk dari slug model ditambah nama warna dalam huruf kecil
dengan tanda hubung. Alt text: `{Nama model} warna {Nama warna}`.
Rasio 4/3, ukuran 1000 x 750.

**JAECOO J5 Premium** (4 berkas)
- `jaecoo-j5-premium-warna-forest-green.jpg`
- `jaecoo-j5-premium-warna-jet-black.jpg`
- `jaecoo-j5-premium-warna-pristine-white.jpg`
- `jaecoo-j5-premium-warna-ivory-gray.jpg`

**JAECOO J7 SHS** (5 berkas)
- `jaecoo-j7-shs-warna-jet-black.jpg`
- `jaecoo-j7-shs-warna-pristine-white.jpg`
- `jaecoo-j7-shs-warna-moonlight-silver.jpg`
- `jaecoo-j7-shs-warna-stone-grey.jpg`
- `jaecoo-j7-shs-warna-pristine-white-two-tone.jpg`

**JAECOO J8 SHS ARDIS** (4 berkas)
- `jaecoo-j8-shs-ardis-warna-pristine-white-two-tone.jpg`
- `jaecoo-j8-shs-ardis-warna-jet-black.jpg`
- `jaecoo-j8-shs-ardis-warna-lunar-silver-two-tone.jpg`
- `jaecoo-j8-shs-ardis-warna-stone-gray-two-tone.jpg`

Catatan: kotak warna kecil di halaman model memakai kode hex perkiraan yang
ada di `src/data/models.json`. Itu hanya untuk membantu pengenalan, bukan kode
cat resmi. Setelah foto asli terpasang, kode hex boleh disesuaikan agar lebih
mendekati warna sebenarnya.

## 4. Produk Lainnya

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
| `produk-{id}.jpg` | Kartu katalog satuan | 4/3 | 800 x 600 | {Nama produk}, kategori {kategori} |
| `hasil-kaca-film-sebelum.jpg` | Blok Hasil pengerjaan | 4/3 | 1000 x 750 | Kondisi sebelum pengerjaan kaca film |
| `hasil-kaca-film-sesudah.jpg` | Blok Hasil pengerjaan | 4/3 | 1000 x 750 | Hasil setelah pengerjaan kaca film |
| `hasil-nano-coating-sebelum.jpg` | Blok Hasil pengerjaan | 4/3 | 1000 x 750 | Kondisi sebelum pengerjaan nano coating |
| `hasil-nano-coating-sesudah.jpg` | Blok Hasil pengerjaan | 4/3 | 1000 x 750 | Hasil setelah pengerjaan nano coating |

`{id}` mengikuti kolom `id` di `src/data/products.json`. Saat ini ada 9 item:

`kaca-film-depan-samping-belakang`, `kaca-film-atas`, `nano-coating-3-layer`,
`asuransi-all-risk-1-tahun`, `screen-protector`, `reclining-second-seat`,
`ban-serep`, `two-tone`, `wall-charging`.

Bila daftar produknya berubah, daftar fotonya ikut berubah.

## 5. Artikel

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
| `artikel-panduan-memilih-varian-jaecoo-j5-premium.jpg` | Thumbnail kartu artikel | 16/9 | 1200 x 675 | Panduan Memilih Varian JAECOO J5 Premium |
| `artikel-biaya-kepemilikan-mobil-listrik-di-tangerang.jpg` | Thumbnail kartu artikel | 16/9 | 1200 x 675 | Biaya Kepemilikan Mobil Listrik di Tangerang |

Setiap artikel baru butuh satu berkas dengan pola `artikel-{slug}.jpg`.

## 6. Profil dan Tentang

| Nama berkas | Posisi | Rasio | Ukuran | Alt text |
|---|---|---|---|---|
Sudah terpasang seluruhnya. Foto profil memakai `public/mahesa-jenar.jpg`, dan
galeri di halaman Tentang memakai foto serah terima yang sama dengan beranda.

## 7. Yang tidak dibutuhkan

- **Logo dan favicon.** Sudah terpasang, lihat tabel di bagian atas berkas ini.
- **Gambar Open Graph.** Tidak perlu foto. Gambar OG dibuat otomatis dari teks
  memakai `next/og`, dan sudah berbeda beda per halaman model dan artikel.

---

## Rekapitulasi jumlah

| Kelompok | Jumlah berkas |
|---|---|
| Beranda | 3 |
| Kartu model dan blok unggulan | 4 |
| Galeri tiga halaman model | 15 |
| Foto per warna | 13 |
| Katalog aksesoris | 9 |
| Hasil pengerjaan sebelum dan sesudah | 4 |
| Thumbnail artikel | 2 |
| Profil dan galeri kegiatan | 0, sudah terpasang |
| **Total** | **50** |

Bila ingin bertahap, urutan prioritasnya: hero beranda, tiga foto kartu model,
foto utama tiga halaman model, lalu sisanya.
