import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { useCityContext } from './CityProvider';

const Footer = () => {
  const { selectedCountry } = useCityContext();

  // 不同国家的使馆链接
  const embassyLinks = {
    '中国': [
      { name: '国家移民管理局', url: 'https://www.nia.gov.cn/' },
      { name: '外交部领事司', url: 'https://cs.mfa.gov.cn/' }
    ],
    '日本': [
      { name: '日本国家移民局', url: 'https://www.moj.go.jp/isa/' },
      { name: '日本驻华大使馆', url: 'https://www.cn.emb-japan.go.jp/' },
      { name: '中国驻日本大使馆', url: 'http://www.china-embassy.or.jp/' }
    ],
    '韩国': [
      { name: '韩国法务部出入境', url: 'https://www.immigration.go.kr/' },
      { name: '韩国驻华大使馆', url: 'http://chn.mofa.go.kr/' },
      { name: '中国驻韩国大使馆', url: 'http://kr.china-embassy.org/' }
    ],
    '美国': [
      { name: '美国国土安全部', url: 'https://www.dhs.gov/' },
      { name: '美国驻华大使馆', url: 'https://china.usembassy-china.org.cn/' },
      { name: '中国驻美国大使馆', url: 'http://www.china-embassy.org/' }
    ],
    '法国': [
      { name: '法国内政部', url: 'https://www.interieur.gouv.fr/' },
      { name: '法国驻华大使馆', url: 'https://cn.ambafrance.org/' },
      { name: '中国驻法国大使馆', url: 'http://www.amb-chine.fr/' }
    ]
  };

  const socialShareOptions = [
    { name: '微信', icon: '💬', color: 'bg-green-500' },
    { name: '朋友圈', icon: '🔗', color: 'bg-green-600' },
    { name: '抖音', icon: '🎵', color: 'bg-black' },
    { name: '微博', icon: '📱', color: 'bg-red-500' },
    { name: '小红书', icon: '📖', color: 'bg-red-600' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-ocean-400 to-sunset-400 bg-clip-text text-transparent">
              Glocal
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              发现真正的本地味道，AI智能规划与本地达人带路的完美结合，为您打造独一无二的本地体验。
            </p>
            
            {/* 分享选项 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">分享给朋友</h4>
              <div className="flex space-x-2">
                {socialShareOptions.map((option) => (
                  <div 
                    key={option.name}
                    className={`w-8 h-8 ${option.color} rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer text-xs`}
                    title={option.name}
                  >
                    {option.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">智能行程</a></li>
              {selectedCountry === '中国' && (
                <>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">本地达人</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">特色商城</a></li>
                </>
              )}
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">盲盒旅行</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">用户社区</a></li>
            </ul>
          </div>

          {/* 官方链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">官方链接</h3>
            <ul className="space-y-2">
              {embassyLinks[selectedCountry]?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-ocean-400" />
                <span className="text-gray-300">(+86) 173-7541-1453</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-ocean-400" />
                <span className="text-gray-300">glocal@yeah.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Glocal. 保留所有权利.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
