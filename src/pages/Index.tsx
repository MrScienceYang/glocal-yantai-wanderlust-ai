
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularDestinations from '@/components/PopularDestinations';
import LocalExperts from '@/components/LocalExperts';
import MysteryBox from '@/components/MysteryBox';
import Footer from '@/components/Footer';
import { useCityContext } from '@/components/Navbar';

const Index = () => {
  const { selectedCountry } = useCityContext();

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <PopularDestinations />
      {selectedCountry === '中国' && <LocalExperts />}
      <MysteryBox />
      <Footer />
    </div>
  );
};

export default Index;
