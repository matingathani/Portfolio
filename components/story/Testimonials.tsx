"use client";
import { motion } from "framer-motion";
import { content } from "../../lib/content";

export default function StoryTestimonials() {
  return (
    <section
      id="testimonials"
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
          Testimonials
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
          What People <span style={{ fontWeight: 200 }}>Say</span>
        </motion.h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {(content.testimonials ?? []).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                borderColor: "rgba(34,211,238,0.3)",
                boxShadow: "0 0 30px rgba(34,211,238,0.07)",
                y: -4,
              }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(34,211,238,0.1)",
                borderRadius: 16,
                padding: "36px 32px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Large quote mark */}
              <div style={{
                fontSize: 72,
                lineHeight: 0.75,
                color: "#22d3ee",
                opacity: 0.18,
                fontFamily: "Georgia, serif",
                marginBottom: 20,
                userSelect: "none",
              }}>
                &ldquo;
              </div>

              <p style={{
                fontSize: 15,
                color: "#a89fad",
                lineHeight: 1.8,
                marginBottom: 28,
                fontStyle: "italic",
                flexGrow: 1,
              }}>
                {t.quote}
              </p>

              {/* Divider */}
              <div style={{
                width: 32,
                height: 1,
                background: "rgba(34,211,238,0.3)",
                marginBottom: 16,
              }} />

              <div>
                <p style={{ fontSize: 14, color: "#eae5ec", fontWeight: 600, marginBottom: 2 }}>
                  {t.author}
                </p>
                <p style={{ fontSize: 12, color: "#5eead4", letterSpacing: "0.5px" }}>
                  {t.role} &middot; {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
