
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, Calendar, Shield, Eye, EyeOff, Camera, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const PaymentPlanAdjustment = () => {
  const navigate = useNavigate();
  const [monthlyPayment, setMonthlyPayment] = useState([15200]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: 调整方案, 2: 密码验证, 3: 人脸验证
  const [faceVerificationComplete, setFaceVerificationComplete] = useState(false);

  // 当前债务信息
  const totalDebt = 156800;
  const currentMonthlyPayment = 15200;
  const minPayment = 5000;
  const maxPayment = 50000;

  // 计算偿付时间
  const calculatePaymentMonths = (payment: number) => {
    return Math.ceil(totalDebt / payment);
  };

  const handleBack = () => {
    navigate('/partner-dashboard');
  };

  const handleConfirmAdjustment = () => {
    if (monthlyPayment[0] === currentMonthlyPayment) {
      toast.error('请调整月偿付金额');
      return;
    }
    setStep(2);
  };

  const handlePasswordVerification = () => {
    if (!password) {
      toast.error('请输入密码');
      return;
    }
    if (password !== '123456') {
      toast.error('密码错误');
      return;
    }
    setStep(3);
    // 模拟摄像头启动
    setTimeout(() => {
      setFaceVerificationComplete(true);
    }, 3000);
  };

  const handleComplete = () => {
    toast.success('偿还方案调整成功！');
    setTimeout(() => {
      navigate('/partner-dashboard');
    }, 2000);
  };

  if (step === 3) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-white mb-4">
                  企业管理人员身份验证
                </h1>
                <p className="text-gray-300">
                  请进行人脸验证以确认偿还方案调整
                </p>
              </motion.div>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    {!faceVerificationComplete ? (
                      <>
                        <div className="w-64 h-48 mx-auto bg-black rounded-lg mb-6 flex items-center justify-center">
                          <div className="text-gray-400">
                            <Camera className="h-12 w-12 mx-auto mb-2" />
                            <p>正在进行人脸验证...</p>
                            <div className="mt-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent mx-auto"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300">请保持面部清晰可见</p>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">验证成功</h3>
                        <p className="text-gray-300 mb-6">企业管理人员身份验证通过</p>
                        <Button 
                          onClick={handleComplete}
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8"
                        >
                          完成调整
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center mb-8"
            >
              <Button 
                onClick={handleBack}
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  偿还方案调整
                </h1>
                <p className="text-gray-300">
                  调整月偿付金额和偿付时间安排
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 当前方案 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
                      当前偿还方案
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-400/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">总债务金额</span>
                        <span className="text-white font-bold">¥{totalDebt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">月偿付金额</span>
                        <span className="text-blue-400 font-bold">¥{currentMonthlyPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">预计偿付时间</span>
                        <span className="text-blue-400 font-bold">{calculatePaymentMonths(currentMonthlyPayment)}个月</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 调整方案 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-green-400" />
                      {step === 1 ? '调整方案' : '密码验证'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {step === 1 ? (
                      <>
                        <div>
                          <Label className="text-gray-300 mb-4 block">
                            月偿付金额调整 (¥{minPayment.toLocaleString()} - ¥{maxPayment.toLocaleString()})
                          </Label>
                          <div className="space-y-4">
                            <Slider
                              value={monthlyPayment}
                              onValueChange={setMonthlyPayment}
                              min={minPayment}
                              max={maxPayment}
                              step={1000}
                              className="w-full"
                            />
                            <div className="text-center">
                              <span className="text-2xl font-bold text-white">
                                ¥{monthlyPayment[0].toLocaleString()}
                              </span>
                              <span className="text-gray-400 ml-2">/ 月</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-green-600/20 rounded-lg border border-green-400/30">
                          <h4 className="text-green-300 font-medium mb-3">调整后方案预览</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">新月偿付金额</span>
                              <span className="text-white">¥{monthlyPayment[0].toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">预计偿付时间</span>
                              <span className="text-green-400">{calculatePaymentMonths(monthlyPayment[0])}个月</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">时间变化</span>
                              <span className={monthlyPayment[0] > currentMonthlyPayment ? "text-green-400" : "text-red-400"}>
                                {monthlyPayment[0] > currentMonthlyPayment ? "-" : "+"}{Math.abs(calculatePaymentMonths(monthlyPayment[0]) - calculatePaymentMonths(currentMonthlyPayment))}个月
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={handleConfirmAdjustment}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        >
                          确认调整方案
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="password" className="text-gray-300 mb-2 block">
                              请输入登录密码确认身份
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10"
                                placeholder="请输入密码"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                            <div className="flex items-center text-yellow-300 mb-2">
                              <Shield className="h-4 w-4 mr-2" />
                              <span className="font-medium">安全提示</span>
                            </div>
                            <p className="text-sm text-yellow-200">
                              密码验证后还需要进行人脸识别验证，确保为企业管理人员本人操作
                            </p>
                          </div>

                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => setStep(1)}
                              variant="outline"
                              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              返回修改
                            </Button>
                            <Button 
                              onClick={handlePasswordVerification}
                              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white"
                            >
                              验证密码
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPlanAdjustment;
