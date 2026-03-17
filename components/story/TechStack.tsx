"use client";
import { motion } from "framer-motion";
import { TechIcon, TechTag } from "./TechIcon";

const proficiencies = [
  { name: "Python", value: 94 },
  { name: "JavaScript / TypeScript", value: 89 },
  { name: "Java", value: 90 },
  { name: "SQL", value: 87 },
  { name: "React / Next.js", value: 85 },
];

const row1 = ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "React", "Next.js", "Node.js", "Docker"];
const row2 = ["NLP", "Pandas", "NumPy", "REST APIs", "Git", "Linux", "Postman", "CI/CD", "HTML5", "CSS3"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div
        className={reverse ? "marquee-track-right" : "marquee-track-left"}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "16px 36px",
            borderRight: "1px solid rgba(34,211,238,0.07)",
            whiteSpace: "nowrap",
          }}>
            <TechIcon name={item} size={20} />
            <span style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "#a89fad",
              letterSpacing: "0.5px",
              fontWeight: 500,
            }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const skillGroups = [
  {
    title: "AI & Data",
    accent: "#22d3ee",
    items: ["Python", "NLP", "Pandas", "NumPy", "REST APIs", "SQL"],
  },
  {
    title: "Backend & APIs",
    accent: "#5eead4",
    items: ["REST APIs", "Docker", "Git", "Postman", "Testing", "CI/CD"],
  },
  {
    title: "Frontend",
    accent: "#14b8a6",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "DevOps & Tools",
    accent: "#22d3ee",
    items: ["Git", "GitHub", "Docker", "Linux", "Shell", "Agile"],
  },
];

export default function StoryTechStack() {
  return (
    <section
      id="skills"
      style={{ width: "100%", padding: "120px 0", background: "#050810", position: "relative", overflow: "hidden" }}
    >
      <div className="teal-divider" />

      {/* Marquee rows */}
      <div style={{ marginTop: 60 }}>
        <div style={{ borderTop: "1px solid rgba(34,211,238,0.07)", borderBottom: "1px solid rgba(34,211,238,0.07)", padding: "6px 0" }}>
          <MarqueeRow items={row1} />
        </div>
        <div style={{ borderBottom: "1px solid rgba(34,211,238,0.07)", padding: "6px 0" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ borderColor: `${group.accent}40`, y: -2 }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${group.accent}18`,
                borderRadius: 16, padding: "28px 24px",
              }}
            >
              <p style={{ fontSize: 11, color: group.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20 }}>
                {group.title}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map(item => (
                  <TechTag key={item} name={item} accent={group.accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginTop: 60 }}
        >
          <p style={{
            fontSize: 11, color: "#22d3ee",
            letterSpacing: "3px", textTransform: "uppercase",
            marginBottom: 32,
          }}>
            Proficiency
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {proficiencies.map((skill, i) => (
              <div key={skill.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#a89fad", letterSpacing: "0.5px" }}>{skill.name}</span>
                  <span style={{ fontSize: 13, color: "#22d3ee", fontWeight: 600 }}>{skill.value}%</span>
                </div>
                <div style={{
                  height: 3, width: "100%",
                  background: "rgba(34,211,238,0.08)",
                  borderRadius: 2, overflow: "hidden",
                }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      width: `${skill.value}%`,
                      background: "linear-gradient(to right, #22d3ee, #14b8a6)",
                      borderRadius: 2,
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
