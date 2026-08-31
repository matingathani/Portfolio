"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ossRepos, OssRepo, OssPR } from "../../lib/oss";
import ScrollReveal from "../../components/ScrollReveal";

const STATUS_COLORS: Record<OssPR["status"], { bg: string; text: string; label: string }> = {
  merged: { bg: "rgba(16,185,129,0.12)", text: "#10b981", label: "Merged" },
  open:   { bg: "rgba(34,211,238,0.10)", text: "#22d3ee", label: "Open"   },
  closed: { bg: "rgba(107,114,128,0.12)", text: "#6b7280", label: "Closed" },
};

// Totals reflect all contributed PRs, not just the highlights listed below.
const totalPRs = "45+";
const mergedPRs = "30+";

function PRCard({ pr }: { pr: OssPR }) {
  const chip = STATUS_COLORS[pr.status];
  return (
    <a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(34,211,238,0.08)",
        borderRadius: 12,
        padding: "20px 24px",
        textDecoration: "none",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.25)";
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,211,238,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.08)";
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "monospace", whiteSpace: "nowrap", marginTop: 2 }}>
          #{pr.number}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase",
          padding: "3px 9px", borderRadius: 20,
          background: chip.bg, color: chip.text, whiteSpace: "nowrap",
        }}>
          {chip.label}
        </span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 500, color: "#eae5ec", lineHeight: 1.4, marginBottom: 8 }}>
        {pr.title}
      </p>
      <p style={{ fontSize: 12, color: "#a89fad", lineHeight: 1.6, margin: 0 }}>
        {pr.description}
      </p>
      <p style={{ fontSize: 11, color: "#22d3ee", marginTop: 12, letterSpacing: "0.5px" }}>
        View PR ↗
      </p>
    </a>
  );
}

function RepoSection({ repo }: { repo: OssRepo }) {
  return (
    <ScrollReveal>
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 600,
              fontFamily: "Space Grotesk, sans-serif",
              color: "#eae5ec",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#22d3ee")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#eae5ec")}
          >
            {repo.name}
          </a>
          <span style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 20,
            background: "rgba(34,211,238,0.08)", color: "#22d3ee",
            fontWeight: 500, letterSpacing: "0.5px",
          }}>
            {repo.prs.length} PR{repo.prs.length !== 1 ? "s" : ""}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#a89fad", marginBottom: 28, letterSpacing: "0.3px" }}>
          {repo.description}
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 16,
        }}>
          {repo.prs.map((pr) => (
            <PRCard key={pr.number} pr={pr} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function OSSPage() {
  return (
    <main style={{ background: "#050810", minHeight: "100vh", paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ width: "var(--cWidth, 90%)", maxWidth: "var(--cMaxWidth, 1200px)", margin: "0 auto", paddingBottom: 80 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}
        >
          Open Source
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 400,
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: 1,
            background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 20,
          }}
        >
          Contributions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 16, color: "#a89fad", maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}
        >
          Bug fixes across production-grade open-source repos — 28 merged into Cloudflare's developer toolkit (Wrangler, Miniflare, Vite plugin), plus Prisma, Vercel Storage, Lexical, and Stripe.js.
        </motion.p>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", gap: 40, flexWrap: "wrap" }}
        >
          {[
            { value: ossRepos.length, label: "Repos" },
            { value: totalPRs, label: "Pull Requests" },
            { value: mergedPRs, label: "Merged" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "#22d3ee", lineHeight: 1 }}>
                {value}
              </p>
              <p style={{ fontSize: 12, color: "#a89fad", letterSpacing: "1px", textTransform: "uppercase", marginTop: 4 }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)", marginBottom: 64 }} />

      {/* Repo sections */}
      <section style={{ width: "var(--cWidth, 90%)", maxWidth: "var(--cMaxWidth, 1200px)", margin: "0 auto", paddingBottom: 120 }}>
        {ossRepos.map((repo) => (
          <RepoSection key={repo.name} repo={repo} />
        ))}
      </section>

      {/* Back link */}
      <div style={{ textAlign: "center", paddingBottom: 80 }}>
        <Link
          href="/#projects"
          style={{
            fontSize: 12, color: "#22d3ee", letterSpacing: "2px", textTransform: "uppercase",
            textDecoration: "none", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 6,
            padding: "9px 20px", display: "inline-block", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,211,238,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          ← Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
