import type { Metadata } from "next";
import { AccessoryTeaser } from "@/components/home/AccessoryTeaser";
import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { LocationBlock } from "@/components/home/LocationBlock";
import { ModelLineup } from "@/components/home/ModelLineup";
import { ProofGrid } from "@/components/home/ProofGrid";
import { ServicePromise } from "@/components/home/ServicePromise";
import { TestDriveTeaser } from "@/components/home/TestDriveTeaser";
import { TrustRow } from "@/components/home/TrustRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { faqGlobal } from "@/data/models";
import { autoDealerSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/seo";

const title =
  "JAECOO Gading Serpong: Harga, Spesifikasi, dan Pendampingan Pembelian";
const description =
  "Sales consultant JAECOO di Gading Serpong, Tangerang. Harga OTR dan spesifikasi JAECOO J5 Premium, J7 SHS, dan J8 SHS ARDIS, test drive, pengajuan kredit, sampai pendampingan serah terima.";

export const metadata: Metadata = {
  // Judul beranda berdiri sendiri, tidak memakai template "%s | ...".
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/"),
    siteName: "JAECOO Gading Serpong",
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function BerandaPage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <ServicePromise />
      <ModelLineup />
      <TestDriveTeaser />
      <ProofGrid />
      <AccessoryTeaser />
      <LatestArticles />
      <FaqSection
        items={faqGlobal.slice(0, 6)}
        title="Pertanyaan yang sering masuk"
        description="Kalau pertanyaan Anda belum terjawab di sini, kirim saja lewat WhatsApp."
      />
      <LocationBlock />

      <JsonLd data={autoDealerSchema()} />
    </>
  );
}
