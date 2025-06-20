
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const registerFormSchema = z.object({
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(6, { message: '密码至少需要6个字符' }),
  confirmPassword: z.string().min(6, { message: '请确认密码' }),
  phone: z.string().min(11, { message: '请输入有效的手机号码' }),
  fullName: z.string().min(2, { message: '请输入真实姓名' }),
  agreeTerms: z.boolean().refine((val) => val === true, { message: '请同意服务条款' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "密码不匹配",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { 
      email: '', 
      password: '', 
      confirmPassword: '',
      phone: '',
      fullName: '',
      agreeTerms: false
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsSubmitting(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: values.fullName,
            phone: values.phone,
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('该邮箱已经注册，请直接登录');
          navigate('/login');
          return;
        }
        throw error;
      }

      if (data.user && !data.session) {
        toast.success('注册成功！请检查您的邮箱并点击验证链接');
      } else if (data.session) {
        toast.success('注册成功！欢迎使用我们的平台');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || '注册失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 sm:py-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>用户注册</CardTitle>
            <CardDescription>加入我们的旅行平台，开始您的精彩旅程</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>真实姓名</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入您的真实姓名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱地址</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>手机号码</FormLabel>
                      <div className="flex gap-2">
                        <Select defaultValue="+86">
                          <SelectTrigger className="w-[120px] shrink-0">
                            <SelectValue placeholder="区号" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+86">CN +86</SelectItem>
                            <SelectItem value="+1">US +1</SelectItem>
                            <SelectItem value="+44">UK +44</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input placeholder="请输入手机号码" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="至少6个字符" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>确认密码</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="请再次输入密码" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          我已阅读并同意{' '}
                          <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                            服务条款
                          </Link>{' '}
                          和{' '}
                          <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                            隐私政策
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full gradient-ocean text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '注册中...' : '立即注册'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                已有账户？{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  立即登录
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
