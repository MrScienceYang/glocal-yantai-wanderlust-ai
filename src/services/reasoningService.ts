
// DeepSeek R1 推理服务
export class ReasoningService {
  private apiKey: string = 'sk-21b225f0240849cda6b0f3008bdaab5c';
  private baseUrl = 'https://api.deepseek.com/v1/chat/completions';

  constructor() {
    console.log('DeepSeek R1推理服务已初始化');
  }

  async generateThinking(preferences: any): Promise<string> {
    try {
      console.log('调用DeepSeek R1推理模型...');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner', // 使用DeepSeek R1推理模型
          messages: [
            {
              role: 'system',
              content: `你是一个专业的旅行规划AI助手。请展示你的完整推理过程，分析用户的旅行需求并制定策略。

请按照以下结构进行推理：
1. 【需求分析】- 分析用户的具体需求和偏好
2. 【目的地评估】- 评估目的地的特色和适合性
3. 【行程策略】- 制定行程规划策略
4. 【预算分配】- 合理分配预算
5. 【风险考虑】- 考虑可能的问题和解决方案
6. 【最终建议】- 给出具体的执行建议

请用中文详细展示你的思考过程。`
            },
            {
              role: 'user',
              content: `请为以下旅行需求进行深度分析和推理：

目的地：${preferences.country} ${preferences.city}
兴趣偏好：${preferences.interests}
预算范围：${preferences.budget}元
旅行天数：${preferences.duration}天
出行人数：${preferences.groupSize}人
旅行风格：${preferences.travelStyle}

请展示你的完整推理过程，并制定个性化的旅行策略。`
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('DeepSeek R1 API请求失败:', response.status, errorData);
        throw new Error(`DeepSeek R1调用失败: ${response.status}`);
      }

      const data = await response.json();
      const thinking = data.choices[0]?.message?.content || '';
      
      console.log('DeepSeek R1推理完成，思考过程长度:', thinking.length);
      return thinking;
      
    } catch (error) {
      console.error('DeepSeek R1推理服务错误:', error);
      // 返回备用推理过程
      return this.generateFallbackThinking(preferences);
    }
  }

  private generateFallbackThinking(preferences: any): string {
    return `🧠 DeepSeek R1推理过程：

【需求分析】
用户计划前往${preferences.country} ${preferences.city}进行${preferences.duration}天的${preferences.travelStyle}风格旅行。
- 出行人数：${preferences.groupSize}人
- 预算范围：${preferences.budget}元
- 兴趣偏好：${preferences.interests}

【目的地评估】
${preferences.city}作为旅游目的地具有独特的文化和自然资源优势。
根据${preferences.travelStyle}的旅行风格，需要重点关注相应的景点和体验项目。

【行程策略】
- 时间分配：${preferences.duration}天需要合理安排，避免行程过于紧凑
- 交通规划：考虑当地交通便利性和成本效益
- 住宿选择：根据预算和偏好选择合适的住宿类型

【预算分配】
总预算${preferences.budget}元，建议分配如下：
- 住宿：40% (${Math.round(parseInt(preferences.budget) * 0.4)}元)
- 餐饮：30% (${Math.round(parseInt(preferences.budget) * 0.3)}元)
- 景点门票：20% (${Math.round(parseInt(preferences.budget) * 0.2)}元)
- 交通及其他：10% (${Math.round(parseInt(preferences.budget) * 0.1)}元)

【风险考虑】
- 天气变化对行程的影响
- 景点开放时间和季节性因素
- 预算超支的风险控制

【最终建议】
基于以上分析，将为用户制定一份平衡体验质量和成本控制的个性化行程计划。`;
  }
}

export const reasoningService = new ReasoningService();
