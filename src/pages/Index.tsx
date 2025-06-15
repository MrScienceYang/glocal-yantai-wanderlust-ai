
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularDestinations from '@/components/PopularDestinations';
import LocalExperts from '@/components/LocalExperts';
import MysteryBox from '@/components/MysteryBox';
import { useCityContext } from '@/components/CityProvider';

const Index = () => {
  const { selectedCountry } = useCityContext();

  return (
    <Layout>
      <Hero />
      <Features />
      <PopularDestinations />
      {selectedCountry === '中国' && <LocalExperts />}
      {selectedCountry === '中国' && <MysteryBox />}
    </Layout>
  );
};

export default Index;
