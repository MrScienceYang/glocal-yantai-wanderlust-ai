
import React from 'react';
import { Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from './UserProvider';

export const BannerAd = () => {
  const { t } = useTranslation();
  const { currentUser } = useUser();

  if (currentUser?.isPermanentVip) {
    return null;
  }
  
  return (
    <div className="bg-gray-800 text-white p-4 my-8 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <Youtube className="h-8 w-8 text-red-500 mr-4" />
        <div>
          <p className="font-semibold">{t('banner_ad_title')}</p>
          <p className="text-sm text-gray-300">{t('banner_ad_description')}</p>
        </div>
      </div>
      <button className="bg-ocean-500 hover:bg-ocean-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        {t('upgrade_to_vip')}
      </button>
    </div>
  );
};
