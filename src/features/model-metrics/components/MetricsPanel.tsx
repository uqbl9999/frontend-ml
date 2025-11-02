import { useMetricsData } from "../hooks/useMetricsData";

export function MetricsPanel() {
  const { metrics } = useMetricsData();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">
      <header className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-slate-900">
          Métricas del Modelo
        </h2>
        <p className="text-sm text-slate-500">
          Valida el desempeño del modelo predictivo y define acciones de
          mejora.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.id}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
            <p className="text-xs text-slate-500">{metric.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
