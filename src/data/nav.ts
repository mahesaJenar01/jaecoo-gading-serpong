/** Navigasi utama. Dipakai header, drawer mobile, dan footer. */
export const navItems = [
  { label: "Harga & Model", href: "/harga" },
  { label: "Produk Lainnya", href: "/produk-lainnya" },
  { label: "Kredit", href: "/kredit" },
  { label: "Test Drive", href: "/test-drive" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
] as const;

export type NavItem = (typeof navItems)[number];
