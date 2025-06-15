
import { useState } from 'react';
import { toast } from 'sonner';

interface TravelPreferences {
  country: string;
  province: string;
  city: string;
  interests: string;
  budget: string;
  duration: string;
  groupSize: string;
  travelStyle: string;
}

interface Activity {
  name: string;
  description: string;
  location: string;
  time: string;
  estimatedCost: number;
}

interface DayPlan {
  activities: Activity[];
}

interface TravelPlan {
  itinerary: DayPlan[];
  totalCost: number;
  recommendedGroupSize: string;
}

export const useAIPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);

  const generatePlan = async (preferences: TravelPreferences) => {
    setIsLoading(true);
    
    try {
      // 这里应该调用实际的AI API
      // 现在先用模拟数据演示
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPlan: TravelPlan = {
        itinerary: [
          {
            activities: [
              {
                name: `${preferences.city}历史文化游`,
                description: `探访${preferences.city}的千年古建筑，聆听当地传说`,
                location: `${preferences.city}核心景区`,
                time: '09:00-11:30',
                estimatedCost: 100
              },
              {
                name: '当地特色美食',
                description: `品尝最正宗的${preferences.city}特色菜，当地人推荐`,
                location: `${preferences.city}老城区`,
                time: '12:00-13:30',
                estimatedCost: 180
              },
              {
                name: `${preferences.city}风光漫步`,
                description: `欣赏${preferences.city}独特风光，感受当地文化氛围`,
                location: `${preferences.city}风景区`,
                time: '15:00-17:00',
                estimatedCost: 0
              }
            ]
          },
          {
            activities: [
              {
                name: `${preferences.city}特色体验`,
                description: `体验${preferences.city}独有的文化活动`,
                location: `${preferences.city}体验中心`,
                time: '09:30-11:00',
                estimatedCost: 80
              },
              {
                name: `${preferences.city}特产购物`,
                description: `购买${preferences.city}最地道的特产，享受购物乐趣`,
                location: `${preferences.city}特产市场`,
                time: '14:00-16:00',
                estimatedCost: 60
              }
            ]
          }
        ],
        totalCost: 420,
        recommendedGroupSize: preferences.groupSize || '2'
      };

      setPlan(mockPlan);
      toast.success(`${preferences.city}AI行程规划生成成功！`);
      
    } catch (error) {
      console.error('生成行程失败:', error);
      toast.error('生成行程失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePlan,
    isLoading,
    plan
  };
};
