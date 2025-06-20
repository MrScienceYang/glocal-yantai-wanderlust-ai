
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser } from '@/components/UserProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Facebook } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const passwordFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const codeFormSchema = z.object({
  identifier: z.string().min(1, { message: 'Phone number or email is required.' }),
  code: z.string().min(4, { message: 'Verification code must be at least 4 characters.' }),
});

// Placeholder icons for social media
const WeChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 11.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
    <path d="M14.5 9.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z" />
    <path d="M9.5 9.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z" />
    <path d="M21 12.5c0-4.5-3.5-8-8-8s-8 3.5-8 8c0 3 .5 5 2.5 6.5a1 1 0 0 0 1.5-1 c-1.5-1-2-2.5-2-4.5" />
  </svg>
);
const WeiboIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.94,8.34c-0.3-0.84-0.89-1.43-1.73-1.73c-0.84-0.3-2.19-0.5-4.21-0.5h-4c-2.02,0-3.37,0.2-4.21,0.5C6.09,7,5.5,7.5,5.2,8.34C4.9,9.18,4.7,10.53,4.7,12.55v0c0,2.02,0.2,3.37,0.5,4.21c0.3,0.84,0.89,1.43,1.73,1.73c0.84,0.3,2.19,0.5,4.21,0.5h4c2.02,0,3.37-0.2,4.21-0.5c0.84-0.3,1.43-0.89,1.73-1.73c0.3-0.84,0.5-2.19,0.5-4.21v0C21.44,10.53,21.24,9.18,20.94,8.34z M14.19,13.29c-0.29,0.29-0.69,0.44-1.2,0.44s-0.91-0.15-1.2-0.44c-0.29-0.29-0.44-0.69-0.44-1.2s0.15-0.91,0.44-1.2c0.29-0.29,0.69-0.44,1.2-0.44s0.91,0.15,1.2,0.44c0.29,0.29,0.44,0.69,0.44,1.2S14.48,13,14.19,13.29z M17.06,10.42c-0.1,0.1-0.24,0.15-0.42,0.15s-0.32-0.05-0.42-0.15c-0.1-0.1-0.15-0.24-0.15-0.42s0.05-0.32,0.15-0.42c0.1-0.1,0.24-0.15,0.42-0.15s0.32,0.05,0.42,0.15c0.1,0.1,0.15,0.24,0.15,0.42S17.16,10.32,17.06,10.42z M9.7,15.86c-0.38,0.24-0.78,0.36-1.2,0.36c-0.77,0-1.39-0.27-1.87-0.81c-0.48-0.54-0.72-1.25-0.72-2.14c0-0.89,0.24-1.6,0.72-2.14c0.48-0.54,1.1-0.81,1.87-0.81c0.42,0,0.82,0.12,1.2,0.36l0.31,1.52c-0.3-0.23-0.6-0.34-0.91-0.34c-0.43,0-0.77,0.17-1.03,0.52c-0.26,0.35-0.39,0.8-0.39,1.35s0.13,1,0.39,1.35c0.26,0.35,0.6,0.52,1.03,0.52c0.31,0,0.61-0.11,0.91-0.34L9.7,15.86z"/></svg>
);
const DouyinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.4,9.3c-1-0.1-1.6,0.5-1.7,1.3c-0.1,0.8,0.4,1.5,1.2,1.6c1,0.1,1.6-0.5,1.7-1.3C13.7,10.1,13.2,9.4,12.4,9.3z M16.3,12.3c-0.1-1.6-1.1-3-2.7-3.4c-1.6-0.4-3.2,0.1-4.2,1.4c0,0-0.1,0.1-0.1,0.2c-0.1,0.1,0,0.2,0.1,0.2c0.1,0,0.2-0.1,0.2-0.1c1-1.2,2.4-1.6,3.8-1.2c1.4,0.3,2.3,1.5,2.4,2.8c0.1,0.8-0.2,1.6-0.7,2.2c-0.5,0.6-1.2,1-2,1.1c-0.1,0-0.1,0-0.2,0c-1.4,0-2.6-0.8-3.1-2c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0.1-0.1,0.2,0,0.3c0.6,1.4,2,2.3,3.5,2.3c0.1,0,0.2,0,0.3,0c1-0.1,1.9-0.6,2.5-1.3C16.3,14,16.5,13.2,16.3,12.3z M18,3.5H6C4.6,3.5,3.5,4.6,3.5,6v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5V6C20.5,4.6,19.4,3.5,18,3.5z"/></svg>
);
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 10.5c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.7-2.6 3.6v2.8h3.6c2.1-1.9 3.3-4.7 3.3-7.5z" fill="#4285F4"/>
    <path d="M12 21c3.2 0 5.8-1.1 7.8-2.9l-3.6-2.8c-1.1.7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5.1H1.5v2.9C3.5 18.9 7.4 21 12 21z" fill="#34A853"/>
    <path d="M5.1 14.3c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2V7.1H1.5C.6 8.8 0 10.8 0 13s.6 4.2 1.5 5.9l3.6-2.6z" fill="#FBBC05"/>
    <path d="M12 5.2c1.7 0 3.3.6 4.5 1.8l3.2-3.2C17.8.6 15.2 0 12 0 7.4 0 3.5 2.1 1.5 5.1l3.6 2.8c1-3 3.7-5.1 6.9-5.1z" fill="#EA4335"/>
  </svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
);


const LoginPage = () => {
  const { login, socialLogin, loginWithCode } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isCodeSending, setIsCodeSending] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { username: '', password: '' },
  });

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { identifier: '', code: '' },
  });

  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    const success = login(values.username, values.password);
    if (success) {
      toast.success(t('login.success'));
      navigate('/');
    } else {
      toast.error(t('login.failure'));
    }
  }

  function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
    const success = loginWithCode(values.identifier, values.code);
    if (success) {
      toast.success(t('login.code_success'));
      navigate('/');
    } else {
      toast.error(t('login.invalid_code'));
    }
  }

  const handleSocialLogin = (provider: string) => {
    if (socialLogin(provider)) {
      navigate('/');
    }
  };

  const handleGetCode = () => {
    const identifier = codeForm.getValues('identifier');
    if (!identifier) {
      codeForm.setError('identifier', { type: 'manual', message: 'Phone number or email is required.' });
      return;
    }
    setIsCodeSending(true);
    toast.success(t('login.code_sent'));
    setTimeout(() => setIsCodeSending(false), 10000);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 sm:py-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('login.title')}</CardTitle>
            <CardDescription>{t('login.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">{t('login.password_login')}</TabsTrigger>
                <TabsTrigger value="code">{t('login.code_login')}</TabsTrigger>
              </TabsList>
              <TabsContent value="password">
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6 pt-6">
                    <FormField
                      control={passwordForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('login.username')}</FormLabel>
                          <FormControl>
                            <Input placeholder="admin" {...field} />
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
                          <FormLabel>{t('login.password')}</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full gradient-ocean text-white">
                      {t('login.submit')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="code">
                <Form {...codeForm}>
                  <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-6 pt-6">
                    <FormField
                      control={codeForm.control}
                      name="identifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('login.phone_or_email')}</FormLabel>
                          <div className="flex gap-2">
                             <Select defaultValue="+86">
                                <SelectTrigger className="w-[120px] shrink-0">
                                  <SelectValue placeholder="区号" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+86">CN +86</SelectItem>
                                  <SelectItem value="+1">US +1</SelectItem>
                                </SelectContent>
                              </Select>
                            <FormControl>
                              <Input placeholder={t('login.phone_or_email')} {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={codeForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('login.verification_code')}</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder={t('login.verification_code')} {...field} />
                            </FormControl>
                            <Button type="button" onClick={handleGetCode} disabled={isCodeSending} className="shrink-0">
                              {isCodeSending ? t('login.resend_code') : t('login.get_code')}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full gradient-ocean text-white">
                      {t('login.submit')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('login.third_party_login')}</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('WeChat')}><WeChatIcon className="h-6 w-6 text-green-500" /></Button>
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('Weibo')}><WeiboIcon className="h-6 w-6 text-red-500" /></Button>
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('Douyin')}><DouyinIcon className="h-6 w-6 text-black" /></Button>
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('Google')}><GoogleIcon className="h-6 w-6" /></Button>
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('Facebook')}><Facebook className="h-6 w-6 text-blue-600" /></Button>
              <Button variant="outline" size="icon" className="w-full" onClick={() => handleSocialLogin('X')}><XIcon className="h-5 w-5" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
