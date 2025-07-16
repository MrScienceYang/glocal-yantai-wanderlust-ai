
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Compass, Star, Play, Pause, Volume2 } from 'lucide-react';
import { geolocationService } from '@/services/geolocationService';
import { smartGuideService, Attraction } from '@/services/smartGuideService';
import { toast } from 'sonner';

const SmartGuide = () => {
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number, city: string} | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    setIsLocationLoading(true);
    try {
      const location = await geolocationService.getUserLocation();
      const locationInfo = {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        city: location.city
      };
      setUserLocation(locationInfo);
      
      const nearbyAttractions = await smartGuideService.getNearbyAttractions(locationInfo);
      setAttractions(nearbyAttractions);
      
      toast.success(`已获取您在${location.city}的位置信息`);
    } catch (error) {
      console.error('获取位置失败:', error);
      toast.error('获取位置信息失败，请允许位置访问权限');
    } finally {
      setIsLoading(false);
      setIsLocationLoading(false);
    }
  };

  const handleAttractionSelect = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleBackToList = () => {
    setSelectedAttraction(null);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Compass className="w-16 h-16 animate-spin text-ocean-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">智慧导游启动中...</h2>
            <p className="text-gray-600">正在获取您的位置信息</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedAttraction) {
    return <AttractionDetail attraction={selectedAttraction} onBack={handleBackToList} />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              智慧导游
            </h1>
            <p className="text-xl text-gray-600">
              AI智能语音导游，为您提供个性化的景区讲解服务
            </p>
            {userLocation && (
              <div className="flex items-center justify-center mt-4 text-cyan-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>当前位置：{userLocation.city}</span>
              </div>
            )}
          </div>

          {/* 附近景区列表 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">附近景区推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <Card 
                  key={attraction.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAttractionSelect(attraction)}
                >
                  <CardHeader className="pb-3">
                    {attraction.imageUrl && (
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={attraction.imageUrl} 
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardTitle className="flex items-center justify-between">
                      {attraction.name}
                      <Badge variant="secondary">{attraction.category}</Badge>
                    </CardTitle>
                    <CardDescription>{attraction.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span>{attraction.distance}km</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{attraction.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 gradient-ocean text-white">
                      开启AI导游
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {attractions.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <Compass className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂未找到附近景区</h3>
              <p className="text-gray-500 mb-4">请确保已开启位置权限，或尝试刷新位置信息</p>
              <Button 
                onClick={initializeLocation}
                disabled={isLocationLoading}
                variant="outline"
              >
                {isLocationLoading ? '定位中...' : '重新定位'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// 景区详情和AI导游组件
const AttractionDetail = ({ attraction, onBack }: { attraction: Attraction, onBack: () => void }) => {
  const [conversation, setConversation] = useState<{text: string, isUser: boolean, audioUrl?: string}[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // 初始化时播放景区介绍
    initializeGuide();
  }, []);

  const initializeGuide = async () => {
    setIsGenerating(true);
    try {
      const introduction = await smartGuideService.getAttractionIntroduction(attraction.id);
      const audioUrl = await smartGuideService.generateAudio(introduction);
      
      setConversation([{
        text: introduction,
        isUser: false,
        audioUrl: audioUrl
      }]);
      
      // 自动播放欢迎语音
      playAudio(audioUrl);
    } catch (error) {
      console.error('初始化导游失败:', error);
      toast.error('AI导游初始化失败');
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = (audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    
    const audio = new Audio(audioUrl);
    setCurrentAudio(audio);
    setIsPlaying(true);
    
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
    
    audio.play().catch(error => {
      console.error('播放音频失败:', error);
      setIsPlaying(false);
    });
  };

  const handleUserResponse = async () => {
    if (!userInput.trim()) return;
    
    // 添加用户消息
    const newConversation = [...conversation, { text: userInput, isUser: true }];
    setConversation(newConversation);
    setUserInput('');
    setIsGenerating(true);
    
    try {
      const aiResponse = await smartGuideService.askNextDestination(attraction.name, userInput);
      const audioUrl = await smartGuideService.generateAudio(aiResponse);
      
      setConversation([...newConversation, {
        text: aiResponse,
        isUser: false,
        audioUrl: audioUrl
      }]);
      
      // 自动播放AI回应
      playAudio(audioUrl);
    } catch (error) {
      console.error('生成AI回应失败:', error);
      toast.error('AI导游响应失败');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button variant="outline" onClick={onBack} className="mb-6">
            ← 返回景区列表
          </Button>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{attraction.name}</CardTitle>
                <Badge>{attraction.category}</Badge>
              </div>
              <CardDescription>{attraction.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* AI对话区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Compass className="w-6 h-6 mr-2 text-cyan-600" />
                AI智慧导游
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {!message.isUser && message.audioUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-2 p-1 h-8 text-cyan-600"
                          onClick={() => playAudio(message.audioUrl!)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 用户输入区域 */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="输入您的回答或问题..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleUserResponse()}
                  disabled={isGenerating}
                />
                <Button 
                  onClick={handleUserResponse}
                  disabled={isGenerating || !userInput.trim()}
                  className="gradient-ocean text-white"
                >
                  发送
                </Button>
              </div>

              {isPlaying && (
                <div className="mt-4 flex items-center justify-center text-cyan-600">
                  <Play className="w-5 h-5 mr-2 animate-pulse" />
                  <span>AI导游正在为您讲解...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SmartGuide;
