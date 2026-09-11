import type { ReactNode } from "react";
import { IconSparkle } from "@/components/icons";

/**
 * Kotak catatan di dalam artikel. Dipakai untuk hal yang mudah terlewat,
 * bukan untuk menegaskan penawaran.
 */
export function Callout({
  judul,
  children,
}: {
  judul: string;
  children: ReactNode;
}) {
  return (
    <aside className="wide my-8 rounded-card border border-line bg-surface p-5">
      <p className="t-h3 flex items-center gap-2 text-[16px]">
        <IconSparkle width={18} height={18} className="text-brand" />
        {judul}
      </p>
      <div className="t-body mt-2 text-muted [&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
