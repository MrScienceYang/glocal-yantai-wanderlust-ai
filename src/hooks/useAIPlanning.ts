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
  const originalName = activity.activity || activity.name || activity.活动 || activity.地点;
  if (originalName && originalName.trim() !== '' && originalName.trim() !== '未命名活动') {
    return originalName;
  }
  
  // 根据描述生成活动名称
  const description = activity.description || activity.描述 || '';
  const location = activity.location || activity.地点 || '';
  
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

// 转换DeepSeek API响应为组件期望的格式
const convertDeepSeekResponseToTravelPlan = (deepSeekResponse: any): TravelPlan => {
  console.log('开始转换DeepSeek响应:', deepSeekResponse);
  
  try {
    // 处理中文字段名的响应格式（如："行程规划"）
    if (deepSeekResponse['行程规划']) {
      console.log('发现中文格式的行程规划');
      const planData = deepSeekResponse['行程规划'];
      const itinerary: DayPlan[] = [];
      
      // 处理每日行程
      const dailyPlans = planData['每日行程'] || planData.dailyPlans || [];
      
      if (Array.isArray(dailyPlans)) {
        dailyPlans.forEach((dayData: any, index: number) => {
          const activities: Activity[] = [];
          const dayActivities = dayData['活动'] || dayData.activities || [];
          
          if (Array.isArray(dayActivities)) {
            dayActivities.forEach((activity: any) => {
              const activityName = activity['地点'] || activity.location || activity['活动'] || activity.activity || '活动安排';
              const description = activity['描述'] || activity.description || '详见行程安排';
              const time = activity['时间'] || activity.time || '待安排';
              const cost = activity['费用'] || activity.cost || activity.estimatedCost || 0;
              const transportation = activity['交通方式'] || activity.transportation || activity.transport || '详见安排';
              
              activities.push({
                name: activityName,
                description: description,
                location: activity['地点'] || activity.location || '详见行程',
                time: time,
                estimatedCost: typeof cost === 'number' ? cost : 0,
                transportation: transportation
              });
            });
          }
          
          itinerary.push({
            date: dayData['日期'] || dayData.date || `第${index + 1}天`,
            activities
          });
        });
      }
      
      return {
        itinerary,
        totalCost: planData['总预算'] || planData.totalCost || planData['总费用'] || 0,
        recommendedGroupSize: (planData['人数'] || planData.groupSize || planData.recommendedGroupSize || '2').toString(),
        startDate: planData['出发时间'] || planData.startDate || new Date().toLocaleDateString('zh-CN')
      };
    }
    
    // 如果直接有itinerary字段（已经是正确格式）
    if (deepSeekResponse.itinerary && Array.isArray(deepSeekResponse.itinerary)) {
      console.log('发现标准itinerary格式，直接使用');
      return {
        itinerary: deepSeekResponse.itinerary,
        totalCost: deepSeekResponse.totalCost || 0,
        recommendedGroupSize: deepSeekResponse.recommendedGroupSize || '2',
        startDate: deepSeekResponse.startDate || new Date().toLocaleDateString('zh-CN')
      };
    }

    // 处理trip_plan结构（DeepSeek返回的实际结构）
    if (deepSeekResponse.trip_plan) {
      const tripPlan = deepSeekResponse.trip_plan;
      const itinerary: DayPlan[] = [];
      
      // 转换每日行程
      if (tripPlan.daily_plans && Array.isArray(tripPlan.daily_plans)) {
        tripPlan.daily_plans.forEach((day: any, index: number) => {
          const activities: Activity[] = [];
          
          if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach((activity: any) => {
              activities.push({
                name: generateActivityName(activity),
                description: activity.description || '暂无描述',
                location: activity.location || '位置待定',
                time: activity.time || '时间待定',
                estimatedCost: activity.cost || 0,
                transportation: activity.transport?.type || '交通方式待定'
              });
            });
          }
          
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
    
    // 处理包含daily_itinerary的结构
    if (deepSeekResponse.daily_itinerary && Array.isArray(deepSeekResponse.daily_itinerary)) {
      console.log('发现daily_itinerary格式');
      const convertedItinerary: DayPlan[] = deepSeekResponse.daily_itinerary.map((dayData: any, index: number) => {
        const activities: Activity[] = (dayData.activities || [])
          .map((activity: any) => ({
            name: generateActivityName(activity),
            description: activity.description || '暂无描述',
            location: activity.location || '位置待定',
            time: activity.time || '时间待定',
            estimatedCost: activity.cost || activity.estimatedCost || 0,
            transportation: activity.transportation || '交通方式待定'
          }));

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
    
    // 如果所有解析都失败，返回错误提示
    console.error('无法解析AI响应格式，响应结构:', Object.keys(deepSeekResponse));
    throw new Error('无法解析AI响应数据，响应格式不支持');
    
  } catch (error) {
    console.error('转换DeepSeek响应时出错:', error);
    throw new Error('数据转换失败: ' + error.message);
  }
};

// 真实推理模型API调用 - 使用DeepSeek R1
const callReasoningModel = async (preferences: TravelPreferences): Promise<string> => {
  try {
    console.log('调用DeepSeek R1推理模型...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-21b225f0240849cda6b0f3008bdaab5c',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner', // 使用DeepSeek R1推理模型
        messages: [
          {
            role: 'system',
            content: `你是一个专业的旅行规划AI助手，具备深度推理能力。请展示你的完整思考过程，一步步分析用户需求并制定旅行策略。

请按照以下结构进行深度推理：
1. 【用户画像分析】- 深入分析用户的旅行偏好和需求特征
2. 【目的地深度调研】- 全面评估目的地的旅游资源和特色
3. 【行程设计逻辑】- 详细说明行程安排的策略和考虑因素
4. 【预算优化策略】- 如何在预算范围内最大化旅行体验
5. 【个性化定制】- 根据用户特点进行的个性化调整
6. 【执行建议】- 具体的实施建议和注意事项

请用中文展示你的详细推理过程。`
          },
          {
            role: 'user',
            content: `请运用DeepSeek R1的推理能力，为以下旅行需求进行深度分析：

📍 目的地：${preferences.country} ${preferences.city}
🎯 兴趣偏好：${preferences.interests}
💰 预算范围：${preferences.budget}元
📅 旅行天数：${preferences.duration}天
👥 出行人数：${preferences.groupSize}人
🎨 旅行风格：${preferences.travelStyle}

请展示你的完整推理过程，包括分析逻辑、决策依据和策略制定。`
          }
        ],
        max_tokens: 2500,
        temperature: 0.8,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek R1推理模型调用失败:', response.status, errorData);
      throw new Error('DeepSeek R1推理模型调用失败');
    }

    const data = await response.json();
    const thinking = data.choices[0]?.message?.content || '';
    
    console.log('DeepSeek R1推理完成，思考长度:', thinking.length);
    return thinking;
    
  } catch (error) {
    console.error('DeepSeek R1推理模型调用错误:', error);
    // 备用的模拟推理过程
    return generateFallbackThinking(preferences);
  }
};

// 备用推理过程生成 - 更新为DeepSeek R1风格
const generateFallbackThinking = (preferences: TravelPreferences): string => {
  return `🧠 DeepSeek R1推理过程：

【用户画像分析】
基于提供信息，用户偏好${preferences.travelStyle}类型的旅行体验：
- 目标群体：${preferences.groupSize}人团队
- 预算意识：${preferences.budget}元预算范围显示用户对成本有明确规划
- 兴趣导向：${preferences.interests}表明用户的核心关注点

【目的地深度调研】
${preferences.country} ${preferences.city}的旅游价值分析：
- 文化底蕴：评估历史文化资源的丰富程度
- 自然景观：分析自然风光的独特性和可达性
- 配套设施：考察旅游基础设施的完善程度
- 季节因素：${preferences.duration}天行程的最佳时间窗口

【行程设计逻辑】
基于${preferences.travelStyle}风格的核心策略：
- 时间分配原则：避免过度紧凑，保留灵活调整空间
- 体验层次设计：深度与广度的平衡考虑
- 交通连接优化：最小化移动时间，最大化体验时间

【预算优化策略】
${preferences.budget}元的智能分配方案：
- 住宿投入：40% → ${Math.round(parseInt(preferences.budget) * 0.4)}元
- 体验消费：35% → ${Math.round(parseInt(preferences.budget) * 0.35)}元  
- 交通费用：15% → ${Math.round(parseInt(preferences.budget) * 0.15)}元
- 应急储备：10% → ${Math.round(parseInt(preferences.budget) * 0.1)}元

【个性化定制】
针对${preferences.interests}的特殊安排：
- 深度体验项目的优先级排序
- 小众景点的发掘和推荐
- 当地文化的沉浸式体验设计

【执行建议】
实施过程中的关键要点：
- 提前预订的必要性评估
- 天气变化的应对预案
- 当地交通的最佳选择方案`;
};

export const useAIPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [thinkingProcess, setThinkingProcess] = useState<string>('');
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
      console.log('开始调用推理模型生成思考过程:', preferences);
      
      // 首先调用推理模型获取思考过程
      const thinking = await callReasoningModel(preferences);
      setThinkingProcess(thinking);
      
      // 然后生成实际行程
      console.log('开始调用AI生成行程:', preferences);
      const aiPlan = await aiService.generateItinerary(preferences);
      console.log('AI返回原始数据:', aiPlan);
      
      if (aiPlan) {
        const convertedPlan = convertDeepSeekResponseToTravelPlan(aiPlan);
        console.log('转换后的计划:', convertedPlan);
        
        if (convertedPlan.itinerary && convertedPlan.itinerary.length > 0) {
          setPlan(convertedPlan);
          toast.success(`AI智能行程规划生成成功！共${convertedPlan.itinerary.length}天行程`);
          return;
        } else {
          console.error('AI数据转换后无有效行程');
          throw new Error('AI返回的数据转换失败，无有效行程信息');
        }
      } else {
        throw new Error('AI服务返回空数据');
      }
    } catch (error) {
      console.error('AI生成失败:', error);
      toast.error(`AI服务处理失败: ${error.message}`);
      setPlan(null);
      setThinkingProcess('');
    } finally {
      setIsLoading(false);
    }
  };

  const grantPermission = () => {
    console.log('Permission granted through login status');
  };

  return {
    generatePlan,
    isLoading,
    plan,
    thinkingProcess,
    hasPermission,
    grantPermission
  };
};
