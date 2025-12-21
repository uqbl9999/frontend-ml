import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./pages/Home";
import { PredictionDashboard } from "./pages/Landing";
import { UIProvider } from "./providers/ui-provider";
import { Routes, Route } from "react-router-dom";
import { ImageUploadPage } from "./pages/Tamizajes/ImageUploadPage";
import { ResultsPage } from "./pages/Tamizajes/ResultsPage";
import { ModelInfoPage } from "./pages/Tamizajes/ModelInfoPage";

function App() {
  return (
    <UIProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<PredictionDashboard />} />
          <Route path="/tamizajes-imagenes" element={<ImageUploadPage />} />
          <Route
            path="/tamizajes-imagenes/resultados"
            element={<ResultsPage />}
          />
          <Route
            path="/tamizajes-imagenes/modelo-info"
            element={<ModelInfoPage />}
          />
        </Routes>
      </AppShell>
    </UIProvider>
  );
}

export default App;
