
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, Users, Globe, Target, BarChart, PieChart } from 'lucide-react';

const InvestorRelations = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    title: '',
    organization: '',
    contact: '',
    needBusinessPlan: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟提交逻辑
    console.log('投资咨询提交:', formData);
    setIsConsultModalOpen(false);
    // Reset form
    setFormData({
      surname: '',
      title: '',
      organization: '',
      contact: '',
      needBusinessPlan: false
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              投资者关系
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              携手共创AI驱动的本地化旅游新生态，共享数字化转型红利
            </p>
          </div>

          {/* 业务介绍专栏 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">业务介绍</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>AI + 本地达人双核模式</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">结合人工智能与本地专家服务，为用户提供个性化的深度旅行体验</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>B2B2C生态平台</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">连接供应商、商户、达人与消费者，构建完整的旅游生活服务生态</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>多城市复制模式</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">基于烟台成功模式，快速复制到其他城市，实现规模化扩张</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 增长情况专栏 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">增长情况</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <BarChart className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">注册用户</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">300%</div>
                  <div className="text-sm opacity-90">月增长率</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <PieChart className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">¥5M</div>
                  <div className="text-sm opacity-90">月交易额</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm opacity-90">合作伙伴</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 投资意向专栏 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">投资意向</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">A轮融资计划</CardTitle>
                  <CardDescription className="text-center">寻求战略投资伙伴，共同推动平台规模化发展</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4">融资用途</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 技术研发与AI能力提升</li>
                        <li>• 多城市扩张与运营团队建设</li>
                        <li>• 供应链整合与品牌建设</li>
                        <li>• 市场推广与用户获取</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">投资亮点</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 独特的AI+本地达人模式</li>
                        <li>• 高护城河的B2B2C生态</li>
                        <li>• 可复制的商业模式</li>
                        <li>• 庞大的市场空间</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 咨询投资事宜 */}
          <section className="text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">咨询投资事宜</h3>
                <p className="mb-6 opacity-90">
                  如果您对我们的项目感兴趣，欢迎联系我们获取更详细的商业计划书和投资信息
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setIsConsultModalOpen(true)}
                >
                  立即咨询
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* 咨询表单弹窗 */}
      <Dialog open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>投资咨询</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="surname">姓氏</Label>
              <Input
                id="surname"
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="title">称呼</Label>
              <Input
                id="title"
                placeholder="如：先生/女士/总经理等"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="organization">机构</Label>
              <Input
                id="organization"
                placeholder="公司或投资机构名称"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="contact">手机或邮箱</Label>
              <Input
                id="contact"
                placeholder="联系方式"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="businessPlan"
                checked={formData.needBusinessPlan}
                onCheckedChange={(checked) => setFormData({...formData, needBusinessPlan: checked as boolean})}
              />
              <Label htmlFor="businessPlan" className="text-sm">
                是否需要电子版商业计划书
              </Label>
            </div>
            <Button type="submit" className="w-full">
              提交咨询
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InvestorRelations;
