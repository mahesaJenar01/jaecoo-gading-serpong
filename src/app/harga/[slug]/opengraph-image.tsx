import { getModel, models } from "@/data/models";
import { rupiah } from "@/lib/format";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Harga dan spesifikasi model JAECOO";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(slug);

  return ogImage({
    eyebrow: "Harga dan Spesifikasi",
    judul: model ? model.nama : "JAECOO",
    keterangan: model
      ? `${rupiah(model.hargaMulai)} OTR, ${model.tipe}`
      : undefined,
  });
}
