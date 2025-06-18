
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Rocket, Star, Zap } from 'lucide-react';

const DevelopmentMilestones = () => {
  const milestones = [
    {
      version: "V1.0",
      date: "2024年5月10日",
      title: "平台基础架构搭建",
      description: "完成基础技术架构设计，实现用户注册登录、城市选择等核心功能",
      features: ["用户管理系统", "城市切换功能", "基础UI框架", "响应式设计"],
      icon: <Rocket className="h-6 w-6 text-blue-500" />
    },
    {
      version: "V1.1",
      date: "2024年5月25日", 
      title: "AI智能规划模块",
      description: "引入AI行程规划功能，为用户提供个性化旅行建议",
      features: ["AI行程规划", "偏好设置", "智能推荐算法", "行程导出功能"],
      icon: <Zap className="h-6 w-6 text-purple-500" />
    },
    {
      version: "V1.2",
      date: "2024年6月10日",
      title: "本地达人服务",
      description: "上线本地达人服务，连接游客与本地文化专家",
      features: ["达人认证系统", "服务预订", "评价体系", "担保交易机制"],
      icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
      version: "V1.3",
      date: "2024年6月25日",
      title: "电商平台集成",
      description: "推出特色商城，售卖烟台本地特产和文创产品",
      features: ["商品管理", "购物车系统", "支付集成", "物流跟踪"],
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      version: "V1.4",
      date: "2024年7月10日",
      title: "盲盒旅行体验",
      description: "创新推出盲盒旅行产品，为用户带来惊喜体验",
      features: ["盲盒产品设计", "随机算法", "价值保障机制", "开盒动画"],
      icon: <Rocket className="h-6 w-6 text-red-500" />
    },
    {
      version: "V1.5",
      date: "2024年7月25日",
      title: "供应链合作平台",
      description: "推出B端供应链合作平台，实现多方共赢生态",
      features: ["供应商入驻", "SCM系统", "品控管理", "数据分析"],
      icon: <Zap className="h-6 w-6 text-indigo-500" />
    },
    {
      version: "V1.6",
      date: "2024年8月10日",
      title: "多语言国际化",
      description: "支持多语言切换，面向国际游客提供服务",
      features: ["8种语言支持", "文化适配", "国际支付", "多币种结算"],
      icon: <Star className="h-6 w-6 text-cyan-500" />
    },
    {
      version: "V1.7",
      date: "2024年8月25日",
      title: "移动端PWA优化",
      description: "全面优化移动端体验，推出PWA应用",
      features: ["PWA支持", "离线功能", "推送通知", "App式体验"],
      icon: <CheckCircle className="h-6 w-6 text-orange-500" />
    },
    {
      version: "V1.8",
      date: "2024年9月10日",
      title: "AI技术升级",
      description: "升级AI服务至Gemini 2.5 Flash，提升智能化水平",
      features: ["Gemini 2.5集成", "智能对话", "图像识别", "语音交互"],
      icon: <Zap className="h-6 w-6 text-violet-500" />
    },
    {
      version: "V1.9",
      date: "2024年9月25日",
      title: "主题系统上线",
      description: "推出多主题系统，支持城市主题和深色模式",
      features: ["城市主题", "深色模式", "个性化定制", "动态切换"],
      icon: <Star className="h-6 w-6 text-pink-500" />
    },
    {
      version: "V2.0",
      date: "2024年10月10日",
      title: "生态平台完善",
      description: "完善整体生态，实现B2B2C全链路服务",
      features: ["生态闭环", "数据驱动", "智能决策", "可持续发展"],
      icon: <Rocket className="h-6 w-6 text-emerald-500" />
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              开发历程
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              见证Glocal平台从初创到成长的每一个重要节点，技术创新与商业模式的完美融合
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-20 bg-gray-300 hidden md:block"></div>
                )}
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {milestone.version}
                          </span>
                          <span className="text-gray-500 text-sm">{milestone.date}</span>
                        </div>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                        <CardDescription className="mt-2">{milestone.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {milestone.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevelopmentMilestones;
