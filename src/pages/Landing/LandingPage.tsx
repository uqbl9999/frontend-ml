import { Activity, BarChart3, LineChart, Image as ImageIcon, Info, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { MetricsPanel } from "../../features/model-metrics";
import { ExploratoryPanel } from "../../features/exploratory-analysis";
import { PredictionPanel } from "../../features/prediction";

const TABS = [
  {
    id: "prediction",
    label: "Predicción",
    description: "Configura los filtros y genera una predicción",
    icon: Activity,
  },
  {
    id: "exploratory",
    label: "Análisis Exploratorio",
    description: "Descubre tendencias relevantes en los datos históricos",
    icon: LineChart,
  },
  {
    id: "metrics",
    label: "Métricas del Modelo",
    description: "Evalúa el rendimiento del modelo predictivo",
    icon: BarChart3,
  },
  {
    id: "tamizajes",
    label: "Rayos X",
    description: "Detección por rayos X y estado del modelo",
    icon: ImageIcon,
  },
] as const;

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<string>("prediction");

  return (
    <>
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-600 p-8 text-white shadow-lg dark:from-indigo-600 dark:via-indigo-500 dark:to-sky-500">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.35),_transparent_60%)]" />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1 min-w-[260px]">
            <Badge variant="secondary" className="bg-white/10 text-white">
              <Sparkles className="h-4 w-4" />
              Modelo Predictivo de Tamizajes
            </Badge>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Sistema de Predicción de Salud Mental
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/90">
              Plataforma analítica para estimar la tasa de positividad en tamizajes de salud mental y orientar decisiones estratégicas de prevención.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20 border-white/30"
              onClick={() => setActiveTab("prediction")}
            >
              Comenzar ahora
            </Button>
          </div>
        </div>
        <Separator className="my-6 border-white/20 bg-white/20" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Activity, title: "Predicción", desc: "Configura filtros y calcula una proyección." , tab: "prediction"},
            { Icon: LineChart, title: "Análisis Exploratorio", desc: "Explora patrones y tendencias históricas.", tab: "exploratory" },
            { Icon: BarChart3, title: "Métricas del Modelo", desc: "Evalúa desempeño y estabilidad.", tab: "metrics" },
            { Icon: ImageIcon, title: "Rayos X", desc: "Analiza imágenes asistidas por IA.", tab: "tamizajes" },
          ].map(({ Icon, title, desc, tab }) => (
            <button
              key={title}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="group flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-left transition hover:bg-white/15 cursor-pointer"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{title}</span>
                <span className="text-xs text-white/80">{desc}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <Card className="bg-white/90 backdrop-blur dark:bg-slate-900/90">
          <CardHeader className="gap-2">
            <Badge variant="default" className="w-fit">
              <Info className="h-4 w-4" />
              Cómo usar el sistema
            </Badge>
            <CardTitle className="text-2xl">Guía rápida de 4 pasos</CardTitle>
            <CardDescription>
              Sigue estos pasos para obtener una estimación y analizar resultados.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Selecciona filtros",
                desc: "Elige Departamento, Provincia, Etapa, Tamizaje, Sexo y Mes.",
                Icon: Activity,
                tab: "prediction",
              },
              {
                step: "2",
                title: "Genera la predicción",
                desc: "Pulsa Predecir y espera el cálculo.",
                Icon: CheckCircle2,
                tab: "prediction",
              },
              {
                step: "3",
                title: "Explora los datos",
                desc: "Revisa distribución y mapas de calor por segmentos.",
                Icon: LineChart,
                tab: "exploratory",
              },
              {
                step: "4",
                title: "Evalúa el modelo",
                desc: "Consulta métricas y relevancia de variables.",
                Icon: BarChart3,
                tab: "metrics",
              },
            ].map(({ step, title, desc, Icon, tab }) => (
              <div
                key={step}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="absolute -top-3 -left-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Paso {step}
                </div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  <Icon className="h-4 w-4 text-indigo-500" />
                  {title}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200">{desc}</p>
                <Button
                  variant="ghost"
                  className="mt-3 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300"
                  onClick={() => setActiveTab(tab)}
                >
                  Ir a la sección
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <Card className="bg-white/90 backdrop-blur dark:bg-slate-900/90">
          <CardHeader className="gap-2">
            <Badge variant="default" className="w-fit">
              <ImageIcon className="h-4 w-4" />
              Guía de Rayos X
            </Badge>
            <CardTitle className="text-2xl">Instrucciones para análisis por imágenes</CardTitle>
            <CardDescription>
              Sigue estos pasos para cargar, previsualizar y analizar una radiografía torácica.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Carga la imagen",
                desc: "Arrastra o selecciona un archivo JPG/PNG hasta 10MB.",
                Icon: ImageIcon,
                link: "/tamizajes-imagenes",
              },
              {
                step: "2",
                title: "Previsualiza",
                desc: "Verifica la imagen, haz zoom y rota si es necesario.",
                Icon: ImageIcon,
                link: "/tamizajes-imagenes",
              },
              {
                step: "3",
                title: "Analiza con IA",
                desc: "Ejecuta el análisis y espera el resultado.",
                Icon: Activity,
                link: "/tamizajes-imagenes",
              },
              {
                step: "4",
                title: "Revisa y comparte",
                desc: "Explora probabilidades, descarga y comparte el resumen.",
                Icon: CheckCircle2,
                link: "/tamizajes-imagenes/modelo-info",
              },
            ].map(({ step, title, desc, Icon, link }) => (
              <div
                key={step}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="absolute -top-3 -left-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Paso {step}
                </div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  <Icon className="h-4 w-4 text-indigo-500" />
                  {title}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200">{desc}</p>
                <Link
                  to={link}
                  className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 cursor-pointer"
                >
                  Ir a la sección
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger key={tab.id} value={tab.id}>
              <span className="inline-flex items-center gap-3">
                <Icon className="h-5 w-5 text-indigo-500" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {tab.label}
                  </span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {tab.description}
                  </span>
                </span>
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value="prediction">
        <PredictionPanel />
      </TabsContent>

      <TabsContent value="exploratory">
        <ExploratoryPanel />
      </TabsContent>

      <TabsContent value="metrics">
        <MetricsPanel />
      </TabsContent>

      <TabsContent value="tamizajes">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <ImageIcon className="h-6 w-6 text-indigo-500" />
              <h3 className="text-base font-semibold">Análisis de imágenes</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Sube una radiografía torácica, visualiza el preview y ejecuta la
              predicción con loader y botones deshabilitados durante el proceso.
            </p>
            <Link
              to="/tamizajes-imagenes"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            >
              Ir a Tamizajes
            </Link>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-indigo-500" />
              <h3 className="text-base font-semibold">Información del modelo</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Consulta clases, arquitectura y estadísticas del modelo de
              clasificación por imágenes.
            </p>
            <Link
              to="/tamizajes-imagenes/modelo-info"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-slate-200 cursor-pointer"
            >
              Ver información
            </Link>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    </>
  );
}
