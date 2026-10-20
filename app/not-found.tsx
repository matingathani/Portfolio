import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-start justify-center px-6 py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-heading text-4xl font-semibold text-primary md:text-5xl">This page isn&apos;t here.</h1>
      <p className="mt-4 max-w-md leading-relaxed text-secondary">
        It may have moved. Try the work page or head back home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/work" className="btn-secondary">
          See my work
        </Link>
      </div>
    </div>
  );
}
