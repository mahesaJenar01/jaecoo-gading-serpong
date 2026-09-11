import type { Metadata } from "next";
import Link from "next/link";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconTiktok,
} from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { serviceAreas } from "@/data/serviceAreas";
import { site } from "@/data/site";
import { autoDealerSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { TEL_LINK, waContext } from "@/lib/wa";

export const metadata: Metadata = pageMetadata({
  title: "Kontak dan Lokasi JAECOO Gading Serpong",
  description:
    "Hubungi Mahesa Jenar, sales consultant JAECOO Gading Serpong, lewat WhatsApp, telepon, atau email. Lihat alamat, jam operasional, dan area layanan.",
  path: "/kontak",
});

const SOSIAL = [
  { key: "tiktok", label: "TikTok", icon: IconTiktok },
  { key: "instagram", label: "Instagram", icon: IconInstagram },
  { key: "facebook", label: "Facebook", icon: IconFacebook },
] as const;

const persiapan = [
  "Model dan varian yang Anda minati",
  "Rencana pembayaran, tunai atau kredit",
  "Area domisili Anda, untuk mengatur test drive dan serah terima",
];

export default function KontakPage() {
  const mapsSiap = !site.googleMapsUrl.startsWith("TODO");

  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Kontak", path: "/kontak" }]} />

        <h1 className="t-h1 mt-4">Kontak dan Lokasi</h1>
        <p className="t-body measure mt-4 text-muted">
          Cara tercepat menghubungi Mahesa adalah lewat WhatsApp. Sebutkan
          model yang Anda minati beserta rencana pembayarannya, supaya
          jawabannya langsung mengena tanpa perlu bertanya bolak balik.
        </p>
      </Section>

      <Section labelledBy="kartu-kontak">
        <h2 id="kartu-kontak" className="sr-only">
          Cara menghubungi
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <Card tone="soft" className="flex flex-col p-6 md:col-span-1">
            <h3 className="t-h3">WhatsApp</h3>
            <p className="t-small mt-1 text-muted">{site.kontak.waDisplay}</p>
            <p className="t-small mt-2 text-muted">
              Cara paling cepat. Pesan yang masuk dibalas berurutan.
            </p>
            <div className="mt-auto pt-5">
              <WaButton
                context={waContext.kontak}
                ariaLabel="Chat WhatsApp Mahesa dari halaman Kontak"
                block
                size="lg"
              >
                Chat WhatsApp
              </WaButton>
            </div>
          </Card>

          <Card className="flex flex-col p-6">
            <h3 className="t-h3">Telepon</h3>
            <p className="t-small mt-1 text-muted">{site.kontak.teleponDisplay}</p>
            <p className="t-small mt-2 text-muted">
              Bila Anda lebih nyaman berbicara langsung.
            </p>
            <div className="mt-auto pt-5">
              <Button href={TEL_LINK} variant="secondary" block>
                <IconPhone width={18} height={18} />
                Telepon sekarang
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col p-6">
            <h3 className="t-h3">Email</h3>
            <p className="t-small mt-1 break-all text-muted">
              {site.kontak.email}
            </p>
            <p className="t-small mt-2 text-muted">
              Cocok untuk pengiriman berkas atau pertanyaan panjang.
            </p>
            <div className="mt-auto pt-5">
              <Button
                href={`mailto:${site.kontak.email}`}
                variant="secondary"
                block
              >
                <IconMail width={18} height={18} />
                Kirim email
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Profil ringkas. Sengaja tidak menyalin isi halaman Tentang supaya
          tidak terjadi duplikasi konten antar halaman. */}
      <Section tone="surface" labelledBy="profil-ringkas">
        <h2 id="profil-ringkas" className="sr-only">
          Profil singkat
        </h2>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="w-24 shrink-0">
            <ProfilePhoto size={96} bentuk="bulat" />
          </div>
          <div>
            <p className="t-h3">{site.sales.nama}</p>
            <p className="t-small mt-1 text-muted">
              {site.sales.jabatan} di {site.sales.lokasi}
            </p>
            <p className="t-body mt-3 max-w-[60ch] text-muted">
              Mahesa mengurus penjualan JAECOO di area Gading Serpong dan
              sekitarnya, mulai dari memilihkan unit, mengatur test drive,
              mengajukan kredit, sampai unitnya diserahkan. Pertanyaan yang
              masuk lewat WhatsApp dijawab sendiri, bukan lewat tim lain.
            </p>
            <Link
              href="/tentang"
              className="t-body mt-3 inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-2"
            >
              Selengkapnya tentang Mahesa
            </Link>
          </div>
        </div>
      </Section>

      <Section labelledBy="alamat-jam">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="alamat-jam" className="t-h2">
              Alamat dan jam operasional
            </h2>

            <h3 className="t-h3 mt-5 text-[16px]">{site.name}</h3>
            <address className="t-body mt-2 not-italic text-muted">
              {site.alamat.lengkap}
            </address>

            <h3 className="t-h3 mt-6 text-[16px]">Jam operasional</h3>
            <ul className="t-small mt-2 flex max-w-[360px] flex-col gap-1 text-muted">
              {site.jamOperasional.map((j) => (
                <li key={j.hari} className="flex justify-between gap-4">
                  <span>{j.hari}</span>
                  <span className="text-right">{j.jam}</span>
                </li>
              ))}
            </ul>

            <h3 className="t-h3 mt-6 text-[16px]">Area layanan</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {serviceAreas.map((a) => (
                <li
                  key={a}
                  className="t-small rounded-pill border border-line px-3 py-1 text-muted"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-h2">Peta lokasi</h2>
            <div className="mt-5">
              <Placeholder
                ratio="16/9"
                id="peta-lokasi-dealer.jpg"
                label="Tangkapan layar peta lokasi dealer"
                alt="Peta lokasi dealer JAECOO Gading Serpong"
              />
            </div>
            <div className="mt-4">
              {mapsSiap ? (
                <Button href={site.googleMapsUrl} variant="secondary">
                  Buka di Google Maps
                </Button>
              ) : (
                <p className="t-small text-muted">
                  TODO: isi googleMapsUrl di src/data/site.ts, lalu tombol Buka
                  di Google Maps muncul otomatis di sini. Peta sengaja belum
                  disematkan sebagai iframe karena menambah permintaan ke
                  domain eksternal dan memberatkan halaman.
                </p>
              )}
            </div>

            <h3 className="t-h3 mt-8 text-[16px]">Media sosial</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOSIAL.map(({ key, label, icon: Icon }) => {
                const item = site.sosial[key];
                const belumAda = item.url.startsWith("TODO");
                return (
                  <li key={key}>
                    {belumAda ? (
                      <span
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
                        className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line bg-bg text-ink hover:border-brand hover:text-brand"
                      >
                        <Icon width={20} height={20} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="sebelum-menghubungi">
        <SectionHeading
          id="sebelum-menghubungi"
          title="Sebelum menghubungi Mahesa"
          description="Tiga hal ini membuat percakapan jauh lebih cepat sampai ke jawaban yang Anda butuhkan."
        />
        <ul className="mt-6 flex list-disc flex-col gap-2 pl-5">
          {persiapan.map((p) => (
            <li key={p} className="t-body text-muted">
              {p}
            </li>
          ))}
        </ul>
        <p className="t-small mt-6 text-muted">
          Pesan yang masuk pada jam operasional, setiap hari pukul 10.00 sampai
          22.00, dibalas pada hari yang sama. Pesan di luar jam tersebut dibalas
          pada jam operasional berikutnya.
        </p>
      </Section>

      <JsonLd data={autoDealerSchema()} />
    </>
  );
}
