
import { aiService } from './aiService';

export interface ContentGenerationRequest {
  type: 'product' | 'review' | 'flight' | 'train' | 'hotel' | 'ticket';
  context: any;
}

class AIContentService {
  private apiKey: string = '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';
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  // 模拟数据
  private getMockContent(type: string, context: any) {
    const mockData = {
      product: {
        enhancedDescription: "这款精选商品采用优质原料精心制作，工艺精湛，口感独特。适合作为伴手礼或自用，体现了烟台地区的文化特色和匠心精神。",
        features: ["优质原料", "传统工艺", "独特口感", "精美包装"],
        tags: ["烟台特产", "精选好物", "传统工艺", "优质原料"],
        specifications: "规格：500g/盒\n保质期：12个月\n储存条件：常温保存\n产地：烟台"
      },
      review: {
        rating: 4.8,
        content: "这次的体验超出了预期！服务很贴心，产品质量也很好。特别是工作人员的专业态度让人印象深刻，下次还会选择这里。",
        highlights: ["服务贴心", "质量优秀", "专业态度", "值得推荐"]
      },
      flight: {
        punctualityRate: "95%",
        passengerReview: "4.7/5.0",
        additionalServices: ["免费餐食", "机上WiFi", "优先登机", "行李托运", "贵宾休息室"],
        flightFeatures: "宽体客机，座椅舒适，机上娱乐设施齐全"
      },
      train: {
        punctualityRate: "98%",
        passengerReview: "4.6/5.0",
        additionalServices: ["免费WiFi", "餐车服务", "充电插座", "空调系统"],
        trainFeatures: "高速动车组，运行平稳，环境清洁"
      },
      hotel: {
        rating: 4.5,
        amenities: ["免费WiFi", "健身房", "游泳池", "商务中心", "接机服务"],
        guestReview: "酒店位置优越，服务周到，房间干净舒适，早餐丰富。前台工作人员很热情，会推荐当地的特色景点。",
        highlights: ["位置优越", "服务周到", "设施完善", "性价比高"]
      },
      ticket: {
        attractionHighlights: ["历史悠久", "风景优美", "文化底蕴深厚", "游玩项目丰富"],
        visitTips: "建议游玩时间3-4小时，最佳参观时间为上午9点到下午4点。请穿着舒适的鞋子，携带相机记录美好时光。",
        nearbyServices: ["停车场", "餐厅", "纪念品店", "导游服务"],
        bestVisitTime: "春秋两季，气候宜人"
      }
    };

    return mockData[type as keyof typeof mockData] || { content: "AI生成的精彩内容" };
  }

  async generateContent(request: ContentGenerationRequest): Promise<any> {
    const { type, context } = request;
    
    const prompts = {
      product: `请为以下商品生成详细的介绍内容：
        商品信息：${JSON.stringify(context)}
        请生成：1.详细描述 2.产品特色 3.适用标签 4.规格信息`,
      
      review: `请为以下服务生成真实自然的用户评价：
        服务信息：${JSON.stringify(context)}
        请生成评分、评价内容和亮点总结`,
      
      flight: `请为以下航班生成服务亮点信息：
        航班信息：${JSON.stringify(context)}
        请生成准点率、乘客评价和特色服务`,
      
      train: `请为以下列车生成服务特色信息：
        列车信息：${JSON.stringify(context)}
        请生成准点率、服务评价和车次特色`,
      
      hotel: `请为以下酒店生成服务亮点：
        酒店信息：${JSON.stringify(context)}
        请生成评分、设施介绍和客户评价`,
      
      ticket: `请为以下景点生成游玩攻略：
        景点信息：${JSON.stringify(context)}
        请生成景点亮点、游玩建议和周边服务`
    };

    try {
      // 调用OpenAI ChatGPT 4o API
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
              content: '你是一个专业的内容生成助手，请根据用户需求生成高质量的内容。'
            },
            {
              role: 'user',
              content: prompts[type]
            }
          ],
          max_tokens: 1000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        console.warn(`${type} OpenAI API失败，使用模拟数据`);
        return this.getMockContent(type, context);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // 尝试解析结构化内容，失败则返回模拟数据
      try {
        return JSON.parse(content);
      } catch {
        return {
          ...this.getMockContent(type, context),
          aiGenerated: content
        };
      }
    } catch (error) {
      console.error(`${type} OpenAI内容生成失败，使用模拟数据:`, error);
      return this.getMockContent(type, context);
    }
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
              content: '请回复"内容生成API连接成功"来测试连接。'
            }
          ],
          max_tokens: 50
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OpenAI内容生成API测试成功:', data.choices[0].message.content);
        return true;
      } else {
        console.error('OpenAI内容生成API测试失败:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('OpenAI内容生成API连接错误:', error);
      return false;
    }
  }
}

export const aiContentService = new AIContentService();
