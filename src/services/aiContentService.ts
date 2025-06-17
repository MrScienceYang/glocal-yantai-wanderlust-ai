
import { aiService } from './aiService';

export interface ContentGenerationRequest {
  type: 'product' | 'review' | 'flight' | 'train' | 'hotel' | 'ticket';
  category?: string;
  context: any;
  language?: string;
}

export class AIContentService {
  
  async generateProductContent(productInfo: any) {
    const prompt = `
    作为专业的电商内容编辑，为以下商品生成优质内容：
    
    商品信息：${JSON.stringify(productInfo, null, 2)}
    
    请生成JSON格式内容，包含：
    1. 吸引人的商品标题
    2. 详细的商品描述
    3. 产品亮点（3-5个）
    4. 推荐人群
    5. 使用场景
    6. SEO关键词
    
    确保内容真实、专业且吸引人。
    `;

    try {
      const response = await aiService.generateItinerary({ 
        interests: '商品内容生成',
        budget: '不限',
        duration: '1',
        groupSize: '1',
        travelStyle: productInfo.category || '通用'
      });
      
      // 模拟AI生成的商品内容
      return {
        title: `精选${productInfo.name || '优质商品'}`,
        description: `这是一款精心挑选的${productInfo.category || '商品'}，采用优质材料制作，具有出色的性能和品质保证。适合${productInfo.targetGroup || '各类用户'}使用，是您的理想选择。`,
        highlights: [
          '优质材料制作',
          '精工细作工艺',
          '性价比超高',
          '用户好评如潮',
          '全国包邮服务'
        ],
        targetAudience: productInfo.targetGroup || '所有用户',
        usageScenarios: [`日常使用`, `送礼佳品`, `收藏投资`],
        keywords: [productInfo.category, '优质', '精选', '推荐'].filter(Boolean)
      };
    } catch (error) {
      console.error('AI内容生成失败:', error);
      throw error;
    }
  }

  async generateUserReview(productInfo: any, rating: number) {
    const prompt = `
    为以下商品生成真实的用户评价：
    
    商品：${productInfo.name}
    评分：${rating}星
    
    请生成自然、真实的用户评价，包含：
    1. 购买体验
    2. 产品质量
    3. 使用感受
    4. 推荐程度
    `;

    try {
      // 根据评分生成不同风格的评价
      const reviews = {
        5: `非常满意的一次购买！商品质量超出预期，包装精美，物流迅速。客服态度也很好，会推荐给朋友的。`,
        4: `整体不错，商品符合描述，质量可以。快递比较快，包装也很仔细。性价比挺高的。`,
        3: `商品一般般，符合这个价位的预期吧。包装还可以，发货速度正常。`,
        2: `有点失望，商品和描述有些差距，质量一般。希望能改进。`,
        1: `很不满意，商品质量差，与描述严重不符。不推荐购买。`
      };

      return {
        content: reviews[rating as keyof typeof reviews] || reviews[3],
        rating: rating,
        helpful: Math.floor(Math.random() * 50) + 1,
        date: new Date().toLocaleDateString('zh-CN')
      };
    } catch (error) {
      console.error('生成评价失败:', error);
      throw error;
    }
  }

  async generateFlightInfo(flightData: any) {
    const prompt = `
    为以下航班生成详细信息：
    ${JSON.stringify(flightData, null, 2)}
    
    请生成包含服务亮点、安全记录、准点率等信息。
    `;

    try {
      return {
        serviceHighlights: [
          '准点率高达95%',
          '优质餐饮服务',
          '宽敞舒适座椅',
          '免费行李托运',
          '专业机组服务'
        ],
        safetyRecord: '安全飞行记录优秀，无重大安全事故',
        punctualityRate: '95%',
        passengerReview: '乘客满意度4.8分',
        additionalServices: ['免费WiFi', '娱乐系统', '毛毯枕头', '特殊餐食']
      };
    } catch (error) {
      console.error('生成航班信息失败:', error);
      throw error;
    }
  }

  async generateTrainInfo(trainData: any) {
    const prompt = `
    为以下列车生成详细信息：
    ${JSON.stringify(trainData, null, 2)}
    
    请生成包含服务特色、设施介绍、乘车体验等信息。
    `;

    try {
      return {
        serviceFeatures: [
          '高速平稳运行',
          '座椅舒适宽敞',
          '车内设施完善',
          '餐车服务优质',
          '准点率极高'
        ],
        facilities: ['免费WiFi', '充电插座', '空调系统', '卫生间', '餐车'],
        experience: '乘坐体验舒适，是城际出行的理想选择',
        punctuality: '准点率98%',
        comfort: '4.9分用户舒适度评价'
      };
    } catch (error) {
      console.error('生成列车信息失败:', error);
      throw error;
    }
  }

  async generateHotelInfo(hotelData: any) {
    const prompt = `
    为以下酒店生成详细信息：
    ${JSON.stringify(hotelData, null, 2)}
    
    请生成包含设施介绍、服务亮点、周边环境等信息。
    `;

    try {
      return {
        facilities: [
          '豪华装修标准',
          '24小时前台服务',
          '免费WiFi覆盖',
          '健身房和游泳池',
          '商务中心'
        ],
        serviceHighlights: [
          '管家式贴心服务',
          '多语言服务团队',
          '快速入住退房',
          '行李寄存服务',
          '旅游咨询服务'
        ],
        surroundings: '地理位置优越，交通便利，周边商圈繁华',
        guestRating: '4.8分用户满意度',
        specialOffers: ['早鸟优惠', '连住优惠', '会员专享']
      };
    } catch (error) {
      console.error('生成酒店信息失败:', error);
      throw error;
    }
  }

  async generateTicketInfo(attractionData: any) {
    const prompt = `
    为以下景点门票生成详细信息：
    ${JSON.stringify(attractionData, null, 2)}
    
    请生成包含景点介绍、游玩攻略、注意事项等信息。
    `;

    try {
      return {
        introduction: `${attractionData.name}是一处著名的旅游景点，具有丰富的历史文化底蕴和独特的自然风光。`,
        highlights: [
          '历史文化深厚',
          '风景优美宜人',
          '拍照打卡胜地',
          '老少皆宜游玩',
          '交通便利可达'
        ],
        playGuide: [
          '建议游玩时间：2-4小时',
          '最佳游览路线推荐',
          '必看景点介绍',
          '拍照最佳位置',
          '美食推荐'
        ],
        tips: [
          '请穿着舒适的鞋子',
          '注意保护环境卫生',
          '遵守景区规章制度',
          '建议提前预约',
          '关注天气变化'
        ],
        visitorRating: '4.7分游客推荐'
      };
    } catch (error) {
      console.error('生成景点信息失败:', error);
      throw error;
    }
  }

  async generateContent(request: ContentGenerationRequest) {
    switch (request.type) {
      case 'product':
        return await this.generateProductContent(request.context);
      case 'review':
        return await this.generateUserReview(request.context, request.context.rating || 5);
      case 'flight':
        return await this.generateFlightInfo(request.context);
      case 'train':
        return await this.generateTrainInfo(request.context);
      case 'hotel':
        return await this.generateHotelInfo(request.context);
      case 'ticket':
        return await this.generateTicketInfo(request.context);
      default:
        throw new Error(`不支持的内容类型: ${request.type}`);
    }
  }
}

export const aiContentService = new AIContentService();
