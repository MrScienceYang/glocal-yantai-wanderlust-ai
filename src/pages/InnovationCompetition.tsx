
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, FileText, Users, Building, Scale, Heart, ArrowRight, Target, Award, Lightbulb, MapPin, FileCheck, Handshake, Bot, TrendingUp, Star } from 'lucide-react';
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
              Glocal参与中国国际大学生创新大赛，展示我们的创新成果与发展历程
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
          {/* Yantai as Starting Point */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">项目起始地：烟台</h2>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Glocal项目起源于美丽的海滨城市烟台，从这里开始，我们致力于打造全球化的本地旅游服务平台，让世界了解烟台，让烟台走向世界。
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">地理优势</h3>
                  <p className="text-gray-600">环渤海经济圈重要节点城市，连接东北亚的桥头堡</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">文旅资源</h3>
                  <p className="text-gray-600">丰富的海洋文化和历史底蕴，为平台提供优质内容</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">创新环境</h3>
                  <p className="text-gray-600">良好的创新创业氛围，助力项目快速发展</p>
                </div>
              </div>
            </div>
          </section>

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

          {/* 成果专区 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">成果专区</h2>
            
            {/* 知识产权成果 */}
            <div className="mb-12">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <FileCheck className="h-8 w-8 text-blue-600 mr-3" />
                    知识产权
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-red-600">非公开专利六项</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 智能农业数据采集与分析系统专利</li>
                        <li>• 农作物生长预测算法专利</li>
                        <li>• 精准农业施肥优化技术专利</li>
                        <li>• 农业物联网传感器网络专利</li>
                        <li>• 农产品质量智能检测系统专利</li>
                        <li>• 农业供应链溯源管理技术专利</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-red-600">软件著作六项</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• DynaCloud Analytics——大数据云处理技术管理系统</li>
                        <li>• 图形神经网络深度学习平台</li>
                        <li>• 全息洞察-多模态数据分析与决策支持系统</li>
                        <li>• 卷积神经网络深度学习平台</li>
                        <li>• 基于张量神经网络的高效模型压缩平台</li>
                        <li>• 基于Transformer神经网络架构的智能问答系统</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      为项目的持续发展提供了坚实的技术支撑和核心竞争力
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 意向合同 */}
            <div className="mb-12">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Handshake className="h-8 w-8 text-green-600 mr-3" />
                    意向合同
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <p className="text-lg text-gray-700 mb-4">
                      目前，我们已成功与多家烟台本地的优秀企业签订了合作意向书与战略合作协议
                    </p>
                    <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-2xl font-bold">
                      16项合作协议
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">酒店住宿</h4>
                      <p className="text-gray-600 text-sm">与本地知名酒店建立合作关系</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">景区票务</h4>
                      <p className="text-gray-600 text-sm">整合烟台优质旅游景区资源</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold mb-2">本地服务</h4>
                      <p className="text-gray-600 text-sm">本地达人和特色服务提供商</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI核心功能和社会价值 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Bot className="h-6 w-6 text-purple-600 mr-2" />
                    AI核心功能
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">AI智能行程规划系统</h4>
                      <p className="text-gray-700 text-sm">打造个性化旅游新体验，构建一个无缝衔接、高度智能化的用户体验</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">集成电商管理系统</h4>
                      <p className="text-gray-700 text-sm">确保不同品类商品的高效运营</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Target className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-xs font-medium">精准旅游个性定制</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Building className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-xs font-medium">集成电商管理</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <p className="text-xs font-medium">完备供应链服务</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <TrendingUp className="h-6 w-6 text-orange-600 mr-2" />
                    社会价值
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-500 mb-2">180+</div>
                      <p className="text-gray-700">为当地提供就业和实习岗</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">200+</div>
                      <p className="text-gray-700">助力烟台市农户</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-500 mb-2">30+</div>
                      <p className="text-gray-700">联动当地企业</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <p className="text-orange-800 font-medium text-center">
                      通过全方位的合作体系，推动烟台文旅产业数字化升级
                    </p>
                  </div>
                </CardContent>
              </Card>
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
                  通过参与中国国际大学生创新大赛，展示Glocal的创新能力与商业价值
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
