import { IconWhatsapp } from "@/components/icons";
import { waContext, waLink } from "@/lib/wa";

/**
 * Tombol WhatsApp melayang. Hanya tampil di desktop, karena di mobile
 * tugas ini sudah dipegang bilah sticky bawah.
 */
export function WaFab() {
  return (
    <a
      href={waLink(waContext.fab)}
      target="_blank"
      rel="noopener"
      aria-label="Chat WhatsApp Mahesa Jenar"
      className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-pill bg-wa text-bg shadow-[0_6px_20px_-6px_rgba(17,17,17,0.35)] transition-transform duration-150 hover:scale-105 md:inline-flex"
    >
      <IconWhatsapp width={26} height={26} />
    </a>
  );
}
