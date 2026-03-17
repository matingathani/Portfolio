"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StoryLanding() {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        height: "100svh",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050810",
      }}
    >
      {/* Ambient teal glow top-left */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 400, height: 400,
        background: "#22d3ee",
        borderRadius: "50%",
        filter: "blur(120px)",
        opacity: 0.06,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Ambient teal glow bottom-right */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: 350, height: 350,
        background: "#14b8a6",
        borderRadius: "50%",
        filter: "blur(100px)",
        opacity: 0.05,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* LEFT — name intro */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          position: "absolute",
          left: "clamp(24px, 8vw, 120px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <p style={{
          fontSize: "clamp(13px, 1.1vw, 18px)",
          textTransform: "uppercase",
          letterSpacing: "5px",
          color: "#22d3ee",
          fontWeight: 400,
          marginBottom: 12,
        }}>Hello! I&apos;m</p>
        <h1 style={{
          fontSize: "clamp(42px, 5.5vw, 88px)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: "#eae5ec",
          fontFamily: "Space Grotesk, sans-serif",
          margin: 0,
        }}>
          MATIN<br />
          <span style={{ fontWeight: 300, color: "#a89fad" }}>GATHANI</span>
        </h1>
      </motion.div>

      {/* CENTER — photo */}
      <div style={{
        position: "relative",
        width: "clamp(260px, 28vw, 420px)",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {/* Rim glow circle beneath photo */}
        <div style={{
          position: "absolute",
          bottom: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: 120,
          background: "#22d3ee",
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.25,
          zIndex: 1,
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.25,0.46,0.45,0.94] }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            borderRadius: "200px 200px 120px 120px",
            overflow: "hidden",
            border: "1px solid rgba(34,211,238,0.2)",
            zIndex: 2,
          }}
        >
          <Image
            src="/profile-photo.webp"
            alt="Matin Gathani"
            fill
            priority
            sizes="(max-width: 768px) 260px, 420px"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
          />
          {/* Bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "35%",
            background: "linear-gradient(to top, #050810 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>

      {/* RIGHT — role */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          position: "absolute",
          right: "clamp(24px, 8vw, 120px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          textAlign: "right",
        }}
      >
        <p style={{
          fontSize: "clamp(13px, 1.1vw, 18px)",
          textTransform: "uppercase",
          letterSpacing: "5px",
          color: "#22d3ee",
          fontWeight: 400,
          marginBottom: 8,
        }}>A Software &amp;</p>
        <h2 style={{
          fontSize: "clamp(36px, 4.5vw, 72px)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: "#eae5ec",
          fontFamily: "Space Grotesk, sans-serif",
          margin: 0,
          marginBottom: 16,
        }}>
          DATA<br />
          <span style={{ color: "#22d3ee" }}>ENGINEER</span>
        </h2>
        <p style={{
          fontSize: "clamp(12px, 0.95vw, 15px)",
          color: "#6b6475",
          letterSpacing: "1px",
          lineHeight: 1.6,
          maxWidth: 200,
          marginLeft: "auto",
        }}>
          ASU Computer Science<br />
          Tempe, AZ
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 10,
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "3px", color: "#6b6475", textTransform: "uppercase" }}>Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #22d3ee, transparent)" }}
        />
      </motion.div>

      {/* Nav fade at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 130,
        background: "linear-gradient(to bottom, #050810 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 12,
      }} />
    </section>
  );
}
