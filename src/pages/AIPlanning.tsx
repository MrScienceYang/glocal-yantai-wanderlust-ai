import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Download, Share2, Clock, Star, Award, Globe, Brain, Zap, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import { useAIPlanning } from '@/hooks/useAIPlanning';
import AIPermissionCheck from '@/components/AIPermissionCheck';
import MobileTravelHub from '@/components/MobileTravelHub';
import { generateTravelPlanPDF } from '@/utils/travelPdfGenerator';

const AIPlanning = () => {
  const { selectedCountry, selectedCity } = useCityContext();
  const { generatePlan, isLoading, plan, hasPermission, grantPermission, thinkingProcess } = useAIPlanning();
  const [preferences, setPreferences] = useState({
    country: selectedCountry,
    province: '',
    city: selectedCity,
    interests: '',
    budget: '',
    duration: '',
    groupSize: '',
    travelStyle: '',
  });
  const [showPlan, setShowPlan] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      country: selectedCountry,
      city: selectedCity,
    }));
  }, [selectedCountry, selectedCity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.interests || !preferences.budget || !preferences.duration || !preferences.groupSize || !preferences.travelStyle) {
      toast.error('请填写所有偏好设置');
      return;
    }
    
    setShowThinking(true);
    await generatePlan(preferences);
    setShowPlan(true);
    setShowThinking(false);
  };

  const handleDownloadPDF = () => {
    if (!plan) {
      toast.error('没有可下载的计划');
      return;
    }

    try {
      generateTravelPlanPDF({
        destination: `${selectedCountry} ${selectedCity}`,
        duration: preferences.duration,
        groupSize: preferences.groupSize,
        budget: preferences.budget,
        travelStyle: preferences.travelStyle,
        interests: preferences.interests,
        plan: plan,
        thinkingProcess: thinkingProcess
      });
      toast.success('行程计划PDF已生成！');
    } catch (error) {
      console.error('PDF生成失败:', error);
      toast.error('PDF生成失败，请稍后重试');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '我的AI旅行计划',
        text: '快来看看我的旅行计划吧！',
        url: document.location.href,
      }).then(() => {
        toast.success('计划已分享！');
      }).catch((error) => {
        toast.error('分享失败：' + error);
      });
    } else {
      toast.error('您的浏览器不支持分享功能，请复制链接发送给朋友');
    }
  };

  const handlePermissionGranted = () => {
    setPermissionGranted(true);
    grantPermission();
  };

  // If user doesn't have permission and hasn't granted it yet, show permission check
  if (!hasPermission && !permissionGranted) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* 英雄区域 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 智能旅行规划</h1>
            <p className="text-gray-600">
              {selectedCountry === '中国' ? '探索国内的无限可能，让AI为您量身定制完美行程。' : '开启国际旅行，AI智能规划您的每一步。'}
            </p>
          </div>

          {/* 移动端出行服务快捷入口 */}
          <div className="md:hidden mb-8">
            <MobileTravelHub />
          </div>

          {/* AI权限检查 */}
          <AIPermissionCheck onPermissionGranted={handlePermissionGranted} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 英雄区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 智能旅行规划</h1>
          <p className="text-gray-600">
            {selectedCountry === '中国' ? '探索国内的无限可能，让AI为您量身定制完美行程。' : '开启国际旅行，AI智能规划您的每一步。'}
          </p>
        </div>

        {/* 移动端出行服务快捷入口 */}
        <div className="md:hidden mb-8">
          <MobileTravelHub />
        </div>

        {/* AI思考过程展示 */}
        {showThinking && thinkingProcess && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Brain className="mr-2 h-5 w-5 animate-pulse" />
                AI推理过程
              </CardTitle>
              <CardDescription className="text-blue-600">
                观察AI如何一步步分析您的需求并制定旅行计划
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-blue-500 mt-1 animate-bounce" />
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {thinkingProcess}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 偏好设置 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
              偏好设置
            </CardTitle>
            <CardDescription>告诉我们您的旅行偏好，AI将为您生成个性化行程。</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">国家</Label>
                  <Input
                    type="text"
                    id="country"
                    value={preferences.country}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="city">城市</Label>
                  <Input
                    type="text"
                    id="city"
                    value={preferences.city}
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="interests">兴趣爱好</Label>
                <Textarea
                  id="interests"
                  placeholder="例如：历史古迹、自然风光、美食、购物"
                  value={preferences.interests}
                  onChange={(e) => setPreferences({ ...preferences, interests: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget">预算范围 (元)</Label>
                  <Input
                    type="number"
                    id="budget"
                    placeholder="例如：5000"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">旅行天数</Label>
                  <Input
                    type="number"
                    id="duration"
                    placeholder="例如：3"
                    value={preferences.duration}
                    onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="groupSize">人数</Label>
                  <Input
                    type="number"
                    id="groupSize"
                    placeholder="例如：2"
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences({ ...preferences, groupSize: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="travelStyle">旅行风格</Label>
                <select
                  id="travelStyle"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={preferences.travelStyle}
                  onChange={(e) => setPreferences({ ...preferences, travelStyle: e.target.value })}
                >
                  <option value="">选择旅行风格</option>
                  <option value="休闲度假">休闲度假</option>
                  <option value="深度文化">深度文化</option>
                  <option value="冒险探索">冒险探索</option>
                  <option value="美食之旅">美食之旅</option>
                  <option value="亲子游">亲子游</option>
                  <option value="说走就走">说走就走</option>
                  <option value="酒店爱好者">酒店爱好者</option>
                  <option value="飞友">飞友</option>
                </select>
              </div>
              <Button type="submit" className="gradient-ocean text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    生成旅行计划
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 旅行计划展示 */}
        {showPlan && plan && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-green-500" />
                AI 生成的旅行计划
              </CardTitle>
              <CardDescription>
                {selectedCountry} {selectedCity} {preferences.duration}日游
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">
                  <Calendar className="mr-1 h-4 w-4" />
                  {plan.startDate}
                </Badge>
                <Badge variant="secondary">
                  <Users className="mr-1 h-4 w-4" />
                  {plan.recommendedGroupSize}人
                </Badge>
                <Badge variant="secondary">
                  <DollarSign className="mr-1 h-4 w-4" />
                  {plan.totalCost}元
                </Badge>
              </div>
              {plan.itinerary.map((day, index) => (
                <div key={index} className="border rounded-md p-4">
                  <h3 className="text-xl font-bold mb-2">
                    第{index + 1}天：{day.date}
                  </h3>
                  <ul className="list-disc pl-5">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="mb-2">
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-gray-500">
                          {activity.time} - {activity.location}
                        </div>
                        <div className="text-gray-700">{activity.description}</div>
                        <div className="text-sm text-gray-500">
                          交通方式：{activity.transportation}，预计费用：{activity.estimatedCost}元
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  下载PDF
                </Button>
                <Button className="gradient-ocean text-white" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  分享计划
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AIPlanning;
