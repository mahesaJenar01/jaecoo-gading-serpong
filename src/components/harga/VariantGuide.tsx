import { Card } from "@/components/ui/Card";
import { modelsUrut } from "@/data/models";

/**
 * Panduan memilih varian.
 *
 * Isinya ditulis Mahesa dari pengalaman mendampingi pembeli, satu paragraf
 * per unit. Dipetakan lewat slug supaya urutan kartu tetap mengikuti
 * models.json dan tidak perlu disentuh saat urutan model berubah.
 */
const panduan: Record<string, string> = {
  "jaecoo-j5-premium":
    "Paling cocok untuk pengguna muda, first car buyer, atau keluarga kecil yang mobilitasnya harian di dalam kota. Ukurannya pas untuk jalan sempit dan parkir mall, tapi tampilannya tetap gagah dan tidak terlihat seperti mobil entry level. Pilihan tepat kalau ingin SUV dengan fitur lengkap tanpa harus naik ke budget yang terlalu tinggi.",
  "jaecoo-j7-shs":
    "Paling cocok untuk profesional dan keluarga yang sehari hari komuter jauh tapi tetap butuh mobil yang enak dipakai jalan luar kota. Dengan Super Hybrid System, konsumsi bahan bakarnya jauh lebih irit untuk pemakaian harian, sementara jarak tempuh gabungannya bikin tenang saat perjalanan panjang tanpa khawatir cari tempat charging. Cocok untuk yang ingin rasa mobil listrik tanpa meninggalkan kepraktisan mesin bensin.",
  "jaecoo-j8-shs-ardis":
    "Paling cocok untuk keluarga besar, eksekutif, atau pengguna yang mengutamakan kenyamanan dan kesan berkelas di setiap perjalanan. Kabinnya lapang dengan material premium dan peredaman senyap, pas untuk mengantar keluarga maupun tamu bisnis. Pilihan tepat kalau menginginkan SUV flagship yang mewah, bertenaga, namun tetap efisien berkat teknologi hybrid.",
};

export function VariantGuide() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {modelsUrut.map((m) => (
        <Card key={m.slug} className="p-5">
          <h3 className="t-h3">{m.nama}</h3>
          <p className="t-small mt-1 text-muted">{m.tipe}</p>
          <p className="t-small mt-4 text-muted">{panduan[m.slug]}</p>
        </Card>
      ))}
    </div>
  );
}
