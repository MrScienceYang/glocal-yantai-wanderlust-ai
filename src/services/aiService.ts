
// AI服务配置 - 使用OpenAI ChatGPT 4o API
export class AIService {
  private apiKey: string = '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';
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // OpenAI API密钥已配置
    console.log('OpenAI ChatGPT 4o API已初始化');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    console.log('OpenAI API密钥已更新');
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  // 测试API连接
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: '请回复"API连接成功"来测试连接。'
            }
          ],
          max_tokens: 50
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OpenAI API测试成功:', data.choices[0].message.content);
        return true;
      } else {
        console.error('OpenAI API测试失败:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('OpenAI API连接错误:', error);
      return false;
    }
  }

  // 模拟AI响应数据
  private getMockItinerary(preferences: any) {
    return {
      itinerary: [
        {
          day: 1,
          activities: [
            {
              time: "09:00",
              activity: "抵达烟台蓬莱国际机场",
              location: "蓬莱国际机场",
              description: "建议乘坐机场大巴前往市区",
              cost: 25,
              transportation: "机场大巴"
            },
            {
              time: "11:00",
              activity: "入住酒店",
              location: "烟台希尔顿酒店",
              description: "豪华海景房，可欣赏渤海美景",
              cost: 680,
              type: "住宿"
            },
            {
              time: "14:00",
              activity: "游览蓬莱阁",
              location: "蓬莱阁景区",
              description: "中国古代四大名楼之一，体验八仙过海传说",
              cost: 120,
              type: "景点"
            },
            {
              time: "18:00",
              activity: "品尝海鲜大餐",
              location: "渔人码头海鲜城",
              description: "新鲜的烟台海参、扇贝、海胆",
              cost: 280,
              type: "餐饮"
            }
          ]
        },
        {
          day: 2,
          activities: [
            {
              time: "08:00",
              activity: "早餐",
              location: "酒店自助餐厅",
              description: "丰富的中西式早餐",
              cost: 80,
              type: "餐饮"
            },
            {
              time: "09:30",
              activity: "参观张裕酒文化博物馆",
              location: "张裕酒文化博物馆",
              description: "了解中国葡萄酒发展历史，品酒体验",
              cost: 50,
              type: "景点"
            },
            {
              time: "14:00",
              activity: "游览养马岛",
              location: "养马岛旅游度假区",
              description: "素有'东方夏威夷'之美称",
              cost: 60,
              type: "景点"
            }
          ]
        }
      ],
      totalCost: 1295,
      recommendedGroupSize: preferences.groupSize || 2,
      summary: "精心为您定制的2日烟台深度游，包含历史文化、自然风光和美食体验"
    };
  }

  private getMockRecommendation(userProfile: any) {
    return `基于您的偏好，为您推荐以下本地达人：

**王师傅 - 资深摄影向导**
- 专长：海滨风光摄影、人文纪实
- 适合原因：擅长捕捉烟台最美海景，10年摄影经验
- 服务内容：全天陪同拍摄、景点讲解、修图服务
- 价格：300元/天

**李小姐 - 美食探店达人**
- 专长：本地美食推荐、隐藏小店
- 适合原因：土生土长烟台人，熟知地道美食
- 服务内容：美食路线规划、陪同用餐、文化介绍
- 价格：200元/半天

**张导 - 历史文化专家**
- 专长：烟台历史文化、古建筑讲解
- 适合原因：文史专业背景，讲解生动有趣
- 服务内容：景点深度讲解、文化背景介绍
- 价格：250元/天`;
  }

  async generateItinerary(preferences: any): Promise<any> {
    const prompt = `
    作为一个资深的行程规划师，现在请根据用户提供的信息，精准的生成符合用户需求的出行方案，需要提供具体的车次与费用、下榻酒店与推荐房型规划及费用、到达地交通方式规划与费用。
    
    用户偏好：
    - 兴趣爱好：${preferences.interests}
    - 预算范围：${preferences.budget}元
    - 旅行天数：${preferences.duration}
    - 人数：${preferences.groupSize}
    - 旅行风格：${preferences.travelStyle}
    - 出发地：${preferences.departure || '北京'}
    - 目的地：${preferences.destination || '烟台'}
    - 出发时间：${preferences.departureTime || '未指定'}
    - 返程时间：${preferences.returnTime || '未指定'}
    
    请生成一个JSON格式的行程规划，包含：
    1. 每天的详细活动安排
    2. 每个活动的时间、地点、描述和预估费用
    3. 交通方式和住宿安排
    4. 总预算和推荐人数
    `;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的旅游行程规划师，请根据用户需求生成详细的行程规划。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        console.warn('OpenAI API请求失败，使用模拟数据');
        return this.getMockItinerary(preferences);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // 尝试解析JSON响应
      try {
        return JSON.parse(content);
      } catch {
        // 如果解析失败，返回格式化的文本响应
        return {
          textResponse: content,
          itinerary: this.getMockItinerary(preferences).itinerary,
          totalCost: this.getMockItinerary(preferences).totalCost,
          recommendedGroupSize: preferences.groupSize
        };
      }
    } catch (error) {
      console.error('OpenAI AI服务错误，使用模拟数据:', error);
      return this.getMockItinerary(preferences);
    }
  }

  async generateExpertRecommendation(userProfile: any): Promise<any> {
    const prompt = `
    根据用户画像为其推荐最合适的烟台本地达人：
    
    用户信息：
    ${JSON.stringify(userProfile, null, 2)}
    
    请推荐3-5位最合适的本地达人，包括：
    1. 达人姓名和专长
    2. 为什么适合这个用户
    3. 推荐的服务内容
    4. 预估价格
    `;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的本地旅游达人推荐系统，请根据用户画像推荐合适的达人。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        console.warn('OpenAI API请求失败，使用模拟数据');
        return this.getMockRecommendation(userProfile);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI推荐服务错误，使用模拟数据:', error);
      return this.getMockRecommendation(userProfile);
    }
  }
}

export const aiService = new AIService();
