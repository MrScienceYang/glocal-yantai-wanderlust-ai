
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, HandHeart } from 'lucide-react';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    resume: null
  });

  const jobs = [
    {
      id: 1,
      title: 'C端产品经理（AI体验方向）',
      department: 'To C 业务',
      salary: '月薪 20k–30k + 绩效年终 2–4月 + 期权',
      responsibilities: [
        '定义并迭代 AI 行程规划、盲盒游、达人陪同等核心功能',
        '架构用户旅程数据闭环，驱动留存与复购',
        '协同算法、设计、运营团队快速落地 MVP'
      ],
      requirements: '3年以上移动产品经验，熟悉推荐系统或旅游行业优先',
      benefits: '六险一金、年度体检、移动办公补贴'
    },
    {
      id: 2,
      title: '用户增长运营经理',
      department: 'To C 业务',
      salary: '月薪 18k–28k + 绩效奖金 + 期权',
      responsibilities: [
        '策划裂变、内容种草、达人合作等增长活动',
        '跟踪渠道数据，A/B 测试优化 CVR',
        '负责私域社群与会员体系搭建'
      ],
      requirements: '2年以上增长或新媒体运营经验；对Z世代消费趋势敏感',
      benefits: '节日礼金、年度旅游基金'
    },
    {
      id: 3,
      title: '战略合作总监（B2B）',
      department: 'To B 业务',
      salary: '月薪 30k–45k + 业务提成 + 期权',
      responsibilities: [
        '制定并执行供应商、景区、渠道商的年度合作策略',
        '带队落地"Glocal 精选"OEM 与景区联名项目',
        '牵头大客户商务谈判与合同签署'
      ],
      requirements: '5年以上文旅或消费品 BD/联盟经验；具备团队管理与 P/L 视角',
      benefits: '通讯补贴、差旅补贴、企业年金'
    },
    {
      id: 4,
      title: '供应链解决方案经理',
      department: 'To B 业务',
      salary: '月薪 22k–35k + 绩效',
      responsibilities: [
        '为食品、文创 OEM 工厂导入 Glocal SCM SaaS，落地品控 SOP',
        '分析产能与需求预测数据，给出效率提升方案',
        '协同金融机构推进供应链融资'
      ],
      requirements: '3年以上供应链咨询或生产制造优化经验；熟悉 ERP/SaaS',
      benefits: '餐补、补充医疗、驻厂津贴'
    }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setFormData({ ...formData, resume: file });
    } else {
      alert('请上传PDF、DOC或DOCX格式的简历文件');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setIsDialogOpen(false);
      setFormData({ name: '', phone: '', email: '', experience: '', resume: null });
    }, 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ocean-600 to-sunset-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">加入我们</h1>
            <p className="text-xl">与Glocal一起创造未来，让每一次本地体验都独一无二</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Benefits */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">通用福利亮点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-ocean-600 pl-4">
                  <h4 className="font-semibold mb-2">股权激励</h4>
                  <p className="text-gray-700">核心骨干可获期权，随业务扩张共享成长红利</p>
                </div>
                <div className="border-l-4 border-sunset-500 pl-4">
                  <h4 className="font-semibold mb-2">学习成长</h4>
                  <p className="text-gray-700">年度1万元个人学习基金，外部培训与行业大会100%报销</p>
                </div>
                <div className="border-l-4 border-ocean-600 pl-4">
                  <h4 className="font-semibold mb-2">弹性与远程</h4>
                  <p className="text-gray-700">核心团队可实行"3+2"混合办公</p>
                </div>
                <div className="border-l-4 border-sunset-500 pl-4">
                  <h4 className="font-semibold mb-2">健康关怀</h4>
                  <p className="text-gray-700">补充医疗、雇主责任险、员工心理关怀计划</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">招聘岗位</h2>
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-1">{job.department}</p>
                      <p className="text-green-600 font-semibold">{job.salary}</p>
                    </div>
                    <Button onClick={() => handleApply(job)} className="gradient-ocean text-white">
                      在线投递
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">主要职责：</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">任职要求：</h4>
                      <p className="text-gray-700">{job.requirements}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">福利待遇：</h4>
                      <p className="text-gray-700">{job.benefits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>申请职位：{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          {!showSuccessAnimation ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">联系电话</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="experience">工作经验</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="请简述相关工作经验"
                />
              </div>
              
              <div>
                <Label htmlFor="resume">上传简历</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('resume').click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{formData.resume ? formData.resume.name : '选择文件'}</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">支持PDF、DOC、DOCX格式</p>
              </div>
              
              <Button type="submit" className="w-full gradient-ocean text-white">
                提交申请
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="animate-bounce mb-4">
                <HandHeart className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">感谢您的投递</h3>
              <p className="text-gray-600">期待与您共事</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Careers;
