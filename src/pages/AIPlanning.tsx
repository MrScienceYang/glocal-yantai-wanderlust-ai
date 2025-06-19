
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Download, Share2, Clock, Globe, Brain, Zap, FileText } from 'lucide-react';
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
    departure: '',
    interests: '',
    budget: '',
    duration: '',
    groupSize: '',
    travelStyle: '',
  });
  const [showPlan, setShowPlan] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      country: selectedCountry,
      city: selectedCity,
    }));
  }, [selectedCountry, selectedCity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    const requiredFields = [
      { field: preferences.departure, name: '出发地点' },
      { field: preferences.interests, name: '旅行偏好' },
      { field: preferences.budget, name: '预算范围' },
      { field: preferences.duration, name: '旅行天数' },
      { field: preferences.groupSize, name: '出行人数' },
      { field: preferences.travelStyle, name: '旅行风格' }
    ];

    const missingFields = requiredFields.filter(item => !item.field?.trim());
    
    if (missingFields.length > 0) {
      toast.error(`请填写：${missingFields.map(item => item.name).join('、')}`);
      return;
    }

    console.log('提交AI规划请求:', preferences);
    
    try {
      await generatePlan(preferences);
      setShowPlan(true);
    } catch (error) {
      console.error('生成计划失败:', error);
      toast.error('生成计划失败，请稍后重试');
    }
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

  // 安全渲染文本内容
  const safeRenderText = (text: any): string => {
    if (text === null || text === undefined) return '';
    if (typeof text === 'string') return text;
    if (typeof text === 'number') return String(text);
    if (typeof text === 'object') return JSON.stringify(text);
    return String(text);
  };

  // 格式化费用显示
  const formatCost = (cost: any): string => {
    if (typeof cost === 'number') return `${cost}元`;
    if (typeof cost === 'string') return cost.includes('元') ? cost : `${cost}元`;
    return '费用待定';
  };

  // 如果没有权限且未授权，显示权限检查
  if (!hasPermission && !permissionGranted) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 智能旅行规划</h1>
            <p className="text-gray-600">
              {selectedCountry === '中国' ? '探索国内的无限可能，让AI为您量身定制完美行程。' : '开启国际旅行，AI智能规划您的每一步。'}
            </p>
          </div>
          <div className="md:hidden mb-8">
            <MobileTravelHub />
          </div>
          <AIPermissionCheck onPermissionGranted={handlePermissionGranted} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 智能旅行规划</h1>
          <p className="text-gray-600">
            {selectedCountry === '中国' ? '探索国内的无限可能，让AI为您量身定制完美行程。' : '开启国际旅行，AI智能规划您的每一步。'}
          </p>
        </div>

        {/* 移动端快捷入口 */}
        <div className="md:hidden mb-8">
          <MobileTravelHub />
        </div>

        {/* AI思考过程展示 */}
        {thinkingProcess && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Brain className="mr-2 h-5 w-5" />
                AI推理过程
              </CardTitle>
              <CardDescription className="text-blue-600">
                观察AI如何分析您的需求并制定旅行计划
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-blue-500 mt-1" />
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {safeRenderText(thinkingProcess)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 偏好设置表单 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
              偏好设置
            </CardTitle>
            <CardDescription>告诉我们您的旅行偏好，AI将为您生成个性化行程。</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              {/* 目的地信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">国家</Label>
                  <Input
                    type="text"
                    id="country"
                    value={preferences.country}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="city">城市</Label>
                  <Input
                    type="text"
                    id="city"
                    value={preferences.city}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* 出发地点 */}
              <div>
                <Label htmlFor="departure">出发地点 *</Label>
                <Input
                  type="text"
                  id="departure"
                  placeholder="例如：北京市朝阳区、上海市浦东新区、广州市天河区"
                  value={preferences.departure}
                  onChange={(e) => setPreferences({ ...preferences, departure: e.target.value })}
                  required
                />
              </div>

              {/* 旅行偏好 */}
              <div>
                <Label htmlFor="interests">旅行偏好 *</Label>
                <Textarea
                  id="interests"
                  placeholder="例如：喜欢历史文化景点、偏爱自然风光、热爱美食体验、享受休闲度假等"
                  value={preferences.interests}
                  onChange={(e) => setPreferences({ ...preferences, interests: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget">预算范围 (元) *</Label>
                  <Input
                    type="number"
                    id="budget"
                    placeholder="例如：5000"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                    min="100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">旅行天数 *</Label>
                  <Input
                    type="number"
                    id="duration"
                    placeholder="例如：3"
                    value={preferences.duration}
                    onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                    min="1"
                    max="30"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="groupSize">出行人数 *</Label>
                  <Input
                    type="number"
                    id="groupSize"
                    placeholder="例如：2"
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences({ ...preferences, groupSize: e.target.value })}
                    min="1"
                    max="20"
                    required
                  />
                </div>
              </div>

              {/* 旅行风格 */}
              <div>
                <Label htmlFor="travelStyle">旅行风格 *</Label>
                <select
                  id="travelStyle"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={preferences.travelStyle}
                  onChange={(e) => setPreferences({ ...preferences, travelStyle: e.target.value })}
                  required
                >
                  <option value="">请选择旅行风格</option>
                  <option value="休闲度假">休闲度假 - 轻松惬意，注重享受</option>
                  <option value="深度文化">深度文化 - 探索历史，体验文化</option>
                  <option value="冒险探索">冒险探索 - 挑战刺激，户外活动</option>
                  <option value="美食之旅">美食之旅 - 品尝美食，体验当地</option>
                  <option value="亲子游">亲子游 - 家庭出行，寓教于乐</option>
                  <option value="说走就走">说走就走 - 自由随性，灵活安排</option>
                </select>
              </div>

              {/* 提交按钮 */}
              <Button 
                type="submit" 
                className="gradient-ocean text-white" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    AI正在规划中...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    生成AI旅行计划
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
                {safeRenderText(selectedCountry)} {safeRenderText(selectedCity)} {safeRenderText(preferences.duration)}日游
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 计划概览 */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  {safeRenderText(plan.startDate)}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Users className="mr-1 h-4 w-4" />
                  {safeRenderText(plan.recommendedGroupSize)}人
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <DollarSign className="mr-1 h-4 w-4" />
                  {formatCost(plan.totalCost)}
                </Badge>
              </div>

              {/* 每日行程 */}
              <div className="space-y-6">
                {plan.itinerary && Array.isArray(plan.itinerary) && plan.itinerary.map((day, index) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {safeRenderText(day.date)}
                    </h3>
                    <div className="space-y-4">
                      {day.activities && Array.isArray(day.activities) && day.activities.map((activity, i) => (
                        <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-lg text-gray-800">
                              {safeRenderText(activity.name)}
                            </h4>
                            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
                              {safeRenderText(activity.time)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">
                            📍 {safeRenderText(activity.location)}
                          </p>
                          <p className="text-gray-700 mb-3">
                            {safeRenderText(activity.description)}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>🚗 {safeRenderText(activity.transportation)}</span>
                            <span className="font-medium text-green-600">
                              💰 {formatCost(activity.estimatedCost)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-between pt-6 border-t">
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
