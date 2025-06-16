import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCityContext } from '@/components/CityProvider';
import UserTypeSelection from './UserTypeSelection';

const Hero = () => {
  const { selectedCity } = useCityContext();
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);

  const cityImages: { [key: string]: string } = {
    // 中国
    '烟台市': 'https://images.unsplash.com/photo-1613689324556-912a8155e821?q=80&w=1920&h=1080&fit=crop',
    '青岛市': 'https://images.unsplash.com/photo-1596397732835-ded3756a8946?q=80&w=1920&h=1080&fit=crop',
    '济南市': 'https://images.unsplash.com/photo-1603787010414-b5a5951a8332?q=80&w=1920&h=1080&fit=crop',
    '威海市': 'https://images.unsplash.com/photo-1623594198431-744358652934?q=80&w=1920&h=1080&fit=crop',
    '泰安市': 'https://images.unsplash.com/photo-1588334493322-13a1d48a2707?q=80&w=1920&h=1080&fit=crop',
    '济宁市': 'https://images.unsplash.com/photo-1628178694082-f51393359550?q=80&w=1920&h=1080&fit=crop',
    '北京市': 'https://images.unsplash.com/photo-1599846428782-da371a53325a?q=80&w=1920&h=1080&fit=crop',
    '上海市': 'https://images.unsplash.com/photo-1538428312398-6b5d56a36123?q=80&w=1920&h=1080&fit=crop',
    '广州市': 'https://images.unsplash.com/photo-1589033391398-19c2dc336873?q=80&w=1920&h=1080&fit=crop',
    '深圳市': 'https://images.unsplash.com/photo-1581345492478-1a54131b34a6?q=80&w=1920&h=1080&fit=crop',
    '珠海市': 'https://images.unsplash.com/photo-1565278480923-a59616d25f77?q=80&w=1920&h=1080&fit=crop',
    '佛山市': 'https://images.unsplash.com/photo-1622061448895-353a8300a89d?q=80&w=1920&h=1080&fit=crop',
    '东莞市': 'https://images.unsplash.com/photo-1632368912803-510041d8e136?q=80&w=1920&h=1080&fit=crop',
    '杭州市': 'https://images.unsplash.com/photo-1591910816822-2640f34f689f?q=80&w=1920&h=1080&fit=crop',
    '宁波市': 'https://images.unsplash.com/photo-1574895624773-992142d75553?q=80&w=1920&h=1080&fit=crop',
    '温州市': 'https://images.unsplash.com/photo-1605333152745-73c3f25e9854?q=80&w=1920&h=1080&fit=crop',
    '嘉兴市': 'https://images.unsplash.com/photo-1604724498516-16396bc75f1a?q=80&w=1920&h=1080&fit=crop',
    '湖州市': 'https://images.unsplash.com/photo-1584343878345-423533838183?q=80&w=1920&h=1080&fit=crop',
    '南京市': 'https://images.unsplash.com/photo-1621213233866-b4d4734560d2?q=80&w=1920&h=1080&fit=crop',
    '苏州市': 'https://images.unsplash.com/photo-1618580556214-a74e537443d3?q=80&w=1920&h=1080&fit=crop',
    '无锡市': 'https://images.unsplash.com/photo-1579346738096-76483421b8c8?q=80&w=1920&h=1080&fit=crop',
    '常州市': 'https://images.unsplash.com/photo-1625902129532-a5e227786193?q=80&w=1920&h=1080&fit=crop',
    '南通市': 'https://images.unsplash.com/photo-1616499313936-6e10793b80b7?q=80&w=1920&h=1080&fit=crop',
    // 日本
    '东京都': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1920&h=1080&fit=crop',
    '横滨市': 'https://images.unsplash.com/photo-1533160214344-338b7519156a?q=80&w=1920&h=1080&fit=crop',
    '川崎市': 'https://images.unsplash.com/photo-1605152864139-44474a10403c?q=80&w=1920&h=1080&fit=crop',
    '埼玉市': 'https://images.unsplash.com/photo-1599878144208-525790472e38?q=80&w=1920&h=1080&fit=crop',
    '大阪市': 'https://images.unsplash.com/photo-1554037590-a7d53063e5e4?q=80&w=1920&h=1080&fit=crop',
    '京都市': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1920&h=1080&fit=crop',
    '神户市': 'https://images.unsplash.com/photo-1594411191019-35a1a1f4961b?q=80&w=1920&h=1080&fit=crop',
    '奈良市': 'https://images.unsplash.com/photo-1526481280643-33c9362ab7a2?q=80&w=1920&h=1080&fit=crop',
    '名古屋市': 'https://images.unsplash.com/photo-1563829424847-a8276f7f329e?q=80&w=1920&h=1080&fit=crop',
    '静冈市': 'https://images.unsplash.com/photo-1599422059945-8a243d4c2b9a?q=80&w=1920&h=1080&fit=crop',
    '新潟市': 'https://images.unsplash.com/photo-1612182042799-136f043a2992?q=80&w=1920&h=1080&fit=crop',
    // 韩国
    '首尔市': 'https://images.unsplash.com/photo-1533590425396-8d6265f24259?q=80&w=1920&h=1080&fit=crop',
    '釜山市': 'https://images.unsplash.com/photo-1582234394999-a8d6e35593c6?q=80&w=1920&h=1080&fit=crop',
    '济州市': 'https://images.unsplash.com/photo-1598282386867-b7654f5145b2?q=80&w=1920&h=1080&fit=crop',
    // 美国
    '洛杉矶': 'https://images.unsplash.com/photo-1542848329-425234123533?q=80&w=1920&h=1080&fit=crop',
    '旧金山': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&h=1080&fit=crop',
    '圣地亚哥': 'https://images.unsplash.com/photo-1594008137384-245362947a11?q=80&w=1920&h=1080&fit=crop',
    '萨克拉门托': 'https://images.unsplash.com/photo-1580655651856-2d334057880d?q=80&w=1920&h=1080&fit=crop',
    '纽约市': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1920&h=1080&fit=crop',
    '奥尔巴尼': 'https://images.unsplash.com/photo-1618997230671-12c82a2ed29f?q=80&w=1920&h=1080&fit=crop',
    '布法罗': 'https://images.unsplash.com/photo-1599386407049-c1677c7b8e5c?q=80&w=1920&h=1080&fit=crop',
    '休斯敦': 'https://images.unsplash.com/photo-1533106418989-88406e768237?q=80&w=1920&h=1080&fit=crop',
    '达拉斯': 'https://images.unsplash.com/photo-1577713926989-1da551d02c1f?q=80&w=1920&h=1080&fit=crop',
    '奥斯汀': 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=1920&h=1080&fit=crop',
    '圣安东尼奥': 'https://images.unsplash.com/photo-1598822646961-713371427d14?q=80&w=1920&h=1080&fit=crop',
    // 法国
    '巴黎': 'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=1920&h=1080&fit=crop',
    '马赛': 'https://images.unsplash.com/photo-1560662584-135f61334b51?q=80&w=1920&h=1080&fit=crop',
    '尼斯': 'https://images.unsplash.com/photo-1549929946-77296884a292?q=80&w=1920&h=1080&fit=crop',
    '戛纳': 'https://images.unsplash.com/photo-1593895697692-a2472e35b719?q=80&w=1920&h=1080&fit=crop',
    '里昂': 'https://images.unsplash.com/photo-1593113045339-b69d134c4423?q=80&w=1920&h=1080&fit=crop',
    '格勒诺布尔': 'https://images.unsplash.com/photo-1574536417724-4c2203d9dca4?q=80&w=1920&h=1080&fit=crop',
  };

  const defaultImage = 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&h=1080&fit=crop';
  
  const backgroundImage = cityImages[selectedCity] || defaultImage;

  return (
    <>
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

      <UserTypeSelection isOpen={showUserTypeSelection} onClose={() => setShowUserTypeSelection(false)} />
    </>
  );
};

export default Hero;
