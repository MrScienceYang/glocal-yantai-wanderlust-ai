import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import PWASplashScreen from './components/PWASplashScreen';
import PartnerHub from './pages/PartnerHub';
import PartnerLogin from './pages/PartnerLogin';
import PartnerDashboard from './pages/PartnerDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import SupplierUploadProduct from './pages/SupplierUploadProduct';
import PaymentPlanAdjustment from './pages/PaymentPlanAdjustment';

function App() {
  return (
    <Router>
      <Toaster />
      <PWASplashScreen />
      <Routes>
        <Route path="/" element={<PartnerHub />} />
        <Route path="/partner-hub" element={<PartnerHub />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="/supplier-upload-product" element={<SupplierUploadProduct />} />
        <Route path="/payment-plan-adjustment" element={<PaymentPlanAdjustment />} />
      </Routes>
    </Router>
  );
}

export default App;
