
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Users, DollarSign, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { useAIPlanning } from '@/hooks/useAIPlanning';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const AIPlanning = () => {
  const [preferences, setPreferences] = useState({
    interests: '',
    budget: '',
    duration: '',
    groupSize: '',
    travelStyle: 'relaxed'
  });

  const { generatePlan, isLoading, plan } = useAIPlanning();

  const handleInputChange = (field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGeneratePlan = async () => {
    if (!preferences.interests || !preferences.budget || !preferences.duration) {
      toast.error('请填写完整的旅行信息');
      return;
    }

    await generatePlan(preferences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI智能行程规划
          </h1>
          <p className="text-xl text-gray-600">
            告诉我们你的偏好，AI为你定制专属烟台旅行方案
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 输入表单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-ocean-600" />
                告诉AI你的需求
              </CardTitle>
              <CardDescription>
                填写以下信息，AI将为您生成个性化行程
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="interests">兴趣爱好和偏好</Label>
                <Input
                  id="interests"
                  placeholder="如：海鲜美食、历史文化、自然风光、摄影等"
                  value={preferences.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="budget">预算范围（元）</Label>
                <Input
                  id="budget"
                  placeholder="如：500-1000"
                  value={preferences.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="duration">旅行天数</Label>
                <Input
                  id="duration"
                  placeholder="如：2天1夜"
                  value={preferences.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="groupSize">人数</Label>
                <Input
                  id="groupSize"
                  placeholder="如：2人"
                  value={preferences.groupSize}
                  onChange={(e) => handleInputChange('groupSize', e.target.value)}
                />
              </div>

              <div>
                <Label>旅行风格</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { id: 'relaxed', label: '休闲放松', icon: '🏖️' },
                    { id: 'adventure', label: '冒险刺激', icon: '🏔️' },
                    { id: 'cultural', label: '文化深度', icon: '🏛️' },
                    { id: 'foodie', label: '美食之旅', icon: '🍽️' }
                  ].map((style) => (
                    <Button
                      key={style.id}
                      variant={preferences.travelStyle === style.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleInputChange('travelStyle', style.id)}
                    >
                      <span className="mr-2">{style.icon}</span>
                      {style.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleGeneratePlan} 
                disabled={isLoading}
                className="w-full gradient-ocean text-white"
                size="lg"
              >
                {isLoading ? '正在生成行程...' : '生成我的专属行程'}
              </Button>
            </CardContent>
          </Card>

          {/* 生成的行程 */}
          <div>
            {plan ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-sunset-600" />
                    您的专属烟台行程
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {plan.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-ocean-400 pl-4">
                        <h3 className="font-semibold text-lg mb-2">第{index + 1}天</h3>
                        <div className="space-y-3">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{activity.name}</h4>
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {activity.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {activity.location}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  ¥{activity.estimatedCost}
                                </span>
                              </div>
                              {/* 添加门票购买链接 */}
                              {activity.name.includes('蓬莱阁') && (
                                <div className="mt-2">
                                  <Link to="/ticket/1">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      购买门票
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-gradient-to-r from-ocean-50 to-sunset-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">行程总览</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">总预算：</span>
                          <span className="font-medium">¥{plan.totalCost}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">推荐人数：</span>
                          <span className="font-medium">{plan.recommendedGroupSize}人</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 gradient-ocean text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        预订行程
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Users className="w-4 h-4 mr-2" />
                        咨询达人
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-20">
                  <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">填写左侧信息，AI将为您生成专属行程</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanning;
