import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { KreditSimulator } from "@/components/kredit/KreditSimulator";
import { FaqSection } from "@/components/ui/FaqSection";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { semuaVarian } from "@/data/models";
import type { Faq } from "@/data/types";
import { DP_OPSI } from "@/lib/kredit";
import { pageMetadata } from "@/lib/seo";
import { waContext } from "@/lib/wa";

/**
 * Halaman kredit, versi sederhana.
 *
 * Kerangkanya sengaja dibuat berupa blok blok terpisah supaya bisa
 * diperluas tanpa merombak tata letak. Rencana penambahan berikutnya
 * ditandai dengan komentar TODO VERSI BERIKUTNYA di bawah.
 */

export const metadata: Metadata = pageMetadata({
  title: "Kredit JAECOO, Alur Pengajuan dan Dokumen yang Disiapkan",
  description:
    "Alur pengajuan kredit JAECOO dari konsultasi sampai konfirmasi persetujuan leasing, beserta dokumen yang perlu Anda siapkan. Didampingi sales consultant JAECOO Gading Serpong.",
  path: "/kredit",
});

const langkah = [
  {
    judul: "Konsultasi kebutuhan",
    isi: "Kita tentukan unit, uang muka, dan tenor yang paling masuk akal untuk kondisi Anda.",
  },
  {
    judul: "Penyiapan berkas",
    isi: "Mahesa sampaikan daftar dokumen yang diperlukan dan bantu memeriksa kelengkapannya.",
  },
  {
    judul: "Pengajuan ke leasing",
    isi: "Berkas diajukan Mahesa ke pihak leasing, dan prosesnya dipantau sampai ada keputusan.",
  },
  {
    judul: "Konfirmasi persetujuan",
    isi: "Begitu ada hasil, Mahesa kabari Anda beserta rincian skema yang disetujui.",
  },
];

/**
 * Dokumen yang umum diminta leasing kendaraan. Daftar ini sengaja hanya
 * memuat yang lazim, bukan ketentuan satu leasing tertentu, dan selalu
 * ditemani catatan di bawahnya bahwa kebijakan tiap leasing berbeda.
 */
const dokumen = [
  {
    judul: "Karyawan",
    items: [
      "KTP pemohon, beserta KTP pasangan bila sudah menikah",
      "Kartu Keluarga",
      "Buku nikah atau akta cerai, bila berlaku",
      "NPWP",
      "Slip gaji tiga bulan terakhir atau surat keterangan kerja",
      "Rekening koran atau mutasi tabungan tiga bulan terakhir",
      "Bukti tempat tinggal, misalnya PBB, rekening listrik, atau bukti sewa",
    ],
  },
  {
    judul: "Wiraswasta",
    items: [
      "KTP pemohon, beserta KTP pasangan bila sudah menikah",
      "Kartu Keluarga",
      "Buku nikah atau akta cerai, bila berlaku",
      "NPWP",
      "Legalitas usaha, misalnya NIB, SIUP, atau surat keterangan usaha",
      "Rekening koran atau mutasi tabungan tiga sampai enam bulan terakhir",
      "Bukti tempat tinggal, misalnya PBB, rekening listrik, atau bukti sewa",
    ],
  },
];

const faqKredit: Faq[] = [
  {
    q: "Berapa uang muka minimum yang bisa diambil?",
    a: `Batas minimumnya berbeda antar leasing dan bisa berubah mengikuti kebijakan yang berlaku saat pengajuan. Simulasi di halaman ini memakai uang muka ${DP_OPSI[0]} sampai ${DP_OPSI[DP_OPSI.length - 1]} persen karena itu rentang yang paling sering dipakai. Sebutkan rencana uang muka Anda, nanti Mahesa cek ke leasing rekanan mana yang bisa menerimanya.`,
  },
  {
    q: "Apa bedanya ADDB dan ADDM?",
    a: "Pada ADDB atau angsuran dibayar belakang, pembayaran pertama berisi uang muka, biaya administrasi, dan premi TJH, lalu angsuran pertama dibayar sebulan kemudian. Premi asuransi kendaraan ikut dicicil di dalam angsuran. Pada ADDM atau angsuran dibayar di muka, pembayaran pertama sudah memuat seluruh biaya termasuk premi asuransi kendaraan dan angsuran bulan pertama, sehingga TDP lebih besar tetapi angsuran bulanannya lebih ringan. Karena angsuran bulan pertama sudah ikut dibayar di TDP, bulan yang masih Anda tanggung setelah akad juga berkurang satu. Pada tenor 5 tahun misalnya, sisanya 59 kali angsuran, bukan 60.",
  },
  {
    q: "Apa bedanya asuransi kombinasi dan all risk full tenor?",
    a: "Asuransi kombinasi memberi perlindungan all risk di tahun pertama, lalu TLO atau total loss only di tahun berikutnya sampai tenor selesai. All risk full tenor memberi perlindungan all risk selama seluruh tenor. All risk menanggung kerusakan kecil sampai besar, sedangkan TLO hanya menanggung kerusakan berat dan kehilangan, sehingga preminya jauh lebih rendah.",
  },
  {
    q: "Berapa lama proses persetujuannya?",
    a: "Lamanya bergantung pada kelengkapan berkas dan antrean verifikasi di pihak leasing, jadi tidak ada angka yang berlaku untuk semua pengajuan. Yang bisa Mahesa pastikan, perkembangannya dikabari begitu ada kabar dari leasing tanpa perlu Anda tanyakan lebih dulu.",
  },
  {
    q: "Apakah pengajuan bisa ditolak?",
    a: "Bisa, dan keputusannya sepenuhnya ada di pihak leasing, bukan di Mahesa. Yang biasanya berpengaruh adalah riwayat kredit, kesesuaian penghasilan dengan besar angsuran, serta kelengkapan dan kecocokan data pada berkas. Karena itu berkas diperiksa dulu bersama sebelum diajukan.",
  },
  {
    q: "Apakah bisa mengajukan atas nama perusahaan?",
    a: "Bisa, dengan dokumen yang berbeda dari pengajuan perorangan, umumnya mencakup legalitas badan usaha dan laporan keuangan. Ketentuan persisnya berbeda antar leasing, jadi sebutkan dulu rencananya supaya Mahesa konfirmasikan daftar dokumen yang tepat.",
  },
];

export default function KreditPage() {
  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Kredit", path: "/kredit" }]} />

        <h1 className="t-h1 mt-4">Pengajuan Kredit JAECOO</h1>
        <p className="t-body measure mt-4 text-muted">
          Pengajuan kredit dibantu Mahesa dari awal sampai keluar persetujuan.
          Anda tidak perlu mengurus sendiri berkas dan komunikasi dengan pihak
          leasing. Yang perlu Anda lakukan adalah menyiapkan dokumen, sisanya
          Mahesa yang jalankan dan kabari perkembangannya.
        </p>
      </Section>

      <Section labelledBy="alur-pengajuan">
        <SectionHeading id="alur-pengajuan" title="Alur pengajuan" />
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {langkah.map((l, i) => (
            <li key={l.judul}>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-soft font-semibold text-brand tabular-nums"
              >
                {i + 1}
              </span>
              <h3 className="t-h3 mt-3">{l.judul}</h3>
              <p className="t-body mt-1 text-muted">{l.isi}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" labelledBy="dokumen">
        <SectionHeading
          id="dokumen"
          title="Dokumen yang perlu disiapkan"
          description="Daftar di bawah adalah dokumen yang umum diminta untuk kredit kendaraan. Anggap sebagai persiapan awal, bukan daftar final."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {dokumen.map((d) => (
            <Card key={d.judul} className="p-5">
              <h3 className="t-h3">{d.judul}</h3>
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
                {d.items.map((it) => (
                  <li key={it} className="t-small text-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-card border border-line bg-bg p-5">
          <p className="t-small text-muted">
            <span className="font-semibold text-ink">
              Setiap leasing punya kebijakan sendiri.
            </span>{" "}
            Karena itu daftar di atas bisa berbeda di lapangan: ada leasing yang
            meminta dokumen tambahan, ada juga yang tidak memerlukan sebagian
            dokumen di atas. Sebutkan dulu rencana pengajuan Anda, nanti Mahesa
            konfirmasikan daftar yang benar benar diminta oleh leasing yang
            dipakai, supaya Anda tidak menyiapkan berkas yang tidak terpakai.
          </p>
        </div>
      </Section>

      <Section labelledBy="simulasi-kredit">
        <SectionHeading
          id="simulasi-kredit"
          title="Simulasi kredit"
          description="Pilih unit, uang muka, tenor, jenis asuransi, dan skema pembayaran untuk melihat gambaran TDP dan angsuran sebelum pengajuan."
        />
        <div className="mt-8">
          <KreditSimulator
            units={semuaVarian().map((v) => ({
              label:
                v.modelNama.endsWith(v.nama) ? v.modelNama : `${v.modelNama} ${v.nama}`,
              hargaOtr: v.hargaOtr,
            }))}
            sumber="Kredit"
            perbandinganTenor={false}
          />
        </div>

        {/*
          TODO VERSI BERIKUTNYA
          Daftar leasing rekanan. Tambahkan berkas data src/data/leasing.json
          lalu render sebagai grid kartu di Section baru setelah simulasi.
        */}
      </Section>

      <Container className="pb-12 md:pb-20">
        <Card tone="soft" className="p-6 md:p-8">
          <h2 className="t-h2">Mau tahu skema yang paling pas?</h2>
          <p className="t-body measure mt-3 text-muted">
            Sebutkan unit yang Anda incar, rencana uang muka, dan tenor yang
            Anda inginkan. Mahesa bantu petakan pilihannya sebelum berkas
            diajukan.
          </p>
          <div className="mt-6">
            <WaButton
              context={waContext.kredit}
              ariaLabel="Chat WhatsApp Mahesa untuk konsultasi kredit"
              size="lg"
            >
              Konsultasi kredit lewat WhatsApp
            </WaButton>
          </div>
        </Card>
      </Container>

      <FaqSection
        items={faqKredit}
        title="Pertanyaan seputar kredit"
        id="faq-kredit"
        tone="surface"
      />
    </>
  );
}
