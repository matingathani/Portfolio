import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, background: "#22d3ee", borderRadius: "50%", filter: "blur(160px)", opacity: 0.04, pointerEvents: "none" }} />

      <p style={{ fontSize: 13, color: "#22d3ee", letterSpacing: "6px", textTransform: "uppercase", marginBottom: 24, position: "relative" }}>
        404
      </p>

      <h1 style={{
        fontSize: "clamp(64px, 12vw, 160px)",
        fontWeight: 700,
        fontFamily: "Space Grotesk, sans-serif",
        lineHeight: 0.9,
        background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: 24,
        position: "relative",
      }}>
        Lost.
      </h1>

      <p style={{ fontSize: "clamp(15px, 1.5vw, 20px)", color: "#6b6475", maxWidth: 400, lineHeight: 1.65, marginBottom: 48, position: "relative" }}>
        This page doesn&apos;t exist. Maybe it was moved, deleted, or never built — like a feature in an abandoned branch.
      </p>

      <Link
        href="/"
        style={{
          fontSize: 12,
          color: "#22d3ee",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          textDecoration: "none",
          border: "1px solid rgba(34,211,238,0.3)",
          borderRadius: 8,
          padding: "12px 28px",
          transition: "all 0.2s",
          display: "inline-block",
          position: "relative",
        }}
      >
        ← Back Home
      </Link>

      <p style={{ position: "absolute", bottom: 32, fontSize: 11, color: "#1a1525", letterSpacing: "3px", textTransform: "uppercase" }}>
        MATIN GATHANI
      </p>
    </div>
  );
}
