
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularDestinations from '@/components/PopularDestinations';
import LocalExperts from '@/components/LocalExperts';
import MysteryBox from '@/components/MysteryBox';
import { useCityContext } from '@/components/CityProvider';
import { useUser } from '@/components/UserProvider';
import { BannerAd } from '@/components/BannerAd';

const Index = () => {
  const { selectedCountry } = useCityContext();
  const { isVip } = useUser();

  return (
    <Layout>
      <Hero />
      {!isVip && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BannerAd />
        </div>
      )}
      <Features />
      <PopularDestinations />
      {selectedCountry === '中国' && <LocalExperts />}
      {selectedCountry === '中国' && <MysteryBox />}
    </Layout>
  );
};

export default Index;
