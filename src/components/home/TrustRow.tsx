import { IconChat, IconClock, IconPin, IconShield } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { serviceAreas } from "@/data/serviceAreas";
import { site } from "@/data/site";

/**
 * Baris kepercayaan tepat di bawah hero.
 * Isinya fakta layanan, bukan klaim penjualan. Janji waktu respon di sini
 * harus selalu sama dengan yang tertulis di halaman Kontak.
 */
const items = [
  {
    icon: IconClock,
    judul: "Jam operasional",
    isi: site.jamRingkas,
  },
  {
    icon: IconChat,
    judul: "Waktu respon",
    isi: "Pesan yang masuk pada jam operasional dibalas di hari yang sama",
  },
  {
    icon: IconPin,
    judul: "Area layanan",
    isi: serviceAreas.slice(0, 4).join(", ") + ", dan sekitarnya",
  },
  {
    icon: IconShield,
    judul: "Pendampingan",
    isi: "Didampingi sampai unit diterima dan servis pertama",
  },
];

export function TrustRow() {
  return (
    <section aria-label="Ringkasan layanan" className="border-b border-line bg-bg">
      <Container>
        <ul className="grid gap-x-6 gap-y-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, judul, isi }) => (
            <li key={judul} className="flex items-start gap-3">
              <Icon className="mt-0.5 shrink-0 text-brand" width={20} height={20} />
              <div>
                <p className="t-small font-semibold text-ink">{judul}</p>
                <p className="t-small text-muted">{isi}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
