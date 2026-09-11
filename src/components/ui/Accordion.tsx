import { IconChevronDown } from "@/components/icons";
import type { Faq } from "@/data/types";

/**
 * Akordeon berbasis details/summary.
 *
 * Sengaja tidak memakai "use client": pola bawaan browser sudah benar
 * secara ARIA, bisa dioperasikan dengan keyboard, isinya tetap terbaca
 * saat JavaScript dimatikan, dan tidak menambah satu byte pun JavaScript.
 */
export function Accordion({
  items,
  defaultOpenFirst = false,
  className = "",
}: {
  items: Faq[];
  defaultOpenFirst?: boolean;
  className?: string;
}) {
  return (
    <div className={`divide-y divide-line rounded-card border border-line ${className}`}>
      {items.map((item, i) => (
        <details
          key={item.q}
          className="acc group"
          open={defaultOpenFirst && i === 0}
        >
          <summary className="flex min-h-[56px] items-center justify-between gap-4 px-4 py-3 text-left md:px-5">
            <span className="t-body font-semibold">{item.q}</span>
            <IconChevronDown className="acc-chev shrink-0 text-brand" />
          </summary>
          <div className="px-4 pb-4 md:px-5 md:pb-5">
            <p className="t-body measure text-muted">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
