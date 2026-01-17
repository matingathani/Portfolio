"use client";

import dynamic from "next/dynamic";
import { useInView } from "../lib/hooks";

const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => <p className="text-sm text-secondary">Loading form...</p>,
});

export default function LazyContactForm() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref}>
      {inView ? <ContactForm /> : <p className="text-sm text-secondary">Form loads on scroll</p>}
    </div>
  );
}
