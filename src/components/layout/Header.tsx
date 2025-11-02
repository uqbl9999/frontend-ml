export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 py-10 text-white shadow-lg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Ministerio de Salud del Perú – Modelo Predictivo
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Sistema de Predicción de Salud Mental
        </h1>
      </div>
    </header>
  );
}
