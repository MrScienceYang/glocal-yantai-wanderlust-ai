
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCityContext } from '@/components/CityProvider';

const Hero = () => {
  const { selectedCity } = useCityContext();

  const cityImages: { [key: string]: string } = {
    '烟台市': 'https://images.unsplash.com/photo-1613689324556-912a8155e821?q=80&w=1920&h=1080&fit=crop',
    '青岛市': 'https://images.unsplash.com/photo-1596397732835-ded3756a8946?q=80&w=1920&h=1080&fit=crop',
    '威海市': 'https://images.unsplash.com/photo-1623594198431-744358652934?q=80&w=1920&h=1080&fit=crop',
    '济南市': 'https://images.unsplash.com/photo-1603787010414-b5a5951a8332?q=80&w=1920&h=1080&fit=crop',
  };

  const defaultImage = 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&h=1080&fit=crop';
  
  const backgroundImage = cityImages[selectedCity] || defaultImage;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${backgroundImage}')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          发现真正的
          <span className="block text-gradient bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            本地味道
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in delay-150">
          AI智能规划 × 本地达人带路 × 特色产品直送
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-300">
          <Link to="/ai-planning">
            <Button size="lg" className="gradient-ocean text-white hover:opacity-90 transition-opacity">
              <MapPin className="mr-2 h-5 w-5" />
              开始我的本地之旅
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <ShoppingCart className="mr-2 h-5 w-5" />
              探索特色商城
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up">
          <Link to="/ai-planning" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 rounded-full gradient-ocean flex items-center justify-center mb-4 mx-auto">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI智能行程</h3>
              <p className="text-gray-300 text-sm">根据你的兴趣和预算，AI为你量身定制专属本地行程</p>
            </div>
          </Link>
          
          <Link to="/local-experts" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 rounded-full gradient-sunset flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">本地达人</h3>
              <p className="text-gray-300 text-sm">真正的本地人带你体验最地道的本土文化和隐藏美食</p>
            </div>
          </Link>
          
          <Link to="/mystery-box" className="block">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 rounded-full gradient-ocean flex items-center justify-center mb-4 mx-auto">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">盲盒旅行</h3>
              <p className="text-gray-300 text-sm">充满惊喜的随机旅行体验，每次都有意想不到的发现</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
