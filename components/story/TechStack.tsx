"use client";
import { motion } from "framer-motion";

const row1 = ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "React", "Next.js", "Node.js", "Docker"];
const row2 = ["NLP", "Pandas", "NumPy", "REST APIs", "Git", "Linux", "Postman", "CI/CD", "HTML5", "CSS3"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div className={reverse ? "marquee-track-right" : "marquee-track-left"}
        style={{ display: "flex", gap: 0, width: "max-content" }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 32px",
            borderRight: "1px solid rgba(34,211,238,0.08)",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: reverse ? "#14b8a6" : "#22d3ee",
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "#a89fad",
              letterSpacing: "1px",
              fontWeight: 500,
            }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const skillGroups = [
  { title: "AI & Data", items: ["Python", "NLP", "Pandas", "NumPy", "ML Pipelines", "Feature Eng."] },
  { title: "Backend", items: ["REST APIs", "SQL", "Docker", "Postman", "Testing", "Debugging"] },
  { title: "Frontend", items: ["React", "Next.js", "JavaScript", "HTML5", "CSS3", "Responsive"] },
  { title: "DevOps", items: ["Git", "GitHub", "CI/CD", "Linux", "Shell", "Agile"] },
];

export default function StoryTechStack() {
  return (
    <section
      id="skills"
      style={{ width: "100%", padding: "120px 0", background: "#050810", position: "relative", overflow: "hidden" }}
    >
      <div className="teal-divider" />

      {/* Marquee rows */}
      <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ borderTop: "1px solid rgba(34,211,238,0.07)", borderBottom: "1px solid rgba(34,211,238,0.07)", padding: "4px 0" }}>
          <MarqueeRow items={row1} />
        </div>
        <div style={{ borderBottom: "1px solid rgba(34,211,238,0.07)", padding: "4px 0" }}>
          <MarqueeRow items={row2} reverse />
        </div>
      </div>

      {/* Skills grid */}
      <div className="section-container" style={{ paddingTop: 100 }}>
        <motion.p className="story-label"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 12 }}>
          Tech Stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 4.5vw, 70px)", fontWeight: 400,
            fontFamily: "Space Grotesk, sans-serif", lineHeight: 1, marginBottom: 60,
            background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          Skills &amp; <span style={{ fontWeight: 200 }}>Tools</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(34,211,238,0.08)",
                borderRadius: 16, padding: "28px 24px",
              }}
            >
              <p style={{ fontSize: 12, color: "#22d3ee", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20 }}>
                {group.title}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} style={{
                    fontSize: 13, padding: "5px 12px", borderRadius: 100,
                    border: "1px solid rgba(34,211,238,0.15)",
                    color: "#eae5ec",
                  }}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
