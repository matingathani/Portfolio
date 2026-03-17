"use client";
import { motion } from "framer-motion";

export default function StoryAbout() {
  return (
    <section
      id="about"
      style={{
        width: "100%",
        padding: "120px 0",
        background: "#050810",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle right glow */}
      <div style={{
        position: "absolute", right: -100, top: "30%",
        width: 500, height: 500,
        background: "#14b8a6",
        borderRadius: "50%",
        filter: "blur(160px)",
        opacity: 0.04,
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Teal label */}
        <motion.p
          className="story-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          About Me
        </motion.p>

        <div style={{ maxWidth: 820 }}>
          <motion.p
            className="story-para"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            I&apos;m a{" "}
            <span style={{ color: "#22d3ee" }}>Computer Science student at ASU</span>
            {" "}focused on building AI/ML pipelines and backend systems that move data reliably
            end-to-end. I care deeply about clean abstractions, rigorous testing, and
            {" "}<span style={{ color: "#5eead4" }}>performance that holds in production</span>.
          </motion.p>

          <motion.p
            className="story-para"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ marginTop: 32, color: "#a89fad" }}
          >
            From mentoring 180+ students on debugging and algorithms to building
            NLP pipelines that cut manual effort by 40% — I ship things that work,
            are documented, and built to last.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "flex",
            gap: "clamp(32px, 5vw, 80px)",
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "180+", label: "Students mentored" },
            { value: "1000+", label: "Bugs diagnosed" },
            { value: "10K+", label: "Records processed" },
            { value: "3.74", label: "GPA at ASU" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{
                fontSize: "clamp(32px, 3.5vw, 54px)",
                fontWeight: 700,
                color: "#22d3ee",
                fontFamily: "Space Grotesk, sans-serif",
                lineHeight: 1,
                marginBottom: 6,
              }}>{value}</p>
              <p style={{ fontSize: 13, color: "#6b6475", letterSpacing: "2px", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
