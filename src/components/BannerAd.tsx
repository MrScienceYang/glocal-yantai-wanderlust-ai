
import React from 'react';
import { Youtube } from 'lucide-react';

export const BannerAd = () => {
  return (
    <div className="bg-gray-800 text-white p-4 my-8 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <Youtube className="h-8 w-8 text-red-500 mr-4" />
        <div>
          <p className="font-semibold">探索 Glocal 世界 - 无广告体验</p>
          <p className="text-sm text-gray-300">升级为VIP会员，享受纯净浏览和更多专属特权。</p>
        </div>
      </div>
      <button className="bg-ocean-500 hover:bg-ocean-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        立即升级
      </button>
    </div>
  );
};
