"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TechTag } from "./TechIcon";

const projects = [
  {
    number: "01",
    name: "REST API-Based\nData Integration",
    category: "Backend Engineering",
    description:
      "Built a robust data integration system with 5 RESTful API endpoints for ingestion and retrieval. Structured error handling, response validation, and status code management across clients.",
    tech: ["REST APIs", "Postman", "JSON", "Validation"],
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(20,184,166,0.08) 100%)",
    github: "https://github.com/matingathani",
    demo: null,
  },
  {
    number: "02",
    name: "Medical Record\nManagement System",
    category: "Full-Stack Platform",
    description:
      "Containerized full-stack platform for managing 1,000+ simulated patient records with role-based access. Optimized SQL schemas and complex queries for reporting performance.",
    tech: ["JavaScript", "SQL", "Docker", "Role-based Access"],
    accent: "#5eead4",
    gradient: "linear-gradient(135deg, rgba(94,234,212,0.12) 0%, rgba(34,211,238,0.06) 100%)",
    github: "https://github.com/matingathani",
    demo: null,
  },
  {
    number: "03",
    name: "Capstone Sponsor\nWeb Platform",
    category: "Agile Delivery",
    description:
      "Industry-sponsored platform delivered across 6 Agile sprints — 10+ frontend and backend features, 150+ commits, 20+ code reviews, and 100% on-time milestone delivery.",
    tech: ["React", "REST APIs", "Git", "Agile", "CI/CD"],
    accent: "#14b8a6",
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(94,234,212,0.05) 100%)",
    github: "https://github.com/matingathani",
    demo: null,
  },
];

export default function StoryProjects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go(current === 0 ? projects.length - 1 : current - 1);
  const next = () => go(current === projects.length - 1 ? 0 : current + 1);

  const p = projects[current];

  return (
    <section
      id="projects"
      style={{ width: "100%", padding: "120px 0", background: "#050810", position: "relative" }}
    >
      <div className="teal-divider" />
      <div className="section-container" style={{ paddingTop: 80 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <div>
            <motion.p className="story-label"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ marginBottom: 8 }}>
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: "clamp(36px, 4.5vw, 72px)", fontWeight: 400, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1, background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Projects
            </motion.h2>
          </div>
          {/* Arrows */}
          <div style={{ display: "flex", gap: 12 }}>
            {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
              <button key={label} onClick={fn} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(34,211,238,0.3)", background: "transparent", color: "#22d3ee", fontSize: 18, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Slide */}
        <div style={{ border: "1px solid rgba(34,211,238,0.08)", borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 360 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "flex", minHeight: 360, flexWrap: "wrap" }}
            >
              {/* Left — info */}
              <div style={{ flex: 1, minWidth: 280, padding: "48px clamp(24px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: 12, color: p.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>
                  {p.number} — {p.category}
                </p>
                <h3 style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 700, lineHeight: 1.05, fontFamily: "Space Grotesk, sans-serif", color: "#eae5ec", marginBottom: 20, whiteSpace: "pre-line" }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 15, color: "#a89fad", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {p.tech.map(t => <TechTag key={t} name={t} accent={p.accent} />)}
                </div>
                {/* Links */}
                <div style={{ display: "flex", gap: 16 }}>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: p.accent, letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", border: `1px solid ${p.accent}33`, borderRadius: 6, padding: "7px 14px", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${p.accent}14`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#a89fad", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(168,159,173,0.2)", borderRadius: 6, padding: "7px 14px", transition: "all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#eae5ec"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#a89fad"; }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right — accent block */}
              <div style={{ width: "clamp(200px, 35%, 420px)", background: p.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(64px, 8vw, 120px)", fontWeight: 800, fontFamily: "Space Grotesk, sans-serif", color: p.accent, opacity: 0.3, lineHeight: 1 }}>{p.number}</p>
                  <p style={{ fontSize: 13, color: p.accent, letterSpacing: "3px", textTransform: "uppercase", marginTop: 8 }}>{p.category}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? "#22d3ee" : "rgba(34,211,238,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
