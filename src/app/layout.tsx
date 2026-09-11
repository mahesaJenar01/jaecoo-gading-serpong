import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyBar } from "@/components/layout/StickyBar";
import { WaFab } from "@/components/layout/WaFab";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { websiteSchema } from "@/lib/jsonld";

/**
 * Satu keluarga font saja, di-host sendiri oleh Next lewat next/font.
 * Tidak ada permintaan ke domain eksternal saat halaman dibuka.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "JAECOO Gading Serpong: Harga, Spesifikasi, dan Pendampingan Pembelian",
    template: "%s | JAECOO Gading Serpong",
  },
  description:
    "Sales consultant JAECOO di Gading Serpong, Tangerang. Harga OTR, spesifikasi, test drive, pengajuan kredit, serta pendampingan sampai serah terima unit.",
  applicationName: site.name,
  authors: [{ name: site.sales.nama, url: site.sales.profilUrl }],
  creator: site.sales.nama,
  publisher: site.name,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Lompat ke konten utama
        </a>

        <Header />

        <main id="konten-utama" className="pb-stickybar">
          {children}
        </main>

        <Footer />
        <StickyBar />
        <WaFab />

        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
