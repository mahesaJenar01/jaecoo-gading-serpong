import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ColorSwatches, ModelGallery } from "@/components/harga/ModelGallery";
import { VariantPriceCards } from "@/components/harga/ModelFinance";
import { HighlightList, SpecTable } from "@/components/harga/ModelSpecs";
import { KreditSimulator } from "@/components/kredit/KreditSimulator";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { FaqSection } from "@/components/ui/FaqSection";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { latestArticles } from "@/content/articles/registry";
import { getModel, models } from "@/data/models";
import type { Model } from "@/data/types";
import { rupiah } from "@/lib/format";
import { productSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return {};

  return pageMetadata({
    title: `Harga ${model.nama} di Tangerang, ${rupiah(model.hargaMulai)} OTR`,
    description: `${model.ringkasan} Spesifikasi lengkap, pilihan warna, dan simulasi cicilan ${model.nama}, didampingi sales consultant JAECOO Gading Serpong.`,
    path: `/harga/${model.slug}`,
  });
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const artikel = latestArticles(2);

  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs
          items={[
            { nama: "Harga & Model", path: "/harga" },
            { nama: model.nama, path: `/harga/${model.slug}` },
          ]}
        />

        <h1 className="t-h1 mt-4">
          Harga {model.nama} di Tangerang
        </h1>
        <p className="t-body measure mt-4 text-muted">{model.ringkasan}</p>
        <p className="t-body mt-4">
          Harga on the road{" "}
          <strong className="text-brand">{rupiah(model.hargaMulai)}</strong>.
        </p>

        <div className="mt-8">
          <ModelGallery model={model} />
        </div>
      </Section>

      <Section labelledBy="harga-varian">
        <SectionHeading id="harga-varian" title="Harga per varian" />
        <div className="mt-6">
          <VariantPriceCards model={model} />
        </div>
      </Section>

      <CtaStrip
        model={model}
        blok="harga varian"
        judul="Ingin gambaran angka untuk anggaran Anda?"
        teks="Sebutkan rencana pembayaran Anda, nanti Mahesa siapkan perkiraan angkanya."
      />

      <Section tone="surface" labelledBy="spesifikasi">
        <SectionHeading
          id="spesifikasi"
          title="Spesifikasi lengkap"
          description="Dikelompokkan agar mudah dibandingkan. Tabel bisa digeser ke samping di layar sempit."
        />
        <div className="mt-8">
          <SpecTable model={model} />
        </div>
      </Section>

      <Section labelledBy="pilihan-warna">
        <SectionHeading id="pilihan-warna" title="Pilihan warna" />
        <div className="mt-6">
          <ColorSwatches model={model} />
        </div>
      </Section>

      <CtaStrip
        model={model}
        blok="pilihan warna"
        judul="Mau tahu warna yang tersedia sekarang?"
        teks="Ketersediaan warna berubah per periode. Mahesa cek dulu sebelum Anda memutuskan."
      />

      <Section tone="surface" labelledBy="keunggulan">
        <SectionHeading id="keunggulan" title="Keunggulan utama" />
        <div className="mt-8">
          <HighlightList model={model} />
        </div>
      </Section>

      <Section labelledBy="simulasi-kredit">
        <SectionHeading
          id="simulasi-kredit"
          title="Simulasi kredit"
          description="Atur uang muka, tenor, jenis asuransi, dan skema pembayaran untuk melihat gambaran TDP dan angsuran. Angkanya simulasi, keputusan akhir tetap di pihak bank atau leasing."
        />
        <div className="mt-8">
          <KreditSimulator
            units={model.varian.map((v) => ({
              label:
                model.varian.length > 1 ? `${model.nama} ${v.nama}` : model.nama,
              hargaOtr: v.hargaOtr,
            }))}
            sumber={model.nama}
          />
        </div>
      </Section>

      <CtaStrip
        model={model}
        blok="simulasi cicilan"
        judul="Butuh simulasi sesuai kemampuan Anda?"
        teks="Sebutkan uang muka dan tenor yang Anda rencanakan, Mahesa bantu ajukan ke leasing."
      />

      <FaqSection
        items={model.faq}
        title={`Pertanyaan seputar ${model.nama}`}
        id="faq-model"
        tone="surface"
      />

      {artikel.length > 0 ? (
        <Section labelledBy="artikel-terkait-model">
          <SectionHeading id="artikel-terkait-model" title="Artikel terkait" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {artikel.map((meta) => (
              <ArticleCard key={meta.slug} meta={meta} />
            ))}
          </div>
        </Section>
      ) : null}

      <JsonLd data={productSchema(model)} />
    </>
  );
}

/**
 * CTA WhatsApp yang menempel setelah setiap dua blok utama.
 * Konteksnya selalu memuat nama model dan nama blok asal klik.
 */
function CtaStrip({
  model,
  blok,
  judul,
  teks,
}: {
  model: Model;
  blok: string;
  judul: string;
  teks: string;
}) {
  return (
    <section aria-label={`Hubungi tentang ${model.nama}`} className="pb-12 md:pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 lg:px-8">
        <Card tone="soft" className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="t-h3">{judul}</h2>
            <p className="t-small mt-1 max-w-[60ch] text-muted">{teks}</p>
          </div>
          <WaButton
            context={`Halo Mahesa, saya dari website (${model.nama} - ${blok}). Saya mau tanya lebih lanjut tentang ${model.nama}.`}
            ariaLabel={`Chat WhatsApp Mahesa tentang ${model.nama} dari blok ${blok}`}
            className="shrink-0"
          >
            Chat WhatsApp
          </WaButton>
        </Card>
      </div>
    </section>
  );
}
