
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
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      
      {/* 合作伙伴入驻专区 */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-12 w-12 text-cyan-400 mr-4" />
              <h2 className="text-4xl font-bold text-white">
                合作伙伴入驻专区
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              携手共创AI驱动的智能商业生态，让科技赋能传统产业，开启数字化转型新篇章
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg"
            >
              <Link to="/partner-hub" className="inline-flex items-center">
                立即入驻
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
