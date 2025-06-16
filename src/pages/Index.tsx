
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
import { Building2, ArrowRight, ShoppingBag } from 'lucide-react';
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
      
      {/* 葡萄酒院校合作专栏 - 商品展示 */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-wine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🍷 葡萄酒院校合作专栏
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              精选优质梅酒产品，来自四川、重庆知名酒业
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/581586bf-9a04-4325-b99e-30cfa6f061ea.png" 
                alt="冰青青梅果酒·高端版" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">冰青青梅果酒·高端版</h3>
              <p className="text-sm text-gray-600 mb-2">四川梅鹤酒业</p>
              <div className="text-red-600 font-bold">¥280</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/50b76766-a5f0-4b7f-8aae-093afca8061b.png" 
                alt="世外梅林香柚青梅酒" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">世外梅林香柚青梅酒</h3>
              <p className="text-sm text-gray-600 mb-2">马边山水酒业</p>
              <div className="text-red-600 font-bold">¥118</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/1f83017a-893e-4ccb-9008-6709b57df8e6.png" 
                alt="舒醺巧克力威士忌梅酒" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">舒醺巧克力威士忌梅酒</h3>
              <p className="text-sm text-gray-600 mb-2">宜宾五粮液仙林生态酒业</p>
              <div className="text-red-600 font-bold">¥45</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/f17f95a8-00d1-469e-9ad9-b47397319d18.png" 
                alt="桑果之约乖乖梅果酒" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">桑果之约乖乖梅果酒</h3>
              <p className="text-sm text-gray-600 mb-2">泸州顺成和庄园酒业</p>
              <div className="text-red-600 font-bold">¥39.86</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/68a411df-9696-447b-a897-b6ee68c3a8bf.png" 
                alt="梅见原味梅酒" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">梅见原味梅酒</h3>
              <p className="text-sm text-gray-600 mb-2">重庆瓶子星球酒业集团</p>
              <div className="text-red-600 font-bold">¥150</div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-wine-600 hover:from-purple-700 hover:to-wine-700 text-white font-semibold px-8 py-4 text-lg"
            >
              <Link to="/shop" className="inline-flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                进入商城选购
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
