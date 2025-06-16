import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Award, 
  Store, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  DollarSign,
  Users,
  Shield,
  Zap,
  TrendingUp,
  FileText,
  Handshake
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { generateBusinessPlanPDF } from '@/utils/pdfGenerator';

const SupplyChainPartner = () => {
  const [selectedMode, setSelectedMode] = useState('A');
  const [showContract, setShowContract] = useState(false);

  const cooperationModes = [
    {
      id: 'A',
      title: '技术赋能型供应商',
      subtitle: '生产端技术化改造',
      icon: Factory,
      gradient: 'from-blue-600 to-cyan-600',
      description: '面向具有发展潜力但在技术和管理上相对落后的本地生产者，提供一整套技术解决方案',
      features: [
        { title: '专有软件系统接入', desc: 'SCM供应链管理软件使用权限' },
        { title: 'AI数据决策支持', desc: '基于用户行为的精准需求预测' },
        { title: '标准化运营流程', desc: '完整的SOPs质量控制体系' }
      ],
      financialModel: [
        '技术改造启动金（一次性费用）',
        '技术服务年费或交易抽成',
        '成本回收机制（可垫付融资）',
        '合作保证金（风险抵押）'
      ]
    },
    {
      id: 'B',
      title: 'Glocal品牌联盟',
      subtitle: '贴牌/OEM合作',
      icon: Award,
      gradient: 'from-purple-600 to-pink-600',
      description: '面向具备稳定生产能力的本地供应商，授权生产带有Glocal商标的产品',
      features: [
        { title: '商标授权', desc: '特定产品使用Glocal商标的有限许可' },
        { title: '质量控制', desc: '严格的生产过程审核和随时抽检权' },
        { title: '价值交换', desc: '专项流量扶持和平台服务费减免' }
      ],
      financialModel: [
        '商标使用许可费',
        '质量保证金',
        '平台服务费减免20%-50%',
        'Glocal精选专区重点推广'
      ]
    },
    {
      id: 'C',
      title: '末端渠道优化',
      subtitle: '合作门店',
      icon: Store,
      gradient: 'from-green-600 to-emerald-600',
      description: '签约本地零售店、餐厅、酒店礼品店等作为线下合作伙伴',
      features: [
        { title: '独家产品供应', desc: '质量可控的独特供应链产品' },
        { title: '简化采购流程', desc: '单一可靠渠道进货管理' },
        { title: '线上线下联动', desc: '扫码下单、前台交付模式' }
      ],
      financialModel: [
        '批发模式供货',
        '差价利润分成',
        '免除订单服务费',
        '部分减免保证金'
      ]
    },
    {
      id: 'D',
      title: '共生式景区合作',
      subtitle: '战略共创伙伴',
      icon: MapPin,
      gradient: 'from-orange-600 to-red-600',
      description: '超越简单门票佣金，建立深度共生合作关系',
      features: [
        { title: '优选合作伙伴', desc: '景区显要位置优先陈列销售' },
        { title: '联名体验共创', desc: '共同开发独一无二的旅游产品' },
        { title: '流量倾斜支持', desc: '平台流量倾斜和联合营销' }
      ],
      financialModel: [
        '门票销售佣金减免60%',
        '联名产品收益分成',
        '营销费用共担',
        '战略投资合作'
      ]
    }
  ];

  const currentMode = cooperationModes.find(mode => mode.id === selectedMode);

  const handleDownloadMaterials = () => {
    if (!currentMode) return;
    
    const businessPlanData = {
      cooperationMode: `模式${currentMode.id}`,
      title: currentMode.title,
      description: currentMode.description,
      features: currentMode.features,
      financialModel: currentMode.financialModel
    };
    
    generateBusinessPlanPDF(businessPlanData);
  };

  const handleSignContract = () => {
    setShowContract(true);
    // 模拟签约流程
    setTimeout(() => {
      alert('合作意向提交成功！我们的商务团队将在24小时内与您联系。');
      setShowContract(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-cyan-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  供应链合作伙伴
                </h1>
                <TrendingUp className="h-8 w-8 text-purple-400 ml-4" />
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                携手Glocal，共创智能供应链生态。四种合作模式，全方位赋能传统产业数字化转型
              </p>
            </motion.div>

            {/* 合作模式选择器 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {cooperationModes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedMode === mode.id
                      ? 'border-cyan-400 bg-white/20'
                      : 'border-white/20 bg-white/10 hover:bg-white/15'
                  }`}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${mode.gradient} mb-3 mx-auto w-fit`}>
                    <mode.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{mode.title}</h3>
                  <p className="text-gray-300 text-xs">{mode.subtitle}</p>
                </motion.button>
              ))}
            </div>

            {/* 详细信息展示 */}
            {currentMode && (
              <motion.div
                key={selectedMode}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              >
                {/* 模式详情 */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${currentMode.gradient} mr-4`}>
                        <currentMode.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white mb-1">
                          模式{currentMode.id}：{currentMode.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {currentMode.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {currentMode.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white flex items-center">
                        <Zap className="h-5 w-5 text-cyan-400 mr-2" />
                        核心功能
                      </h4>
                      {currentMode.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-white font-medium">{feature.title}</h5>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 财务模型 */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <DollarSign className="h-6 w-6 text-green-400 mr-2" />
                      财务模型
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      灵活的合作方式，共赢的商业模式
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentMode.financialModel.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-400">
                            {idx + 1}
                          </Badge>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg border border-cyan-400/30">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-cyan-400 mr-2" />
                        <span className="text-white font-medium">合作保障</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        完善的法律框架保护，风险共担机制，确保双方权益最大化
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 平台优势展示 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-white mb-4">
                    为什么选择Glocal供应链合作
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">庞大用户基础</h3>
                      <p className="text-gray-300">覆盖全国主要城市的活跃用户群体</p>
                    </div>
                    <div className="text-center">
                      <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">AI智能赋能</h3>
                      <p className="text-gray-300">先进的AI技术提供精准市场预测</p>
                    </div>
                    <div className="text-center">
                      <div className="p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">全程风控保障</h3>
                      <p className="text-gray-300">完善的风险控制和法律保障体系</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 在线签约 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-md border-cyan-400/30 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-cyan-400 mr-3" />
                    <h3 className="text-3xl font-bold text-gray-800">
                      开启合作之旅
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-8 text-lg font-medium">
                    选择适合的合作模式，与Glocal共同开创供应链数字化新时代
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleDownloadMaterials}
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      size="lg"
                    >
                      <span className="text-gray-800 font-semibold">
                        下载合作资料
                      </span>
                    </Button>
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold px-8 py-4 text-lg"
                      size="lg"
                    >
                      <Link to="/cooperation-application">
                        <span className="text-gray-800 font-bold">
                          在线申请合作
                        </span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mt-4 font-medium">
                    * 提交合作意向后，专业商务团队将在24小时内联系您
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplyChainPartner;
