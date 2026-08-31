import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Matin Gathani | Data, AI & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#a78bfa", fontSize: 28, marginBottom: 16 }}>
          matingathani.me
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Matin Gathani
        </div>
        <div style={{ color: "#94a3b8", fontSize: 32 }}>
          Data, AI &amp; Software Engineer
        </div>
        <div style={{ color: "#64748b", fontSize: 22, marginTop: 40 }}>
          CS @ ASU · MSc Business Analytics &amp; AI @ Imperial
        </div>
      </div>
    ),
    { ...size }
  );
}
