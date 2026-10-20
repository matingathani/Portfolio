type Props = {
  as?: "h1" | "h2";
  id?: string;
  eyebrow?: string;
  title: string;
  children?: string;
};

export default function SectionHeading({ as = "h2", id, eyebrow, title, children }: Props) {
  const Heading = as;
  const size = as === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
  return (
    <div className="mb-10">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading id={id} className={`font-heading font-semibold tracking-tight text-primary ${size}`}>
        {title}
      </Heading>
      {children && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">{children}</p>}
    </div>
  );
}
