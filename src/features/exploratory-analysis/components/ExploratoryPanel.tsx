import { useExploratoryData } from "../hooks/useExploratoryData";

export function ExploratoryPanel() {
  const { insights } = useExploratoryData();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">
      <header className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-slate-900">
          Análisis Exploratorio
        </h2>
        <p className="text-sm text-slate-500">
          Visualiza las tendencias clave de los datos históricos de tamizaje y
          salud mental.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-600">
            Series por Departamento
          </h3>
          <p className="mt-2 text-xs text-slate-500">
            Placeholder para gráficos de líneas con la evolución de la tasa de
            positividad por departamento.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-600">
            Segmentación por Sexo
          </h3>
          <p className="mt-2 text-xs text-slate-500">
            Placeholder para gráficos comparativos de distribución por sexo y
            etapa de vida.
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.id}
            className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              {insight.title}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {insight.value}
            </p>
            <p className="text-xs text-slate-500">{insight.change}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
