import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Eye, EyeOff, Smartphone, Lock, Building2 } from 'lucide-react';
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
    }
  ]
};

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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
        localStorage.setItem('partner-user', JSON.stringify(user));
        toast.success('登录成功！');
        navigate('/partner-dashboard');
      } else {
        toast.error('用户名或密码错误');
      }
    } else {
      // For verification code login, we'll simulate success if username exists
      if (user && verificationCode === '123456') {
        localStorage.setItem('partner-user', JSON.stringify(user));
        toast.success('登录成功！');
        navigate('/partner-dashboard');
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
                      <div>账号: 17375411453 / ytkj / admin</div>
                      <div>密码: 123456 / user / admin</div>
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
