"use client";
import { motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function StoryContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", company: "" });
      } else if (data.message === "Email configuration missing.") {
        const subject = `Portfolio inquiry from ${form.name}`;
        const body = `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
        window.open(`mailto:mgathan1@asu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        setStatus("success");
        setForm({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please email me directly.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(34,211,238,0.12)",
    borderRadius: 10,
    padding: "14px 18px",
    fontSize: 14,
    color: "#eae5ec",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{ width: "100%", padding: "120px 0 100px", background: "#050810", position: "relative", overflow: "hidden" }}
    >
      <div className="teal-divider" />
      <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "#22d3ee", borderRadius: "50%", filter: "blur(180px)", opacity: 0.04, pointerEvents: "none" }} />

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
          style={{ fontSize: "clamp(44px, 6vw, 96px)", fontWeight: 400, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1, textAlign: "center", marginBottom: 16, background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Let&apos;s <span style={{ fontWeight: 700 }}>Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: "clamp(15px, 1.3vw, 19px)", color: "#6b6475", textAlign: "center", maxWidth: 480, margin: "0 auto 60px" }}>
          Open to software, AI, and data engineering internships.<br />
          Let&apos;s build something great.
        </motion.p>

        {/* Two-column layout: form + direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start", maxWidth: 900, margin: "0 auto" }}
          className="contact-grid"
        >
          {/* Form */}
          {status === "success" ? (
            <div style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 16, padding: "48px 40px", textAlign: "center" }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>✓</p>
              <p style={{ fontSize: 18, color: "#22d3ee", fontWeight: 600, marginBottom: 8 }}>Message sent!</p>
              <p style={{ fontSize: 14, color: "#6b6475" }}>I&apos;ll get back to you soon.</p>
              <button onClick={() => setStatus("idle")} style={{ marginTop: 24, fontSize: 12, color: "#5eead4", background: "none", border: "1px solid rgba(94,234,212,0.3)", borderRadius: 6, padding: "8px 16px", cursor: "pointer", letterSpacing: "1px" }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Honeypot — hidden from users */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-name-email">
                <input
                  type="text" placeholder="Your name" required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.12)")}
                />
                <input
                  type="email" placeholder="Your email" required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.12)")}
                />
              </div>
              <textarea
                placeholder="Your message…" required rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.12)")}
              />
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#f87171" }}>{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "14px 32px", background: status === "sending" ? "rgba(34,211,238,0.1)" : "rgba(34,211,238,0.12)",
                  border: "1px solid rgba(34,211,238,0.3)", borderRadius: 10,
                  color: "#22d3ee", fontSize: 13, letterSpacing: "2px",
                  textTransform: "uppercase", fontWeight: 500, cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (status !== "sending") (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,0.12)"; }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}

          {/* Right: direct links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 4 }}>
            <div>
              <p style={{ fontSize: 11, color: "#6b6475", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>Email</p>
              <a href="mailto:mgathan1@asu.edu" style={{ fontSize: 15, color: "#22d3ee", textDecoration: "none", borderBottom: "1px solid rgba(34,211,238,0.3)", paddingBottom: 2, transition: "border-color 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#22d3ee")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.3)")}
              >
                mgathan1@asu.edu
              </a>
            </div>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/matin-gathani-185a7a192" },
              { label: "GitHub", href: "https://github.com/matingathani" },
              { label: "Résumé", href: "/MatinGathaniResume2026.pdf" },
            ].map(({ label, href }) => (
              <div key={label}>
                <p style={{ fontSize: 11, color: "#6b6475", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10 }}>{label}</p>
                <a href={href} target="_blank" rel="noreferrer"
                  style={{ fontSize: 14, color: "#a89fad", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#22d3ee")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#a89fad")}
                >
                  View ↗
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer line */}
        <div style={{ marginTop: 80 }}>
          <div className="teal-divider" />
          <p style={{ textAlign: "center", fontSize: 12, color: "#6b6475", letterSpacing: "2px", textTransform: "uppercase", marginTop: 24 }}>
            Matin Gathani · Tempe, AZ · {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr; }
        .form-name-email { grid-template-columns: 1fr; }
        @media (min-width: 640px) { .form-name-email { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 860px) { .contact-grid { grid-template-columns: 1fr auto; } }
      `}</style>
    </section>
  );
}
