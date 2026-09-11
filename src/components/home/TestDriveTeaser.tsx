import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { modelUnggulan } from "@/data/models";
import { serviceAreas } from "@/data/serviceAreas";
import { waContext } from "@/lib/wa";

const langkah = [
  {
    judul: "Isi formulir singkat",
    isi: "Nama, nomor WhatsApp, unit, lokasi, dan waktu yang Anda inginkan.",
  },
  {
    judul: "Konfirmasi lewat WhatsApp",
    isi: "Mahesa cek ketersediaan unit dan jadwalnya, lalu kita sepakati waktunya.",
  },
  {
    judul: "Unit disiapkan",
    isi: "Unit disiapkan di titik yang disepakati pada waktu yang sudah pasti.",
  },
];

export function TestDriveTeaser() {
  return (
    <Section labelledBy="test-drive-beranda">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            id="test-drive-beranda"
            eyebrow="Test drive"
            title="Coba dulu sebelum memutuskan"
            description={`Saat ini unit yang tersedia untuk test drive adalah ${modelUnggulan.nama}. Jadwal dan lokasinya bisa menyesuaikan Anda.`}
          />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/test-drive">Ajukan test drive</Button>
            <WaButton
              context={waContext.berandaTestDrive}
              ariaLabel="Chat WhatsApp Mahesa untuk mengatur jadwal test drive"
              variant="secondary"
            >
              Tanya jadwalnya
            </WaButton>
          </div>
        </div>

        <div>
          <ol className="flex flex-col gap-5">
            {langkah.map((l, i) => (
              <li key={l.judul} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-line font-semibold text-brand tabular-nums"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-h3">{l.judul}</h3>
                  <p className="t-body mt-1 text-muted">{l.isi}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-card border border-line bg-surface p-5">
            <h3 className="t-h3 text-[16px]">Area yang dilayani</h3>
            <p className="t-small mt-2 text-muted">{serviceAreas.join(", ")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
