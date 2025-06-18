
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Globe, Shield } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Target,
      title: 'AI驱动的智慧规划',
      description: '依托AI行程规划、本地达人陪同和惊喜盲盒，降低决策成本，提升旅行的深度与温度。'
    },
    {
      icon: Users,
      title: 'B2B2C生态系统',
      description: '为供应商、门店、景区及OEM工厂提供数字化工具与品牌增值服务，携手打造差异化产品。'
    },
    {
      icon: Globe,
      title: '超本地化服务',
      description: '深度挖掘每座城市的独特细节，让每一家店、每一道菜、每一个文化体验都能被精准发现。'
    },
    {
      icon: Shield,
      title: '可信信息保障',
      description: '让可信信息成为新质生产力的核心要素，严守个人信息与食品安全底线。'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ocean-600 to-sunset-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">关于我们</h1>
            <p className="text-xl leading-relaxed">
              我们是一款由 AI 驱动、同时面向 B 端与 C 端的超本地化旅游与本地生活服务平台。
              我们诞生于烟台的山海之畔，正通过"技术赋能 + 本地共创"模式，
              把传统 OTA 的撮合生意升级为可防御、可复制的 B2B2C 生态系统。
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Mission */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl text-center">我们的使命</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                用先进的 AI 与供应链科技，帮助城市里的每一家店、每一道菜、每一个文化体验都能被精准发现、高效履约，
                让可信信息成为新质生产力的核心要素。
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <feature.icon className="h-8 w-8 text-ocean-600 mr-3" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cooperation Models */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">四大 To B 合作模式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-ocean-600 pl-4">
                <h4 className="font-semibold text-lg mb-2">1. 技术赋能型供应商</h4>
                <p className="text-gray-700">接入 Glocal 自研 SCM、AI 需求预测与标准化品控 SOP，生产效率最高可提升 30% 以上。</p>
              </div>
              <div className="border-l-4 border-sunset-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">2. "Glocal"品牌联盟（OEM）</h4>
                <p className="text-gray-700">严格品控 + 流量扶持，为本地优质产品贴上 "Glocal 精选" 标签，帮助合作方获得 20–50% 的品牌溢价空间。</p>
              </div>
              <div className="border-l-4 border-ocean-600 pl-4">
                <h4 className="font-semibold text-lg mb-2">3. 末端渠道优化（合作门店）</h4>
                <p className="text-gray-700">为酒店礼品店、零售门店等提供独家且质量可控的特色货源，简化采购并提升客单价。</p>
              </div>
              <div className="border-l-4 border-sunset-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">4. 共生式景区合作</h4>
                <p className="text-gray-700">与景区共创联名沉浸体验，把门票销售升级为"内容 + 商品 + 服务"的全链路共赢。</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">联系我们</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold mb-2">商务合作</h4>
                  <p className="text-ocean-600">glocal@yeah.net</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">媒体采访</h4>
                  <p className="text-ocean-600">glocal@yeah.net</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">人才加入</h4>
                  <p className="text-ocean-600">glocal@yeah.net</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-lg font-medium text-gray-800">
                  Glocal —— 与伙伴共创，让每一次本地体验都独一无二、值得被世界看见。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
