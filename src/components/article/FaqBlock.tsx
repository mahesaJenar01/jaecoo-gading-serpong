import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/jsonld";
import type { Faq } from "@/data/types";

/**
 * Blok FAQ di dalam artikel, lengkap dengan JSON-LD FAQPage.
 * Satu halaman artikel hanya memakai blok ini satu kali.
 */
export function FaqBlock({
  items,
  judul = "Pertanyaan seputar topik ini",
}: {
  items: Faq[];
  judul?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-artikel" className="mt-12">
      <h2 id="faq-artikel" className="t-h2">
        {judul}
      </h2>
      <Accordion items={items} className="mt-4" />
      <JsonLd data={faqPageSchema(items)} />
    </section>
  );
}
