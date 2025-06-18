
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import PWASplashScreen from "@/components/PWASplashScreen";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import AIPlanning from "./pages/AIPlanning";
import LocalExperts from "./pages/LocalExperts";
import Shop from "./pages/Shop";
import MysteryBox from "./pages/MysteryBox";
import Community from "./pages/Community";
import Membership from "./pages/Membership";
import Profile from "./pages/Profile";
import TicketPurchase from "./pages/TicketPurchase";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import PartnerHub from "./pages/PartnerHub";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerDashboard from "./pages/PartnerDashboard";
import SupplyChainPartner from "./pages/SupplyChainPartner";
import CooperationApplication from "./pages/CooperationApplication";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierUploadProduct from "./pages/SupplierUploadProduct";
import { CityProvider } from "./components/CityProvider";
import { UserProvider } from "./components/UserProvider";
import LoginPage from "./pages/Login";
import { CartProvider } from "./components/CartProvider";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LogisticsPage from "./pages/Logistics";
import Flights from "./pages/Flights";
import Trains from "./pages/Trains";
import Hotels from "./pages/Hotels";
import Tickets from "./pages/Tickets";
import OrderDetail from "./pages/OrderDetail";
import DevelopmentMilestones from "./pages/DevelopmentMilestones";
import InvestorRelations from "./pages/InvestorRelations";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <PWAInstallPrompt />
        <PWASplashScreen />
        <UserProvider>
          <CityProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/ai-planning" element={<AIPlanning />} />
                  <Route path="/flights" element={<Flights />} />
                  <Route path="/trains" element={<Trains />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/local-experts" element={<LocalExperts />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/mystery-box" element={<MysteryBox />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ticket/:id" element={<TicketPurchase />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/logistics/:orderId" element={<LogisticsPage />} />
                  <Route path="/order/:orderId" element={<OrderDetail />} />
                  <Route path="/partner-hub" element={<PartnerHub />} />
                  <Route path="/partner-login" element={<PartnerLogin />} />
                  <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                  <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                  <Route path="/supplier-upload-product" element={<SupplierUploadProduct />} />
                  <Route path="/supply-chain-partner" element={<SupplyChainPartner />} />
                  <Route path="/cooperation-application" element={<CooperationApplication />} />
                  <Route path="/development-milestones" element={<DevelopmentMilestones />} />
                  <Route path="/investor-relations" element={<InvestorRelations />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MobileBottomNav />
              </BrowserRouter>
            </CartProvider>
          </CityProvider>
        </UserProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
