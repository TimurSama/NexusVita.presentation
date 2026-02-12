import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Medicine from "./pages/Medicine";
import Nutrition from "./pages/Nutrition";
import Movement from "./pages/Movement";
import Psychology from "./pages/Psychology";
import Sleep from "./pages/Sleep";
import Relationships from "./pages/Relationships";
import Spirituality from "./pages/Spirituality";
import Systematization from "./pages/Systematization";
import EconomicModel from "./pages/EconomicModel";
import Roadmap from "./pages/Roadmap";
import InvestmentProposal from "./pages/InvestmentProposal";
import AiPlanner from "./pages/AiPlanner";
import Tokenomics from "./pages/Tokenomics";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/medicine"} component={Medicine} />
      <Route path={"/nutrition"} component={Nutrition} />
      <Route path={"/movement"} component={Movement} />
      <Route path={"/psychology"} component={Psychology} />
      <Route path={"/sleep"} component={Sleep} />
      <Route path={"/relationships"} component={Relationships} />
      <Route path={"/spirituality"} component={Spirituality} />
      <Route path={"/systematization"} component={Systematization} />
      <Route path={"/economic-model"} component={EconomicModel} />
      <Route path={"/roadmap"} component={Roadmap} />
      <Route path={"/investment"} component={InvestmentProposal} />
      <Route path={"/ai-planner"} component={AiPlanner} />
      <Route path={"/tokenomics"} component={Tokenomics} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
