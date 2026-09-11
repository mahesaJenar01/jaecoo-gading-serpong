import type { Metadata } from "next";
import { TestDriveForm } from "@/components/testdrive/TestDriveForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { opsiUnitTestDrive } from "@/data/models";
import { serviceAreas } from "@/data/serviceAreas";
import type { Faq } from "@/data/types";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Test Drive JAECOO di Gading Serpong dan Sekitarnya",
  description:
    "Ajukan jadwal test drive JAECOO di Gading Serpong, BSD, Alam Sutera, dan sekitarnya. Isi formulir singkat, jadwal dikonfirmasi lewat WhatsApp.",
  path: "/test-drive",
});

const faqTestDrive: Faq[] = [
  {
    q: "Apa syarat mengikuti test drive?",
    a: "TODO: isi syarat yang sebenarnya berlaku, misalnya usia minimum dan dokumen yang perlu dibawa. Jangan menuliskannya sebelum dipastikan.",
  },
  {
    q: "Apakah saya harus punya SIM?",
    a: "Ya, bila Anda yang akan mengemudikan unitnya. Bila Anda hanya ingin mencoba sebagai penumpang, Mahesa yang mengemudi.",
  },
  {
    q: "Berapa lama waktunya?",
    a: "TODO: isi perkiraan durasi test drive yang biasanya Anda sediakan, termasuk waktu penjelasan fitur.",
  },
  {
    q: "Apakah bisa dilakukan di rumah saya?",
    a: "Bisa, selama masih di area layanan. Sebutkan alamat perkiraan saat mengisi formulir, lalu titik temunya kita sepakati lewat WhatsApp.",
  },
];

const langkah = [
  {
    judul: "Isi formulir",
    isi: "Nama, nomor WhatsApp, unit, lokasi, tanggal, dan rentang waktu yang Anda inginkan.",
  },
  {
    judul: "Konfirmasi jadwal lewat WhatsApp",
    isi: "Mahesa cek ketersediaan unit dan waktunya, lalu kita sepakati jadwal pastinya.",
  },
  {
    judul: "Unit disiapkan",
    isi: "Unit disiapkan di titik yang disepakati pada waktu yang sudah pasti.",
  },
];

export default function TestDrivePage() {
  const unitOptions = opsiUnitTestDrive();

  return (
    <>
      <Container className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-[760px]">
          <Breadcrumbs items={[{ nama: "Test Drive", path: "/test-drive" }]} />

          <h1 className="t-h1 mt-4">
            Test Drive JAECOO di Gading Serpong
          </h1>
          <p className="t-body mt-4 text-muted">
            Isi formulir di bawah, lalu Mahesa konfirmasi jadwalnya lewat
            WhatsApp. Lokasi bisa menyesuaikan Anda selama masih di area
            layanan. Tidak ada data yang dikirim ke mana pun selain ke WhatsApp
            Mahesa.
          </p>

          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {langkah.map((l, i) => (
              <li key={l.judul}>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-soft font-semibold text-brand tabular-nums"
                >
                  {i + 1}
                </span>
                <h2 className="t-h3 mt-3">{l.judul}</h2>
                <p className="t-small mt-1 text-muted">{l.isi}</p>
              </li>
            ))}
          </ol>

          <h2 className="t-h2 mt-12">Formulir pengajuan test drive</h2>

          <TestDriveForm unitOptions={unitOptions} areaOptions={serviceAreas} />
        </div>
      </Container>

      <FaqSection
        items={faqTestDrive}
        title="Pertanyaan seputar test drive"
        id="faq-test-drive"
        tone="surface"
      />
    </>
  );
}
