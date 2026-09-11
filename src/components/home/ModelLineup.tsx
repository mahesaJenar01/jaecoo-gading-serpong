import { ModelCard } from "@/components/harga/ModelCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modelsUrut } from "@/data/models";
import { KETERANGAN_CICILAN_MULAI } from "@/lib/kredit";

/**
 * Line up model. Digeser ke samping di mobile, menjadi grid di desktop.
 * JAECOO J5 Premium selalu berada di urutan pertama karena ditandai
 * unggulan di models.json, jadi urutannya diatur data, bukan kode.
 *
 * Baris kartu punya wadah gulir sendiri, sehingga body tidak pernah ikut
 * bergeser ke samping.
 */
export function ModelLineup() {
  return (
    <Section tone="surface" labelledBy="lineup-model">
      <SectionHeading
        id="lineup-model"
        eyebrow="Model"
        title="Tiga unit JAECOO yang bisa Anda pesan"
        description={`Harga di bawah adalah harga on the road resmi, ditemani simulasi cicilan bulanan untuk ${KETERANGAN_CICILAN_MULAI}.`}
      />

      <p className="t-small mt-4 text-muted lg:hidden">
        Geser ke samping untuk melihat model lainnya.
      </p>

      <div className="-mx-5 mt-4 px-5 lg:mx-0 lg:mt-8 lg:px-0">
        <ul className="scroll-x snap-row flex gap-4 pb-3 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-x-visible lg:pb-0">
          {modelsUrut.map((model) => (
            <li
              key={model.slug}
              className={`shrink-0 lg:w-auto ${
                model.unggulan ? "w-[300px]" : "w-[280px]"
              }`}
            >
              <ModelCard model={model} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button href="/harga" variant="secondary">
          Lihat semua harga dan spesifikasi
        </Button>
      </div>
    </Section>
  );
}
