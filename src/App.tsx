
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-planning" element={<AIPlanning />} />
          <Route path="/local-experts" element={<LocalExperts />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mystery-box" element={<MysteryBox />} />
          <Route path="/community" element={<Community />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket/:id" element={<TicketPurchase />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
