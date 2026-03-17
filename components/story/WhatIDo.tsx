"use client";
import { motion } from "framer-motion";
import { TechTag } from "./TechIcon";

const expertise = [
  {
    number: "01",
    title: "AI & ML Engineering",
    description:
      "Building production NLP pipelines, model training workflows, and AI integrations that hold in real-world environments.",
    tags: ["Python", "NLP", "Pandas", "NumPy", "Feature Eng."],
  },
  {
    number: "02",
    title: "Backend & APIs",
    description:
      "Designing RESTful APIs with structured validation, error handling, and performance-focused data flows.",
    tags: ["REST APIs", "Postman", "SQL", "Docker", "Testing"],
  },
  {
    number: "03",
    title: "Full-Stack Delivery",
    description:
      "End-to-end feature delivery in Agile teams — frontend, backend, code reviews, and documentation.",
    tags: ["React", "JavaScript", "Git", "Agile", "CI/CD"],
  },
];

export default function StoryWhatIDo() {
  return (
    <section
      id="whatido"
      style={{
        width: "100%",
        padding: "120px 0",
        background: "#050810",
        position: "relative",
      }}
    >
      <div className="teal-divider" style={{ marginBottom: 0 }} />

      <div className="section-container" style={{ paddingTop: 80 }}>
        <motion.p
          className="story-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 60 }}
        >
          What I Do
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {expertise.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                display: "flex",
                gap: "clamp(24px, 5vw, 80px)",
                padding: "48px 0",
                borderBottom: "1px solid rgba(34,211,238,0.08)",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* Number */}
              <span style={{
                fontSize: "clamp(13px, 1vw, 15px)",
                color: "#22d3ee",
                letterSpacing: "3px",
                fontFamily: "Space Grotesk, sans-serif",
                paddingTop: 6,
                minWidth: 32,
              }}>{item.number}</span>

              {/* Title + desc */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{
                  fontSize: "clamp(28px, 3.2vw, 52px)",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#eae5ec",
                  fontFamily: "Space Grotesk, sans-serif",
                  marginBottom: 20,
                }}>{item.title}</h3>
                <p style={{
                  fontSize: "clamp(14px, 1.1vw, 17px)",
                  color: "#a89fad",
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}>{item.description}</p>
              </div>

              {/* Tags */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignSelf: "center",
                maxWidth: 260,
              }}>
                {item.tags.map((tag) => (
                  <TechTag key={tag} name={tag} accent="#5eead4" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
