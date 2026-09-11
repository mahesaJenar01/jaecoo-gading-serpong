import Link from "next/link";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconTiktok,
  IconWhatsapp,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { serviceAreas } from "@/data/serviceAreas";
import { site } from "@/data/site";
import { TEL_LINK, waContext, waLink } from "@/lib/wa";
import { Logo } from "./Logo";

const SOSIAL = [
  { key: "tiktok", label: "TikTok", icon: IconTiktok },
  { key: "instagram", label: "Instagram", icon: IconInstagram },
  { key: "facebook", label: "Facebook", icon: IconFacebook },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* NAP */}
          <div className="md:col-span-5">
            <Logo height={20} />
            <p className="t-h3 mt-3">{site.name}</p>
            <p className="t-small mt-1 text-muted">
              {site.sales.nama}, {site.sales.jabatan}
            </p>

            <address className="t-body mt-4 not-italic text-muted">
              {site.alamat.lengkap}
            </address>

            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={waLink(waContext.footer)}
                  target="_blank"
                  rel="noopener"
                  aria-label="Chat WhatsApp Mahesa Jenar dari footer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-ink hover:text-brand"
                >
                  <IconWhatsapp width={18} height={18} className="text-brand" />
                  WhatsApp {site.kontak.waDisplay}
                </a>
              </li>
              <li>
                <a
                  href={TEL_LINK}
                  className="inline-flex min-h-[44px] items-center gap-2 text-ink hover:text-brand"
                >
                  <IconPhone width={18} height={18} className="text-brand" />
                  Telepon {site.kontak.teleponDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.kontak.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 break-all text-ink hover:text-brand"
                >
                  <IconMail width={18} height={18} className="text-brand" />
                  {site.kontak.email}
                </a>
              </li>
            </ul>

            <ul className="mt-2 flex items-center gap-2">
              {SOSIAL.map(({ key, label, icon: Icon }) => {
                const item = site.sosial[key];
                const belumAda = item.url.startsWith("TODO");
                return (
                  <li key={key}>
                    {belumAda ? (
                      <span
                        title={`TODO: isi tautan ${label} (${item.label})`}
                        aria-label={`${label} ${item.label}, tautan belum tersedia`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-dashed border-line text-muted"
                      >
                        <Icon width={20} height={20} />
                      </span>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${label} ${item.label}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line text-ink hover:border-brand hover:text-brand"
                      >
                        <Icon width={20} height={20} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigasi */}
          <div className="md:col-span-3">
            <p className="t-h3 text-[16px]">Halaman</p>
            <nav aria-label="Navigasi footer" className="mt-3">
              <ul className="flex flex-col">
                <li>
                  <Link
                    href="/"
                    className="inline-flex min-h-[40px] items-center text-muted hover:text-brand"
                  >
                    Beranda
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[40px] items-center text-muted hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Jam dan area layanan */}
          <div className="md:col-span-4">
            <p className="t-h3 text-[16px]">Jam operasional</p>
            <ul className="t-small mt-3 flex flex-col gap-1 text-muted">
              {site.jamOperasional.map((j) => (
                <li key={j.hari} className="flex justify-between gap-4">
                  <span>{j.hari}</span>
                  <span className="text-right">{j.jam}</span>
                </li>
              ))}
            </ul>

            <p className="t-h3 mt-6 text-[16px]">Area layanan</p>
            <p className="t-small mt-2 text-muted">{serviceAreas.join(", ")}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="t-small text-muted">
            Situs ini dikelola oleh {site.sales.nama}, {site.sales.jabatan} di{" "}
            {site.sales.lokasi}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
