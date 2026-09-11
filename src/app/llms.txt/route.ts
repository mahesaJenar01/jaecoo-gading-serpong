import { llmsTxt } from "@/lib/llms";

/**
 * Disajikan sebagai berkas statis di /llms.txt.
 * force-static membuat isinya dibangun sekali saat build, jadi tidak ada
 * pekerjaan di server saat berkas ini diminta.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
