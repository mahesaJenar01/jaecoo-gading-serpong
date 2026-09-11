import { IconWhatsapp } from "@/components/icons";
import { waLink } from "@/lib/wa";

/**
 * CTA lembut di tengah artikel. Sengaja satu baris di dalam kotak tipis,
 * bukan spanduk besar, supaya tidak memutus alur membaca.
 */
export function InlineCta({
  teks,
  aksi = "Tanya lewat WhatsApp",
  context,
  ariaLabel,
}: {
  teks: string;
  aksi?: string;
  context: string;
  ariaLabel: string;
}) {
  return (
    <p className="wide my-8 flex flex-col gap-2 rounded-btn border border-line bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="t-small text-muted">{teks}</span>
      <a
        href={waLink(context)}
        target="_blank"
        rel="noopener"
        aria-label={ariaLabel}
        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 font-semibold text-brand hover:text-brand-hover"
      >
        <IconWhatsapp width={18} height={18} />
        {aksi}
      </a>
    </p>
  );
}
