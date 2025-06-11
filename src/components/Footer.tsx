
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-ocean-400 to-sunset-400 bg-clip-text text-transparent">
              Glocal烟台
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              发现真正的烟台味道，AI智能规划与本地达人带路的完美结合，为您打造独一无二的烟台体验。
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <Share2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">智能行程</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">本地达人</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">特色商城</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">盲盒旅行</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">用户社区</a></li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-ocean-400" />
                <span className="text-gray-300">山东省烟台市芝罘区</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-ocean-400" />
                <span className="text-gray-300">400-123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-ocean-400" />
                <span className="text-gray-300">hello@glocalyantai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Glocal烟台. 保留所有权利.
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
