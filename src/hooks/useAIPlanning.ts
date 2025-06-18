import { useState } from 'react';
import { toast } from 'sonner';
import { aiService } from '@/services/aiService';
import { useUser } from '@/components/UserProvider';

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
  transportation: string;
}

interface DayPlan {
  date: string;
  activities: Activity[];
}

interface TravelPlan {
  itinerary: DayPlan[];
  totalCost: number;
  recommendedGroupSize: string;
  startDate: string;
}

// 真实景区数据库
const realAttractionsDatabase = {
  '烟台市': {
    historical: [
      { name: '蓬莱阁', description: '中国古代四大名楼之一，八仙过海传说发源地', cost: 140, duration: '3-4小时' },
      { name: '烟台山景区', description: '近代开埠文化的见证，登高望海的绝佳地点', cost: 50, duration: '2-3小时' },
      { name: '张裕酒文化博物馆', description: '亚洲第一地下大酒窖，了解中国葡萄酒文化', cost: 50, duration: '2小时' }
    ],
    natural: [
      { name: '养马岛', description: '天然海滨浴场，素有"东方夏威夷"之称', cost: 0, duration: '半天' },
      { name: '龙口南山景区', description: '集宗教文化、历史文化、旅游文化于一体', cost: 120, duration: '半天' },
      { name: '昆嵛山国家森林公园', description: '胶东屋脊，道教全真派发祥地', cost: 60, duration: '全天' }
    ],
    entertainment: [
      { name: '海昌鲸鲨海洋公园', description: '亚洲最大的海洋主题公园之一', cost: 280, duration: '全天' },
      { name: '蓬莱欧乐堡梦幻世界', description: '大型主题乐园，适合全家游玩', cost: 230, duration: '全天' }
    ],
    food: [
      { name: '烟台海鲜市场', description: '品尝最新鲜的胶东海鲜', cost: 200, duration: '2小时' },
      { name: '福山拉面馆', description: '中国四大面条之一福山拉面', cost: 50, duration: '1小时' }
    ]
  },
  '青岛市': {
    historical: [
      { name: '栈桥', description: '青岛的象征，伸入海中的石桥', cost: 0, duration: '1-2小时' },
      { name: '八大关', description: '万国建筑博览会，展现青岛历史风貌', cost: 0, duration: '2-3小时' },
      { name: '德国总督楼旧址', description: '德式建筑典范，了解青岛殖民历史', cost: 20, duration: '1小时' }
    ],
    natural: [
      { name: '崂山', description: '海上第一名山，道教圣地', cost: 130, duration: '全天' },
      { name: '金沙滩', description: '沙质细腻的海滨浴场', cost: 0, duration: '半天' },
      { name: '石老人海水浴场', description: '青岛最大的海水浴场', cost: 0, duration: '半天' }
    ],
    entertainment: [
      { name: '青岛啤酒博物馆', description: '了解百年青啤历史，品尝新鲜啤酒', cost: 60, duration: '2小时' },
      { name: '海底世界', description: '亚洲第一座海底隧道水族馆', cost: 130, duration: '3小时' }
    ]
  },
  '东京都': {
    historical: [
      { name: '浅草寺', description: '东京最古老的寺庙，体验传统日本文化', cost: 0, duration: '2-3小时' },
      { name: '明治神宫', description: '供奉明治天皇的神社，体验神道文化', cost: 0, duration: '2小时' },
      { name: '皇居东御苑', description: '原江户城遗址，了解日本历史', cost: 0, duration: '2小时' }
    ],
    modern: [
      { name: '东京塔', description: '东京地标，俯瞰城市全景', cost: 1200, duration: '2小时' },
      { name: '晴空塔', description: '世界第二高塔，现代东京象征', cost: 2100, duration: '2-3小时' },
      { name: '银座', description: '高端购物区，体验现代日本生活', cost: 0, duration: '半天' }
    ],
    entertainment: [
      { name: '迪士尼乐园', description: '亚洲第一座迪士尼主题乐园', cost: 7900, duration: '全天' },
      { name: '上野动物园', description: '日本最古老的动物园，看大熊猫', cost: 600, duration: '3小时' }
    ],
    food: [
      { name: '筑地外市场', description: '品尝最新鲜的海鲜和寿司', cost: 3000, duration: '3小时' },
      { name: '新宿记忆横丁', description: '体验昭和时代的居酒屋文化', cost: 2000, duration: '2小时' }
    ]
  }
};

export const useAIPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const { isVip, isLoggedIn } = useUser();

  // 简化权限检查：登录用户或VIP用户都可以使用
  const hasPermission = isLoggedIn || isVip;

  const generatePlan = async (preferences: TravelPreferences) => {
    if (!hasPermission) {
      toast.error('请先登录使用AI服务');
      return;
    }

    setIsLoading(true);
    
    try {
      // 优先使用ChatGPT 4o AI生成行程
      try {
        console.log('开始调用AI生成行程:', preferences);
        const aiPlan = await aiService.generateItinerary(preferences);
        if (aiPlan && aiPlan.itinerary) {
          setPlan(aiPlan);
          toast.success(`AI智能行程规划生成成功！`);
          return;
        }
      } catch (error) {
        console.error('AI生成失败，使用本地数据:', error);
        toast.warning('AI服务暂不可用，使用本地数据生成行程');
      }

      // 如果AI失败，使用本地数据生成
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const cityAttractions = realAttractionsDatabase[preferences.city];
      const startDate = new Date();
      
      if (!cityAttractions) {
        const mockPlan: TravelPlan = {
          itinerary: [
            {
              date: startDate.toLocaleDateString('zh-CN'),
              activities: [
                {
                  name: `${preferences.city}历史文化游`,
                  description: `探访${preferences.city}的历史文化景点，了解当地文化`,
                  location: `${preferences.city}市中心`,
                  time: '09:00-12:00',
                  estimatedCost: 100,
                  transportation: '建议步行或乘坐公共交通',
                },
                {
                  name: `${preferences.city}特色美食`,
                  description: `品尝${preferences.city}当地特色美食`,
                  location: `${preferences.city}美食街`,
                  time: '12:00-14:00',
                  estimatedCost: 150,
                  transportation: '建议步行',
                }
              ]
            }
          ],
          totalCost: 250,
          recommendedGroupSize: preferences.groupSize || '2',
          startDate: startDate.toLocaleDateString('zh-CN'),
        };
        setPlan(mockPlan);
        toast.success(`${preferences.city}行程规划生成成功！`);
        return;
      }

      // 根据用户兴趣选择景点
      let selectedAttractions: any[] = [];
      const interests = preferences.interests.toLowerCase();
      
      if (interests.includes('历史') || interests.includes('文化')) {
        selectedAttractions.push(...cityAttractions.historical || []);
      }
      if (interests.includes('自然') || interests.includes('风光') || interests.includes('海')) {
        selectedAttractions.push(...cityAttractions.natural || []);
      }
      if (interests.includes('娱乐') || interests.includes('游玩')) {
        selectedAttractions.push(...cityAttractions.entertainment || []);
      }
      if (interests.includes('美食') || interests.includes('吃')) {
        selectedAttractions.push(...cityAttractions.food || []);
      }

      // 如果没有匹配的兴趣，随机选择
      if (selectedAttractions.length === 0) {
        const allAttractions = Object.values(cityAttractions).flat();
        selectedAttractions = allAttractions.slice(0, 4);
      } else {
        selectedAttractions = selectedAttractions.slice(0, 4);
      }

      // 生成行程
      const days = parseInt(preferences.duration) || 2;
      const attractionsPerDay = Math.ceil(selectedAttractions.length / days);
      
      const itinerary: DayPlan[] = [];
      let totalCost = 0;

      for (let day = 0; day < days; day++) {
        const dayAttractions = selectedAttractions.slice(
          day * attractionsPerDay, 
          (day + 1) * attractionsPerDay
        );

        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);

        const activities: Activity[] = dayAttractions.map((attraction, index) => {
          const startTime = 9 + index * 3;
          const endTime = startTime + 2;
          totalCost += attraction.cost;
          
          return {
            name: attraction.name,
            description: attraction.description,
            location: `${preferences.city}${attraction.name}`,
            time: `${startTime.toString().padStart(2, '0')}:00-${endTime.toString().padStart(2, '0')}:00`,
            estimatedCost: attraction.cost,
            transportation: '建议乘坐出租车或公共交通',
          };
        });

        // 添加用餐
        if (day === 0 || !cityAttractions.food) {
          activities.push({
            name: `${preferences.city}特色午餐`,
            description: `品尝${preferences.city}当地特色菜肴`,
            location: `${preferences.city}特色餐厅`,
            time: '12:00-13:30',
            estimatedCost: 80,
            transportation: '根据景点位置决定',
          });
          totalCost += 80;
        }

        itinerary.push({ date: currentDate.toLocaleDateString('zh-CN'), activities });
      }

      const mockPlan: TravelPlan = {
        itinerary,
        totalCost,
        recommendedGroupSize: preferences.groupSize || '2',
        startDate: startDate.toLocaleDateString('zh-CN'),
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

  const grantPermission = () => {
    // 这个函数现在主要用于兼容性，实际权限基于登录状态
    console.log('Permission granted through login status');
  };

  return {
    generatePlan,
    isLoading,
    plan,
    hasPermission,
    grantPermission
  };
};
