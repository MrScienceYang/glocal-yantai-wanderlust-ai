
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, FileText, Users, Building, Scale, Heart, ArrowRight } from 'lucide-react';
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
              汇聚创新力量，连接投资资源，助力创业梦想实现
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">创新创业</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">投资对接</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">资源整合</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">商业孵化</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* 快速导航 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">快速导航</h2>
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

          {/* 创新大赛介绍 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Glocal创新创业大赛</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                    大赛亮点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 🏆 总奖金池100万元，助力优秀项目快速发展</li>
                    <li>• 🚀 一对一投资对接，直通知名投资机构</li>
                    <li>• 🌟 专业导师团队，提供全程创业指导</li>
                    <li>• 📈 平台资源支持，助力项目快速孵化</li>
                    <li>• 🤝 产业合作机会，实现商业价值转化</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 text-blue-500 mr-2" />
                    参赛对象
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 🎓 高校大学生创新创业团队</li>
                    <li>• 💼 初创企业和小微企业</li>
                    <li>• 🔬 科研院所技术转化项目</li>
                    <li>• 🌐 互联网+旅游创新项目</li>
                    <li>• 🤖 AI技术应用创新项目</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 行动号召 */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-6">开启您的创业之旅</h3>
                <p className="text-xl mb-8 opacity-90">
                  加入Glocal创新生态，与行业领袖共创未来
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                    <Link to="/investor-relations" className="flex items-center">
                      投资者入口
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    <Link to="/careers" className="flex items-center">
                      人才招聘
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
