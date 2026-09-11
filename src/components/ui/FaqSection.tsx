import { Accordion } from "./Accordion";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/jsonld";
import type { Faq } from "@/data/types";

/**
 * Blok FAQ lengkap dengan JSON-LD FAQPage.
 * Gunakan paling banyak satu kali per halaman supaya tidak ada FAQPage ganda.
 */
export function FaqSection({
  items,
  title = "Pertanyaan yang sering masuk",
  description,
  id = "faq",
  tone = "surface",
}: {
  items: Faq[];
  title?: string;
  description?: string;
  id?: string;
  tone?: "default" | "surface" | "soft";
}) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} labelledBy={`${id}-heading`} id={id}>
      <SectionHeading
        id={`${id}-heading`}
        title={title}
        description={description}
      />
      <Accordion items={items} className="mt-6 bg-bg md:mt-8" />
      <JsonLd data={faqPageSchema(items)} />
    </Section>
  );
}
