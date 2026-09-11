import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WaButton } from "@/components/wa/WaButton";
import { navItems } from "@/data/nav";
import { waContext } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description:
    "Halaman yang Anda cari tidak ada. Buka daftar harga dan model JAECOO, atau tanyakan langsung lewat WhatsApp.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[640px]">
        <p className="t-small font-semibold tracking-wide text-brand uppercase">
          404
        </p>
        <h1 className="t-h1 mt-2">Halaman ini tidak ditemukan</h1>
        <p className="t-body mt-4 text-muted">
          Mungkin tautannya sudah berubah atau salah ketik. Anda bisa mulai dari
          halaman di bawah, atau langsung tanyakan yang Anda cari lewat
          WhatsApp.
        </p>

        <div className="mt-8">
          <WaButton
            context={waContext.notFound}
            ariaLabel="Chat WhatsApp Mahesa Jenar dari halaman tidak ditemukan"
            size="lg"
          >
            Tanya lewat WhatsApp
          </WaButton>
        </div>

        <h2 className="t-h3 mt-10">Halaman utama</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          <li>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-ink underline-offset-2 hover:text-brand hover:underline"
            >
              Beranda
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-[44px] items-center text-ink underline-offset-2 hover:text-brand hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
