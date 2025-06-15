import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Heart, MessageSquare, Calendar, Gift } from 'lucide-react';
import { useUser } from '@/components/UserProvider';
import Layout from '@/components/Layout';
import { Navigate, Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isLoggedIn, currentUser, points, orders } = useUser();

  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" />;
  }
  
  const userStats = {
    name: currentUser.username,
    avatar: `/api/placeholder/80/80`,
    isMember: currentUser.isVip,
    level: currentUser.isPermanentVip ? '永久VIP' : (currentUser.isVip ? '黄金会员' : '普通会员'),
    joinDate: '2024年1月', // This could be stored in user data too
    totalTrips: 12,
    totalPosts: 28,
    totalLikes: 356,
    totalFollowers: 89
  };

  const recentOrders = [
    {
      id: '202412001',
      type: 'ticket',
      title: '蓬莱阁门票 × 2',
      date: '2024-12-10',
      amount: 120,
      status: '已完成'
    },
    {
      id: '202412002',
      type: 'expert',
      title: '本地达人服务 - 海鲜美食之旅',
      date: '2024-12-08',
      amount: 280,
      status: '已完成'
    },
    {
      id: '202412003',
      type: 'product',
      title: '烟台海参即食装',
      date: '2024-12-05',
      amount: 288,
      status: '配送中'
    }
  ];

  const myPosts = [
    {
      id: 1,
      title: '烟台三日游完美攻略分享',
      likes: 89,
      comments: 23,
      date: '2024-12-01'
    },
    {
      id: 2,
      title: '发现烟台隐藏美食店',
      likes: 67,
      comments: 15,
      date: '2024-11-28'
    }
  ];

  const coupons = [
    {
      id: 1,
      title: '商城满200减50',
      description: '适用于所有商城商品',
      expiry: '2024-12-31',
      used: false
    },
    {
      id: 2,
      title: '达人服务8.5折',
      description: '本地达人服务专享',
      expiry: '2024-12-25',
      used: false
    },
    {
      id: 3,
      title: '门票9折优惠',
      description: '所有景点门票可用',
      expiry: '2024-12-20',
      used: true
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* 用户信息卡片 */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userStats.avatar} />
                  <AvatarFallback>{userStats.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{userStats.name}</h1>
                    {userStats.isMember && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Crown className="h-3 w-3 mr-1" />
                        {userStats.level}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">当前积分: {points}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-ocean-600">{userStats.totalTrips}</div>
                      <div className="text-sm text-gray-500">旅行次数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{userStats.totalPosts}</div>
                      <div className="text-sm text-gray-500">发布动态</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{userStats.totalLikes}</div>
                      <div className="text-sm text-gray-500">获得点赞</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{userStats.totalFollowers}</div>
                      <div className="text-sm text-gray-500">关注者</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button variant="outline" className="mb-2">编辑资料</Button>
                  {!currentUser.isPermanentVip && <Button className="gradient-ocean text-white block w-full">升级会员</Button>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 选项卡内容 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="orders">我的订单</TabsTrigger>
              <TabsTrigger value="posts">我的动态</TabsTrigger>
              <TabsTrigger value="coupons">优惠券</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      最近行程
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>蓬莱一日游</span>
                        <span className="text-sm text-gray-500">12-10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>烟台山文化游</span>
                        <span className="text-sm text-gray-500">12-08</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      收藏夹
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>景点收藏：8个</div>
                      <div>美食收藏：12个</div>
                      <div>攻略收藏：5篇</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="h-5 w-5 mr-2" />
                      会员权益
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>本月AI规划：8/无限</div>
                      <div>优惠券余额：3张</div>
                      <div>会员到期：2025-01-15</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <div className="space-y-4">
                {orders.length > 0 ? orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{order.items.map(i => i.name).join(', ')}</h3>
                          <p className="text-sm text-gray-500">{t('profile.order_id')}: {order.id}</p>
                          <p className="text-sm text-gray-500">{t('profile.order_date')}: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">¥{order.total.toFixed(2)}</div>
                          <Badge 
                            variant={order.status === 'delivered' ? 'default' : 'secondary'}
                          >
                            {order.status}
                          </Badge>
                          <Button asChild variant="link" size="sm">
                             <Link to={`/logistics/${order.id}`}>{t('profile.view_details')}</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="text-center py-16">
                    <CardContent>
                      <p className="text-xl text-gray-500">{t('profile.no_orders')}</p>
                      <Button asChild>
                        <Link to="/shop">{t('cart.go_shopping')}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-gray-500">发布于 {post.date}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coupons" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                  <Card key={coupon.id} className={coupon.used ? 'opacity-50' : ''}>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-2">{coupon.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{coupon.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          到期：{coupon.expiry}
                        </span>
                        <Badge variant={coupon.used ? 'secondary' : 'default'}>
                          {coupon.used ? '已使用' : '可使用'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
