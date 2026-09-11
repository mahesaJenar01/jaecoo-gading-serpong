import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { WaButton } from "@/components/wa/WaButton";
import { modelUnggulan } from "@/data/models";
import { site } from "@/data/site";
import { waContext } from "@/lib/wa";

/**
 * Hero beranda. Ringan dengan sengaja: tanpa video, tanpa slider, tanpa
 * gambar latar. Fotonya memakai JAECOO J5 Premium sebagai produk unggulan.
 *
 * Subjudul berbicara tentang pelayanan, bukan tentang harga murah.
 */
export function Hero() {
  return (
    <section className="border-b border-line bg-surface py-10 md:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="t-h1">
              JAECOO Gading Serpong
            </h1>
            <p className="t-body mt-4 max-w-[56ch] text-muted">
              {site.sales.nama}, {site.sales.jabatan} di {site.sales.lokasi}.
              Mahesa mendampingi Anda dari pertanyaan pertama sampai unit
              diterima, dengan penjelasan yang terbuka dan tanpa didesak.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WaButton
                context={waContext.beranda}
                ariaLabel="Chat WhatsApp Mahesa dari hero beranda"
                size="lg"
                className="sm:flex-1"
              >
                Chat WhatsApp
              </WaButton>
              <Button
                href="/harga"
                variant="secondary"
                size="lg"
                className="sm:flex-1"
              >
                Lihat Harga &amp; Model
              </Button>
            </div>
          </div>

          {/* Rasio 4/3 di mobile dan 16/9 di desktop, sesuai brief.
              Keduanya menunjuk berkas foto yang sama. */}
          <div>
            <div className="md:hidden">
              <Placeholder
                ratio="4/3"
                id="hero-jaecoo-j5-premium.jpg"
                label={`Foto utama ${modelUnggulan.nama} di depan dealer`}
                alt={`${modelUnggulan.nama} di Gading Serpong, Tangerang`}
              />
            </div>
            <div className="hidden md:block">
              <Placeholder
                ratio="16/9"
                id="hero-jaecoo-j5-premium.jpg"
                label={`Foto utama ${modelUnggulan.nama} di depan dealer`}
                alt={`${modelUnggulan.nama} di Gading Serpong, Tangerang`}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
