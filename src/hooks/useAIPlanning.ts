
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

// 生成有意义的活动名称
const generateActivityName = (activity: any): string => {
  // 如果有明确的活动名称且不是"未命名活动"，直接使用
  const originalName = activity.activity || activity.name;
  if (originalName && originalName.trim() !== '' && originalName.trim() !== '未命名活动') {
    return originalName;
  }
  
  // 根据描述生成活动名称
  const description = activity.description || '';
  const location = activity.location || '';
  
  // 如果描述中包含关键词，提取作为活动名称
  if (description.includes('游览') || description.includes('参观')) {
    if (location && location !== '位置待定') {
      return `游览${location}`;
    }
    return description.substring(0, 20) + (description.length > 20 ? '...' : '');
  }
  
  if (description.includes('品尝') || description.includes('美食') || description.includes('餐')) {
    return description.substring(0, 20) + (description.length > 20 ? '...' : '');
  }
  
  if (description.includes('入住') || description.includes('酒店')) {
    return '入住酒店';
  }
  
  if (description.includes('交通') || description.includes('机场') || description.includes('抵达')) {
    return '交通安排';
  }
  
  // 如果位置信息有用，使用位置作为活动名称
  if (location && location !== '位置待定') {
    return `前往${location}`;
  }
  
  // 最后备选：使用描述的前几个字
  if (description && description !== '暂无描述') {
    return description.substring(0, 15) + (description.length > 15 ? '...' : '');
  }
  
  // 最终备选
  return '行程安排';
};

// 尝试从文本中提取行程信息
const extractItineraryFromText = (textContent: string): DayPlan[] => {
  const itinerary: DayPlan[] = [];
  
  // 按天分割内容
  const dayMatches = textContent.match(/第?\s*(\d+)\s*天[\s\S]*?(?=第?\s*\d+\s*天|$)/g);
  
  if (dayMatches && dayMatches.length > 0) {
    dayMatches.forEach((dayText, index) => {
      const activities: Activity[] = [];
      
      // 提取时间和活动信息
      const timeActivityMatches = dayText.match(/(\d{1,2}[:：]\d{2})\s*[-–—]\s*(\d{1,2}[:：]\d{2})?\s*[：:]\s*([^\n\r]+)/g);
      
      if (timeActivityMatches) {
        timeActivityMatches.forEach(match => {
          const parts = match.split(/[：:]/);
          if (parts.length >= 2) {
            const timeInfo = parts[0].trim();
            const activityInfo = parts.slice(1).join(':').trim();
            
            // 提取费用信息
            const costMatch = activityInfo.match(/(\d+)\s*元/);
            const cost = costMatch ? parseInt(costMatch[1]) : 0;
            
            activities.push({
              name: activityInfo.length > 30 ? activityInfo.substring(0, 30) + '...' : activityInfo,
              description: activityInfo,
              location: '详见行程安排',
              time: timeInfo,
              estimatedCost: cost,
              transportation: '根据具体情况安排'
            });
          }
        });
      }
      
      // 如果没有找到具体时间活动，尝试提取其他格式
      if (activities.length === 0) {
        const generalMatches = dayText.match(/[•·▪▫◦‣⁃]\s*([^\n\r]+)/g);
        if (generalMatches) {
          generalMatches.forEach(match => {
            const activity = match.replace(/[•·▪▫◦‣⁃]\s*/, '').trim();
            if (activity.length > 0) {
              activities.push({
                name: activity.length > 30 ? activity.substring(0, 30) + '...' : activity,
                description: activity,
                location: '详见行程安排',
                time: '待安排',
                estimatedCost: 0,
                transportation: '根据具体情况安排'
              });
            }
          });
        }
      }
      
      // 如果还是没有活动，使用整段文本
      if (activities.length === 0 && dayText.length > 10) {
        const cleanText = dayText.replace(/第?\s*\d+\s*天\s*[：:]?\s*/, '').trim();
        if (cleanText.length > 0) {
          activities.push({
            name: '行程详情',
            description: cleanText,
            location: '详见描述',
            time: '全天',
            estimatedCost: 0,
            transportation: '根据具体情况安排'
          });
        }
      }
      
      if (activities.length > 0) {
        itinerary.push({
          date: `第${index + 1}天`,
          activities
        });
      }
    });
  }
  
  return itinerary;
};

// 转换DeepSeek API响应为组件期望的格式
const convertDeepSeekResponseToTravelPlan = (deepSeekResponse: any): TravelPlan => {
  console.log('开始转换DeepSeek响应:', deepSeekResponse);
  
  try {
    // 处理trip_plan结构（DeepSeek返回的实际结构）
    if (deepSeekResponse.trip_plan) {
      const tripPlan = deepSeekResponse.trip_plan;
      const itinerary: DayPlan[] = [];
      
      // 转换每日行程 - 修复字段名匹配
      if (tripPlan.daily_plans && Array.isArray(tripPlan.daily_plans)) {
        tripPlan.daily_plans.forEach((day: any, index: number) => {
          const activities: Activity[] = [];
          
          if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach((activity: any) => {
              // 为每个活动生成有意义的名称
              const activityName = generateActivityName(activity);
              
              activities.push({
                name: activityName,
                description: activity.description || '暂无描述',
                location: activity.location || '位置待定',
                time: activity.time || '时间待定',
                estimatedCost: activity.cost || 0,
                transportation: activity.transport?.type || '交通方式待定'
              });
            });
          }
          
          // 只要有数据就添加到行程中
          itinerary.push({
            date: day.date || `第${index + 1}天`,
            activities
          });
        });
      }
      
      return {
        itinerary,
        totalCost: tripPlan.total_cost?.total || 0,
        recommendedGroupSize: tripPlan.recommendations?.people?.toString() || '2',
        startDate: tripPlan.departure?.date || new Date().toLocaleDateString('zh-CN')
      };
    }
    
    // 处理直接的daily_itinerary结构
    if (deepSeekResponse.daily_itinerary && Array.isArray(deepSeekResponse.daily_itinerary)) {
      const convertedItinerary: DayPlan[] = deepSeekResponse.daily_itinerary.map((dayData: any, index: number) => {
        const activities: Activity[] = (dayData.activities || [])
          .map((activity: any) => {
            const activityName = generateActivityName(activity);
            
            return {
              name: activityName,
              description: activity.description || '暂无描述',
              location: activity.location || '位置待定',
              time: activity.time || '时间待定',
              estimatedCost: activity.cost || activity.estimatedCost || 0,
              transportation: activity.transportation || '交通方式待定'
            };
          });

        return {
          date: dayData.date || `第${index + 1}天`,
          activities
        };
      });

      return {
        itinerary: convertedItinerary,
        totalCost: deepSeekResponse.totalCost || 0,
        recommendedGroupSize: deepSeekResponse.recommendedGroupSize || '2',
        startDate: deepSeekResponse.startDate || new Date().toLocaleDateString('zh-CN')
      };
    }
    
    // 处理直接的itinerary格式
    if (deepSeekResponse.itinerary && Array.isArray(deepSeekResponse.itinerary)) {
      const convertedItinerary: DayPlan[] = deepSeekResponse.itinerary.map((dayData: any, index: number) => {
        const activities: Activity[] = (dayData.activities || [])
          .map((activity: any) => {
            const activityName = generateActivityName(activity);
            
            return {
              name: activityName,
              description: activity.description || '暂无描述',
              location: activity.location || '位置待定',
              time: activity.time || '时间待定',
              estimatedCost: activity.cost || activity.estimatedCost || 0,
              transportation: activity.transportation || '交通方式待定'
            };
          });

        return {
          date: dayData.date || `第${index + 1}天`,
          activities
        };
      });

      return {
        itinerary: convertedItinerary,
        totalCost: deepSeekResponse.totalCost || 0,
        recommendedGroupSize: deepSeekResponse.recommendedGroupSize || '2',
        startDate: deepSeekResponse.startDate || new Date().toLocaleDateString('zh-CN')
      };
    }
    
    // 如果有textResponse字段，尝试从文本中提取行程信息
    if (deepSeekResponse.textResponse && typeof deepSeekResponse.textResponse === 'string') {
      console.log('尝试从文本响应中提取行程信息:', deepSeekResponse.textResponse);
      const extractedItinerary = extractItineraryFromText(deepSeekResponse.textResponse);
      
      if (extractedItinerary.length > 0) {
        return {
          itinerary: extractedItinerary,
          totalCost: 0,
          recommendedGroupSize: '2',
          startDate: new Date().toLocaleDateString('zh-CN')
        };
      }
    }
    
    // 最后尝试：如果响应是字符串类型，直接解析
    if (typeof deepSeekResponse === 'string') {
      console.log('尝试从字符串响应中提取行程信息:', deepSeekResponse);
      const extractedItinerary = extractItineraryFromText(deepSeekResponse);
      
      if (extractedItinerary.length > 0) {
        return {
          itinerary: extractedItinerary,
          totalCost: 0,
          recommendedGroupSize: '2',
          startDate: new Date().toLocaleDateString('zh-CN')
        };
      }
    }
    
    // 如果所有解析都失败，但有任何形式的内容，创建一个通用活动来显示内容
    const responseText = deepSeekResponse.textResponse || JSON.stringify(deepSeekResponse, null, 2);
    console.log('所有解析方式都失败，创建通用活动显示内容');
    
    return {
      itinerary: [{
        date: new Date().toLocaleDateString('zh-CN'),
        activities: [{
          name: 'AI智能行程规划结果',
          description: responseText.length > 500 ? responseText.substring(0, 500) + '...' : responseText,
          location: '请查看详细描述',
          time: '全天',
          estimatedCost: 0,
          transportation: '详见行程安排'
        }]
      }],
      totalCost: 0,
      recommendedGroupSize: '2',
      startDate: new Date().toLocaleDateString('zh-CN')
    };
  } catch (error) {
    console.error('转换DeepSeek响应时出错:', error);
    throw new Error('数据转换失败');
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
        console.log('AI返回原始数据:', aiPlan);
        
        if (aiPlan) {
          // 转换AI响应为组件期望的格式
          const convertedPlan = convertDeepSeekResponseToTravelPlan(aiPlan);
          console.log('转换后的计划:', convertedPlan);
          
          setPlan(convertedPlan);
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

      // 根据用户兴趣选择景点 - 添加空值检查
      let selectedAttractions: any[] = [];
      const interests = (preferences.interests || '').toLowerCase();
      
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
