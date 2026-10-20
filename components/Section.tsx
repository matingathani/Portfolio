type Props = {
  labelledBy?: string;
  band?: boolean;
  children: React.ReactNode;
};

export default function Section({ labelledBy, band = false, children }: Props) {
  return (
    <section aria-labelledby={labelledBy} className={band ? "border-y border-border bg-band" : undefined}>
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">{children}</div>
    </section>
  );
}
