type DescriptiveStatsProps = {
  readonly stats: ReadonlyArray<{
    readonly label: string;
    readonly value: number;
    readonly color?: string;
  }>;
};

export function DescriptiveStats({ stats }: DescriptiveStatsProps) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-indigo-100 via-slate-50 to-white p-6 shadow-lg dark:from-indigo-500/10 dark:via-slate-900 dark:to-slate-900">
      <header className="mb-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">
          Estadísticas Descriptivas
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Panorama rápido de las métricas principales sobre la tasa de
          positividad.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p
              className={[
                "mt-3 text-2xl font-semibold",
                stat.color ?? "text-indigo-500",
              ].join(" ")}
            >
              {stat.value.toFixed(1)}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
