import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeliveryGallery } from "./DeliveryGallery";

/**
 * Bukti nyata: foto serah terima unit.
 *
 * Tidak ada klaim jumlah unit terjual, rating, atau testimoni di sini.
 * Fotonya sendiri yang berbicara, dan seluruhnya dipasang atas izin
 * pemilik unit masing masing.
 */
export function ProofGrid() {
  return (
    <Section tone="surface" labelledBy="bukti-nyata">
      <SectionHeading
        id="bukti-nyata"
        eyebrow="Bukti nyata"
        title="Momen serah terima"
        description="Foto berikut diambil saat unit diserahkan kepada pemiliknya, dipasang atas izin masing masing. Tidak ada klaim angka, hanya orang orang yang sudah membawa pulang JAECOO-nya."
      />

      <div className="mt-8">
        <DeliveryGallery />
      </div>
    </Section>
  );
}
