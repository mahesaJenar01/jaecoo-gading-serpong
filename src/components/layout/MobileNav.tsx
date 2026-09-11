"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconClose, IconMenu, IconWhatsapp } from "@/components/icons";
import { navItems } from "@/data/nav";
import { waContext, waLink } from "@/lib/wa";

/**
 * Drawer navigasi mobile.
 *
 * Ini salah satu dari sedikit komponen client di situs ini. Seluruh tautan
 * tetap dirender di HTML awal, jadi isinya bisa dibaca crawler dan tetap
 * ada saat JavaScript dimatikan. Saat tertutup, drawer diberi atribut
 * inert sehingga isinya tidak bisa difokus dengan keyboard.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      // Fokus dikurung di dalam drawer selama terbuka.
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu navigasi"
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-ink-line text-white"
      >
        <IconMenu width={22} height={22} />
      </button>

      {/* Latar gelap. Diklik untuk menutup. */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-150 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        inert={!open}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-[86%] max-w-[320px] flex-col bg-bg transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-line px-5">
          <span className="t-body font-semibold">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Tutup menu navigasi"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line text-ink"
          >
            <IconClose width={22} height={22} />
          </button>
        </div>

        <nav aria-label="Navigasi utama" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center border-b border-line text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="safe-bottom border-t border-line px-5 pt-4">
          <a
            href={waLink(waContext.header)}
            target="_blank"
            rel="noopener"
            aria-label="Chat WhatsApp Mahesa dari menu navigasi"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn bg-brand px-4 font-semibold text-white"
          >
            <IconWhatsapp width={18} height={18} />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
