import type { Metadata } from "next";
import { FeaturedModelBlock } from "@/components/harga/FeaturedModelBlock";
import { ModelCard } from "@/components/harga/ModelCard";
import { ModelComparisonTable } from "@/components/harga/ModelComparisonTable";
import { PriceList } from "@/components/harga/PriceList";
import { VariantGuide } from "@/components/harga/VariantGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { WaButton } from "@/components/wa/WaButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modelsUrut, modelUnggulan } from "@/data/models";
import { site } from "@/data/site";
import type { Faq } from "@/data/types";
import { tanggalPanjang } from "@/lib/format";
import { itemListSchema } from "@/lib/jsonld";
import { RINGKASAN_BUNGA } from "@/lib/kredit";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Harga JAECOO 2026, OTR Tangerang",
  description:
    "Daftar harga on the road JAECOO J5 Premium, J7 SHS, dan J8 SHS ARDIS untuk wilayah Tangerang, beserta spesifikasi utama, panduan memilih varian, dan estimasi cicilannya.",
  path: "/harga",
});

const faqHarga: Faq[] = [
  {
    q: "Berapa harga JAECOO terbaru di Tangerang?",
    a: "JAECOO J5 Premium Rp 324.900.000, JAECOO J7 SHS Rp 514.900.000, dan JAECOO J8 SHS ARDIS Rp 838.000.000, seluruhnya harga on the road.",
  },
  {
    q: "Apakah harga ini bisa berubah?",
    a: "Bisa. Harga mengikuti kebijakan agen pemegang merek dan dapat berubah sewaktu waktu. Tanggal terakhir daftar ini diperiksa tercantum di bagian atas halaman.",
  },
  {
    q: "Bagaimana cara menghitung cicilannya?",
    a: `Simulasi kredit di situs ini memakai bunga flat per tahun yang mengikuti tenor, yaitu ${RINGKASAN_BUNGA}, ditambah biaya administrasi, premi TJH, dan premi asuransi kendaraan sesuai rate OJK. Anda bisa memilih asuransi kombinasi atau all risk full tenor, serta skema ADDB atau ADDM. Simulasinya ada di halaman masing masing model dan di halaman Kredit. Angka ini hanyalah simulasi, bunga bisa berbeda di setiap bank, dan angka finalnya ditentukan setelah pengajuan disetujui.`,
  },
  {
    q: "Model mana yang bisa saya coba lebih dulu?",
    a: "JAECOO J5 Premium. Saat ini unit itulah yang tersedia untuk test drive, dan jadwalnya bisa diatur di area layanan Anda.",
  },
  {
    q: "Apakah pembelian bisa dengan skema kredit?",
    a: "Bisa. Pengajuan kredit dibantu Mahesa dari penyiapan berkas sampai konfirmasi persetujuan leasing. Alurnya dijelaskan di halaman Kredit.",
  },
];

export default function HargaPage() {
  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Harga & Model", path: "/harga" }]} />

        <h1 className="t-h1 mt-4">Harga JAECOO 2026, OTR Tangerang</h1>

        <p className="t-small mt-3 text-muted">
          Terakhir diperbarui{" "}
          <time dateTime={site.hargaDiperbaruiPada} className="font-semibold text-ink">
            {tanggalPanjang(site.hargaDiperbaruiPada)}
          </time>
        </p>

        <p className="t-body measure mt-5 text-muted">
          Ada tiga unit JAECOO yang bisa Anda pesan lewat Mahesa: J5 Premium
          seharga Rp 324.900.000, J7 SHS seharga Rp 514.900.000, dan J8 SHS
          ARDIS seharga Rp 838.000.000, semuanya harga on the road. Angka di
          halaman ini adalah harga resmi yang berlaku. Kalau Anda masih
          membandingkan, Mahesa bantu memetakan mana yang paling sesuai dengan
          pemakaian Anda.
        </p>
      </Section>

      <Section labelledBy="unit-unggulan">
        <h2 id="unit-unggulan" className="sr-only">
          Unit unggulan
        </h2>
        <FeaturedModelBlock />
      </Section>

      <Section tone="surface" labelledBy="daftar-harga">
        <SectionHeading
          id="daftar-harga"
          title="Daftar harga seluruh varian"
          description="Harga on the road resmi per varian, ditemani estimasi cicilan bulanannya. Tanpa harga coret dan tanpa penawaran berbatas waktu."
        />
        <PriceList />
      </Section>

      <Section tone="surface" labelledBy="ringkasan-model">
        <SectionHeading
          id="ringkasan-model"
          title="Ringkasan tiap model"
          description="Buka halaman model untuk spesifikasi lengkap, pilihan warna, dan simulasi cicilan."
        />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modelsUrut.map((m) => (
            <li key={m.slug}>
              <ModelCard model={m} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="perbandingan-model">
        <SectionHeading
          id="perbandingan-model"
          title="Perbandingan antar model"
          description="Spesifikasi yang paling sering dibandingkan, disandingkan dalam satu tabel."
        />
        <div className="mt-8">
          <ModelComparisonTable />
        </div>
      </Section>

      <Section tone="surface" labelledBy="panduan-varian">
        <SectionHeading
          id="panduan-varian"
          title="Panduan memilih varian"
          description="Tiga unit ini menyasar kebutuhan yang berbeda. Berikut gambaran singkat siapa yang paling cocok dengan masing masing."
        />
        <div className="mt-8">
          <VariantGuide />
        </div>
      </Section>

      <FaqSection
        items={faqHarga}
        title="Pertanyaan seputar harga"
        tone="default"
        id="faq-harga"
      />

      <Container className="pb-12 md:pb-20">
        <div className="rounded-card border border-line bg-brand-soft p-6 md:p-8">
          <h2 className="t-h2">Butuh angka yang pasti untuk anggaran Anda?</h2>
          <p className="t-body measure mt-3 text-muted">
            Sebutkan varian yang Anda incar dan rencana pembayarannya, lalu
            Mahesa siapkan perkiraan skema kreditnya sesuai kemampuan Anda.
          </p>
          <div className="mt-6">
            <WaButton
              context={`Halo Mahesa, saya dari website (Harga - CTA penutup). Saya mau minta perkiraan cicilan ${modelUnggulan.nama}.`}
              ariaLabel={`Chat WhatsApp Mahesa untuk meminta perkiraan cicilan ${modelUnggulan.nama}`}
              size="lg"
            >
              Tanya lewat WhatsApp
            </WaButton>
          </div>
        </div>
      </Container>

      <JsonLd data={itemListSchema(modelsUrut)} />
    </>
  );
}
