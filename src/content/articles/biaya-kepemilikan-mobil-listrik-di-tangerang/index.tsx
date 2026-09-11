import Link from "next/link";
import { Callout } from "@/components/article/Callout";
import { DataTable } from "@/components/article/DataTable";
import { InlineCta } from "@/components/article/InlineCta";
import { H2, H3, Prose } from "@/components/article/Prose";
import type { ArticleMeta, TocItem } from "@/content/articles/types";

/**
 * Semua angka biaya di tabel artikel ini sengaja dikosongkan: jangan
 * mengisinya dengan perkiraan.
 */

const SECTIONS = [
  { id: "komponen-biaya", teks: "Komponen biaya kepemilikan yang perlu dihitung" },
  { id: "biaya-energi", teks: "Biaya energi: mengisi daya di rumah dan di luar" },
  { id: "pajak-asuransi", teks: "Pajak tahunan dan asuransi" },
  { id: "servis-berkala", teks: "Servis berkala dan komponen habis pakai" },
  { id: "menyusun-anggaran", teks: "Menyusun anggaran tahunan Anda sendiri" },
] as const satisfies readonly TocItem[];

export const meta: ArticleMeta = {
  slug: "biaya-kepemilikan-mobil-listrik-di-tangerang",
  title: "Biaya Kepemilikan Mobil Listrik di Tangerang",
  h1: "Biaya Kepemilikan Mobil Listrik di Tangerang",
  description:
    "Komponen biaya yang perlu dihitung sebelum membeli mobil listrik di Tangerang, mulai dari biaya energi, pajak tahunan, asuransi, sampai servis berkala.",
  category: "Kepemilikan",
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-07",
  readingTime: 7,
  keyTakeaway:
    "Biaya kepemilikan mobil listrik terdiri dari beberapa komponen yang perlu dihitung terpisah: biaya energi untuk mengisi daya, pajak kendaraan tahunan, asuransi, servis berkala, dan komponen habis pakai seperti ban serta kampas rem. Pada JAECOO J5 Premium, baterai LFP 60,9 kWh dengan jarak tempuh hingga 461 km NEDC menjadi dasar menghitung biaya energi per kilometer. Angka pastinya bergantung pada tarif listrik di rumah Anda, jarak tempuh harian, dan pilihan asuransi, sehingga tidak bisa disamakan antar pemilik. Perhitungan yang disesuaikan dengan pemakaian Anda bisa disiapkan Mahesa lebih dulu sebelum Anda memutuskan.",
  faq: [
    {
      q: "Apakah mobil listrik pasti lebih murah dirawat?",
      a: "Daftar pekerjaan servisnya memang lebih pendek, karena tidak ada penggantian oli mesin, busi, atau filter bahan bakar. Namun pemeriksaan berkala tetap ada, mulai dari oli gearbox reduksi, minyak rem, cairan pendingin baterai, sampai filter kabin. Ban juga cenderung lebih cepat aus karena bobot kendaraan listrik lebih berat, sementara kampas rem umumnya lebih awet berkat pengereman regeneratif.",
    },
    {
      q: "Berapa pajak tahunan JAECOO J5 Premium?",
      a: "Angkanya bergantung pada nilai jual kendaraan bermotor dan ketentuan Provinsi Banten yang berlaku saat unit didaftarkan. Sepanjang 2026 tarif nol persen untuk kendaraan listrik di Banten diakhiri, jadi hitungan di artikel lama bisa sudah tidak berlaku. Mahesa mengonfirmasi angkanya per unit dan mengirimkannya secara tertulis.",
    },
    {
      q: "Berapa biaya servis berkalanya?",
      a: "Benefit bebas biaya jasa servis 4 tahun atau 60.000 km berlaku untuk J7 dan J8, dan tidak mencakup J5 EV Premium. Biaya jasa servis berkala J5 Premium dikonfirmasi Mahesa ke bengkel resmi lalu dikirimkan, bukan dikira kira.",
    },
    {
      q: "Apakah asuransinya lebih mahal dari mobil bensin?",
      a: "Premi ditentukan jenis pertanggungan, nilai kendaraan, dan wilayah. Untuk mobil listrik, yang perlu ditanyakan sebelum tanda tangan polis adalah apakah baterai ikut ditanggung, apakah ada bengkel rekanan yang sanggup menangani kendaraan listrik di wilayah Anda, dan bagaimana ketentuan perluasan seperti banjir.",
    },
  ],
  related: ["panduan-memilih-varian-jaecoo-j5-premium"],
  toc: [...SECTIONS],
};

export default function Content() {
  return (
    <Prose>
      <p>
        Setelah harga on the road, pertanyaan kedua yang hampir selalu muncul
        adalah berapa biaya bulanannya. Wajar, karena harga mobil dibayar
        sekali sedangkan biaya kepemilikan menemani Anda bertahun tahun.
        Masalahnya, pertanyaan ini sering dijawab dengan satu angka bulat yang
        terdengar meyakinkan padahal tidak berlaku untuk siapa pun secara
        persis.
      </p>
      <p>
        Saya memilih pendekatan lain di artikel ini. Biaya kepemilikan akan
        saya pecah menjadi komponen yang bisa Anda hitung satu per satu,
        lengkap dengan cara menghitungnya dan hal yang perlu Anda konfirmasi
        sendiri sebelum menulis angka di anggaran Anda. Di akhir artikel, Anda
        akan punya kerangka yang bisa diisi dengan data Anda sendiri, bukan
        rata rata milik orang lain. Fokus pembahasannya adalah pemilik yang
        tinggal di Tangerang dan sekitarnya, karena beberapa komponen biaya di
        sini berbeda dengan di Jakarta.
      </p>

      <H2 item={SECTIONS[0]} />
      <p>
        Ada lima komponen yang perlu berdiri sendiri dalam catatan Anda.
        Menggabungkannya jadi satu angka justru membuat Anda sulit tahu bagian
        mana yang bisa ditekan.
      </p>
      <ul>
        <li>
          <strong>Biaya energi untuk mengisi daya.</strong> Pengganti biaya
          bensin. Besarnya ditentukan jarak tempuh Anda dan di mana Anda paling
          sering mengisi daya.
        </li>
        <li>
          <strong>Pajak kendaraan tahunan.</strong> Ditentukan wilayah
          pendaftaran kendaraan dan aturan provinsi yang berlaku saat itu.
        </li>
        <li>
          <strong>Asuransi.</strong> Ditentukan jenis pertanggungan yang Anda
          pilih, nilai kendaraan, dan wilayah.
        </li>
        <li>
          <strong>Servis berkala.</strong> Mengacu jadwal resmi pabrikan, bukan
          perkiraan.
        </li>
        <li>
          <strong>Komponen habis pakai seperti ban dan kampas rem.</strong>{" "}
          Ditentukan gaya berkendara dan kondisi jalan yang Anda lalui.
        </li>
      </ul>
      <p>
        Kelimanya berbeda antar pemilik karena variabelnya memang berbeda. Dua
        orang yang membeli unit yang sama persis di hari yang sama bisa punya
        biaya tahunan yang berjarak belasan juta, hanya karena yang satu
        menempuh 15.000 km setahun dengan pengisian daya di rumah sementara
        yang lain menempuh 40.000 km dengan pengisian daya di tempat umum,
        memilih pertanggungan yang lebih luas, dan lebih sering mengganti ban.
        Inilah alasan saya tidak pernah menyodorkan satu angka biaya bulanan ke
        semua orang.
      </p>

      <H2 item={SECTIONS[1]} />
      <p>
        Ini komponen yang paling mudah dihitung sendiri, dan hasilnya biasanya
        yang paling menyenangkan buat pemilik baru.
      </p>
      <p>
        Rumusnya sederhana. Mulai dari kapasitas baterai, lalu bagi dengan
        jarak yang realistis ditempuh dalam satu kali pengisian penuh.
        Hasilnya adalah konsumsi energi per kilometer. JAECOO J5 Premium
        memakai baterai LFP 60,9 kWh dengan jarak tempuh hingga 461 km NEDC,
        dan spesifikasi lengkapnya bisa Anda lihat di{" "}
        <Link href="/harga/jaecoo-j5-premium">halaman modelnya</Link>. Karena
        NEDC cenderung optimistis, untuk perencanaan saya biasa memakai patokan
        yang lebih konservatif, yaitu sekitar 350 sampai 400 km dalam kondisi
        campuran tol dan dalam kota dengan AC menyala. Dengan patokan itu,
        konsumsinya berada di kisaran 0,15 sampai 0,17 kWh per kilometer.
      </p>
      <p>
        Angka itulah yang Anda kalikan dengan tarif listrik yang benar benar
        berlaku di rumah Anda, lalu dikalikan jarak tempuh bulanan Anda. Saya
        sengaja tidak mencantumkan tarif di sini, karena tarif listrik
        bergantung pada golongan daya rumah Anda dan bisa berubah, sementara
        artikel ini akan dibaca berbulan bulan ke depan. Silakan lihat tarif
        per kWh di struk atau aplikasi PLN Anda sendiri, dan tambahkan sekitar
        10 persen sebagai susut pengisian, karena tidak semua listrik yang
        masuk tersimpan sempurna di baterai.
      </p>

      <H3>Mengisi daya di rumah</H3>
      <p>
        Ini cara yang paling murah dan paling nyaman, dan sebaiknya jadi
        kebiasaan utama Anda. Untuk pembelian J5 Premium, Anda sudah mendapat
        satu unit portable charger sebagai bagian dari benefit pembelian,
        sehingga Anda tidak perlu langsung mengeluarkan biaya perangkat di hari
        pertama.
      </p>
      <p>
        Yang perlu Anda konfirmasi sebelum unit datang ada tiga. Pertama,
        golongan daya listrik rumah Anda, karena ini menentukan kecepatan
        pengisian yang realistis dan apakah perlu tambah daya. Kedua, biaya
        tambah daya bila memang diperlukan, yang sifatnya sekali bayar dan
        sebaiknya dicatat terpisah dari biaya bulanan. Ketiga, apakah Anda
        memenuhi syarat program keringanan tarif untuk pengisian daya kendaraan
        listrik di rumah pada jam malam. Program semacam ini pernah dan bisa
        saja masih berjalan, tetapi syarat serta besarannya berubah dari waktu
        ke waktu, jadi tolong konfirmasi langsung ke PLN dan jangan
        mengandalkan artikel mana pun, termasuk artikel ini.
      </p>

      <H3>Mengisi daya di tempat umum</H3>
      <p>
        Biaya per kWh di stasiun pengisian umum lebih tinggi dibanding di
        rumah, dan pengisian cepat DC biasanya lebih mahal dibanding pengisian
        AC. Ini wajar, karena Anda membayar kecepatan dan ketersediaan.
      </p>
      <p>
        Yang penting untuk anggaran Anda bukan tarifnya, melainkan porsinya.
        Pemilik yang 90 persen mengisi daya di rumah dan hanya sesekali memakai
        stasiun umum saat perjalanan jauh akan punya biaya energi yang sangat
        berbeda dengan pemilik apartemen yang belum bisa memasang pengisian
        daya sendiri dan bergantung penuh pada stasiun umum. Sebelum
        menghitung, perkirakan dulu porsi ini dengan jujur, misalnya 80 persen
        di rumah dan 20 persen di luar, lalu hitung masing masing dengan
        tarifnya sendiri. Di koridor Serpong, BSD, dan jalur tol menuju
        Jakarta, ketersediaan stasiun pengisian sudah jauh lebih rapat
        dibanding dua tahun lalu, tetapi yang perlu Anda cek tetap jenis
        konektor, daya maksimal, dan aplikasi pembayarannya.
      </p>

      <InlineCta
        teks="Ingin perhitungan yang disesuaikan dengan pemakaian Anda?"
        aksi="Minta hitungan lewat WhatsApp"
        context={
          'Halo Mahesa, saya baru baca artikel "Biaya Kepemilikan Mobil Listrik di Tangerang" di website. Saya mau minta perhitungan biaya kepemilikan sesuai pemakaian saya.'
        }
        ariaLabel="Chat WhatsApp Mahesa Jenar untuk meminta perhitungan biaya kepemilikan"
      />

      <H2 item={SECTIONS[2]} />
      <p>
        Dua komponen ini yang paling sering salah dihitung, dan khusus untuk
        Anda yang berdomisili di Tangerang, ada perubahan yang perlu diketahui.
      </p>
      <p>
        Untuk pajak kendaraan, kendaraan listrik di Provinsi Banten sebelumnya
        menikmati tarif nol persen. Sepanjang 2026 Pemerintah Provinsi Banten
        mengumumkan pengakhiran kebijakan tersebut, dengan pengenaan yang
        dilaporkan sebesar 25 persen dari tarif kendaraan konvensional dan
        mulai diberlakukan pada Mei 2026. Artinya, kalkulasi pajak yang Anda
        temukan di artikel lama atau di forum bisa jadi sudah tidak berlaku,
        dan perhitungan untuk kendaraan yang terdaftar di Tangerang tidak sama
        dengan yang terdaftar di Jakarta. Karena besaran akhirnya bergantung
        pada nilai jual kendaraan bermotor, tarif provinsi, serta ketentuan
        pelaksanaan yang berlaku saat Anda mendaftarkan unit, saya tidak akan
        menuliskan angka rupiah di sini. Angka itu saya konfirmasi per unit dan
        saya kirimkan tertulis kepada calon pembeli.
      </p>
      <p>
        Untuk asuransi, yang perlu Anda putuskan lebih dulu adalah jenis
        pertanggungannya, bukan preminya. Comprehensive atau all risk
        menanggung kerusakan kecil sampai besar, sedangkan total loss only
        hanya menanggung kerusakan berat dan kehilangan. Premi keduanya berbeda
        jauh. Selain itu, khusus kendaraan listrik ada tiga hal yang layak Anda
        tanyakan sebelum tanda tangan polis: apakah baterai ikut ditanggung dan
        dengan syarat apa, apakah perusahaan asuransi punya bengkel rekanan
        yang sanggup menangani kendaraan listrik di wilayah Anda, dan bagaimana
        ketentuan perluasan seperti banjir yang relevan untuk beberapa titik di
        Tangerang. Untuk unit yang dibeli dengan kredit, jenis pertanggungan
        biasanya sudah ditentukan oleh pihak pembiayaan, sehingga angkanya
        muncul dalam <Link href="/kredit">simulasi kredit</Link> Anda.
      </p>

      <DataTable
        caption="Perkiraan biaya kepemilikan tahunan"
        kolom={["Komponen", "JAECOO J5 Premium", "Catatan"]}
        baris={[
          [
            "Pajak kendaraan tahunan",
            "TODO",
            "TODO: sumber dan tahun perhitungan, mengacu ketentuan Banten yang berlaku",
          ],
          ["Asuransi", "TODO", "TODO: jenis pertanggungan yang diasumsikan"],
          ["Servis berkala", "TODO", "TODO: mengacu jadwal servis resmi"],
          ["Ban dan kampas rem", "TODO", "TODO: perkiraan umur pakai"],
        ]}
        catatan="Seluruh angka masih TODO dan tidak boleh diisi dengan perkiraan."
      />

      <Callout judul="Kenapa angkanya tidak dikarang">
        <p>
          Angka biaya yang salah lebih merugikan daripada tidak ada angka sama
          sekali, karena calon pembeli menyusun anggaran berdasarkan itu.
          Mahesa lebih memilih mengirim rincian yang sudah dipastikan lewat
          WhatsApp.
        </p>
      </Callout>

      <H2 item={SECTIONS[3]} />
      <p>
        Anggapan bahwa mobil listrik tidak perlu servis itu keliru, walaupun
        daftar pekerjaannya memang lebih pendek. Tidak ada penggantian oli
        mesin, busi, atau filter bahan bakar. Yang tetap ada adalah pemeriksaan
        dan penggantian berkala pada oli gearbox reduksi, minyak rem, cairan
        pendingin baterai, filter kabin, serta pengecekan perangkat lunak, kaki
        kaki, dan sistem kelistrikan.
      </p>
      <p>
        Dua hal yang perlu Anda catat soal garansi dan benefit purnajual
        JAECOO. Garansi kendaraan berlaku 6 tahun atau 150.000 km, dan khusus
        baterai pada model EV berlaku 8 tahun atau 160.000 km. Yang penting
        saya sampaikan apa adanya: benefit bebas biaya jasa servis selama 4
        tahun atau 60.000 km berlaku untuk J7 dan J8, dan tidak mencakup J5 EV
        Premium. Jadi untuk J5 Premium, biaya jasa servis berkala tetap perlu
        Anda anggarkan, dan angkanya saya konfirmasi ke bengkel resmi lalu saya
        kirimkan, bukan saya kira kira.
      </p>
      <p>
        Untuk komponen habis pakai, ada dua kecenderungan yang berlawanan dan
        keduanya perlu Anda tahu. Kampas rem pada mobil listrik umumnya lebih
        awet, karena perlambatan regeneratif mengambil sebagian besar pekerjaan
        pengereman harian sehingga kampas jarang bekerja keras. Sebaliknya, ban
        cenderung lebih cepat aus dibanding mobil bensin sekelasnya, karena
        bobot kendaraan listrik lebih berat dan torsinya keluar penuh sejak
        awal. Tekanan angin yang kurang dan gaya berkendara yang sering menarik
        cepat dari lampu merah akan mempercepatnya lagi. Umur pakai ban paling
        jujur diperkirakan dari jarak tempuh tahunan Anda sendiri, dan itu
        sebabnya kolom tersebut sengaja dibiarkan kosong di tabel di atas.
      </p>

      <H2 item={SECTIONS[4]} />
      <p>
        Kalau Anda ingin angka yang benar benar berlaku untuk Anda, urutannya
        seperti ini dan bisa dikerjakan dalam waktu singkat.
      </p>
      <p>
        Mulai dari mencatat jarak tempuh tahunan Anda. Lihat saja odometer
        mobil Anda sekarang dan bandingkan dengan tahun lalu, atau hitung dari
        rute harian dikalikan hari kerja. Ini variabel paling menentukan dari
        semua komponen di atas. Lanjutkan dengan menghitung biaya energi
        memakai rumus tadi, dan pisahkan porsi pengisian di rumah dengan di
        tempat umum. Setelah itu, kumpulkan tiga angka yang tidak boleh
        diperkirakan, yaitu pajak tahunan sesuai ketentuan Banten yang berlaku
        saat Anda mendaftarkan unit, premi asuransi sesuai jenis pertanggungan
        yang Anda pilih, dan biaya servis berkala sesuai jadwal resmi.
        Terakhir, sisihkan anggaran ban sebagai pos tahunan kecil, bukan
        kejutan di tahun ketiga.
      </p>
      <p>
        Kalau Anda kirimkan jarak tempuh harian dan lokasi rumah Anda lewat
        WhatsApp, saya bisa bantu susun kerangka ini dengan angka yang sudah
        saya konfirmasi, termasuk simulasi kreditnya bila diperlukan. Tidak ada
        kewajiban apa pun setelahnya, dan kalau ujungnya Anda memutuskan model
        lain atau menunda pembelian, itu sepenuhnya keputusan Anda.
      </p>
      <p>
        Kalau Anda masih membandingkan pilihan, daftar harga seluruh model
        JAECOO ada di <Link href="/harga">halaman Harga dan Model</Link>.
      </p>
    </Prose>
  );
}
