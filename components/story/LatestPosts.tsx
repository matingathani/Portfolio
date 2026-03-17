"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "../../lib/blog";

export default function StoryLatestPosts() {
  const latest = posts.slice(0, 3);

  return (
    <section
      id="writing"
      style={{ width: "100%", padding: "120px 0", background: "#050810", position: "relative", overflow: "hidden" }}
    >
      <div className="teal-divider" />

      <div className="section-container" style={{ paddingTop: 80 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <div>
            <motion.p className="story-label"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ marginBottom: 8 }}>
              Latest Writing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: "clamp(36px, 4.5vw, 70px)", fontWeight: 400, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1, background: "linear-gradient(135deg, #22d3ee, #ffffff 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              From the <span style={{ fontWeight: 200 }}>Blog</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/blog" style={{ fontSize: 12, color: "#22d3ee", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 6, padding: "9px 18px", transition: "all 0.2s", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,211,238,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              All Posts ↗
            </Link>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {latest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <motion.div
                  whileHover={{ borderColor: "rgba(34,211,238,0.3)", y: -4, boxShadow: "0 8px 30px rgba(34,211,238,0.06)" }}
                  transition={{ duration: 0.2 }}
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(34,211,238,0.1)", borderRadius: 16, padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, color: "#22d3ee", letterSpacing: "2px", textTransform: "uppercase", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: 100, padding: "4px 10px" }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: "#6b6475" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: "clamp(17px, 1.6vw, 22px)", fontWeight: 600, color: "#eae5ec", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.2, marginBottom: 14, flexGrow: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#6b6475", lineHeight: 1.65, marginBottom: 20 }}>
                    {post.summary}
                  </p>
                  <span style={{ fontSize: 12, color: "#22d3ee", letterSpacing: "1px" }}>Read more →</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
