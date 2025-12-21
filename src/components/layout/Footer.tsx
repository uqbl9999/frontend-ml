export function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 py-12 text-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-200">
            MedAI Perú
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Sistema de Predicción de Tamizajes de Salud Mental y Análisis de Imágenes de Rayos X
          </h2>
          <p className="mt-2 text-sm text-indigo-100">
            Desarrollado por el grupo 1 del curso de Machine Learning & Big Data de la UNMSM
          </p>
        </div>
      </div>
    </footer>
  );
}
