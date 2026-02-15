import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MobileNavigation } from "./components/MobileNavigation";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Presentation from "./pages/Presentation";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Habits from "./pages/Habits";
import Journal from "./pages/Journal";
import AIChat from "./pages/AIChat";
import InteractiveDemo from "./pages/InteractiveDemo";
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
import Whitepaper from "./pages/Whitepaper";
import Landing from "./pages/Landing";
import Shop from "./pages/Shop";
import Documents from "./pages/Documents";
import Centers from "./pages/Centers";
import Map from "./pages/Map";
import Friends from "./pages/social/Friends";
import Messages from "./pages/social/Messages";
import Specialists from "./pages/social/Specialists";

function Router() {
  // Check if we're in Telegram Web App and show auth page
  const isTelegram = typeof window !== 'undefined' && window.location.search.includes('tgWebAppStartParam') || 
                     (typeof window !== 'undefined' && window.Telegram?.WebApp);
  
  return (
    <Switch>
      {isTelegram && <Route path={"/"} component={TelegramAuth} />}
      {!isTelegram && <Route path={"/"} component={Home} />}
      <Route path={"/landing"} component={Landing} />
      <Route path={"/presentation"} component={Presentation} />
      <Route path={"/whitepaper"} component={Whitepaper} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/documents"} component={Documents} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/centers"} component={Centers} />
      <Route path={"/map"} component={Map} />
      <Route path={"/social/friends"} component={Friends} />
      <Route path={"/social/messages"} component={Messages} />
      <Route path={"/social/specialists"} component={Specialists} />
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
      <Route path={"/calendar"} component={Calendar} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/settings"} component={() => <div className="p-8">Настройки (в разработке)</div>} />
      <Route path={"/habits"} component={Habits} />
      <Route path={"/journal"} component={Journal} />
      <Route path={"/ai-chat"} component={AIChat} />
      <Route path={"/environment"} component={() => <div className="p-8">Среда (в разработке)</div>} />
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
          <Header />
          <Router />
          <MobileNavigation />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
