import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 py-12 text-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-200">
            MedAI Perú
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Sistema de Predicción de Tamizajes de Salud Mental y Análisis de Imágenes de Rayos X
          </h2>
          <p className="mt-2 text-xs text-indigo-300/80">
            © 2025 MedAI Perú - Todos los derechos reservados
          </p>
        
          <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-white/10 pt-3">
            <Link
              to="/politicas-privacidad"
              className="inline-flex items-center gap-2 text-xs text-indigo-200 hover:text-white transition-colors cursor-pointer"
            >
              <Shield className="h-3.5 w-3.5" />
              Políticas de Privacidad y Seguridad
            </Link>
            <span className="text-indigo-300/50">•</span>
            <span className="text-xs text-indigo-300/70">
              Protección de datos | Uso académico
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
