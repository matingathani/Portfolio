"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StoryLanding() {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
        background: "#050810",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 400, height: 400, background: "#22d3ee", borderRadius: "50%", filter: "blur(120px)", opacity: 0.06, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 350, height: 350, background: "#14b8a6", borderRadius: "50%", filter: "blur(100px)", opacity: 0.05, pointerEvents: "none", zIndex: 0 }} />

      {/* Nav fade */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, #050810 0%, transparent 100%)", pointerEvents: "none", zIndex: 12 }} />

      {/* ── Main layout ── */}
      <div className="hero-wrap" style={{ position: "relative", zIndex: 5, width: "100%" }}>

        {/* LEFT — name */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p style={{ fontSize: "clamp(12px, 1.1vw, 17px)", textTransform: "uppercase", letterSpacing: "5px", color: "#22d3ee", fontWeight: 400, marginBottom: 12 }}>
            Hello! I&apos;m
          </p>
          <h1 style={{ fontSize: "clamp(40px, 5.5vw, 88px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#eae5ec", fontFamily: "Space Grotesk, sans-serif", margin: 0 }}>
            MATIN<br />
            <span style={{ fontWeight: 300, color: "#a89fad" }}>GATHANI</span>
          </h1>
        </motion.div>

        {/* CENTER — photo */}
        <motion.div
          className="hero-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "relative", flexShrink: 0 }}
        >
          {/* Rim glow */}
          <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", width: "80%", height: 120, background: "#22d3ee", borderRadius: "50%", filter: "blur(40px)", opacity: 0.25, zIndex: 1 }} />
          <div style={{ position: "relative", borderRadius: "200px 200px 120px 120px", overflow: "hidden", border: "1px solid rgba(34,211,238,0.2)", zIndex: 2 }} className="hero-photo">
            <Image src="/profile-photo.webp" alt="Matin Gathani" fill priority sizes="(max-width: 768px) 220px, 420px" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, #050810 0%, transparent 100%)", pointerEvents: "none" }} />
          </div>
        </motion.div>

        {/* RIGHT — role + badge + resume */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p style={{ fontSize: "clamp(12px, 1.1vw, 17px)", textTransform: "uppercase", letterSpacing: "5px", color: "#22d3ee", fontWeight: 400, marginBottom: 8 }}>
            A Software &amp;
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#eae5ec", fontFamily: "Space Grotesk, sans-serif", margin: 0, marginBottom: 14 }}>
            DATA<br /><span style={{ color: "#22d3ee" }}>ENGINEER</span>
          </h2>
          <p style={{ fontSize: "clamp(12px, 0.9vw, 14px)", color: "#6b6475", letterSpacing: "1px", lineHeight: 1.6, marginBottom: 20 }}>
            ASU Computer Science · Tempe, AZ
          </p>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.22)", borderRadius: 100, padding: "6px 14px", marginBottom: 12 }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 6px 2px rgba(34,211,238,0.5)", flexShrink: 0, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#22d3ee", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>Open to Internships</span>
          </div>
          {/* Resume */}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-cta" style={{ display: "block", padding: "9px 20px", background: "transparent", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 8, fontSize: 11, color: "#5eead4", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", textAlign: "center", transition: "all 0.2s" }}>
            View Résumé
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 10 }}
        className="hero-scroll"
      >
        <p style={{ fontSize: 11, letterSpacing: "3px", color: "#6b6475", textTransform: "uppercase" }}>Scroll</p>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #22d3ee, transparent)" }} />
      </motion.div>

      <style>{`
        /* ── Mobile: stacked column ── */
        .hero-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 28px;
          padding: 110px 24px 100px;
        }
        .hero-left { order: 2; }
        .hero-center { order: 1; }
        .hero-right { order: 3; display: flex; flex-direction: column; align-items: center; }
        .hero-photo { width: 200px; aspect-ratio: 3/4; }

        /* ── Desktop: three-panel absolute layout ── */
        @media (min-width: 900px) {
          .hero-wrap {
            display: block;
            position: relative;
            height: 100svh;
            min-height: 100vh;
            padding: 0;
          }
          .hero-left {
            position: absolute;
            left: clamp(24px, 8vw, 120px);
            top: 50%;
            transform: translateY(-50%);
            text-align: left;
            order: unset;
          }
          .hero-center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            order: unset;
          }
          .hero-photo { width: clamp(260px, 28vw, 420px); aspect-ratio: 3/4; }
          .hero-right {
            position: absolute;
            right: clamp(24px, 8vw, 120px);
            top: 50%;
            transform: translateY(-50%);
            text-align: right;
            align-items: flex-end;
            order: unset;
          }
          .hero-scroll { display: flex; }
        }

        @media (max-width: 899px) {
          .hero-scroll { display: none !important; }
        }

        .pulse-dot { animation: pulse-badge 2s ease-in-out infinite; }
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 0 6px 2px rgba(34,211,238,0.5); }
          50% { box-shadow: 0 0 12px 4px rgba(34,211,238,0.15); }
        }
        .resume-cta:hover {
          background: rgba(34,211,238,0.08) !important;
          border-color: rgba(34,211,238,0.5) !important;
          color: #22d3ee !important;
        }
      `}</style>
    </section>
  );
}
