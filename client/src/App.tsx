import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PhysicalHealth from "./pages/PhysicalHealth";
import PsychoEmotional from "./pages/PsychoEmotional";
import CognitiveHealth from "./pages/CognitiveHealth";
import SocialHealth from "./pages/SocialHealth";
import SleepRecovery from "./pages/SleepRecovery";
import Prevention from "./pages/Prevention";
import Medicine from "./pages/Medicine";
import Systematization from "./pages/Systematization";
import EconomicModel from "./pages/EconomicModel";
import AIPlanner from "./pages/AIPlanner";
import Tokenomics from "./pages/Tokenomics";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/physical-health"} component={PhysicalHealth} />
      <Route path={"/psycho-emotional"} component={PsychoEmotional} />
      <Route path={"/cognitive"} component={CognitiveHealth} />
      <Route path={"/social"} component={SocialHealth} />
      <Route path={"/sleep-recovery"} component={SleepRecovery} />
      <Route path={"/prevention"} component={Prevention} />
      <Route path={"/medicine"} component={Medicine} />
      <Route path={"/systematization"} component={Systematization} />
      <Route path={"/economic"} component={EconomicModel} />
      <Route path={"/ai-planner"} component={AIPlanner} />
      <Route path={"/tokenomics"} component={Tokenomics} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
