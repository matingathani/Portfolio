"use client";

import dynamic from "next/dynamic";
import { useInView } from "../lib/hooks";

const ResumeViewer = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="card flex min-h-[520px] items-center justify-center text-sm text-secondary">
      Loading resume...
    </div>
  ),
});

export default function LazyResume({ fileUrl }: { fileUrl: string }) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref}>
      {inView ? (
        <ResumeViewer fileUrl={fileUrl} />
      ) : (
        <div className="card flex min-h-[520px] items-center justify-center text-sm text-secondary">
          Resume preview loads on scroll
        </div>
      )}
    </div>
  );
}
