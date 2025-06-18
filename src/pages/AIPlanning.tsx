import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Users, DollarSign, Sparkles, Calendar, ExternalLink, Globe, Car, FileDown, Tv, Plane } from 'lucide-react';
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
    // 出发地
    departureCountry: '',
    departureProvince: '',
    departureCity: '',
    // 目的地
    destinationCountry: '',
    destinationProvince: '',
    destinationCity: '',
    // 出发时间
    departureYear: '',
    departureMonth: '',
    departureDay: '',
    departureHour: '',
    // 返程时间
    returnYear: '',
    returnMonth: '',
    returnDay: '',
    returnHour: '',
    interests: '',
    budget: '',
    duration: '',
    groupSize: '',
    travelStyle: 'elder' // 新的旅行风格
  });
  const { generatePlan, isLoading, plan } = useAIPlanning();
  const { isVip, points, spendPoints } = useUser();
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [field]: value };
      
      // 出发地选择逻辑
      if (field === 'departureCountry') {
        newPrefs.departureProvince = '';
        newPrefs.departureCity = '';
      }
      if (field === 'departureProvince') {
        newPrefs.departureCity = '';
      }
      
      // 目的地选择逻辑
      if (field === 'destinationCountry') {
        newPrefs.destinationProvince = '';
        newPrefs.destinationCity = '';
      }
      if (field === 'destinationProvince') {
        newPrefs.destinationCity = '';
      }
      
      return newPrefs;
    });
  };

  const handleGeneratePlan = async () => {
    if (!preferences.destinationCity || !preferences.interests || !preferences.budget || !preferences.duration) {
      toast.error('请填写完整的旅行信息，包括目标城市');
      return;
    }
    
    // 构建新的preferences对象，兼容原有的generatePlan函数
    const planPreferences = {
      country: preferences.destinationCountry,
      province: preferences.destinationProvince,
      city: preferences.destinationCity,
      departure: preferences.departureCity,
      departureTime: `${preferences.departureYear}-${preferences.departureMonth}-${preferences.departureDay} ${preferences.departureHour}:00`,
      returnTime: `${preferences.returnYear}-${preferences.returnMonth}-${preferences.returnDay} ${preferences.returnHour}:00`,
      interests: preferences.interests,
      budget: preferences.budget,
      duration: preferences.duration,
      groupSize: preferences.groupSize,
      travelStyle: preferences.travelStyle
    };
    
    await generatePlan(planPreferences);
  };

  // 获取省份选项
  const getProvinces = (type: 'departure' | 'destination') => {
    const country = type === 'departure' ? preferences.departureCountry : preferences.destinationCountry;
    if (!country || !cityData[country]) return [];
    return Object.keys(cityData[country]);
  };

  // 获取城市选项
  const getCities = (type: 'departure' | 'destination') => {
    const country = type === 'departure' ? preferences.departureCountry : preferences.destinationCountry;
    const province = type === 'departure' ? preferences.departureProvince : preferences.destinationProvince;
    if (!country || !province || !cityData[country]?.[province]) return [];
    return cityData[country][province];
  };

  // 生成年份选项（当前年到未来3年）
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, i) => currentYear + i);
  };

  // 生成月份选项
  const getMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  // 生成日期选项
  const getDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  // 生成小时选项
  const getHourOptions = () => {
    return Array.from({ length: 24 }, (_, i) => i);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pb-20 md:pb-0">
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
              {/* 出发地选择 */}
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Plane className="mr-2 h-4 w-4 text-ocean-600" />
                  出发地选择
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="departureCountry" className="text-sm text-gray-600">国家</Label>
                    <Select value={preferences.departureCountry} onValueChange={(value) => handleInputChange('departureCountry', value)}>
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
                    <Label htmlFor="departureProvince" className="text-sm text-gray-600">省/州/地区</Label>
                    <Select 
                      value={preferences.departureProvince} 
                      onValueChange={(value) => handleInputChange('departureProvince', value)}
                      disabled={!preferences.departureCountry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择省份" />
                      </SelectTrigger>
                      <SelectContent>
                        {getProvinces('departure').map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="departureCity" className="text-sm text-gray-600">城市</Label>
                    <Select 
                      value={preferences.departureCity} 
                      onValueChange={(value) => handleInputChange('departureCity', value)}
                      disabled={!preferences.departureProvince}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCities('departure').map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 目的地选择 */}
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-ocean-600" />
                  目的地选择
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="destinationCountry" className="text-sm text-gray-600">国家</Label>
                    <Select value={preferences.destinationCountry} onValueChange={(value) => handleInputChange('destinationCountry', value)}>
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
                    <Label htmlFor="destinationProvince" className="text-sm text-gray-600">省/州/地区</Label>
                    <Select 
                      value={preferences.destinationProvince} 
                      onValueChange={(value) => handleInputChange('destinationProvince', value)}
                      disabled={!preferences.destinationCountry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择省份" />
                      </SelectTrigger>
                      <SelectContent>
                        {getProvinces('destination').map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="destinationCity" className="text-sm text-gray-600">城市</Label>
                    <Select 
                      value={preferences.destinationCity} 
                      onValueChange={(value) => handleInputChange('destinationCity', value)}
                      disabled={!preferences.destinationProvince}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCities('destination').map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 出发时间 */}
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-ocean-600" />
                  出发时间
                </Label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-sm text-gray-600">年</Label>
                    <Select value={preferences.departureYear} onValueChange={(value) => handleInputChange('departureYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="年" />
                      </SelectTrigger>
                      <SelectContent>
                        {getYearOptions().map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">月</Label>
                    <Select value={preferences.departureMonth} onValueChange={(value) => handleInputChange('departureMonth', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="月" />
                      </SelectTrigger>
                      <SelectContent>
                        {getMonthOptions().map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>{month}月</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">日</Label>
                    <Select value={preferences.departureDay} onValueChange={(value) => handleInputChange('departureDay', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="日" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDayOptions().map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')}>{day}日</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">时</Label>
                    <Select value={preferences.departureHour} onValueChange={(value) => handleInputChange('departureHour', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="时" />
                      </SelectTrigger>
                      <SelectContent>
                        {getHourOptions().map((hour) => (
                          <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>{hour}:00</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 返程时间 */}
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-ocean-600" />
                  返程时间
                </Label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-sm text-gray-600">年</Label>
                    <Select value={preferences.returnYear} onValueChange={(value) => handleInputChange('returnYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="年" />
                      </SelectTrigger>
                      <SelectContent>
                        {getYearOptions().map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}年</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">月</Label>
                    <Select value={preferences.returnMonth} onValueChange={(value) => handleInputChange('returnMonth', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="月" />
                      </SelectTrigger>
                      <SelectContent>
                        {getMonthOptions().map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>{month}月</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">日</Label>
                    <Select value={preferences.returnDay} onValueChange={(value) => handleInputChange('returnDay', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="日" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDayOptions().map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')}>{day}日</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">时</Label>
                    <Select value={preferences.returnHour} onValueChange={(value) => handleInputChange('returnHour', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="时" />
                      </SelectTrigger>
                      <SelectContent>
                        {getHourOptions().map((hour) => (
                          <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>{hour}:00</SelectItem>
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

              {/* 旅行风格下拉选择 */}
              <div>
                <Label>旅行风格</Label>
                <Select value={preferences.travelStyle} onValueChange={(value) => handleInputChange('travelStyle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择旅行风格" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elder">👴 带老人</SelectItem>
                    <SelectItem value="children">👶 带孩子</SelectItem>
                    <SelectItem value="student">🎓 大学生</SelectItem>
                    <SelectItem value="couple">💑 情侣</SelectItem>
                    <SelectItem value="honeymoon">💒 蜜月</SelectItem>
                    <SelectItem value="team">🏢 公司团建</SelectItem>
                  </SelectContent>
                </Select>
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
