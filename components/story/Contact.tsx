"use client";
import { motion } from "framer-motion";

export default function StoryContact() {
  return (
    <section
      id="contact"
      style={{
        width: "100%",
        padding: "120px 0 100px",
        background: "#050810",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="teal-divider" />

      {/* Big teal ambient glow */}
      <div style={{
        position: "absolute", left: "50%", top: "40%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600,
        background: "#22d3ee",
        borderRadius: "50%",
        filter: "blur(180px)",
        opacity: 0.04,
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ paddingTop: 80, position: "relative", zIndex: 1 }}>
        <motion.p className="story-label"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 12, textAlign: "center" }}>
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: "clamp(44px, 6vw, 96px)", fontWeight: 400,
            fontFamily: "Space Grotesk, sans-serif", lineHeight: 1,
            textAlign: "center", marginBottom: 20,
            background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          Let&apos;s <span style={{ fontWeight: 700 }}>Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: "clamp(15px, 1.3vw, 19px)", color: "#6b6475",
            textAlign: "center", marginBottom: 56, maxWidth: 480, margin: "0 auto 56px",
          }}>
          Open to software, AI, and data engineering internships.<br />
          Let&apos;s build something great.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a
            href="mailto:mgathan1@asu.edu"
            style={{
              fontSize: "clamp(18px, 2vw, 28px)",
              color: "#22d3ee",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              borderBottom: "1px solid rgba(34,211,238,0.3)",
              paddingBottom: 4,
              transition: "border-color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#22d3ee")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.3)")}
          >
            mgathan1@asu.edu
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/matin-gathani-185a7a192" },
            { label: "GitHub", href: "https://github.com/matingathani" },
            { label: "Resume", href: "/MatinGathaniResume2026.pdf" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{
                fontSize: 14, color: "#a89fad", letterSpacing: "2px",
                textTransform: "uppercase", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#22d3ee")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#a89fad")}
            >
              {label} ↗
            </a>
          ))}
        </motion.div>

        {/* Bottom line */}
        <div style={{ marginTop: 80 }}>
          <div className="teal-divider" />
          <p style={{
            textAlign: "center", fontSize: 12, color: "#6b6475",
            letterSpacing: "2px", textTransform: "uppercase", marginTop: 24,
          }}>
            Matin Gathani · Tempe, AZ · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
