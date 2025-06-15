import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Users, DollarSign, Sparkles, Calendar, ExternalLink, Globe, Car, FileDown, Tv } from 'lucide-react';
import { useAIPlanning } from '@/hooks/useAIPlanning';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useUser } from '@/components/UserProvider';
import { AdModal } from '@/components/AdModal';

// 城市数据结构
const cityData = {
  '中国': {
    '山东省': ['烟台市', '青岛市', '济南市', '威海市', '泰安市', '济宁市'],
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市', '珠海市', '佛山市', '东莞市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市'],
    '江苏省': ['南京市', '苏州市', '无锡市', '常州市', '南通市']
  },
  '日本': {
    '关东地方': ['东京都', '横滨市', '川崎市', '埼玉市'],
    '关西地方': ['大阪市', '京都市', '神户市', '奈良市'],
    '中部地方': ['名古屋市', '静冈市', '新潟市']
  },
  '韩国': {
    '首尔特别市': ['首尔市'],
    '釜山广域市': ['釜山市'],
    '济州特别自治道': ['济州市']
  },
  '美国': {
    '加利福尼亚州': ['洛杉矶', '旧金山', '圣地亚哥', '萨克拉门托'],
    '纽约州': ['纽约市', '奥尔巴尼', '布法罗'],
    '德克萨斯州': ['休斯敦', '达拉斯', '奥斯汀', '圣安东尼奥']
  },
  '法国': {
    '法兰西岛大区': ['巴黎'],
    '普罗旺斯-阿尔卑斯-蓝色海岸大区': ['马赛', '尼斯', '戛纳'],
    '奥弗涅-罗纳-阿尔卑斯大区': ['里昂', '格勒诺布尔']
  }
};

const AIPlanning = () => {
  const [preferences, setPreferences] = useState({
    country: '',
    province: '',
    city: '',
    interests: '',
    budget: '',
    duration: '',
    groupSize: '',
    travelStyle: 'relaxed'
  });
  const { generatePlan, isLoading, plan } = useAIPlanning();
  const { isVip, points, spendPoints } = useUser();
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [field]: value };
      
      // 当选择国家时，重置省份和城市
      if (field === 'country') {
        newPrefs.province = '';
        newPrefs.city = '';
      }
      // 当选择省份时，重置城市
      if (field === 'province') {
        newPrefs.city = '';
      }
      
      return newPrefs;
    });
  };

  const handleGeneratePlan = async () => {
    if (!preferences.city || !preferences.interests || !preferences.budget || !preferences.duration) {
      toast.error('请填写完整的旅行信息，包括目标城市');
      return;
    }
    await generatePlan(preferences);
  };

  const handleExportPDF = () => {
    if (!isVip) {
      const cost = 30;
      if (points < cost) {
        toast.error(`积分不足！需要 ${cost} 积分，您当前有 ${points} 积分。`, {
          description: '请观看广告赚取积分。',
        });
        return;
      }
      if (!spendPoints(cost)) {
        toast.error('积分扣除失败，请重试。');
        return;
      }
      toast.success(`已消费 ${cost} 积分`, {
        description: `剩余积分: ${points - cost}`,
      });
    } else {
      toast.info("VIP用户可免费导出PDF。");
    }
    
    const input = document.getElementById('plan-to-export');
    if (input) {
      toast.info('正在生成PDF文件，请稍候...');
      html2canvas(input, { 
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        const ratio = canvasWidth / canvasHeight;
        const pdfImageWidth = pdfWidth;
        const pdfImageHeight = pdfImageWidth / ratio;
        
        let heightLeft = pdfImageHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfImageWidth, pdfImageHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfImageWidth, pdfImageHeight);
          heightLeft -= pdfHeight;
        }
        
        pdf.save(`行程单-${preferences.city}.pdf`);
        toast.success('PDF文件已成功导出！');
      }).catch(err => {
        console.error("导出PDF时出错:", err);
        toast.error('导出PDF失败，请重试。');
      });
    }
  };

  const getProvinces = () => {
    if (!preferences.country || !cityData[preferences.country]) return [];
    return Object.keys(cityData[preferences.country]);
  };

  const getCities = () => {
    if (!preferences.country || !preferences.province || !cityData[preferences.country]?.[preferences.province]) return [];
    return cityData[preferences.country][preferences.province];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      <AdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI智能行程规划
          </h1>
          <p className="text-xl text-gray-600">
            告诉我们你的偏好，AI为你定制专属旅行方案
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 输入表单 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-ocean-600" />
                  告诉AI你的需求
                </CardTitle>
                {!isVip && (
                  <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    当前积分: <span className="font-bold text-ocean-600">{points}</span>
                  </div>
                )}
              </div>
              <CardDescription>
                填写以下信息，AI将为您生成个性化行程
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 城市选择 */}
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-ocean-600" />
                  目的地选择
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="country" className="text-sm text-gray-600">国家</Label>
                    <Select value={preferences.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择国家" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(cityData).map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="province" className="text-sm text-gray-600">省/州/地区</Label>
                    <Select 
                      value={preferences.province} 
                      onValueChange={(value) => handleInputChange('province', value)}
                      disabled={!preferences.country}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择省份" />
                      </SelectTrigger>
                      <SelectContent>
                        {getProvinces().map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm text-gray-600">城市</Label>
                    <Select 
                      value={preferences.city} 
                      onValueChange={(value) => handleInputChange('city', value)}
                      disabled={!preferences.province}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCities().map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

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
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-ocean-600" />
                您的专属行程
              </CardTitle>
              <CardDescription>AI为您生成的行程方案将显示在这里</CardDescription>
            </CardHeader>
            <CardContent id="plan-to-export" className="flex-grow">
              <div className="space-y-6">
                {plan ? (
                  plan.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-ocean-400 pl-4 py-2">
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        第{index + 1}天
                        <span className="text-sm font-normal text-gray-500 ml-2">({day.date})</span>
                      </h3>
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
                            {activity.transportation && (
                              <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <Car className="w-3 h-3 mr-1" />
                                <span>交通方式: {activity.transportation}</span>
                              </div>
                            )}
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
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">填写左侧信息，AI将为您生成专属行程</p>
                  </div>
                )}
              </div>
            </CardContent>
            {plan && (
              <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
                <Button onClick={handleExportPDF} className="w-full sm:w-auto flex-1">
                  <FileDown className="mr-2 h-4 w-4" />
                  {isVip ? '导出PDF (VIP免费)' : `导出PDF (30积分)`}
                </Button>
                {!isVip && (
                  <Button variant="outline" onClick={() => setIsAdModalOpen(true)} className="w-full sm:w-auto flex-1">
                    <Tv className="mr-2 h-4 w-4" />
                    观看广告赚取积分
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIPlanning;
