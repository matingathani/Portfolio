"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCountUp(end: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return value;
}

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, 1200, inView);

  const display = suffix === "K+" ? `${(count / 1000).toFixed(count >= 1000 ? 0 : 1)}K+`
    : suffix === "." ? (count / 100).toFixed(2)
    : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
    >
      <p style={{
        fontSize: "clamp(32px, 3.5vw, 54px)",
        fontWeight: 700,
        color: "#22d3ee",
        fontFamily: "Space Grotesk, sans-serif",
        lineHeight: 1,
        marginBottom: 6,
      }}>{display}</p>
      <p style={{ fontSize: 13, color: "#6b6475", letterSpacing: "2px", textTransform: "uppercase" }}>{label}</p>
    </motion.div>
  );
}

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
      <div style={{ position: "absolute", right: -100, top: "30%", width: 500, height: 500, background: "#14b8a6", borderRadius: "50%", filter: "blur(160px)", opacity: 0.04, pointerEvents: "none" }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
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

        {/* Animated stats row */}
        <div style={{ display: "flex", gap: "clamp(32px, 5vw, 80px)", marginTop: 64, flexWrap: "wrap" }}>
          <AnimatedStat value={180}   suffix="+"  label="Students mentored" delay={0} />
          <AnimatedStat value={1000}  suffix="+"  label="Bugs diagnosed"     delay={0.08} />
          <AnimatedStat value={10000} suffix="K+" label="Records processed"  delay={0.16} />
          <AnimatedStat value={374}   suffix="."  label="GPA at ASU"         delay={0.24} />
        </div>
      </div>
    </section>
  );
}
