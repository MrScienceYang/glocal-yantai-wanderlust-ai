import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { CityProvider } from './components/CityProvider';
import { UserProvider } from './components/UserProvider';
import { CartProvider } from './components/CartProvider';
import PWASplashScreen from './components/PWASplashScreen';
import Index from './pages/Index';
import AIPlanning from './pages/AIPlanning';
import Flights from './pages/Flights';
import Trains from './pages/Trains';
import Hotels from './pages/Hotels';
import Tickets from './pages/Tickets';
import LocalExperts from './pages/LocalExperts';
import Community from './pages/Community';
import Membership from './pages/Membership';
import Login from './pages/Login';
import PartnerHub from './pages/PartnerHub';
import PartnerLogin from './pages/PartnerLogin';
import PartnerDashboard from './pages/PartnerDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import SupplierUploadProduct from './pages/SupplierUploadProduct';
import PaymentPlanAdjustment from './pages/PaymentPlanAdjustment';
import DevelopmentMilestones from './pages/DevelopmentMilestones';
import InvestorRelations from './pages/InvestorRelations';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';
import InnovationCompetition from './pages/InnovationCompetition';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CityProvider>
          <CartProvider>
            <Router>
              <Toaster />
              <PWASplashScreen />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ai-planning" element={<AIPlanning />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/local-experts" element={<LocalExperts />} />
                <Route path="/shop" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">特色商城页面开发中...</h1></div>} />
                <Route path="/mystery-box" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">盲盒旅行页面开发中...</h1></div>} />
                <Route path="/community" element={<Community />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/login" element={<Login />} />
                <Route path="/partner-hub" element={<PartnerHub />} />
                <Route path="/partner-login" element={<PartnerLogin />} />
                <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                <Route path="/supplier-upload-product" element={<SupplierUploadProduct />} />
                <Route path="/payment-plan-adjustment" element={<PaymentPlanAdjustment />} />
                <Route path="/development-milestones" element={<DevelopmentMilestones />} />
                <Route path="/investor-relations" element={<InvestorRelations />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/innovation-competition" element={<InnovationCompetition />} />
              </Routes>
            </Router>
          </CartProvider>
        </CityProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
