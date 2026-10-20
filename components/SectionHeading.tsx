type Props = {
  as?: "h1" | "h2";
  id?: string;
  eyebrow?: string;
  title: string;
  children?: string;
};

export default function SectionHeading({ as = "h2", id, eyebrow, title, children }: Props) {
  const Heading = as;
  return (
    <div className="mb-8">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <Heading id={id} className="font-heading text-2xl font-semibold text-primary md:text-3xl">
        {title}
      </Heading>
      {children && <p className="mt-3 max-w-2xl leading-relaxed text-secondary">{children}</p>}
    </div>
  );
}
