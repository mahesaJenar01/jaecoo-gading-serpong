"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconPhone, IconSteering, IconWhatsapp } from "@/components/icons";
import { TEL_LINK, waContext, waLink } from "@/lib/wa";

/**
 * Bilah aksi tetap di bawah layar, khusus mobile.
 *
 * Muncul setelah pengunjung menggulir melewati area hero. Komponen ini
 * client karena perlu tahu posisi gulir, tetapi isinya hanya tiga tautan
 * biasa: tidak ada konten penting yang bergantung pada JavaScript.
 * Halaman memberi kelas pb-stickybar pada main supaya konten terakhir
 * tidak tertutup bilah ini.
 */
export function StickyBar() {
  const [tampil, setTampil] = useState(false);
  const pathname = usePathname();

  // Di halaman test drive, tombol kirim formulir sudah menempel di bawah
  // layar. Dua bilah bertumpuk akan saling menutupi, jadi bilah ini
  // disembunyikan di sana.
  const disembunyikan = pathname === "/test-drive";

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setTampil(window.scrollY > 320);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (disembunyikan) return null;

  return (
    <div
      inert={!tampil}
      aria-hidden={!tampil}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg transition-transform duration-200 md:hidden ${
        tampil ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="safe-bottom grid grid-cols-[1.6fr_1fr_1fr] items-stretch gap-2 px-4 pt-2">
        <a
          href={waLink(waContext.stickyBar)}
          target="_blank"
          rel="noopener"
          aria-label="Chat WhatsApp Mahesa Jenar dari bilah bawah"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn bg-wa px-3 font-semibold text-bg"
        >
          <IconWhatsapp width={18} height={18} />
          Chat WhatsApp
        </a>
        <a
          href={TEL_LINK}
          aria-label="Telepon Mahesa Jenar"
          className="inline-flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-btn border border-line px-2 text-[13px] font-semibold text-ink"
        >
          <IconPhone width={18} height={18} />
          Telepon
        </a>
        <Link
          href="/test-drive"
          aria-label="Buka halaman pengajuan test drive"
          className="inline-flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-btn border border-line px-2 text-[13px] font-semibold text-ink"
        >
          <IconSteering width={18} height={18} />
          Test Drive
        </Link>
      </div>
    </div>
  );
}
