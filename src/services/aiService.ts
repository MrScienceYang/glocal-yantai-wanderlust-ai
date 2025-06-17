
// AI服务配置 - 使用通义千问API
export class AIService {
  private apiKey: string = 'sk-a2931a57b70840219a4f2058351f9977';
  private baseUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

  constructor() {
    // 通义千问使用固定API密钥
  }

  setApiKey(apiKey: string) {
    // 通义千问API密钥已固定，此方法保留兼容性
    console.log('通义千问API密钥已配置');
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateItinerary(preferences: any): Promise<any> {
    const prompt = `
    作为一个烟台旅游专家，请根据以下用户偏好生成一个详细的旅行行程：
    
    用户偏好：
    - 兴趣爱好：${preferences.interests}
    - 预算范围：${preferences.budget}元
    - 旅行天数：${preferences.duration}
    - 人数：${preferences.groupSize}
    - 旅行风格：${preferences.travelStyle}
    
    请生成一个JSON格式的行程规划，包含：
    1. 每天的详细活动安排
    2. 每个活动的时间、地点、描述和预估费用
    3. 总预算和推荐人数
    
    请确保推荐的都是烟台当地的真实景点和餐厅。
    `;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-DashScope-SSE': 'disable'
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          input: {
            messages: [
              {
                role: 'system',
                content: '你是一个专业的烟台旅游顾问，熟悉烟台的所有景点、餐厅和文化。'
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          parameters: {
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.8
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      const content = data.output.text;
      
      // 尝试解析JSON响应
      try {
        return JSON.parse(content);
      } catch {
        // 如果解析失败，返回格式化的文本响应
        return {
          textResponse: content,
          itinerary: [],
          totalCost: 0,
          recommendedGroupSize: preferences.groupSize
        };
      }
    } catch (error) {
      console.error('通义千问AI服务错误:', error);
      throw error;
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-DashScope-SSE': 'disable'
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          input: {
            messages: [
              {
                role: 'system',
                content: '你是一个烟台本地达人推荐系统，了解各个达人的特长和服务。'
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          parameters: {
            temperature: 0.8,
            max_tokens: 1500
          }
        })
      });

      const data = await response.json();
      return data.output.text;
    } catch (error) {
      console.error('通义千问推荐服务错误:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
