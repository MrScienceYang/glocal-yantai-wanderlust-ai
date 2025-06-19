
import { useState } from 'react';
import { toast } from 'sonner';
import { aiService } from '@/services/aiService';
import { useUser } from '@/components/UserProvider';

interface TravelPreferences {
  country: string;
  province: string;
  city: string;
  departure: string;
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

// 简化并优化数据转换函数
const convertAIResponseToTravelPlan = (aiResponse: any): TravelPlan => {
  console.log('转换AI响应:', aiResponse);
  
  try {
    // 创建默认的空计划
    const defaultPlan: TravelPlan = {
      itinerary: [],
      totalCost: 0,
      recommendedGroupSize: '1',
      startDate: new Date().toLocaleDateString('zh-CN')
    };

    // 如果没有响应数据，返回默认计划
    if (!aiResponse) {
      console.log('无AI响应数据，返回默认计划');
      return defaultPlan;
    }

    // 处理不同的响应格式
    let planData = aiResponse;
    
    // 如果有trip_plan字段，使用它
    if (aiResponse.trip_plan) {
      planData = aiResponse.trip_plan;
    }

    // 提取行程数据
    const itinerary: DayPlan[] = [];
    let dailyPlans: any[] = [];

    // 尝试从多个可能的字段中获取每日计划
    if (planData.daily_plans && Array.isArray(planData.daily_plans)) {
      dailyPlans = planData.daily_plans;
    } else if (planData.itinerary && Array.isArray(planData.itinerary)) {
      dailyPlans = planData.itinerary;
    } else if (Array.isArray(planData)) {
      dailyPlans = planData;
    }

    // 转换每日计划
    dailyPlans.forEach((dayData: any, index: number) => {
      const activities: Activity[] = [];
      let dayActivities: any[] = [];

      // 获取当日活动
      if (dayData.activities && Array.isArray(dayData.activities)) {
        dayActivities = dayData.activities;
      } else if (Array.isArray(dayData)) {
        dayActivities = dayData;
      }

      // 转换活动数据
      dayActivities.forEach((activity: any) => {
        activities.push({
          name: activity.name || activity.activity || activity.location || `活动 ${activities.length + 1}`,
          description: activity.description || '详细信息请参考行程安排',
          location: activity.location || '具体地点详见安排',
          time: activity.time || '时间待确定',
          estimatedCost: typeof activity.cost === 'number' ? activity.cost : 0,
          transportation: activity.transportation || activity.transport?.mode || '交通方式待安排'
        });
      });

      itinerary.push({
        date: dayData.date || `第${index + 1}天`,
        activities: activities.length > 0 ? activities : [{
          name: '行程安排',
          description: 'AI正在为您安排具体行程',
          location: '目的地',
          time: '全天',
          estimatedCost: 0,
          transportation: '待安排'
        }]
      });
    });

    // 提取总费用
    let totalCost = 0;
    if (planData.total_cost) {
      totalCost = typeof planData.total_cost === 'number' ? planData.total_cost : 0;
    } else if (planData.totalCost) {
      totalCost = typeof planData.totalCost === 'number' ? planData.totalCost : 0;
    }

    return {
      itinerary: itinerary.length > 0 ? itinerary : defaultPlan.itinerary,
      totalCost,
      recommendedGroupSize: (planData.recommended_travelers || planData.recommendedGroupSize || '1').toString(),
      startDate: planData.start_date || planData.startDate || defaultPlan.startDate
    };

  } catch (error) {
    console.error('转换AI响应时出错:', error);
    return {
      itinerary: [
        {
          date: '第1天',
          activities: [
            {
              name: '行程规划中',
              description: 'AI正在为您规划详细行程，请稍后重试',
              location: '目的地',
              time: '全天',
              estimatedCost: 0,
              transportation: '待安排'
            }
          ]
        }
      ],
      totalCost: 0,
      recommendedGroupSize: '1',
      startDate: new Date().toLocaleDateString('zh-CN')
    };
  }
};

// 调用推理模型
const callReasoningModel = async (preferences: TravelPreferences): Promise<string> => {
  try {
    console.log('调用DeepSeek推理模型...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-21b225f0240849cda6b0f3008bdaab5c',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的旅行规划AI助手。请展示你的推理过程，分析用户需求并制定旅行策略。'
          },
          {
            role: 'user',
            content: `请为以下旅行需求进行分析：
目的地：${preferences.country} ${preferences.city}
兴趣偏好：${preferences.interests}
预算范围：${preferences.budget}元
旅行天数：${preferences.duration}天
出行人数：${preferences.groupSize}人
旅行风格：${preferences.travelStyle}

请展示你的推理过程并制定旅行策略。`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.error('推理模型调用失败:', response.status);
      return '推理模型暂时不可用，将直接生成行程计划。';
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '推理过程生成中...';
    
  } catch (error) {
    console.error('推理模型调用错误:', error);
    return '推理模型暂时不可用，将直接生成行程计划。';
  }
};

export const useAIPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [thinkingProcess, setThinkingProcess] = useState<string>('');
  const { isVip, isLoggedIn } = useUser();

  const hasPermission = isLoggedIn || isVip;

  const generatePlan = async (preferences: TravelPreferences) => {
    if (!hasPermission) {
      toast.error('请先登录使用AI服务');
      return;
    }

    if (!preferences.city || !preferences.interests || !preferences.budget) {
      toast.error('请填写完整的旅行偏好信息');
      return;
    }

    setIsLoading(true);
    setPlan(null);
    setThinkingProcess('');
    
    try {
      console.log('开始生成AI旅行计划:', preferences);
      
      // 并行调用推理模型和行程生成
      const [thinking, aiPlan] = await Promise.allSettled([
        callReasoningModel(preferences),
        aiService.generateItinerary({
          ...preferences,
          destination: `${preferences.country} ${preferences.city}`
        })
      ]);

      // 设置推理过程
      if (thinking.status === 'fulfilled') {
        setThinkingProcess(thinking.value);
      }

      // 处理行程生成结果
      if (aiPlan.status === 'fulfilled' && aiPlan.value) {
        console.log('AI生成成功，原始数据:', aiPlan.value);
        const convertedPlan = convertAIResponseToTravelPlan(aiPlan.value);
        console.log('转换后的计划:', convertedPlan);
        
        setPlan(convertedPlan);
        toast.success(`AI旅行计划生成成功！为您规划了${convertedPlan.itinerary.length}天的行程`);
      } else {
        console.error('AI生成失败:', aiPlan.status === 'rejected' ? aiPlan.reason : '未知错误');
        toast.error('AI行程生成失败，请检查网络连接后重试');
      }
      
    } catch (error) {
      console.error('生成计划时出错:', error);
      toast.error('生成计划时出现错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const grantPermission = () => {
    console.log('权限已通过登录状态授予');
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
