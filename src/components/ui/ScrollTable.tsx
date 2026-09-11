import type { ReactNode } from "react";

/**
 * Tabel lebar yang digeser di dalam wadahnya sendiri, bukan menggeser body.
 * Wadah diberi tabindex agar bisa digulir dengan keyboard, dan diberi
 * role/label supaya pembaca layar tahu ini area yang bisa digulir.
 *
 * Tanpa JavaScript sama sekali.
 */
export function ScrollTable({
  children,
  caption,
  hint = "Geser tabel ke samping untuk melihat kolom lainnya.",
  minWidth = 640,
  stickyFirstCol = false,
  className = "",
}: {
  /** Isi tabel: thead dan tbody. */
  children: ReactNode;
  /** Ringkasan isi tabel untuk pembaca layar. */
  caption: string;
  hint?: string | false;
  minWidth?: number;
  stickyFirstCol?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {hint ? (
        <p className="t-small mb-2 text-muted md:hidden">{hint}</p>
      ) : null}
      <div
        className="scroll-x rounded-card border border-line"
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <table
          className={`data-table ${stickyFirstCol ? "table-sticky-col" : ""}`}
          style={{ minWidth: `${minWidth}px` }}
        >
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
    </div>
  );
}
