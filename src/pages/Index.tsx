
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularDestinations from '@/components/PopularDestinations';
import LocalExperts from '@/components/LocalExperts';
import MysteryBox from '@/components/MysteryBox';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <PopularDestinations />
      <LocalExperts />
      <MysteryBox />
      <Footer />
    </div>
  );
};

export default Index;
