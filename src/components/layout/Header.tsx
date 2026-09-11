import Link from "next/link";
import { IconWhatsapp } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { waContext, waLink } from "@/lib/wa";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Header sticky, tinggi 60px di mobile. Logo JAECOO ditemani keterangan
 * lokasi, dua baris di mobile supaya muat di layar 320px bersama tombol
 * WhatsApp dan tombol menu.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-[60px] items-center justify-between gap-4 md:h-[68px]">
        <Link
          href="/"
          className="flex shrink-0 flex-col gap-0.5 leading-tight md:flex-row md:items-center md:gap-2.5"
          aria-label="JAECOO Gading Serpong, kembali ke beranda"
        >
          <Logo height={18} priority />
          <span className="text-[11px] font-semibold tracking-wide text-muted uppercase md:border-l md:border-line md:pl-2.5 md:text-[14px] md:tracking-normal md:normal-case md:text-ink">
            Gading Serpong
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-btn px-3 text-[15px] text-ink transition-colors duration-150 hover:bg-surface hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={waLink(waContext.header)}
            target="_blank"
            rel="noopener"
            aria-label="Chat WhatsApp Mahesa Jenar dari header"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-btn bg-brand px-3 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-hover md:px-4"
          >
            <IconWhatsapp width={18} height={18} />
            <span className="hidden sm:inline">Chat WhatsApp</span>
            <span className="sr-only sm:hidden">Chat WhatsApp</span>
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
