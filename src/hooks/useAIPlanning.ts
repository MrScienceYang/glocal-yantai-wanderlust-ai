
import { useState } from 'react';
import { toast } from 'sonner';

interface TravelPreferences {
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
                name: '蓬莱阁历史文化游',
                description: '探访千年古建筑，聆听八仙过海传说',
                location: '蓬莱阁景区',
                time: '09:00-11:30',
                estimatedCost: 100
              },
              {
                name: '张师傅海鲜大餐',
                description: '品尝最新鲜的烟台海鲜，特色鲍鱼推荐',
                location: '芝罘区渔人码头',
                time: '12:00-13:30',
                estimatedCost: 180
              },
              {
                name: '烟台山公园漫步',
                description: '欣赏海岸风光，感受历史文化氛围',
                location: '烟台山公园',
                time: '15:00-17:00',
                estimatedCost: 0
              }
            ]
          },
          {
            activities: [
              {
                name: '八仙渡海口游览',
                description: '体验神话传说中的仙境美景',
                location: '蓬莱八仙渡海口',
                time: '09:30-11:00',
                estimatedCost: 80
              },
              {
                name: '烟台苹果园采摘',
                description: '亲手采摘正宗烟台苹果，享受田园乐趣',
                location: '牟平区苹果园',
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
      toast.success('AI行程规划生成成功！');
      
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
