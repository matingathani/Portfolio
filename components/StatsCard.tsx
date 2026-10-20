type Stat = { value: string; label: string };

export default function StatsCard({ stats }: { stats: Stat[] }) {
  return (
    <div className="w-full rounded-lg border border-border bg-surface p-4 font-mono text-sm sm:w-72">
      <p className="text-muted">$ matin --stats</p>
      <dl className="mt-3 space-y-1.5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <dt className="flex flex-1 items-baseline gap-2 text-secondary after:flex-1 after:border-b after:border-dotted after:border-border after:content-['']">
              {stat.label}
            </dt>
            <dd className="font-medium text-primary">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
