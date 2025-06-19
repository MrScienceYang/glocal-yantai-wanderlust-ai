// AI服务配置 - 使用DeepSeek API
export class AIService {
  private apiKey: string = 'sk-21b225f0240849cda6b0f3008bdaab5c';
  private baseUrl = 'https://api.deepseek.com/v1/chat/completions';

  constructor() {
    console.log('DeepSeek AI服务已初始化');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    console.log('API密钥已更新');
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: '测试连接' }],
          max_tokens: 10
        })
      });

      return response.ok;
    } catch (error) {
      console.error('连接测试失败:', error);
      return false;
    }
  }

  async generateItinerary(preferences: any): Promise<any> {
    console.log('开始生成行程，参数:', preferences);
    
    const prompt = `请为以下旅行计划生成详细的行程安排：

目的地：${preferences.destination}
出发地：${preferences.departure}
兴趣偏好：${preferences.interests}
预算范围：${preferences.budget}元
旅行天数：${preferences.duration}天
出行人数：${preferences.groupSize}人
旅行风格：${preferences.travelStyle}

请生成JSON格式的行程规划，包含每天的具体活动安排、时间、地点、描述、预估费用和交通方式。

返回格式示例：
{
  "itinerary": [
    {
      "date": "第1天",
      "activities": [
        {
          "name": "活动名称",
          "description": "活动描述",
          "location": "具体地点",
          "time": "时间安排",
          "cost": 费用数字,
          "transportation": "交通方式"
        }
      ]
    }
  ],
  "totalCost": 总费用数字,
  "recommendedGroupSize": "推荐人数",
  "startDate": "开始日期"
}`;

    try {
      console.log('发送API请求到DeepSeek...');
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的旅游行程规划师。请生成详细、实用的旅行计划，确保返回有效的JSON格式数据。'
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

      console.log('API响应状态:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API请求失败:', errorData);
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      console.log('API响应内容:', content);

      if (!content) {
        throw new Error('API响应内容为空');
      }

      // 尝试解析JSON
      try {
        let jsonContent = content;
        
        // 清理JSON内容
        if (content.includes('```json')) {
          const match = content.match(/```json\s*([\s\S]*?)\s*```/);
          if (match) jsonContent = match[1];
        } else if (content.includes('```')) {
          const match = content.match(/```\s*([\s\S]*?)\s*```/);
          if (match) jsonContent = match[1];
        }

        // 清理可能的前后空白字符和注释
        jsonContent = jsonContent.trim();
        
        const parsedData = JSON.parse(jsonContent);
        console.log('成功解析JSON:', parsedData);
        return parsedData;
        
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.log('原始内容:', content);
        
        // 返回基础结构的模拟数据
        return {
          itinerary: [
            {
              date: `第1天`,
              activities: [
                {
                  name: '开始您的旅程',
                  description: content.substring(0, 100) + '...',
                  location: preferences.destination,
                  time: '全天',
                  cost: 0,
                  transportation: '根据实际情况安排'
                }
              ]
            }
          ],
          totalCost: 0,
          recommendedGroupSize: preferences.groupSize,
          startDate: new Date().toLocaleDateString('zh-CN')
        };
      }
      
    } catch (error) {
      console.error('AI行程生成错误:', error);
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
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
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
        console.log('DeepSeek API请求失败，使用模拟数据');
        return this.getMockRecommendation(userProfile);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek推荐服务错误，使用模拟数据:', error);
      return this.getMockRecommendation(userProfile);
    }
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
- 价格：200元/半天`;
  }
}

export const aiService = new AIService();
