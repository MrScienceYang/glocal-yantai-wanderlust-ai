
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
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
import SupplyChainPartner from "./pages/SupplyChainPartner";
import CooperationApplication from "./pages/CooperationApplication";
import { CityProvider } from "./components/CityProvider";
import { UserProvider } from "./components/UserProvider";
import LoginPage from "./pages/Login";
import { CartProvider } from "./components/CartProvider";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LogisticsPage from "./pages/Logistics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <UserProvider>
        <CityProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/ai-planning" element={<AIPlanning />} />
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
                <Route path="/partner-hub" element={<PartnerHub />} />
                <Route path="/supply-chain-partner" element={<SupplyChainPartner />} />
                <Route path="/cooperation-application" element={<CooperationApplication />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </CityProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
