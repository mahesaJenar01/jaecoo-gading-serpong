# jaecoogadingserpong.com

Situs lead generation untuk Mahesa Jenar, sales consultant JAECOO di Gading
Serpong, Tangerang. Satu tujuan: menghasilkan klik ke WhatsApp.

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Seluruh halaman static,
tanpa database, tanpa API dinamis, dan tanpa environment variable wajib.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm start          # menjalankan hasil build
npm run typecheck  # tsc --noEmit
```

## Peta berkas

```
src/data/          Sumber seluruh isi situs. Ubah di sini, bukan di komponen.
  site.ts          Info bisnis, kontak, alamat, jam, sosial, tanggal harga
  models.json      Tiga model JAECOO, harga OTR, spesifikasi, warna, FAQ
  packages.json    Tiga paket aksesoris, catatanHarga, limitedOffer
  products.json    Katalog aksesoris satuan beserta harganya
  faq.json         FAQ beranda
  serviceAreas.ts  Area layanan
  delivery.ts      Daftar foto serah terima di public/delivery
  nav.ts           Navigasi header, drawer, footer

src/content/articles/
  registry.ts      Sumber tunggal daftar artikel
  <slug>/index.tsx Satu artikel, ditulis sebagai komponen React

src/lib/
  kredit.ts        Rumus simulasi kredit: bunga per tenor, admin, TJH,
                   asuransi rate OJK, skema ADDB dan ADDM
  wa.ts            waLink() dan seluruh konteks pesan WhatsApp
  seo.ts           metadataBase, canonical, Open Graph
  jsonld.ts        Pembuat structured data
  llms.ts          Isi /llms.txt dan /llms-full.txt
  og.tsx           Gambar Open Graph berbasis teks
```

## Cara mengubah hal yang sering berubah

**Harga.** Ubah `hargaOtr` dan `hargaMulai` di `src/data/models.json`, lalu
perbarui `hargaDiperbaruiPada` di `src/data/site.ts`. Tanggal itu tampil di
`/harga`, ikut ke sitemap, dan ikut ke `llms.txt`.

**Ketersediaan test drive.** Ubah `testDrive.tersedia` pada varian di
`models.json`. Formulir test drive membacanya langsung: unit yang tidak
tersedia tetap tampil dalam keadaan nonaktif beserta catatannya.

**Penawaran aksesoris.** Ubah `limitedOffer` di `packages.json`. Bila
`enabled` diisi `false`, bilah penawaran beserta seluruh elemen terkait tidak
dirender sama sekali.

**Harga aksesoris.** Ubah `hargaMulai` di `products.json`. Harga paket di
`packages.json` hanya berisi `harga`, yaitu harga setelah dipotong. Total
harga satuannya, yang tampil sebagai angka coret, dijumlahkan sendiri oleh
`catalog.ts` dari `produkId` tiap isi paket, jadi angka coret tidak pernah
meleset dari katalog.

Satu item punya perlakuan khusus: asuransi all risk tidak menyimpan nominal,
melainkan `rateOtr` sebesar `0.0208`. Nominalnya dihitung dari harga OTR unit
unggulan, sehingga ikut berubah sendiri ketika harga OTR di `models.json`
diperbarui.

**Kalimat negosiasi harga.** `catatanHarga` di `packages.json` sengaja tidak
dirender di halaman mana pun, hanya ikut ke `llms-full.txt`. Bahwa harga
masih bisa dibicarakan hanya disebut pada jawaban FAQ `/produk-lainnya`,
yaitu ketika pengunjung memang menanyakannya, bukan ditawarkan sendiri di
atas daftar harga.

**Artikel baru.** Salin folder artikel yang ada di `src/content/articles/`,
ganti slug, isi `SECTIONS` dan `meta`, lalu tambahkan satu baris di
`registry.ts`. Halaman indeks, sitemap, `llms.txt`, dan artikel terkait ikut
menyesuaikan sendiri.

**Tombol WhatsApp baru.** Selalu lewat `<WaButton />` dengan `context` yang
unik, memuat nama halaman dan nama blok asal klik. Jangan menulis URL `wa.me`
langsung di komponen.

## Aturan konten yang tidak boleh dilanggar

1. Promo, diskon, potongan harga, cashback, dan hitung mundur **tidak boleh**
   muncul untuk unit mobil, di halaman mana pun.
2. Bahasa harga hemat hanya boleh di `/produk-lainnya` dan pada kartu ringkas
   aksesoris di beranda, dan harus jelas merujuk ke paket aksesoris.
3. Jangan pernah menyatakan bahwa aksesoris bisa masuk skema kredit unit.
4. Jangan menulis klaim yang tidak bisa dibuktikan: jumlah unit terjual,
   rating, atau testimoni karangan.
5. Bukti sosial hanya berupa foto serah terima. Testimoni tertulis tidak
   dipakai sama sekali.
6. Angka kredit (TDP dan angsuran) dihitung di `src/lib/kredit.ts` dan selalu
   disebut sebagai simulasi. Jangan menulis angka cicilan langsung di
   komponen, dan jangan menyebutnya angka final leasing. Provisi ikut
   dicicil di angsuran tetapi tidak pernah ditampilkan sebagai baris sendiri.
   Pada skema ADDM, angsuran bulan pertama sudah ikut dibayar di TDP, jadi
   bulan yang masih ditanggung konsumen berkurang satu (`sisaAngsuran`).
   Pembagi angsurannya tetap seluruh tenor.
7. Angka pajak dan biaya kepemilikan tahunan tidak ditampilkan di halaman
   model. Jangan mengisinya dengan perkiraan.
8. Tingkat tolak panas kaca film tidak boleh pernah disebutkan dalam angka.
   Kaca film yang ditawarkan adalah Solargard tipe Black Phantom, dan
   manfaatnya cukup disebut sebagai kabin yang jadi lebih adem karena tolak
   panasnya tinggi.
9. Harga aksesoris di `/produk-lainnya` adalah harga acuan, bukan harga mati,
   tetapi jangan menawarkan negosiasi sendiri di halaman. Cukup dijawab di
   FAQ bila ditanyakan. Jangan menambah bilah atau catatan harga acuan di
   atas daftar paket maupun di kartu paket.
10. Situs ini menyebut Mahesa dengan namanya, bukan "saya". Pengecualiannya
    hanya teks yang memang suara pengunjung: pertanyaan pada FAQ dan pesan
    WhatsApp yang sudah terisi di tombol chat.

## Deploy ke Vercel

1. Push repositori ini ke GitHub, GitLab, atau Bitbucket.
2. Di Vercel, **Add New Project**, pilih repositori tersebut. Vercel mengenali
   Next.js sendiri, jadi biarkan Framework Preset, Build Command, dan Output
   Directory pada nilai bawaan. Tidak ada environment variable yang perlu
   diisi.
3. **Deploy**. Build pertama menghasilkan seluruh halaman sebagai berkas
   statis, termasuk `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`,
   dan seluruh gambar Open Graph.

### Domain dan redirect non-www ke www

Domain kanonik situs ini adalah `https://www.jaecoogadingserpong.com`. Nilai
itu dipakai `metadataBase`, canonical, sitemap, dan JSON-LD, jadi jangan
sampai apex domain ikut terindeks.

1. Buka **Project Settings → Domains**.
2. Tambahkan `www.jaecoogadingserpong.com`. Saat diminta, pilih menjadikannya
   domain utama (**Set as Primary Domain**).
3. Tambahkan juga `jaecoogadingserpong.com`. Vercel akan menawarkan
   **Redirect to www.jaecoogadingserpong.com** dengan status **308 Permanent
   Redirect**. Pilih itu.
4. Arahkan DNS di penyedia domain:
   - `www` sebagai **CNAME** ke `cname.vercel-dns.com`
   - apex `@` sebagai **A** ke `76.76.21.21`, atau ikuti nilai yang
     ditampilkan Vercel bila berbeda.
5. Tunggu sertifikat SSL terbit, lalu uji:
   ```bash
   curl -sI https://jaecoogadingserpong.com | head -3
   ```
   Harus mengembalikan `HTTP/2 308` dengan header `location` menuju
   `https://www.jaecoogadingserpong.com/`.

Redirect ini sengaja diatur di Vercel, bukan di `next.config.ts`. Redirect di
level platform terjadi sebelum permintaan sampai ke aplikasi, jadi lebih cepat
dan tidak menghabiskan invocation.

### Setelah live

1. Daftarkan `https://www.jaecoogadingserpong.com` di Google Search Console
   sebagai properti URL prefix, lalu kirim
   `https://www.jaecoogadingserpong.com/sitemap.xml`.
2. Periksa `https://www.jaecoogadingserpong.com/robots.txt`,
   `/llms.txt`, dan `/llms-full.txt` terbuka dan isinya benar.
3. Uji structured data di Rich Results Test untuk beranda, satu halaman model,
   dan satu artikel.
4. Isi seluruh `TODO` yang terdaftar di bagian bawah dokumen serah terima,
   terutama alamat, koordinat, jam operasional, dan tautan sosial. Selama
   masih TODO, bagian tersebut tidak ikut dirender ke JSON-LD supaya data
   terstruktur tetap valid.

## Analytics

Belum ada analytics pihak ketiga, sesuai permintaan. Bila nanti ingin memakai
Vercel Analytics: `npm i @vercel/analytics`, lalu tambahkan `<Analytics />` di
`src/app/layout.tsx`. Aktifkan juga dari dashboard Vercel.
