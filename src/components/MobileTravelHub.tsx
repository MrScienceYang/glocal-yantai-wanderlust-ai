
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Train, Hotel, Ticket, ArrowRight } from 'lucide-react';

const MobileTravelHub = () => {
  const navigate = useNavigate();

  const travelServices = [
    {
      icon: MapPin,
      title: 'AI智能规划',
      description: '让AI为您定制专属行程',
      path: '/ai-planning',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Plane,
      title: '机票预订',
      description: '国内外航班，优惠价格',
      path: '/flights',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Train,
      title: '火车票',
      description: '高铁动车，快速出行',
      path: '/trains',
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Hotel,
      title: '酒店住宿',
      description: '精选酒店，舒适体验',
      path: '/hotels',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Ticket,
      title: '景点门票',
      description: '热门景点，免排队入园',
      path: '/tickets',
      color: 'bg-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="md:hidden">
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold mb-4">出行服务</h2>
        <div className="space-y-3">
          {travelServices.map(({ icon: Icon, title, description, path, color, bgColor }) => (
            <Card key={path} className="shadow-sm">
              <CardContent className="p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => navigate(path)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 text-white ${color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTravelHub;
