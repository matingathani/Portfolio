"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TechTag } from "./TechIcon";

const jobs = [
  {
    role: "Engineering Tutor",
    company: "Arizona State University",
    dates: "Aug 2024 – Present",
    description:
      "Mentored 180+ CS students across 300+ sessions, diagnosing 1,000+ code defects. Improved project quality by 25% and test coverage by 20%.",
    tools: ["Java", "C++", "JUnit", "Git"],
    side: "left" as const,
  },
  {
    role: "Data Intern",
    company: "Musikaar",
    dates: "May 2024 – Aug 2024",
    description:
      "Engineered Python ML/NLP pipelines processing 10,000+ records. Reduced manual effort by 40% and improved model accuracy by 20%.",
    tools: ["Python", "NLP", "HTML", "CSS"],
    side: "right" as const,
  },
  {
    role: "Software Engineer",
    company: "ASU Industry Capstone · Arizona State University",
    dates: "Jan 2025 – Dec 2025",
    description:
      "Built and secured a live Next.js platform for an industry sponsor. Detected and contained a crypto-mining malware attack targeting the Docker build pipeline — hardened the Dockerfile, wrote automated malware detection scripts, and authored a security incident response runbook. Built a 24/7 monitoring and auto-recovery daemon (systemd service, 60-second health checks, automatic container restart). Designed and shipped a GitHub Actions CI/CD pipeline: build → push to GHCR → SSH webhook deploy, cutting deployment time from ~15 min manual to ~2 min automated. Integrated Microsoft Graph API for transactional email (approval notifications, CC routing, HTML templates). Replaced the high-severity xlsx CVE with ExcelJS across all API routes and scripts, and eliminated all TypeScript any types to unblock a CI lint gate that had been blocking merges.",
    tools: ["Next.js", "TypeScript", "Docker", "GitHub Actions", "MySQL", "Microsoft Graph API"],
    side: "left" as const,
  },
];

export default function StoryCareer() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="career"
      ref={sectionRef}
      style={{
        width: "100%",
        padding: "120px 0 160px",
        background: "#050810",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="teal-divider" />

      <div className="section-container" style={{ paddingTop: 80 }}>
        {/* Header */}
        <motion.p
          className="story-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 12 }}
        >
          Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(40px, 5vw, 80px)",
            fontWeight: 400,
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: 1,
            marginBottom: 80,
            background: "linear-gradient(135deg, #22d3ee 0%, #ffffff 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Career <span style={{ fontWeight: 200 }}>Journey</span>
        </motion.h2>

        {/* Timeline container */}
        <div style={{ position: "relative" }}>
          {/* Vertical line background track */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(34,211,238,0.1)",
              transform: "translateX(-50%)",
            }}
          />
          {/* Animated fill */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: 2,
              height: lineHeight as any,
              background: "linear-gradient(to bottom, #22d3ee, #14b8a6)",
              transform: "translateX(-50%)",
              transformOrigin: "top",
            }}
          />

          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            {jobs.map((job, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: job.side === "left" ? "flex-start" : "flex-end",
                  position: "relative",
                }}
              >
                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 24,
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#22d3ee",
                    boxShadow:
                      "0 0 0 4px rgba(34,211,238,0.15), 0 0 20px 6px rgba(34,211,238,0.25)",
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: job.side === "left" ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    borderColor: "rgba(34,211,238,0.35)",
                    boxShadow: "0 0 32px rgba(34,211,238,0.08), inset 0 0 20px rgba(34,211,238,0.03)",
                    y: -3,
                  }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  style={{
                    width: "calc(50% - 48px)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(34,211,238,0.1)",
                    borderRadius: 16,
                    padding: "28px 32px",
                    position: "relative",
                    cursor: "default",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: "#22d3ee",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {job.dates}
                  </p>
                  <h3
                    style={{
                      fontSize: "clamp(18px, 1.8vw, 26px)",
                      fontWeight: 600,
                      color: "#eae5ec",
                      fontFamily: "Space Grotesk, sans-serif",
                      marginBottom: 4,
                    }}
                  >
                    {job.role}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#5eead4",
                      marginBottom: 16,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {job.company}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#a89fad",
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {job.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {job.tools.map(t => (
                      <TechTag key={t} name={t} accent="#5eead4" />
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive: on mobile stack all left */}
      <style>{`
        @media (max-width: 768px) {
          #career .section-container > div:last-child > div > div:first-child { display: none; }
          #career .section-container > div:last-child { padding-left: 0; }
          #career .section-container > div:last-child > div { justify-content: flex-start !important; }
          #career .section-container > div:last-child > div > div:last-child { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
