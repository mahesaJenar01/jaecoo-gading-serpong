import type { Metadata } from "next";
import { PackageCards, PackageOfferBar } from "@/components/produk/PackageCards";
import { PackageComparison } from "@/components/produk/PackageComparison";
import { ProductCard } from "@/components/produk/ProductCard";
import {
  BeforeAfterGrid,
  WhyInstallHere,
  WorkflowSteps,
} from "@/components/produk/ProdukBlocks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { PillFilter } from "@/components/ui/PillFilter";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { kategoriProduk, namaUnitAcuan, produk } from "@/data/catalog";
import type { Faq } from "@/data/types";
import { waContext } from "@/lib/wa";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Aksesoris dan Perawatan Mobil, Paket dan Katalog Satuan",
  description:
    "Paket aksesoris untuk mobil JAECOO Anda: kaca film Solargard Black Phantom, nano coating 3 layer, asuransi all risk, ban serep, dan lainnya. Dipasang rapi dan dijadwalkan bersamaan dengan serah terima unit.",
  path: "/produk-lainnya",
});

const faqProduk: Faq[] = [
  {
    q: "Apakah pemasangan aksesoris bisa sekalian saat serah terima unit?",
    a: "Bisa, dan memang itu yang disarankan Mahesa. Jadwal pengerjaan diatur sebelum unit Anda terima, sehingga mobil sudah siap pakai sejak hari pertama.",
  },
  {
    q: "Apakah biaya aksesoris bisa digabung ke cicilan mobil?",
    a: "Tidak bisa. Pembelian aksesoris dan jasa perawatan terpisah dari skema pembelian unit, dan pembayarannya juga terpisah.",
  },
  {
    q: "Apakah saya harus mengambil satu paket penuh?",
    a: "Tidak. Anda bisa memilih item satuan dari katalog di halaman ini. Paket hanya membantu bila item yang Anda butuhkan memang beberapa sekaligus.",
  },
  {
    q: "Berapa lama pengerjaannya?",
    a: "Estimasi waktu tercantum di masing masing paket, satu sampai dua hari kerja. Untuk item satuan, waktunya disampaikan Mahesa saat konsultasi.",
  },
  {
    q: "Apakah ada garansi pemasangan?",
    a: "Ada. Ketentuan dan masa berlakunya disampaikan Mahesa sebelum pengerjaan dimulai, karena berbeda beda tergantung item yang dipasang. Bila ada yang kurang pas setelah dipasang, kabari Mahesa untuk dirapikan kembali.",
  },
  {
    q: "Kaca filmnya pakai merek apa?",
    a: "Solargard tipe Black Phantom, untuk kaca depan, kaca samping, kaca belakang, maupun kaca atap. Tingkat tolak panasnya tinggi, jadi kabin terasa jauh lebih adem, terutama saat mobil parkir lama di tempat terbuka.",
  },
  {
    q: "Kenapa harga asuransi all risk bisa berbeda beda?",
    a: `Karena preminya dihitung dari harga on the road unit, yaitu 2,08 persen untuk perlindungan satu tahun. Angka yang tercantum di halaman ini memakai harga OTR ${namaUnitAcuan} sebagai acuan, jadi bila Anda mengambil unit lain angkanya ikut menyesuaikan.`,
  },
  {
    q: "Kelir two tone bisa untuk semua warna?",
    a: "Belum. Untuk saat ini pengerjaan two tone hanya tersedia untuk unit warna Pristine White dan Ivory Gray.",
  },
];

export default function ProdukLainnyaPage() {
  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Produk Lainnya", path: "/produk-lainnya" }]} />

        <h1 className="t-h1 mt-4">Aksesoris dan Perawatan Mobil</h1>
        <p className="t-body measure mt-4 text-muted">
          Pemasangan yang rapi, barang yang jelas mereknya, dan pengerjaan yang
          dijadwalkan bersamaan dengan proses serah terima unit, sehingga mobil
          sudah siap pakai saat Anda terima. Anda bisa mengambil paket, atau
          memilih item satuan sesuai kebutuhan.
        </p>
      </Section>

      <Section labelledBy="paket-aksesoris">
        <SectionHeading
          id="paket-aksesoris"
          title="Paket aksesoris"
          description="Tiga paket dengan isi yang berbeda. Harga di bawah adalah harga paket beserta jasa pemasangannya, dan sudah lebih murah dibanding membeli isinya satuan."
        />

        <div className="mt-6">
          <PackageOfferBar />
        </div>

        <div className="mt-6 md:mt-8">
          <PackageCards />
        </div>
      </Section>

      <Section tone="surface" labelledBy="perbandingan-paket">
        <SectionHeading
          id="perbandingan-paket"
          title="Perbandingan isi paket"
          description="Bandingkan isi ketiga paket berdampingan sebelum memutuskan."
        />
        <div className="mt-8">
          <PackageComparison />
        </div>
      </Section>

      <Section labelledBy="katalog-satuan">
        <SectionHeading
          id="katalog-satuan"
          title="Katalog satuan"
          description="Bila Anda hanya butuh beberapa item, ambil satuan saja. Saring berdasarkan kategori untuk mempercepat pencarian."
        />

        <div className="mt-8">
          <PillFilter
            scope="katalog"
            kategori={kategoriProduk}
            jumlah={produk.length}
            ariaLabel="Saring katalog berdasarkan kategori"
          >
            {produk.map((p) => (
              <div key={p.id} data-kategori={p.kategori}>
                <ProductCard produk={p} />
              </div>
            ))}
          </PillFilter>
        </div>
      </Section>

      <Section tone="surface" labelledBy="alasan-memasang">
        <SectionHeading
          id="alasan-memasang"
          title="Alasan memasang di sini"
          description="Yang membedakan bukan barangnya, melainkan cara pengerjaan dan tanggung jawab setelahnya."
        />
        <div className="mt-8">
          <WhyInstallHere />
        </div>
      </Section>

      <Section labelledBy="alur-pengerjaan">
        <SectionHeading id="alur-pengerjaan" title="Alur pengerjaan" />
        <div className="mt-8">
          <WorkflowSteps />
        </div>
      </Section>

      <Section tone="surface" labelledBy="hasil-pengerjaan">
        <SectionHeading
          id="hasil-pengerjaan"
          title="Hasil pengerjaan"
          description="TODO: pasang foto hasil pengerjaan asli, bukan foto stok."
        />
        <div className="mt-8">
          <BeforeAfterGrid />
        </div>
      </Section>

      <FaqSection
        items={faqProduk}
        title="Pertanyaan seputar aksesoris dan perawatan"
        id="faq-produk"
        tone="default"
      />

      <Container className="pb-12 md:pb-20">
        <Card tone="soft" className="p-6 md:p-8">
          <h2 className="t-h2">Belum yakin butuh yang mana?</h2>
          <p className="t-body measure mt-3 text-muted">
            Sebutkan unit dan kebiasaan pemakaian Anda, lalu Mahesa bantu memilih
            yang benar benar diperlukan saja. Tidak perlu mengambil paket kalau
            memang tidak cocok.
          </p>
          <div className="mt-6">
            <WaButton
              context={waContext.produkLainnya}
              ariaLabel="Chat WhatsApp Mahesa Jenar tentang aksesoris dan perawatan"
              size="lg"
            >
              Konsultasi lewat WhatsApp
            </WaButton>
          </div>
        </Card>
      </Container>
    </>
  );
}
