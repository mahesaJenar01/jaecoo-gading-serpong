import Link from "next/link";
import { Callout } from "@/components/article/Callout";
import { DataTable } from "@/components/article/DataTable";
import { InlineCta } from "@/components/article/InlineCta";
import { H2, Prose } from "@/components/article/Prose";
import type { ArticleMeta, TocItem } from "@/content/articles/types";

/**
 * Aturan tautan internal: setiap artikel wajib menautkan setidaknya satu
 * kali ke /harga dan satu kali ke halaman model yang relevan.
 */

/** Sumber tunggal heading artikel. Dipakai bersama oleh isi dan daftar isi. */
const SECTIONS = [
  { id: "satu-varian", teks: "JAECOO J5 Premium hanya punya satu varian" },
  { id: "pola-pemakaian", teks: "Cocokkan dengan pola pemakaian harian Anda" },
  { id: "pengisian-daya", teks: "Pastikan dulu tempat mengisi daya" },
  { id: "perbandingan", teks: "Bagaimana dibandingkan J7 SHS dan J8 SHS ARDIS" },
  { id: "langkah-berikutnya", teks: "Langkah berikutnya sebelum memutuskan" },
] as const satisfies readonly TocItem[];

export const meta: ArticleMeta = {
  slug: "panduan-memilih-varian-jaecoo-j5-premium",
  title: "Panduan Memilih Varian JAECOO J5 Premium",
  h1: "Panduan Memilih Varian JAECOO J5 Premium",
  description:
    "Apa saja yang perlu dipastikan sebelum memesan JAECOO J5 Premium, mulai dari pola pemakaian harian, kesiapan pengisian daya, sampai perbandingannya dengan model JAECOO lain.",
  category: "Panduan Pembelian",
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-07",
  readingTime: 6,
  keyTakeaway:
    "JAECOO J5 Premium dijual dalam satu varian dengan harga Rp 324.900.000 OTR. Mobil ini SUV listrik murni berpenggerak roda depan, bertenaga 155 kW atau 210 PS, dengan baterai LFP 60,9 kWh dan jarak tempuh hingga 461 km NEDC. Pengisian cepat DC sampai 130 kW membuat kapasitas 30 sampai 80 persen ditempuh sekitar 28 menit. Karena hanya ada satu varian, keputusan Anda sebenarnya bukan memilih varian, melainkan memastikan pola pemakaian harian, kesiapan tempat mengisi daya, dan pilihan warna. J5 Premium juga satu satunya unit JAECOO yang saat ini tersedia untuk test drive, sehingga Anda bisa mencobanya lebih dulu sebelum memutuskan.",
  faq: [
    {
      q: "Apakah JAECOO J5 Premium punya varian lain?",
      a: "Tidak. J5 Premium tersedia dalam satu varian dengan harga Rp 324.900.000 OTR. Yang bisa dipilih adalah warna: Forest Green, Jet Black, Pristine White, dan Ivory Gray.",
    },
    {
      q: "Berapa jarak tempuh JAECOO J5 Premium?",
      a: "Hingga 461 km berdasarkan pengukuran NEDC, dengan baterai LFP 60,9 kWh. Angka nyata di jalan bergantung pada gaya berkendara, beban, dan pemakaian pendingin kabin.",
    },
    {
      q: "Apakah saya bisa mencobanya lebih dulu?",
      a: "Bisa. J5 Premium adalah satu satunya unit JAECOO yang tersedia untuk test drive saat ini, dan jadwalnya bisa diatur di area layanan Anda.",
    },
  ],
  related: ["biaya-kepemilikan-mobil-listrik-di-tangerang"],
  toc: [...SECTIONS],
};

export default function Content() {
  return (
    <Prose>
      <p>
        Kalau Anda sedang membuka beberapa tab sekaligus dan membandingkan SUV
        listrik di kisaran tiga ratusan juta, biasanya yang bikin lama bukan
        harganya. Yang bikin lama adalah pertanyaan yang belum terjawab: apakah
        jarak tempuhnya cukup untuk rutinitas saya, dan nanti ngecas di mana.
        Saya sering menemani calon pembeli yang sudah hafal angka spesifikasi
        di luar kepala tetapi masih ragu, karena angka saja memang tidak
        menjawab dua pertanyaan itu.
      </p>
      <p>
        Artikel ini saya tulis untuk menutup jarak tersebut. Setelah
        membacanya, Anda akan tahu apa saja yang sebenarnya perlu Anda putuskan
        pada JAECOO J5 Premium, bagaimana mencocokkan kemampuan mobilnya dengan
        rute harian Anda, apa yang perlu disiapkan di rumah sebelum unit
        datang, dan dalam kondisi seperti apa model JAECOO yang lain justru
        lebih masuk akal untuk Anda.
      </p>

      <H2 item={SECTIONS[0]} />
      <p>
        Ini yang paling sering membuat lega begitu saya sampaikan di awal.
        JAECOO J5 Premium hadir dalam satu varian saja, tanpa tingkatan trim di
        bawah atau di atasnya yang perlu Anda timbang. Tidak ada paket fitur
        tambahan yang dijual terpisah, tidak ada pilihan baterai kecil atau
        besar, dan tidak ada versi penggerak empat roda. Satu spesifikasi untuk
        semua pembeli.
      </p>
      <p>
        Artinya pertanyaan yang lebih tepat bukan varian mana yang saya ambil,
        melainkan apakah spesifikasi yang ada sudah cocok dengan kebutuhan
        saya. Harga OTR resmi dan rincian spesifikasinya bisa Anda lihat di{" "}
        <Link href="/harga/jaecoo-j5-premium">halaman JAECOO J5 Premium</Link>,
        dan berikut tiga hal yang paling sering menentukan jawabannya.
      </p>
      <p>
        <strong>Tenaga dan torsi untuk pemakaian harian.</strong> Motor
        listriknya menghasilkan 155 kW atau setara 210 PS dengan torsi 288 Nm,
        dan akselerasi 0 sampai 100 km per jam ditempuh dalam 7,3 detik. Angka
        ini menarik bukan karena kecepatannya, melainkan karena torsi listrik
        keluar penuh sejak awal. Di jalanan yang sering berhenti dan jalan
        lagi, misalnya keluar masuk gerbang tol atau menyalip di jalur dua
        arah, respons mobilnya terasa ringan tanpa perlu diinjak dalam. Buat
        pemakaian harian, ini yang paling sering dikomentari penumpang, bukan
        angka top speed.
      </p>
      <p>
        <strong>Kapasitas bagasi untuk keluarga.</strong> Bagasi standarnya 480
        liter dan bisa melar sampai 1.180 liter ketika kursi baris kedua
        dilipat, ditambah front trunk 35 liter di depan yang biasanya dipakai
        untuk menyimpan kabel pengisian daya supaya tidak berantakan di bagasi
        belakang. Untuk keluarga dengan dua anak, ini cukup untuk koper
        mingguan plus stroller. Pintu bagasinya juga sudah elektrik, yang
        terasa berguna kalau tangan Anda sering penuh saat berbelanja.
      </p>
      <p>
        <strong>Fitur yang paling sering ditanyakan.</strong> Tiga yang hampir
        selalu ditanyakan di showroom adalah panoramic glass roof seluas 1,45
        meter persegi dengan tirai elektrik, layar tengah 13,2 inci, dan paket
        bantuan berkendara yang mencakup 17 fitur ADAS termasuk adaptive cruise
        control serta pengereman darurat otomatis. Yang menurut saya kurang
        terekspos justru fitur V2L 3,3 kW, yaitu kemampuan mobil menyalurkan
        listrik ke perangkat luar. Buat yang suka camping atau sekadar butuh
        sumber listrik saat mati lampu, fitur ini sering baru terasa nilainya
        setelah dipakai.
      </p>

      <H2 item={SECTIONS[1]} />
      <p>
        Ini bagian yang paling menentukan, dan paling mudah dihitung sendiri.
        Ambil contoh rute yang sangat umum di sini, yaitu Gading Serpong ke
        kawasan perkantoran Jakarta seperti Sudirman atau SCBD. Sekali jalan
        berkisar 30 sampai 35 km, jadi pulang pergi sekitar 65 sampai 70 km
        sehari. Lima hari kerja berarti sekitar 350 km, belum termasuk
        pemakaian akhir pekan.
      </p>
      <p>
        Angka 461 km itu standar NEDC, yang memang cenderung optimistis
        dibanding pemakaian nyata. Patokan yang lebih aman untuk perencanaan
        adalah sekitar 350 sampai 400 km dalam kondisi campuran tol dan dalam
        kota dengan AC menyala terus. Dengan patokan itu, pola mingguan Anda
        tetap masuk dengan sekali pengisian penuh, atau lebih nyaman lagi kalau
        diisi dua sampai tiga malam sekali di rumah tanpa pernah menyentuh
        angka rendah.
      </p>
      <p>
        Rute yang perlu dihitung lebih teliti adalah perjalanan luar kota.
        Serpong ke Bandung, misalnya, masih aman pulang pergi dengan satu kali
        pengisian di tengah. Yang saya sarankan direncanakan lebih serius
        adalah rute panjang seperti mudik lintas provinsi, karena di situ yang
        menentukan bukan lagi kapasitas baterai, melainkan antrean di stasiun
        pengisian saat musim liburan.
      </p>

      <Callout judul="Yang sering terlewat">
        <p>
          Banyak pemilik baru masih berpikir seperti pemilik mobil bensin, yaitu
          mengisi daya kalau sudah hampir habis. Padahal kebiasaan yang paling
          nyaman justru kebalikannya. Colok setiap malam seperti mengisi daya
          ponsel, lalu berangkat pagi selalu dalam kondisi hampir penuh. Begitu
          kebiasaan ini terbentuk, pertanyaan tentang jarak tempuh biasanya
          hilang dengan sendirinya dalam dua minggu pertama. Untuk pemakaian
          harian, mengisi sampai sekitar 80 sampai 90 persen sudah lebih dari
          cukup, dan isi penuh cukup dilakukan menjelang perjalanan jauh.
        </p>
      </Callout>

      <H2 item={SECTIONS[2]} />
      <p>
        Inilah satu satunya pekerjaan rumah yang benar benar perlu Anda
        selesaikan sebelum tanda tangan. Saya selalu membahas ini lebih dulu
        bersama calon pembeli, karena jauh lebih enak diselesaikan sebelum unit
        datang daripada sesudahnya.
      </p>
      <p>
        Untuk pengisian di rumah, ada tiga hal yang perlu dipastikan. Pertama,
        daya listrik terpasang di rumah Anda, karena ini menentukan kecepatan
        pengisian yang realistis dan apakah perlu tambah daya. Kedua, posisi
        parkir terhadap titik listrik, karena kabel yang harus melintasi
        carport setiap malam cepat terasa merepotkan. Ketiga, jenis perangkat
        yang akan dipakai, apakah kabel portabel bawaan atau wall charger
        terpasang permanen. Kalau Anda tinggal di apartemen atau kluster dengan
        pengelola, konfirmasi izin pemasangan dan titik parkir tetap sebaiknya
        dilakukan di awal, karena proses ini yang biasanya paling lama.
      </p>
      <p>
        Untuk pengisian di tempat umum, kabar baiknya jaringan di koridor
        Serpong, BSD, dan Jakarta sudah jauh lebih rapat dibanding dua tahun
        lalu, baik di pusat perbelanjaan maupun rest area tol. Yang perlu Anda
        cek bukan sekadar ada atau tidaknya, melainkan jenis konektornya, daya
        maksimal yang tersedia, dan aplikasi mana yang dipakai untuk
        pembayaran. Untuk J5 Premium, pengisian cepat DC sampai 130 kW membuat
        30 sampai 80 persen ditempuh sekitar 28 menit, kira kira selama Anda
        makan siang.
      </p>
      <p>
        Kalau Anda ingin, kirim saja lokasi rumah dan pola rute harian Anda
        lewat WhatsApp, nanti saya bantu hitung kebutuhan pengisian dayanya
        sebelum Anda memutuskan apa pun.
      </p>

      <InlineCta
        teks="Belum yakin pola pemakaian Anda cocok dengan J5 Premium?"
        aksi="Tanya lewat WhatsApp"
        context={
          'Halo Mahesa, saya baru baca artikel "Panduan Memilih Varian JAECOO J5 Premium" di website. Saya mau tanya kecocokan pemakaian harian saya dengan JAECOO J5 Premium.'
        }
        ariaLabel="Chat WhatsApp Mahesa Jenar tentang kecocokan pemakaian JAECOO J5 Premium"
      />

      <H2 item={SECTIONS[3]} />
      <p>
        Saya lebih suka menyampaikan ini apa adanya, termasuk ketika model lain
        memang lebih cocok untuk Anda.
      </p>
      <p>
        J5 Premium paling masuk akal kalau pemakaian Anda dominan harian dengan
        jarak yang terukur, dan Anda punya atau bisa menyiapkan tempat mengisi
        daya sendiri. Di titik itu, biaya per kilometer dan kenyamanan
        berkendaranya sulit ditandingi dua model lain.
      </p>
      <p>
        J7 SHS lebih masuk akal kalau perjalanan luar kota Anda sering dan
        tidak terjadwal, atau kalau rumah Anda belum memungkinkan pemasangan
        pengisian daya. Sebagai plug in hybrid, jarak tempuh gabungannya lebih
        dari 1.300 km, sehingga Anda bisa menikmati mode listrik untuk harian
        tanpa perlu memikirkan pengisian daya saat bepergian jauh.
      </p>
      <p>
        J8 SHS ARDIS masuk akal kalau kebutuhan utama Anda adalah ruang, bukan
        efisiensi. Kapasitasnya 6 sampai 7 penumpang, jadi kalau rutinitas Anda
        sering membawa tiga generasi dalam satu mobil, dua model di bawahnya
        akan terasa kurang. Daftar harga seluruh model ada di{" "}
        <Link href="/harga">halaman Harga dan Model</Link>.
      </p>

      <DataTable
        caption="Perbandingan singkat tiga model JAECOO"
        kolom={["Model", "Jenis", "Harga OTR", "Catatan"]}
        baris={[
          [
            "JAECOO J5 Premium",
            "Listrik murni",
            "Rp 324.900.000",
            "Satu satunya unit yang tersedia untuk test drive",
          ],
          [
            "JAECOO J7 SHS",
            "Plug-in hybrid",
            "Rp 514.900.000",
            "Jarak tempuh gabungan lebih dari 1.300 km",
          ],
          [
            "JAECOO J8 SHS ARDIS",
            "Plug-in hybrid",
            "Rp 838.000.000",
            "Kapasitas 6 sampai 7 penumpang",
          ],
        ]}
        catatan="Harga OTR per 7 September 2026. Rincian komponen harga dikirim per varian lewat WhatsApp."
      />

      <H2 item={SECTIONS[4]} />
      <p>
        Kalau sampai di sini J5 Premium terdengar masuk akal untuk Anda, urutan
        yang saya sarankan sederhana dan tidak perlu terburu buru.
      </p>
      <p>
        Mulai dari mencoba unitnya lebih dulu lewat{" "}
        <Link href="/test-drive">pengajuan test drive</Link>. J5 Premium adalah
        satu satunya unit JAECOO yang tersedia untuk dicoba saat ini, dan satu
        putaran singkat biasanya menjawab lebih banyak pertanyaan dibanding
        membaca sepuluh artikel. Bawa juga keluarga Anda kalau memungkinkan,
        karena penilaian mereka terhadap ruang belakang sering berbeda dengan
        penilaian Anda di kursi pengemudi.
      </p>
      <p>
        Setelah itu, minta rincian OTR lengkap beserta{" "}
        <Link href="/kredit">simulasi kreditnya</Link> supaya Anda bisa melihat
        angka sebenarnya, bukan perkiraan. Sambil menunggu, selesaikan
        pengecekan listrik di rumah yang saya bahas di atas. Kalau ketiganya
        sudah beres dan Anda masih merasa cocok, barulah keputusan itu layak
        diambil.
      </p>
      <p>
        Saya tidak akan mengejar Anda dengan telepon setiap hari. Kirim pesan
        kapan pun Anda siap, termasuk kalau ujungnya Anda memutuskan model lain
        atau menunda dulu.
      </p>
    </Prose>
  );
}
