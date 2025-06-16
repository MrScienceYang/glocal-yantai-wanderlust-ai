
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Zap, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

// 模拟合作伙伴用户数据
const partnerUsers = [
  { user: "17375411453", password: "123456" },
  { user: "ytkj", password: "user" },
  { user: "admin", password: "admin" }
];

const passwordFormSchema = z.object({
  socialCreditCode: z.string().min(18, { message: '请输入正确的社会统一信用代码' }),
  password: z.string().min(1, { message: '密码不能为空' }),
});

const codeFormSchema = z.object({
  socialCreditCode: z.string().min(18, { message: '请输入正确的社会统一信用代码' }),
  verificationCode: z.string().min(4, { message: '验证码至少4位' }),
});

const ElectricTransition = ({ isVisible, onComplete }: { isVisible: boolean; onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center"
        >
          {/* 电流背景动画 */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: '100vh',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* 中央内容 */}
          <div className="relative z-10 text-center max-w-md mx-auto p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="p-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mr-4"
                >
                  <Shield className="h-12 w-12 text-white" />
                </motion.div>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-cyan-400 rounded-full"
                      animate={{
                        scaleY: [0.3, 1, 0.3],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">
                合作伙伴身份验证
              </h1>
              
              <p className="text-cyan-300 mb-8 leading-relaxed">
                请确保企业负责人本人操作登录平台<br />
                正在执行网络环境检查
              </p>

              {/* 进度条 */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="text-cyan-400 font-mono">
                {progress < 30 && "检查网络连接..."}
                {progress >= 30 && progress < 60 && "验证企业资质..."}
                {progress >= 60 && progress < 90 && "加载安全模块..."}
                {progress >= 90 && "准备就绪"}
              </div>

              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 flex items-center justify-center text-green-400"
                >
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>环境检查完成</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PartnerLogin = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isCodeSending, setIsCodeSending] = useState(false);
  const navigate = useNavigate();

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { socialCreditCode: '', password: '' },
  });

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { socialCreditCode: '', verificationCode: '' },
  });

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowLogin(true);
  };

  const handlePasswordLogin = (values: z.infer<typeof passwordFormSchema>) => {
    const user = partnerUsers.find(u => u.user === values.socialCreditCode && u.password === values.password);
    if (user) {
      localStorage.setItem('partner-user', JSON.stringify(user));
      toast.success('登录成功');
      navigate('/partner-dashboard');
    } else {
      toast.error('社会统一信用代码或密码错误');
    }
  };

  const handleCodeLogin = (values: z.infer<typeof codeFormSchema>) => {
    const user = partnerUsers.find(u => u.user === values.socialCreditCode);
    if (user && values.verificationCode) {
      localStorage.setItem('partner-user', JSON.stringify(user));
      toast.success('验证码登录成功');
      navigate('/partner-dashboard');
    } else {
      toast.error('社会统一信用代码错误或验证码无效');
    }
  };

  const handleGetCode = () => {
    const socialCreditCode = codeForm.getValues('socialCreditCode');
    if (!socialCreditCode) {
      codeForm.setError('socialCreditCode', { type: 'manual', message: '请输入社会统一信用代码' });
      return;
    }
    setIsCodeSending(true);
    toast.success('验证码已发送');
    setTimeout(() => setIsCodeSending(false), 60000);
  };

  if (showTransition) {
    return <ElectricTransition isVisible={showTransition} onComplete={handleTransitionComplete} />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">合作伙伴登录</CardTitle>
              <p className="text-gray-300">请使用企业统一社会信用代码登录</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="password" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10">
                  <TabsTrigger value="password" className="text-white data-[state=active]:bg-cyan-600">密码登录</TabsTrigger>
                  <TabsTrigger value="code" className="text-white data-[state=active]:bg-cyan-600">验证码登录</TabsTrigger>
                </TabsList>
                
                <TabsContent value="password">
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordLogin)} className="space-y-6 pt-6">
                      <FormField
                        control={passwordForm.control}
                        name="socialCreditCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">社会统一信用代码</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="请输入18位社会统一信用代码" 
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">密码</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="请输入密码"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                        登录
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="code">
                  <Form {...codeForm}>
                    <form onSubmit={codeForm.handleSubmit(handleCodeLogin)} className="space-y-6 pt-6">
                      <FormField
                        control={codeForm.control}
                        name="socialCreditCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">社会统一信用代码</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="请输入18位社会统一信用代码"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={codeForm.control}
                        name="verificationCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">验证码</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input 
                                  placeholder="请输入验证码"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                  {...field} 
                                />
                              </FormControl>
                              <Button 
                                type="button" 
                                onClick={handleGetCode} 
                                disabled={isCodeSending}
                                variant="outline"
                                className="shrink-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                              >
                                {isCodeSending ? '重新发送(60s)' : '获取验证码'}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                        登录
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-400/30">
                <h4 className="text-cyan-400 font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  测试账号
                </h4>
                <div className="text-xs text-gray-300 space-y-1">
                  <p>代码: 17375411453 | 密码: 123456</p>
                  <p>代码: ytkj | 密码: user</p>
                  <p>代码: admin | 密码: admin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PartnerLogin;
