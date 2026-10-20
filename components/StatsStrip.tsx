type Stat = { value: string; label: string };

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 border-y border-border py-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
          <dd className="font-heading text-3xl font-semibold text-primary">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
