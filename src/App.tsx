import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/Landing";
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
          <Route path="/" element={<LandingPage />} />
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
