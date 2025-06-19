
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
import PartnerHub from './pages/PartnerHub';
import PartnerLogin from './pages/PartnerLogin';
import PartnerDashboard from './pages/PartnerDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import SupplierUploadProduct from './pages/SupplierUploadProduct';
import PaymentPlanAdjustment from './pages/PaymentPlanAdjustment';

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
                <Route path="/partner-hub" element={<PartnerHub />} />
                <Route path="/partner-login" element={<PartnerLogin />} />
                <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                <Route path="/supplier-upload-product" element={<SupplierUploadProduct />} />
                <Route path="/payment-plan-adjustment" element={<PaymentPlanAdjustment />} />
              </Routes>
            </Router>
          </CartProvider>
        </CityProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
