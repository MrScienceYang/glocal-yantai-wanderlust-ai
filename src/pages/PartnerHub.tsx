import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Shield, ArrowRight, Sparkles, Cpu, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import TechTransition from '@/components/TechTransition';

const PartnerHub = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowContent(true);
  };

  const partnerOptions = [
    {
      id: 'supply-chain',
      title: '供应链合作伙伴详情',
      description: '了解我们的供应链合作模式，共建智能化供应链生态体系',
      icon: Network,
      gradient: 'from-blue-600 to-cyan-600',
      features: ['智能供应链管理', '数据驱动决策', '全链路追溯', '风险预警系统'],
      link: '/supply-chain-partner'
    },
    {
      id: 'partner-login',
      title: '合作伙伴统一认证账号登录',
      description: '使用统一认证系统，安全便捷地管理您的合作伙伴账户',
      icon: Shield,
      gradient: 'from-green-600 to-emerald-600',
      features: ['多重安全认证', '单点登录', '权限管理', '操作日志'],
      link: '/partner-login'
    }
  ];

  if (showTransition) {
    return <TechTransition isVisible={showTransition} onComplete={handleTransitionComplete} />;
  }

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
                <Sparkles className="h-8 w-8 text-cyan-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  合作伙伴入驻专区
                </h1>
                <Cpu className="h-8 w-8 text-purple-400 ml-4" />
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                携手共创AI驱动的智能商业生态，让科技赋能传统产业，共同迈向数字化未来
              </p>
            </motion.div>

            {/* 合作选项卡片 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
              {partnerOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                >
                  <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden">
                    <CardHeader className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${option.gradient} shadow-lg`}>
                            <option.icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl text-white mb-2">
                          {option.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          {option.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <div className="space-y-3 mb-6">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-300">
                            <ArrowRight className="h-4 w-4 text-cyan-400 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {option.link === '#' ? (
                        <Button 
                          className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-xl`}
                          size="lg"
                        >
                          了解详情
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      ) : (
                        <Button 
                          asChild
                          className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-xl`}
                          size="lg"
                        >
                          <Link to={option.link}>
                            了解详情
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* 底部联系信息 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    需要更多帮助？
                  </h3>
                  <p className="text-gray-300 mb-6">
                    我们的专业团队随时为您提供技术支持和咨询服务
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      在线咨询
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                      预约演示
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerHub;
