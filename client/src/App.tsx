import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { MobileNavigation } from "./components/MobileNavigation";
import { Header } from "./components/Header";
import { TelegramAuth } from "./components/TelegramAuth";
import Home from "./pages/Home";
import Presentation from "./pages/Presentation";
import Dashboard from "./pages/Dashboard";
import DashboardV2 from "./pages/DashboardV2";
import HealthCenter from "./pages/HealthCenter";
import MariaDashboard from "./pages/MariaDashboard";
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
import MovementHealth from "./pages/health/MovementHealth";
import NutritionHealth from "./pages/health/NutritionHealth";
import SleepHealth from "./pages/health/SleepHealth";
import PsychologyHealth from "./pages/health/PsychologyHealth";
import MedicineHealth from "./pages/health/MedicineHealth";
import HealthModules from "./pages/HealthModules";
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
import SpecialistsCatalog from "./pages/SpecialistsCatalog";
import SpecialistProfile from "./pages/SpecialistProfile";
import Booking from "./pages/Booking";
import Onboarding from "./pages/Onboarding";
import Account from "./pages/Account";
import News from "./pages/News";
import NewStyleLanding from "./pages/newstyle";
import LandingV2 from "./pages/LandingV2";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import SpecialistOffer from "./pages/SpecialistOffer";
import CenterOffer from "./pages/CenterOffer";
import CenterCRM from "./pages/CenterCRM";
import UserProfile from "./pages/UserProfile";
import Wallet from "./pages/Wallet";
import CryptoPayment from "./pages/CryptoPayment";
import CreatePost from "./pages/CreatePost";
import CreateStory from "./pages/CreateStory";

function Router() {
  // Check if we're in Telegram Web App
  const isTelegram = typeof window !== 'undefined' && (
    window.location.search.includes('tgWebAppStartParam') || 
    !!window.Telegram?.WebApp
  );
  
  return (
    <Switch>
      {isTelegram ? (
        <Route path={"/"} component={TelegramAuth} />
      ) : (
        <Route path={"/"} component={Home} />
      )}
      <Route path={"/landing"} component={Landing} />
      <Route path={"/presentation"} component={Presentation} />
      <Route path={"/whitepaper"} component={Whitepaper} />
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/dashboard"} component={DashboardV2} />
      <Route path={"/dashboard-v1"} component={Dashboard} />
      <Route path={"/health-center"} component={HealthCenter} />
      <Route path={"/dashboard/maria"} component={MariaDashboard} />
      <Route path={"/health/movement"} component={MovementHealth} />
      <Route path={"/health/nutrition"} component={NutritionHealth} />
      <Route path={"/health/sleep"} component={SleepHealth} />
      <Route path={"/health/psychology"} component={PsychologyHealth} />
      <Route path={"/health/medicine"} component={MedicineHealth} />
      <Route path={"/health/:moduleId"} component={HealthModules} />
      <Route path={"/documents"} component={Documents} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/centers"} component={Centers} />
      <Route path={"/map"} component={Map} />
      <Route path={"/social/friends"} component={Friends} />
      <Route path={"/social/messages"} component={Messages} />
      <Route path={"/social/specialists"} component={SpecialistsCatalog} />
      <Route path={"/specialists"} component={SpecialistsCatalog} />
      <Route path={"/specialist/:username"} component={SpecialistProfile} />
      <Route path={"/specialist/:username/book"} component={Booking} />
      <Route path={"/specialists-old"} component={Specialists} />
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
      <Route path={"/account"} component={Account} />
      <Route path={"/settings"} component={Account} />
      <Route path={"/habits"} component={Habits} />
      <Route path={"/journal"} component={Journal} />
      <Route path={"/ai-chat"} component={AIChat} />
      <Route path={"/environment"} component={() => <div className="p-8">Среда (в разработке)</div>} />
      <Route path={"/newstyle"} component={NewStyleLanding} />
      <Route path={"/v2"} component={LandingV2} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/specialist-offer"} component={SpecialistOffer} />
      <Route path={"/center-offer"} component={CenterOffer} />
      <Route path={"/center/crm"} component={CenterCRM} />
      <Route path={"/u/:username"} component={UserProfile} />
      <Route path={"/wallet"} component={Wallet} />
      <Route path={"/payment/crypto/:planId"} component={CryptoPayment} />
      <Route path={"/create-post"} component={CreatePost} />
      <Route path={"/create-story"} component={CreateStory} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Header />
              <Router />
              <MobileNavigation />
            </TooltipProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
