import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/Landing";
import { UIProvider } from "./providers/ui-provider";

function App() {
  return (
    <UIProvider>
      <AppShell>
        <LandingPage />
      </AppShell>
    </UIProvider>
  );
}

export default App;
