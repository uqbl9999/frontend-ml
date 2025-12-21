import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Image as ImageIcon, 
  Activity, 
  BarChart3, 
  LineChart, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Code,
  Cpu,
  Globe,
  ExternalLink,
  BookOpen,
  Info,
  HelpCircle,
  AlertTriangle,
  Users
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const TAMIZAJES_FEATURES = [
  { icon: Activity, text: "Predicción instantánea de tasas de positividad" },
  { icon: LineChart, text: "Exploración de tendencias y patrones históricos" },
  { icon: BarChart3, text: "Gráficos y mapas interactivos de visualización" },
  { icon: Sparkles, text: "Explicaciones claras con recomendaciones de acción" },
  { icon: TrendingUp, text: "Evaluación de la precisión del modelo" },
];

const IMAGENES_FEATURES = [
  { icon: ImageIcon, text: "Detección de COVID-19, Neumonía, Tuberculosis" },
  { icon: Brain, text: "Análisis inteligente de imágenes médicas" },
  { icon: Target, text: "Explicaciones clínicas detalladas" },
  { icon: Zap, text: "Probabilidades por clase" },
  { icon: CheckCircle2, text: "Visualización de resultados" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <section className="relative mb-16 overflow-hidden rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-600 p-8 md:p-12 text-white shadow-lg dark:from-indigo-600 dark:via-indigo-500 dark:to-sky-500">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.35),_transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            MedAI Perú
          </Badge>
          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Transformando Datos en Decisiones Inteligentes
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
            Dos herramientas poderosas para análisis y predicción en salud mental y análisis de imágenes médicas en Perú
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card
            className="group relative cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl dark:hover:border-indigo-400"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredCard("tamizajes")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/app")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-indigo-950/20 dark:to-purple-950/20" />
            <CardContent className="relative p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Brain className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Predicción de Tamizajes
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sistema de Salud Mental
                  </p>
                </div>
              </div>

              <p className="mb-4 text-slate-700 dark:text-slate-300">
                Predice la tasa de positividad en tamizajes de salud mental basándose en 
                características demográficas, geográficas y temporales. Optimiza la asignación 
                de recursos hospitalarios y personal médico especializado.
              </p>
              
              <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-800 dark:bg-indigo-950/20">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0 dark:text-indigo-400" />
                  <div className="text-xs text-indigo-700 dark:text-indigo-300">
                    <p className="font-medium mb-1">¿Qué puedes hacer aquí?</p>
                    <ul className="space-y-1 text-indigo-600 dark:text-indigo-400">
                      <li>• Configurar filtros (departamento, provincia, mes, año)</li>
                      <li>• Generar predicciones de tasa de positividad</li>
                      <li>• Explorar tendencias históricas con gráficos</li>
                      <li>• Evaluar métricas de precisión del modelo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {TAMIZAJES_FEATURES.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                      style={{
                        opacity: hoveredCard === "tamizajes" ? 1 : 0.8,
                        transform: hoveredCard === "tamizajes" ? "translateX(4px)" : "translateX(0)",
                        transition: "all 0.3s ease",
                        transitionDelay: `${idx * 50}ms`,
                      }}
                    >
                      <Icon className="h-4 w-4 text-indigo-500" />
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl group-hover:scale-105"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/app");
                  }}
                >
                  Acceder al Sistema de Predicción
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  💡 Configura filtros y obtén predicciones instantáneas con análisis detallado
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="group relative cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:border-sky-500 hover:shadow-2xl dark:hover:border-sky-400"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredCard("imagenes")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/tamizajes-imagenes")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-cyan-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-sky-950/20 dark:to-cyan-950/20" />
            <CardContent className="relative p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Análisis de Imágenes Médicas
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Rayos X con Análisis Inteligente
                  </p>
                </div>
              </div>

              <p className="mb-4 text-slate-700 dark:text-slate-300">
                Analiza radiografías torácicas para detectar condiciones respiratorias usando 
                tecnología de reconocimiento de imágenes avanzada. Proporciona diagnósticos 
                asistidos con explicaciones clínicas detalladas.
              </p>
              
              {/* Información adicional */}
              <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50/50 p-3 dark:border-sky-800 dark:bg-sky-950/20">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-sky-600 mt-0.5 flex-shrink-0 dark:text-sky-400" />
                  <div className="text-xs text-sky-700 dark:text-sky-300">
                    <p className="font-medium mb-1">¿Qué puedes hacer aquí?</p>
                    <ul className="space-y-1 text-sky-600 dark:text-sky-400">
                      <li>• Subir radiografías de tórax (solo imágenes médicas)</li>
                      <li>• Obtener análisis con probabilidades por condición</li>
                      <li>• Revisar explicaciones clínicas detalladas</li>
                      <li>• Ver información técnica del modelo</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Advertencia sobre tipo de imágenes */}
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-800 dark:bg-amber-950/20">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0 dark:text-amber-400" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Importante:</strong> Solo acepta radiografías de tórax. No suba imágenes de animales, objetos u otras fotografías.
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {IMAGENES_FEATURES.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                      style={{
                        opacity: hoveredCard === "imagenes" ? 1 : 0.8,
                        transform: hoveredCard === "imagenes" ? "translateX(4px)" : "translateX(0)",
                        transition: "all 0.3s ease",
                        transitionDelay: `${idx * 50}ms`,
                      }}
                    >
                      <Icon className="h-4 w-4 text-sky-500" />
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full cursor-pointer bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg transition-all duration-300 hover:from-sky-700 hover:to-cyan-700 hover:shadow-xl group-hover:scale-105"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/tamizajes-imagenes");
                  }}
                >
                  Acceder al Analizador de Imágenes
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  ⚠️ Solo acepta radiografías de tórax. El análisis toma 30-60 segundos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sección: Cómo usar */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
          <CardContent className="p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              ¿Cómo usar MedAI Perú?
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-indigo-200 bg-white p-6 dark:border-indigo-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Predicción de Tamizajes
                  </h4>
                </div>
                <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-indigo-600">1.</span>
                    <span>Selecciona los filtros: departamento, provincia, etapa de vida, tipo de tamizaje, sexo y mes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-indigo-600">2.</span>
                    <span>Haz clic en "Predecir tasa de positividad"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-indigo-600">3.</span>
                    <span>Revisa el resultado: tasa estimada, clasificación de riesgo y recomendaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-indigo-600">4.</span>
                    <span>Explora las otras pestañas para análisis exploratorio y métricas del modelo</span>
                  </li>
                </ol>
              </div>
              
              <div className="rounded-xl border border-sky-200 bg-white p-6 dark:border-sky-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-sky-600" />
                  <h4 className="text-lg font-semibold text-sky-700 dark:text-sky-300">
                    Análisis de Imágenes
                  </h4>
                </div>
                <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">1.</span>
                    <span>Sube una <strong>radiografía de tórax</strong> (solo imágenes médicas, formato JPG/PNG, máx 10MB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">2.</span>
                    <span>Verifica la vista previa para confirmar que es una radiografía válida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">3.</span>
                    <span>Haz clic en "Analizar Imagen" y espera 30-60 segundos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">4.</span>
                    <span>Revisa los resultados: condición detectada, probabilidades y explicación clínica</span>
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <Card className="bg-white/90 backdrop-blur dark:bg-slate-900/90">
          <CardContent className="p-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              ¿Por qué es importante?
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  El Desafío
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  La planificación eficiente de recursos en salud mental y el diagnóstico 
                  médico requieren de predicciones precisas y análisis inteligentes. 
                  Sin herramientas avanzadas, es difícil optimizar la asignación de 
                  personal médico, recursos hospitalarios y realizar diagnósticos rápidos 
                  y precisos.
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold text-sky-600 dark:text-sky-400">
                  Nuestra Solución
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Utilizamos tecnología de inteligencia artificial para proporcionar predicciones 
                  precisas de tasas de positividad en tamizajes y análisis inteligentes 
                  para radiografías torácicas. Nuestros modelos están entrenados con datos 
                  reales y proporcionan explicaciones claras para facilitar la toma de decisiones.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <Card className="bg-white/90 backdrop-blur dark:bg-slate-900/90">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Tecnologías Utilizadas
              </h3>
            </div>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              Este sistema está construido con tecnologías de vanguardia para garantizar 
              precisión, rendimiento y escalabilidad.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-600">
                <div className="mb-3 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Backend</h4>
                </div>
                <ul className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://www.python.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Python 3.8+
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://fastapi.tiangolo.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      FastAPI
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://scikit-learn.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      scikit-learn
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://pandas.pydata.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      pandas & numpy
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://www.uvicorn.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Uvicorn
                    </a>
                  </li>
                </ul>
                <a
                  href="https://fastapi.tiangolo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                >
                  <BookOpen className="h-3 w-3" />
                  Documentación
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-sky-600">
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Frontend</h4>
                </div>
                <ul className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://react.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      React 19
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://www.typescriptlang.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      TypeScript
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://vitejs.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      Vite
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://tailwindcss.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      TailwindCSS
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://recharts.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      Recharts
                    </a>
                  </li>
                </ul>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 cursor-pointer"
                >
                  <BookOpen className="h-3 w-3" />
                  Documentación
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-purple-600">
                <div className="mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Machine Learning</h4>
                </div>
                <ul className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Gradient Boosting
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://scikit-learn.org/stable/modules/ensemble.html#forest" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Random Forest
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      SMOTE (Balanceo)
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <a 
                      href="https://www.tensorflow.org/tutorials/images/cnn" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      CNN (Deep Learning)
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    <span>XAI (IA Explicable)</span>
                  </li>
                </ul>
                <a
                  href="https://scikit-learn.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer"
                >
                  <BookOpen className="h-3 w-3" />
                  Documentación
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Card de Datos */}
              {/* <div className="group rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition-all hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-cyan-600">
                <div className="mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Datos</h4>
                </div>
                <ul className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• 236,527 registros</li>
                  <li>• 43 features</li>
                  <li>• Optimización HP</li>
                  <li>• Validación cruzada</li>
                  <li>• Métricas R², MAE, RMSE</li>
                </ul>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  <Database className="h-3 w-3" />
                  <span>Dataset de tamizajes</span>
                </div>
              </div> */}
            </div>
            
            <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 dark:border-indigo-800 dark:from-indigo-950/30 dark:to-purple-950/30">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                  Equipo de Desarrollo
                </h4>
              </div>
              <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">
                Este proyecto fue desarrollado por el grupo 1 del curso de Machine Learning & Big Data de la maestría de Ingeniería de Sistemas con mención en Ingeniería de Sistemas de la Universidad Nacional Mayor de San Marcos.
              </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Alex Vásquez',
                    'Brandon Urtecho',
                    'Fernando Gutierrez',
                    'Melanie Mantilla'
                  ].map((name, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-indigo-200 bg-white px-4 py-3 text-center text-sm font-medium text-indigo-900 shadow-sm transition hover:border-indigo-300 hover:shadow dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-100 dark:hover:border-indigo-700"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                Advertencias y Limitaciones
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-white p-5 dark:border-amber-800 dark:bg-slate-900">
                <h4 className="mb-3 text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Predicción de Tamizajes
                </h4>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Las predicciones son <strong>estimaciones</strong> basadas en datos históricos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Los resultados deben ser validados por profesionales de salud mental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>El modelo fue entrenado con datos del 2017 - considerar contexto actual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Las tasas pueden variar según factores externos no considerados</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border border-amber-200 bg-white p-5 dark:border-amber-800 dark:bg-slate-900">
                <h4 className="mb-3 text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Análisis de Imágenes
                </h4>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>Solo acepta radiografías de tórax</strong> - no otras imágenes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Es una <strong>herramienta de apoyo diagnóstico</strong>, no reemplaza evaluación médica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Los resultados deben ser revisados por un radiólogo o médico especialista</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>La precisión puede variar según la calidad y tipo de radiografía</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-amber-300 bg-amber-100 p-4 dark:border-amber-700 dark:bg-amber-900/30">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                ⚠️ Importante: Estos sistemas son herramientas de apoyo. Siempre consulte con profesionales médicos calificados para decisiones clínicas.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
