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
          background: "#fafaf7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          borderLeft: "16px solid #1f4fd8",
        }}
      >
        <div style={{ color: "#1f4fd8", fontSize: 28, marginBottom: 16 }}>matingathani.me</div>
        <div style={{ color: "#1a1a1a", fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Matin Gathani
        </div>
        <div style={{ color: "#4a4a45", fontSize: 32 }}>Data, AI &amp; Software Engineer</div>
        <div style={{ color: "#6b6b64", fontSize: 22, marginTop: 40 }}>
          CS @ ASU · MSc Artificial Intelligence @ Imperial
        </div>
      </div>
    ),
    { ...size }
  );
}
