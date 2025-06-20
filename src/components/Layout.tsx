
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 检查是否在合作伙伴相关页面
  const isPartnerPage = location.pathname.includes('/partner') || 
                       location.pathname.includes('/supply') || 
                       location.pathname.includes('/supplier') ||
                       location.pathname.includes('/cooperation');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={isPartnerPage ? "pt-16" : "pt-16"}>
        {children}
      </main>
      {!isPartnerPage && <Footer />}
    </div>
  );
};

export default Layout;
