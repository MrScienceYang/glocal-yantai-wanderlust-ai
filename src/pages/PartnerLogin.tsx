import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Eye, EyeOff, Smartphone, Lock, Building2, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

// Mock user data for demonstration
const mockUsers = {
  "users": [
    {
      "user": "17375411453",
      "password": "123456"
    },
    {
      "user": "ytkj",
      "password": "user"
    },
    {
      "user": "admin",
      "password": "admin"
    },
    {
      "user": "ytkj-wine",
      "password": "wine"
    }
  ]
};

// Biometric verification steps
const biometricSteps = [
  { id: 'blink', name: '请眨眼', icon: '👁️', instruction: '请正常眨眼3次' },
  { id: 'mouth', name: '请张嘴', icon: '👄', instruction: '请张开嘴巴并保持2秒' },
  { id: 'head', name: '请摇头', icon: '🔄', instruction: '请左右摇头2次' },
  { id: 'nod', name: '请点头', icon: '⬇️', instruction: '请上下点头2次' }
];

const PartnerLogin = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTransition, setShowTransition] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Biometric states
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      toast.error('无法访问摄像头，请检查权限设置');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const simulateBiometricStep = () => {
    const step = biometricSteps[currentStep];
    setStepProgress(0);
    
    // Simulate detection progress
    const progressInterval = setInterval(() => {
      setStepProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCompletedSteps(prev => [...prev, step.id]);
          
          if (currentStep < biometricSteps.length - 1) {
            setTimeout(() => {
              setCurrentStep(currentStep + 1);
            }, 1000);
          } else {
            // All steps completed
            setTimeout(() => {
              completeBiometricAuth();
            }, 1500);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const completeBiometricAuth = () => {
    stopCamera();
    toast.success('活体检测通过，登录成功！');
    localStorage.setItem('partner-user', JSON.stringify(currentUser));
    navigate('/partner-dashboard');
  };

  const handleLogin = () => {
    if (!username) {
      toast.error('请输入企业社会统一信用代码');
      return;
    }

    if (loginMethod === 'password' && !password) {
      toast.error('请输入密码');
      return;
    }

    if (loginMethod === 'verification' && !verificationCode) {
      toast.error('请输入验证码');
      return;
    }

    // Check mock user data
    const user = mockUsers.users.find(u => u.user === username);
    
    if (loginMethod === 'password') {
      if (user && user.password === password) {
        setCurrentUser(user);
        setShowContent(false);
        setShowBiometric(true);
        setTimeout(() => {
          startCamera();
        }, 1000);
      } else {
        toast.error('用户名或密码错误');
      }
    } else {
      // For verification code login, we'll simulate success if username exists
      if (user && verificationCode === '123456') {
        setCurrentUser(user);
        setShowContent(false);
        setShowBiometric(true);
        setTimeout(() => {
          startCamera();
        }, 1000);
      } else if (user && verificationCode !== '123456') {
        toast.error('验证码错误，请输入123456');
      } else {
        toast.error('企业代码不存在');
      }
    }
  };

  const sendVerificationCode = () => {
    if (!username) {
      toast.error('请先输入企业社会统一信用代码');
      return;
    }
    toast.success('验证码已发送（模拟：123456）');
  };

  const resetBiometric = () => {
    setShowBiometric(false);
    setShowContent(true);
    setCurrentStep(0);
    setStepProgress(0);
    setCompletedSteps([]);
    stopCamera();
  };

  if (showTransition) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            {/* Electric Current Animation */}
            <div className="relative mb-8">
              <motion.div
                className="w-64 h-64 mx-auto relative"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-full opacity-30">
                  <motion.div
                    className="absolute top-0 left-1/2 w-1 h-8 bg-cyan-400 rounded-full"
                    style={{ originX: 0.5, originY: 0 }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Electric bolts */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 bg-gradient-to-b from-cyan-400 to-transparent"
                    style={{
                      height: '60px',
                      left: '50%',
                      top: '50%',
                      transformOrigin: '0 -120px',
                      transform: `rotate(${i * 45}deg) translateX(-50%)`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleY: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Center shield icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Shield className="h-16 w-16 text-cyan-400" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                网络环境检查中...
              </h2>
              <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                请确保企业负责人本人操作登录平台，正在执行网络环境检查
              </p>
              
              {/* Progress indicator */}
              <div className="w-64 mx-auto mt-6">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (showBiometric) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-white mb-4">
                  请验证您为指定的企业管理人员
                </h1>
                <p className="text-gray-300">
                  为确保企业账户安全，请按照提示完成企业管理人员身份验证
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Camera View */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Camera className="h-5 w-5 mr-2 text-cyan-400" />
                        摄像头检测
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {!isCameraActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <Camera className="h-12 w-12 mx-auto mb-2" />
                              <p>正在启动摄像头...</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Face detection overlay */}
                        {isCameraActive && (
                          <div className="absolute inset-0">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-48 h-64 border-2 border-cyan-400 rounded-2xl opacity-70">
                                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Instructions Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-green-400" />
                        验证步骤
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {biometricSteps.map((step, index) => (
                          <div
                            key={step.id}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              index === currentStep
                                ? 'border-cyan-400 bg-cyan-400/10'
                                : completedSteps.includes(step.id)
                                ? 'border-green-400 bg-green-400/10'
                                : 'border-gray-600 bg-gray-600/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{step.icon}</span>
                                <div>
                                  <h3 className="text-white font-semibold">{step.name}</h3>
                                  <p className="text-gray-300 text-sm">{step.instruction}</p>
                                </div>
                              </div>
                              {completedSteps.includes(step.id) ? (
                                <CheckCircle className="h-6 w-6 text-green-400" />
                              ) : index === currentStep ? (
                                <div className="w-6 h-6 border-2 border-cyan-400 rounded-full animate-pulse" />
                              ) : (
                                <div className="w-6 h-6 border-2 border-gray-600 rounded-full" />
                              )}
                            </div>
                            
                            {index === currentStep && stepProgress > 0 && (
                              <div className="mt-3">
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <motion.div
                                    className="bg-cyan-400 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stepProgress}%` }}
                                    transition={{ duration: 0.2 }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-3">
                        {currentStep < biometricSteps.length && (
                          <Button
                            onClick={simulateBiometricStep}
                            disabled={stepProgress > 0 && stepProgress < 100}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                          >
                            {stepProgress > 0 && stepProgress < 100 ? (
                              <>检测中... {stepProgress}%</>
                            ) : (
                              <>开始 {biometricSteps[currentStep]?.name}</>
                            )}
                          </Button>
                        )}
                        
                        <Button
                          onClick={resetBiometric}
                          variant="outline"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          重新登录
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
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
          <div className="max-w-md mx-auto">
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                    <CardHeader className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="p-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full">
                          <Building2 className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <CardTitle className="text-2xl text-white mb-2">
                        合作伙伴统一认证
                      </CardTitle>
                      <p className="text-gray-300 text-sm">
                        企业级安全登录平台
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <Tabs defaultValue="password" value={loginMethod} onValueChange={setLoginMethod}>
                        <TabsList className="grid w-full grid-cols-2 bg-white/5">
                          <TabsTrigger value="password" className="data-[state=active]:bg-white/20">
                            密码登录
                          </TabsTrigger>
                          <TabsTrigger value="verification" className="data-[state=active]:bg-white/20">
                            验证码登录
                          </TabsTrigger>
                        </TabsList>
                        
                        <div className="mt-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="username" className="text-gray-300 mb-2 block">
                                企业社会统一信用代码
                              </Label>
                              <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="请输入18位统一社会信用代码"
                              />
                            </div>
                            
                            <TabsContent value="password" className="space-y-4 mt-0">
                              <div>
                                <Label htmlFor="password" className="text-gray-300 mb-2 block">
                                  密码
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
                            </TabsContent>
                            
                            <TabsContent value="verification" className="space-y-4 mt-0">
                              <div>
                                <Label htmlFor="verification" className="text-gray-300 mb-2 block">
                                  短信验证码
                                </Label>
                                <div className="flex space-x-2">
                                  <Input
                                    id="verification"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 flex-1"
                                    placeholder="请输入验证码"
                                  />
                                  <Button
                                    type="button"
                                    onClick={sendVerificationCode}
                                    variant="outline"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                  >
                                    <Smartphone className="h-4 w-4 mr-1" />
                                    发送
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                          </div>
                          
                          <motion.div className="mt-6">
                            <motion.button
                              onClick={handleLogin}
                              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Shield className="h-5 w-5 mr-2 inline" />
                              安全登录
                            </motion.button>
                          </motion.div>
                          
                          <div className="mt-4 text-center">
                            <p className="text-gray-400 text-xs">
                              登录即表示您同意《合作伙伴服务协议》和《隐私政策》
                            </p>
                          </div>
                        </div>
                      </Tabs>
                    </CardContent>
                  </Card>
                  
                  {/* Demo credentials hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10"
                  >
                    <p className="text-gray-300 text-sm text-center mb-2 font-semibold">
                      演示账号（仅供测试）
                    </p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>账号: 17375411453 / ytkj / admin / ytkj-wine</div>
                      <div>密码: 123456 / user / admin / wine</div>
                      <div>验证码: 123456</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerLogin;
