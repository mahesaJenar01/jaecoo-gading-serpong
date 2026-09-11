import { ImageResponse } from "next/og";

/**
 * Gambar Open Graph dinamis, dibuat dengan next/og.
 *
 * Sengaja berbasis teks saja: tidak butuh berkas foto, ukurannya kecil, dan
 * dihasilkan saat build sehingga tidak ada permintaan jaringan saat runtime.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BRAND = "#111111";
const INK = "#111111";
const MUTED = "#666666";
const LINE = "#E0E0E0";

export function ogImage({
  eyebrow,
  judul,
  keterangan,
}: {
  eyebrow: string;
  judul: string;
  keterangan?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "96px",
              height: "8px",
              backgroundColor: BRAND,
              borderRadius: "999px",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "26px",
              color: BRAND,
              letterSpacing: "2px",
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              fontSize: judul.length > 52 ? "58px" : "70px",
              lineHeight: 1.12,
              color: INK,
              fontWeight: 700,
              maxWidth: "1000px",
            }}
          >
            {judul}
          </div>
          {keterangan ? (
            <div
              style={{
                display: "flex",
                marginTop: "22px",
                fontSize: "30px",
                color: MUTED,
                maxWidth: "960px",
              }}
            >
              {keterangan}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${LINE}`,
            paddingTop: "28px",
            fontSize: "26px",
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", color: INK, fontWeight: 700 }}>
            JAECOO Gading Serpong
          </div>
          <div style={{ display: "flex" }}>Mahesa Jenar &middot; 0813-1323-2519</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
