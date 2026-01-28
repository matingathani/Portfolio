"use client";

import { motion } from "framer-motion";
import { Testimonial } from "../lib/types";

export default function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      className="card cartoon-bounce"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="relative">
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent3 flex items-center justify-center text-2xl">
          "
        </div>
        <p className="text-sm text-secondary leading-relaxed pt-4">{testimonial.quote}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent4 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
            <p className="text-xs text-muted">
              {testimonial.role}
              {testimonial.company && ` • ${testimonial.company}`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
