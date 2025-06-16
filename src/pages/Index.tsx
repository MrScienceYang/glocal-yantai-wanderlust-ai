
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
      
      {/* 葡萄酒院校合作专栏 */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-wine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🍷 葡萄酒院校合作专栏
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              携手知名葡萄酒院校，共建专业人才培养体系，推动行业发展与创新
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">专业认证课程</h3>
              <p className="text-gray-600 mb-6">
                与国际知名葡萄酒学院合作，提供专业的侍酒师认证课程和品鉴技能培训
              </p>
              <Button className="w-full gradient-ocean text-white">
                查看课程
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">产学研合作</h3>
              <p className="text-gray-600 mb-6">
                深度校企合作，共同研发新品种，培养行业专业人才，推动技术创新
              </p>
              <Button className="w-full gradient-sunset text-white">
                合作申请
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">实习就业平台</h3>
              <p className="text-gray-600 mb-6">
                为院校学生提供优质实习机会，搭建就业桥梁，助力人才成长发展
              </p>
              <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white">
                人才招聘
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
