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
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { DeliveryGallery } from "@/components/home/DeliveryGallery";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { site } from "@/data/site";
import { personSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { TEL_LINK, waContext } from "@/lib/wa";

export const metadata: Metadata = pageMetadata({
  title: `Tentang ${site.sales.nama}, ${site.sales.jabatan} ${site.sales.lokasi}`,
  description: `Profil ${site.sales.nama}, ${site.sales.jabatan} di ${site.sales.lokasi}. Cara Mahesa mendampingi pembeli JAECOO, dari pemilihan varian sampai serah terima unit.`,
  path: "/tentang",
});

const caraKerja = [
  {
    judul: "Menjawab dulu, menawarkan belakangan",
    isi: "Pertanyaan Anda dijawab lebih dulu sampai jelas. Penawaran datang setelah kebutuhan Anda terbaca, bukan sebelumnya.",
  },
  {
    judul: "Terbuka soal angka",
    isi: "Hal yang perlu Anda siapkan di luar harga unit disampaikan apa adanya, termasuk yang biasanya baru ketahuan di akhir.",
  },
  {
    judul: "Berani bilang kalau memang tidak cocok",
    isi: "Bila unit yang Anda incar kurang pas dengan pemakaian Anda, Mahesa sampaikan, meski itu berarti pembeliannya tertunda.",
  },
  {
    judul: "Mahesa yang mengabari, bukan Anda yang menagih",
    isi: "Setelah pemesanan, perkembangan proses dikabari berkala tanpa perlu Anda tanyakan lebih dulu.",
  },
  {
    judul: "Pendampingan berlanjut setelah serah terima",
    isi: "Pertanyaan tentang fitur, perawatan, dan servis pertama tetap dilayani setelah mobil Anda terima.",
  },
];

const bantuan = [
  { teks: "Memilih model dan varian yang sesuai", href: "/harga" },
  { teks: "Rincian harga on the road per varian", href: "/harga" },
  { teks: "Pengajuan kredit dan penyiapan berkas", href: "/kredit" },
  { teks: "Mengatur jadwal test drive", href: "/test-drive" },
  { teks: "Aksesoris dan perawatan mobil", href: "/produk-lainnya" },
  { teks: "Proses serah terima sampai selesai", href: "/kontak" },
];

const SOSIAL = [
  { key: "tiktok", label: "TikTok", icon: IconTiktok },
  { key: "instagram", label: "Instagram", icon: IconInstagram },
  { key: "facebook", label: "Facebook", icon: IconFacebook },
] as const;

export default function TentangPage() {
  return (
    <>
      <Section className="!pb-0">
        <Breadcrumbs items={[{ nama: "Tentang", path: "/tentang" }]} />

        <h1 className="t-h1 mt-4">
          Tentang {site.sales.nama}, {site.sales.jabatan} {site.sales.lokasi}
        </h1>
      </Section>

      <Section labelledBy="profil">
        <h2 id="profil" className="sr-only">
          Profil singkat
        </h2>

        <div className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-10">
          <div className="max-w-[260px]">
            <ProfilePhoto size={260} priority />
          </div>

          <div>
            <p className="t-h3">{site.sales.nama}</p>
            <p className="t-small mt-1 text-muted">
              {site.sales.jabatan} di {site.sales.lokasi}
            </p>

            <div className="prose-id mt-5">
              <p>
                Mahesa Jenar sehari hari menemani orang memilih mobil di Gading
                Serpong. Pekerjaannya sederhana kalau diringkas: mendengarkan
                dulu untuk apa mobilnya dipakai, baru menunjukkan unit mana yang
                benar benar masuk akal untuk kebutuhan itu.
              </p>
              <p>
                Sebagian besar percakapan yang masuk dimulai dari pertanyaan,
                bukan dari pemesanan, dan memang begitu urutan yang disukai
                Mahesa. Anda boleh bertanya berkali kali, membandingkan dengan
                merek lain, atau menunda keputusan tanpa dikejar kejar. Setelah
                pemesanan, urusan berkas dan komunikasi dengan pihak leasing
                dipegang Mahesa, dan perkembangannya dikabari tanpa perlu Anda
                tanyakan.
              </p>
              <p>
                Yang paling sering ditanyakan biasanya seputar tiga hal:
                perbedaan nyata antar model, perkiraan cicilan yang masuk ke
                anggaran bulanan, dan apa saja yang perlu disiapkan untuk
                pengajuan kredit. Ketiganya bisa dibicarakan lebih dulu lewat
                WhatsApp, sebelum Anda memutuskan untuk datang.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="cara-mahesa-bekerja">
        <SectionHeading id="cara-mahesa-bekerja" title="Cara Mahesa bekerja" />
        <ol className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {caraKerja.map((c, i) => (
            <li key={c.judul} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-bg font-semibold text-brand tabular-nums"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="t-h3">{c.judul}</h3>
                <p className="t-body mt-1 text-muted">{c.isi}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="yang-bisa-dibantu">
        <SectionHeading id="yang-bisa-dibantu" title="Yang bisa Mahesa bantu" />
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {bantuan.map((b) => (
            <li key={b.teks}>
              <Link
                href={b.href}
                className="inline-flex min-h-[44px] items-center text-ink underline-offset-2 hover:text-brand hover:underline"
              >
                {b.teks}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="galeri-kegiatan">
        <SectionHeading
          id="galeri-kegiatan"
          title="Galeri serah terima"
          description="Momen unit diserahkan kepada pemiliknya, dipasang atas izin masing masing."
        />
        <div className="mt-8">
          <DeliveryGallery />
        </div>
      </Section>

      <Container className="pb-12 md:pb-20">
        <Card tone="soft" className="p-6 md:p-8">
          <h2 className="t-h2">Mari mulai dari pertanyaan Anda</h2>
          <p className="t-body measure mt-3 text-muted">
            Tidak perlu sudah yakin mau beli. Kirim saja pertanyaannya, nanti
            Mahesa bantu petakan pilihannya.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <WaButton
              context={waContext.tentang}
              ariaLabel="Chat WhatsApp Mahesa dari halaman Tentang"
              size="lg"
            >
              Chat WhatsApp
            </WaButton>
            <a
              href={TEL_LINK}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-btn border border-line bg-bg px-5 font-semibold text-ink hover:bg-surface"
            >
              <IconPhone width={18} height={18} />
              {site.kontak.teleponDisplay}
            </a>
            <a
              href={`mailto:${site.kontak.email}`}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-btn border border-line bg-bg px-5 font-semibold text-ink hover:bg-surface"
            >
              <IconMail width={18} height={18} />
              Email
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
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
        </Card>
      </Container>

      <JsonLd data={personSchema()} />
    </>
  );
}
