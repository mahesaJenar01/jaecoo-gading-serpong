import { IconMail, IconPhone } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/wa/WaButton";
import { serviceAreas } from "@/data/serviceAreas";
import { site } from "@/data/site";
import { TEL_LINK, waContext } from "@/lib/wa";

/**
 * Lokasi dan kontak penutup beranda.
 *
 * Peta sengaja masih berupa placeholder. Iframe Google Maps tidak dipasang
 * pada versi awal karena menambah permintaan ke domain eksternal dan
 * memberatkan halaman.
 */
export function LocationBlock() {
  const mapsSiap = !site.googleMapsUrl.startsWith("TODO");

  return (
    <Section labelledBy="lokasi-kontak">
      <SectionHeading
        id="lokasi-kontak"
        eyebrow="Lokasi dan kontak"
        title="Tempat kita bisa bertemu"
        description="Bisa juga dibicarakan lebih dulu lewat WhatsApp sebelum Anda datang, supaya waktunya tidak terbuang."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Placeholder
            ratio="16/9"
            id="peta-lokasi-dealer.jpg"
            label="Tangkapan layar peta lokasi dealer"
            alt="Peta lokasi dealer JAECOO Gading Serpong"
          />
          <div className="mt-4">
            {mapsSiap ? (
              <Button href={site.googleMapsUrl} variant="secondary">
                Buka di Google Maps
              </Button>
            ) : (
              <p className="t-small text-muted">
                TODO: isi tautan Google Maps di src/data/site.ts, lalu tombol
                Buka di Google Maps muncul otomatis di sini.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="t-h3">{site.name}</h3>
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
          <p className="t-small mt-2 text-muted">{serviceAreas.join(", ")}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WaButton
              context={waContext.berandaKontak}
              ariaLabel="Chat WhatsApp Mahesa Jenar dari blok lokasi dan kontak"
            >
              Chat WhatsApp
            </WaButton>
            <Button href={TEL_LINK} variant="secondary">
              <IconPhone width={18} height={18} />
              {site.kontak.teleponDisplay}
            </Button>
            <Button href={`mailto:${site.kontak.email}`} variant="secondary">
              <IconMail width={18} height={18} />
              Email
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
