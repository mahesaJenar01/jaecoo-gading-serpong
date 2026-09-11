/**
 * Jawaban singkat di bawah judul artikel.
 * Ini bagian pertama yang dibaca mesin pencari dan pengunjung, jadi
 * isinya harus menjawab pertanyaan artikel dalam 80 sampai 120 kata.
 */
export function KeyTakeaway({ children }: { children: string }) {
  return (
    <aside
      aria-label="Jawaban singkat"
      className="rounded-card border border-line bg-brand-soft p-5 md:p-6"
    >
      <p className="t-small font-semibold tracking-wide text-brand uppercase">
        Jawaban singkat
      </p>
      <p className="t-body mt-2 text-ink">{children}</p>
    </aside>
  );
}
