
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, ShoppingCart, Users, Heart, Calendar } from 'lucide-react';
import { useCityContext } from './CityProvider';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { selectedCity, selectedCountry } = useCityContext();
  const { t } = useTranslation();

  const getFeatures = (t, selectedCountry, selectedCity) => [
    {
      icon: MapPin,
      title: t('features.ai_trip.title'),
      description: t('features.ai_trip.description'),
      details: t('features.ai_trip.details'),
      color: 'ocean'
    },
    ...(selectedCountry === '中国' ? [{
      icon: Users,
      title: t('features.local_experts.title'),
      description: t('features.local_experts.description', { city: selectedCity }),
      details: t('features.local_experts.details'),
      color: 'sunset'
    }, {
      icon: ShoppingCart,
      title: t('features.shop.title'),
      description: t('features.shop.description', { city: selectedCity }),
      details: t('features.shop.details'),
      color: 'ocean'
    }] : []),
    {
      icon: Star,
      title: t('features.mystery_box.title'),
      description: t('features.mystery_box.description'),
      details: t('features.mystery_box.details'),
      color: 'sunset'
    },
    {
      icon: Heart,
      title: t('features.community.title'),
      description: t('features.community.description'),
      details: t('features.community.details'),
      color: 'ocean'
    },
    {
      icon: Calendar,
      title: t('features.membership.title'),
      description: t('features.membership.description'),
      details: t('features.membership.details'),
      color: 'sunset'
    }
  ];

  const features = getFeatures(t, selectedCountry, selectedCity);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('features_headline_prefix')}{' '}
            <span className="text-gradient">Glocal{selectedCity}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features_subheadline', { city: selectedCity })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  feature.color === 'ocean' ? 'gradient-ocean' : 'gradient-sunset'
                }`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {feature.details}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  {t('learn_more')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="gradient-ocean text-white">
            {t('experience_full_features')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
