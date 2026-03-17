"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StoryEducation() {
  return (
    <section
      id="education"
      style={{
        width: "100%",
        padding: "120px 0",
        background: "#050810",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="teal-divider" />

      <div className="section-container" style={{ paddingTop: 80 }}>
        <motion.p
          className="story-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 12 }}
        >
          Education
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 4.5vw, 70px)",
            fontWeight: 400,
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: 1,
            marginBottom: 60,
            background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Where I <span style={{ fontWeight: 200 }}>Studied</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          whileHover={{
            borderColor: "rgba(34,211,238,0.3)",
            boxShadow: "0 0 40px rgba(34,211,238,0.08)",
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(34,211,238,0.12)",
            borderRadius: 20,
            padding: "44px 52px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          {/* Left: school info */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* ASU Official Logo */}
            <div style={{
              flexShrink: 0,
              background: "#ffffff",
              borderRadius: 12,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 1px rgba(140,29,64,0.15), 0 4px 20px rgba(140,29,64,0.12)",
            }}>
              <Image
                src="/asu-logo.png"
                alt="Arizona State University"
                width={150}
                height={50}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>

            <div>
              <p style={{
                fontSize: 12,
                color: "#22d3ee",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
                Aug 2022 – May 2026
              </p>
              <h3 style={{
                fontSize: "clamp(22px, 2.5vw, 38px)",
                fontWeight: 600,
                color: "#eae5ec",
                fontFamily: "Space Grotesk, sans-serif",
                marginBottom: 8,
              }}>
                Arizona State University
              </h3>
              <p style={{ fontSize: 16, color: "#5eead4", marginBottom: 6, letterSpacing: "0.3px" }}>
                B.S. in Computer Science
              </p>
              <p style={{ fontSize: 14, color: "#6b6475" }}>Tempe, AZ · Ira A. Fulton Schools of Engineering</p>
            </div>
          </div>

          {/* Right: stats */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 700,
                fontFamily: "Space Grotesk, sans-serif",
                color: "#22d3ee",
                lineHeight: 1,
                marginBottom: 6,
              }}>3.74</p>
              <p style={{ fontSize: 11, color: "#6b6475", letterSpacing: "3px", textTransform: "uppercase" }}>GPA</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 700,
                fontFamily: "Space Grotesk, sans-serif",
                color: "#14b8a6",
                lineHeight: 1,
                marginBottom: 6,
              }}>2026</p>
              <p style={{ fontSize: 11, color: "#6b6475", letterSpacing: "3px", textTransform: "uppercase" }}>Graduation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
