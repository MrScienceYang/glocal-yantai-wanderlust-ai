
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, FileText, Users, Building, Scale, Heart, ArrowRight, Target, Award, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const InnovationCompetition = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="h-16 w-16 mr-4" />
              <h1 className="text-5xl font-bold">创赛专区</h1>
            </div>
            <p className="text-xl leading-relaxed mb-8">
              Glocal参与中国大学生创新创业大赛，展示我们的创新成果与发展历程
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">参赛项目</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">创新模式</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">技术优势</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">商业价值</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* 快速导航 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">项目资料</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/development-milestones">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>开发历程</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/investor-relations">
                  <Building className="h-6 w-6 mb-2" />
                  <span>投资者关系</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/about-us">
                  <Heart className="h-6 w-6 mb-2" />
                  <span>关于我们</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/careers">
                  <Users className="h-6 w-6 mb-2" />
                  <span>加入我们</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/privacy-policy">
                  <Scale className="h-6 w-6 mb-2" />
                  <span>隐私政策</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/terms-of-service">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>服务条款</span>
                </Link>
              </Button>
            </div>
          </section>

          {/* 参赛项目介绍 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Glocal创新创业项目</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                    项目创新点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 🤖 AI智能行程规划，个性化旅游体验</li>
                    <li>• 🏘️ 本地达人服务模式，深度文化体验</li>
                    <li>• 🛍️ 预制菜+文创产品一体化销售</li>
                    <li>• 📱 多平台集成的本地化服务生态</li>
                    <li>• 🎁 盲盒旅行创新玩法</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-6 w-6 text-blue-500 mr-2" />
                    商业模式
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 💰 服务佣金：达人服务、票务预订</li>
                    <li>• 🛒 产品销售：预制菜、文创产品</li>
                    <li>• 👑 会员订阅：VIP服务与专属权益</li>
                    <li>• 🤝 B端合作：供应商入驻、广告投放</li>
                    <li>• 📊 数据价值：用户画像、市场洞察</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-6 w-6 text-green-500 mr-2" />
                    技术优势
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 🧠 多语言AI智能推荐算法</li>
                    <li>• 🌐 跨平台技术架构</li>
                    <li>• 📍 精准地理位置服务</li>
                    <li>• 💳 完整的支付与物流体系</li>
                    <li>• 📈 大数据分析与用户画像</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-6 w-6 text-purple-500 mr-2" />
                    市场前景
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 📊 本地旅游市场规模持续增长</li>
                    <li>• 🍜 预制菜市场年增长率超30%</li>
                    <li>• 👥 个性化服务需求日益增加</li>
                    <li>• 🌍 文旅融合国家政策支持</li>
                    <li>• 💡 AI+旅游创新模式领先</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 参赛成果展示 */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-6">参赛成果与愿景</h3>
                <p className="text-xl mb-8 opacity-90">
                  通过参与中国大学生创新创业大赛，展示Glocal的创新能力与商业价值
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                    <Link to="/investor-relations" className="flex items-center">
                      查看投资信息
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    <Link to="/about-us" className="flex items-center">
                      了解团队
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default InnovationCompetition;
