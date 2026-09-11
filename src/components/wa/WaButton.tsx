import { IconWhatsapp } from "@/components/icons";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { waLink } from "@/lib/wa";
import type { ReactNode } from "react";

/**
 * Satu satunya cara membuat tombol WhatsApp di situs ini.
 *
 * `context` wajib unik per tempat klik (halaman + blok), karena teks itulah
 * yang muncul di WhatsApp dan menjadi penanda dari mana calon pembeli datang.
 * Tautan selalu target="_blank" rel="noopener" lewat komponen Button.
 *
 * Catatan warna: varian "whatsapp" (hijau WhatsApp) hanya dipakai di bilah
 * sticky mobile dan tombol melayang desktop. Tombol WA lain memakai warna
 * brand, sesuai aturan warna di brief.
 */
export function WaButton({
  context,
  children,
  ariaLabel,
  variant = "primary",
  size = "md",
  block = false,
  withIcon = true,
  className = "",
}: {
  context: string;
  children: ReactNode;
  /** Wajib dan deskriptif, contoh "Chat WhatsApp tentang JAECOO J5 Premium". */
  ariaLabel: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  withIcon?: boolean;
  className?: string;
}) {
  return (
    <Button
      href={waLink(context)}
      variant={variant}
      size={size}
      block={block}
      className={className}
      aria-label={ariaLabel}
    >
      {withIcon ? <IconWhatsapp width={18} height={18} /> : null}
      {children}
    </Button>
  );
}
