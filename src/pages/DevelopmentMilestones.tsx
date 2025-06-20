
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Rocket, Star, Zap, Globe, Users, Target } from 'lucide-react';

const DevelopmentMilestones = () => {
  const milestones = [
    {
      version: "V1.0",
      period: "2023年4月-2023年8月",
      title: "项目初创",
      description: "成立之初以研发和创新为核心，完成基础架构搭建",
      features: ["痛点定位", "应对措施", "风险&挑战", "信息碎片化解决方案"],
      icon: <Rocket className="h-6 w-6 text-blue-500" />,
      phase: "项目初创"
    },
    {
      version: "V2.0",
      period: "2023年9月-2024年3月",
      title: "数字升级",
      description: "搭建文旅大数据中心，实现用户体验重构和基础技术架构优化",
      features: ["基础技术架构设计", "用户注册登录", "城市选择核心功能", "游客分析系统"],
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      phase: "数字升级"
    },
    {
      version: "V3.0", 
      period: "2024年4月-2024年12月",
      title: "AI赋能",
      description: "引入AI行程规划功能，为用户提供个性化旅行建议，全面优化移动端体验",
      features: ["AI行程规划", "个性化推荐算法", "PWA应用", "智能对话系统"],
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      phase: "AI赋能"
    },
    {
      version: "V4.0",
      period: "2025年1月-2025年3月",
      title: "全产业联动",
      description: "部署DeepSeek AI服务，提升智能化水平和用户体验，构建智慧网络联动",
      features: ["DeepSeek AI集成", "智能化水平提升", "城市智慧网络", "文旅区块链平台"],
      icon: <Globe className="h-6 w-6 text-green-500" />,
      phase: "产业联动"
    },
    {
      version: "V5.0",
      period: "2025年4月-2025年6月",
      title: "科技赋能",
      description: "科技传承文化，实现满意度>95%完善体验生态，实现B2B2C全链路服务",
      features: ["科技文化传承", "用户满意度优化", "B2B2C生态完善", "全链路服务体系"],
      icon: <Target className="h-6 w-6 text-indigo-500" />,
      phase: "科技赋能"
    },
    {
      version: "V6.0",
      period: "2025年7月-2025年9月",
      title: "提质&增效",
      description: "推出B端供应链合作平台，实现多方共赢生态，优化供应商管理体系",
      features: ["供应商入驻平台", "SCM系统优化", "品控管理体系", "数据分析决策"],
      icon: <Users className="h-6 w-6 text-cyan-500" />,
      phase: "提质增效"
    },
    {
      version: "V7.0",
      period: "2025年10月-2025年12月",
      title: "突破&创新",
      description: "实现平台国际化，支持多语言多币种，构建全球化服务生态",
      features: ["多语言国际化", "多币种结算", "文化适配优化", "全球化生态"],
      icon: <Rocket className="h-6 w-6 text-orange-500" />,
      phase: "突破创新"
    },
    {
      version: "V8.0",
      period: "2026年1月-2026年3月",
      title: "生态完善",
      description: "完善整体生态平台，实现可持续发展和规模化扩张",
      features: ["生态闭环完善", "可持续发展模式", "规模化扩张", "智能决策系统"],
      icon: <CheckCircle className="h-6 w-6 text-emerald-500" />,
      phase: "生态完善"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              发展历程
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              见证Glocal平台从初创到成长的每一个重要节点，以研发和创新为核心的发展之路
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-blue-400 to-blue-200 hidden md:block"></div>
                )}
                
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div className="flex items-center space-x-3 mb-2 md:mb-0">
                            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              {milestone.version}
                            </span>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-medium">
                              {milestone.phase}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm font-medium">{milestone.period}</span>
                        </div>
                        <CardTitle className="text-2xl mb-2 text-gray-900">{milestone.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-base leading-relaxed">
                          {milestone.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {milestone.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">持续创新 · 永不止步</h3>
              <p className="text-lg opacity-90 mb-6">
                以三个月为迭代周期，持续推进技术创新与商业模式完善，构建可持续发展的AI驱动本地化旅游生态
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">AI技术驱动</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">本地化服务</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">生态化发展</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">可持续创新</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevelopmentMilestones;
