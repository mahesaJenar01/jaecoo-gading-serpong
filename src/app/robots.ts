import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Seluruh crawler diizinkan, termasuk crawler model bahasa.
 * Situs ini memang ingin dikutip: daftar harga dan spesifikasinya berguna
 * untuk menjawab pertanyaan calon pembeli di mesin pencari maupun asisten AI.
 */
const CRAWLER_AI = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...CRAWLER_AI.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
