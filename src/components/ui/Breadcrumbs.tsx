import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/jsonld";

/**
 * Breadcrumb visual sekaligus JSON-LD BreadcrumbList.
 * Keduanya dirender dari daftar yang sama supaya tidak pernah berbeda isi.
 * Butir terakhir adalah halaman saat ini, jadi tidak ditautkan.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const semua: Crumb[] = [{ nama: "Beranda", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="t-small">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted">
          {semua.map((c, i) => {
            const terakhir = i === semua.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {terakhir ? (
                  <span aria-current="page" className="text-ink">
                    {c.nama}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className="rounded underline-offset-2 hover:text-brand hover:underline"
                    >
                      {c.nama}
                    </Link>
                    <IconChevronRight width={14} height={14} className="text-muted/70" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(semua)} />
    </>
  );
}
