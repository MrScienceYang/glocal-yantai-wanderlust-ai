
// AI服务配置
export class AIService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // 从localStorage获取API密钥
    this.apiKey = localStorage.getItem('ai_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('ai_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateItinerary(preferences: any): Promise<any> {
    if (!this.apiKey) {
      throw new Error('请先设置AI API密钥');
    }

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
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的烟台旅游顾问，熟悉烟台的所有景点、餐厅和文化。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
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
          itinerary: [],
          totalCost: 0,
          recommendedGroupSize: preferences.groupSize
        };
      }
    } catch (error) {
      console.error('AI服务错误:', error);
      throw error;
    }
  }

  async generateExpertRecommendation(userProfile: any): Promise<any> {
    if (!this.apiKey) {
      throw new Error('请先设置AI API密钥');
    }

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
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一个烟台本地达人推荐系统，了解各个达人的特长和服务。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI推荐服务错误:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
