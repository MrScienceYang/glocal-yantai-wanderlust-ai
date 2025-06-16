import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CheckCircle,
  Zap,
  Cpu,
  Network,
  Shield,
  ArrowRight,
  Factory,
  Award,
  Store
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

interface FormData {
  cooperationType: string;
  companyName: string;
  legalRepresentative: string;
  contactPerson: string;
  phone: string;
  email: string;
  businessLicense: string;
  address: string;
  industryType: string;
  productDescription: string;
  expectedVolume: string;
  additionalInfo: string;
}

const CooperationApplication = () => {
  const [selectedType, setSelectedType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>();

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cooperationTypes = [
    {
      id: 'tech-empowerment',
      title: '技术赋能型供应商',
      subtitle: '生产端技术化改造',
      icon: Factory,
      gradient: 'from-blue-600 to-cyan-600',
      description: '面向具有发展潜力但在技术和管理上相对落后的本地生产者，提供一整套技术解决方案',
      features: ['SCM供应链管理软件', 'AI数据决策支持', '标准化运营流程', '技术培训与支持']
    },
    {
      id: 'brand-alliance',
      title: 'Glocal品牌联盟',
      subtitle: '贴牌/OEM合作',
      icon: Award,
      gradient: 'from-purple-600 to-pink-600',
      description: '面向具备稳定生产能力的本地供应商，授权生产带有Glocal商标的产品',
      features: ['商标使用许可', '质量控制体系', '营销渠道支持', '品牌信誉共享']
    },
    {
      id: 'retail-partner',
      title: '末端渠道优化',
      subtitle: '合作门店',
      icon: Store,
      gradient: 'from-green-600 to-emerald-600',
      description: '签约本地零售店、餐厅、酒店礼品店等作为线下合作伙伴',
      features: ['独家产品供应', '简化采购流程', '线上线下联动', '营销费用减免']
    },
    {
      id: 'scenic-cooperation',
      title: '共生式景区合作',
      subtitle: '战略共创伙伴',
      icon: MapPin,
      gradient: 'from-orange-600 to-red-600',
      description: '与景区建立深度共生合作关系，共同开发旅游产品',
      features: ['联名产品开发', '流量倾斜支持', '战略投资合作', '品牌共创']
    }
  ];

  const industryOptions = [
    '农产品加工', '食品制造', '餐饮服务', '零售贸易', 
    '旅游服务', '文创产品', '电子商务', '物流仓储', '其他'
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentStep(2);
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // 模拟提交过程
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // 3秒后返回到供应链合作页面
    setTimeout(() => {
      navigate('/supply-chain-partner');
    }, 3000);
  };

  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [100, -100],
        x: [0, Math.random() * 100 - 50]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: '100%'
      }}
    />
  );

  if (showSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">申请提交成功！</h2>
            <p className="text-gray-300 mb-6">
              我们已收到您的合作申请，专业团队将在24小时内与您联系
            </p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"
            />
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* 动态背景粒子 */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
        
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* 返回按钮 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="outline"
                asChild
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/supply-chain-partner">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回供应链合作
                </Link>
              </Button>
            </motion.div>

            {/* 页面标题 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-cyan-400 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  合作意向申请
                </h1>
                <Network className="h-8 w-8 text-purple-400 ml-4" />
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                选择最适合的合作模式，让AI技术赋能您的业务发展
              </p>
            </motion.div>

            {/* 步骤指示器 */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2].map((step) => (
                  <React.Fragment key={step}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: step * 0.1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {step}
                    </motion.div>
                    {step < 2 && (
                      <div className={`w-16 h-1 ${
                        currentStep > step ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-white/20'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {cooperationTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTypeSelect(type.id)}
                        className="cursor-pointer group"
                      >
                        <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                          <CardHeader className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-t-lg`}></div>
                            <div className="relative z-10">
                              <div className="flex items-center mb-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${type.gradient} shadow-lg`}>
                                  <type.icon className="h-8 w-8 text-white" />
                                </div>
                              </div>
                              <CardTitle className="text-xl text-white mb-2">
                                {type.title}
                              </CardTitle>
                              <CardDescription className="text-gray-300">
                                {type.subtitle}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="relative z-10">
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                              {type.description}
                            </p>
                            <div className="space-y-2">
                              {type.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-gray-300 text-sm">
                                  <CheckCircle className="h-3 w-3 text-cyan-400 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            <Button 
                              className={`w-full mt-6 bg-gradient-to-r ${type.gradient} hover:opacity-90 text-white transition-all duration-300`}
                            >
                              选择此合作模式
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white flex items-center">
                        <FileText className="h-6 w-6 text-cyan-400 mr-3" />
                        填写申请信息
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        请详细填写以下信息，我们将根据您的情况制定专属合作方案
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="companyName"
                              rules={{ required: "请输入公司名称" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <Building2 className="h-4 w-4 mr-2 text-cyan-400" />
                                    公司名称
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入完整的公司名称"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="legalRepresentative"
                              rules={{ required: "请输入法定代表人姓名" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <User className="h-4 w-4 mr-2 text-cyan-400" />
                                    法定代表人
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入法定代表人姓名"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="contactPerson"
                              rules={{ required: "请输入联系人姓名" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <User className="h-4 w-4 mr-2 text-cyan-400" />
                                    联系人
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入主要联系人姓名"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              rules={{ 
                                required: "请输入联系电话",
                                pattern: {
                                  value: /^1[3-9]\d{9}$/,
                                  message: "请输入正确的手机号码"
                                }
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-cyan-400" />
                                    联系电话
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入手机号码"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              rules={{ 
                                required: "请输入邮箱地址",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "请输入正确的邮箱地址"
                                }
                              }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-cyan-400" />
                                    邮箱地址
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入邮箱地址"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="businessLicense"
                              rules={{ required: "请输入统一社会信用代码" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-cyan-400" />
                                    统一社会信用代码
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                      placeholder="请输入18位统一社会信用代码"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="address"
                            rules={{ required: "请输入公司地址" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                                  公司地址
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    placeholder="请输入详细的公司地址"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="industryType"
                            rules={{ required: "请选择行业类型" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white flex items-center">
                                  <Factory className="h-4 w-4 mr-2 text-cyan-400" />
                                  行业类型
                                </FormLabel>
                                <FormControl>
                                  <select 
                                    {...field}
                                    className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                                  >
                                    <option value="">请选择行业类型</option>
                                    {industryOptions.map((industry) => (
                                      <option key={industry} value={industry} className="text-gray-900">
                                        {industry}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="productDescription"
                            rules={{ required: "请描述主要产品或服务" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">主要产品/服务描述</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                                    placeholder="请详细描述您的主要产品或服务内容"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="expectedVolume"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">预期合作规模</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    placeholder="如：月产能1000件、年营业额500万等"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">其他说明</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    placeholder="如有其他需要说明的信息，请在此填写"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-between pt-6">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep(1)}
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              返回选择
                            </Button>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-8 min-w-[120px]"
                            >
                              {isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <>
                                  提交申请
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CooperationApplication;
