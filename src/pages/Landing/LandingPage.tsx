import { useState } from "react";

import { TabNavigation } from "../../components/navigation/TabNavigation";
import { MetricsPanel } from "../../features/model-metrics";
import { ExploratoryPanel } from "../../features/exploratory-analysis";
import { PredictionPanel } from "../../features/prediction";

const TABS = [
  {
    id: "prediction",
    label: "Predicción",
    description: "Configura los filtros y genera una predicción",
  },
  {
    id: "exploratory",
    label: "Análisis Exploratorio",
    description: "Descubre tendencias relevantes en los datos históricos",
  },
  {
    id: "metrics",
    label: "Métricas del Modelo",
    description: "Evalúa el rendimiento del modelo predictivo",
  },
] as const;

export function LandingPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("prediction");

  return (
    <div className="flex flex-col gap-6">
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "prediction" ? <PredictionPanel /> : null}
      {activeTab === "exploratory" ? <ExploratoryPanel /> : null}
      {activeTab === "metrics" ? <MetricsPanel /> : null}
    </div>
  );
}
