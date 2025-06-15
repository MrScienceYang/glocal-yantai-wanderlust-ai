import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, MapPin, Star, Camera, AlertTriangle, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Community = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const posts = [
    {
      id: 1,
      type: 'guide',
      title: '烟台三日游完美攻略 - 本地人推荐路线',
      author: '烟台小王',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&q=80',
      content: '分享我的烟台三日游攻略，包含蓬莱阁、海昌鲸鲨馆、烟台山等必去景点...',
      images: ['https://images.unsplash.com/photo-1613689324556-912a8155e821?w=200&h=150&fit=crop&q=80'],
      likes: 128,
      comments: 23,
      shares: 15,
      tags: ['攻略', '三日游', '必去景点'],
      isMember: true
    },
    {
      id: 2,
      type: 'food',
      title: '隐藏美食！这家海鲜大排档太香了',
      author: '美食探险家',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=80',
      content: '在渔人码头发现的宝藏海鲜店，扇贝特别新鲜，老板人也很nice...',
      images: [
        'https://images.unsplash.com/photo-1559739502-a54b928a06f3?w=200&h=150&fit=crop&q=80',
        'https://images.unsplash.com/photo-1569058242252-623df4608c02?w=200&h=150&fit=crop&q=80'
      ],
      likes: 89,
      comments: 34,
      shares: 12,
      tags: ['美食', '海鲜', '推荐'],
      isMember: false
    },
    {
      id: 3,
      type: 'warning',
      title: '避坑！某景区附近的这些店千万别去',
      author: '旅游老司机',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&q=80',
      content: '刚从烟台回来，踩了几个坑，特来分享避免大家重蹈覆辙...',
      images: [],
      likes: 156,
      comments: 67,
      shares: 89,
      tags: ['避坑', '踩雷', '经验分享'],
      isMember: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <MapPin className="h-4 w-4" />;
      case 'food': return <Camera className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-700';
      case 'food': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            烟台社区
          </h1>
          <p className="text-xl text-gray-600">
            分享你的旅行故事，发现更多精彩体验
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧内容区 */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts">全部动态</TabsTrigger>
                <TabsTrigger value="guides">旅行攻略</TabsTrigger>
                <TabsTrigger value="food">美食分享</TabsTrigger>
                <TabsTrigger value="warnings">避坑指南</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6 mt-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.avatar} alt={post.author} />
                            <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{post.author}</span>
                              {post.isMember && (
                                <Crown className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getTypeColor(post.type)}`}>
                                {getTypeIcon(post.type)}
                                <span className="text-xs">
                                  {post.type === 'guide' ? '攻略' : 
                                   post.type === 'food' ? '美食' : '避坑'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{post.content}</p>
                      
                      {post.images.length > 0 && (
                        <div className="flex space-x-2 mb-4">
                          {post.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt=""
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="guides">
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">旅行攻略内容正在开发中...</p>
                </div>
              </TabsContent>

              <TabsContent value="food">
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">美食分享内容正在开发中...</p>
                </div>
              </TabsContent>

              <TabsContent value="warnings">
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">避坑指南内容正在开发中...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 发布动态 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">分享你的体验</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full gradient-ocean text-white mb-3">
                  发布动态
                </Button>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <Button variant="outline" size="sm">攻略</Button>
                  <Button variant="outline" size="sm">美食</Button>
                  <Button variant="outline" size="sm">避坑</Button>
                </div>
              </CardContent>
            </Card>

            {/* 会员特权 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                  会员特权
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>AI行程规划无限制</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>专属折扣券</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>优先客服支持</span>
                  </div>
                </div>
                <Link to="/membership">
                  <Button className="w-full mt-4 gradient-sunset text-white">
                    升级会员
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 热门话题 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">热门话题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-start">#烟台春季赏花</Badge>
                  <Badge variant="outline" className="w-full justify-start">#海鲜市场攻略</Badge>
                  <Badge variant="outline" className="w-full justify-start">#蓬莱仙境游</Badge>
                  <Badge variant="outline" className="w-full justify-start">#烟台特产推荐</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
