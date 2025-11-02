import { usePredictionForm } from "../hooks/usePredictionForm";

export function PredictionPanel() {
  const { fields, onSubmit } = usePredictionForm();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">
      <header className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-slate-900">
          Predicción de Tasa de Positividad
        </h2>
        <p className="text-sm text-slate-500">
          Configure los filtros para proyectar la tasa de positividad estimada
          para el próximo mes.
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        onSubmit={onSubmit}
      >
        {fields.map((field) => (
          <label
            key={field.id}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <span className="text-xs font-semibold uppercase text-slate-500">
              {field.label}
            </span>
            <select
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Predecir tasa de positividad
          </button>
        </div>
      </form>
    </section>
  );
}
