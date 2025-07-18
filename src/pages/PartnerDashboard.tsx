import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Clock, 
  DollarSign, 
  Phone, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Warehouse,
  FileText,
  LayoutDashboard,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { getSupplierProductsByUser } from '@/data/supplierProducts';

// 葡萄酒自有商品合作数据
const wineSupplierData = {
  monthlyRevenue: {
    total: 156800,
    orders: 487,
    growth: 8.3
  },
  products: [
    { sku: 'YT-MJ-001', name: '冰青青梅果酒·高端版', costPrice: 200, retailPrice: 280, stock: 320, sold: 156 },
    { sku: 'YT-MJ-002', name: '世外梅林香柚青梅酒', costPrice: 80, retailPrice: 118, stock: 580, sold: 243 },
    { sku: 'YT-MJ-003', name: '舒醺巧克力威士忌梅酒', costPrice: 20, retailPrice: 45, stock: 1200, sold: 378 },
    { sku: 'YT-MJ-004', name: '桑果之约乖乖梅果酒', costPrice: 30, retailPrice: 39.86, stock: 890, sold: 298 },
    { sku: 'YT-MJ-005', name: '梅见原味梅酒', costPrice: 120, retailPrice: 150, stock: 156, sold: 89 }
  ],
  pendingOrders: [
    { id: 'GL20250616001', product: '冰青青梅果酒·高端版', quantity: 20, amount: 5600, deadline: '2025-06-20' },
    { id: 'GL20250616002', product: '舒醺巧克力威士忌梅酒', quantity: 80, amount: 3600, deadline: '2025-06-21' },
    { id: 'GL20250616003', product: '世外梅林香柚青梅酒', quantity: 35, amount: 4130, deadline: '2025-06-22' }
  ],
  financials: {
    unpaidAmount: 0, // 自有商品无需垫资
    nextPayment: 0,
    paymentDue: null,
    totalDebt: 0
  }
};

// 默认数据（非酒类供应商）
const defaultSupplierData = {
  monthlyRevenue: {
    total: 285600,
    orders: 1247,
    growth: 12.5
  },
  products: [
    { sku: 'YT-XM-001', name: '烟台蓬莱小面（原汤）', costPrice: 28.8, retailPrice: 28.8, stock: 1560, sold: 324 },
    { sku: 'YT-XM-002', name: '烟台蓬莱小面（浓汤）', costPrice: 32.8, retailPrice: 32.8, stock: 892, sold: 218 },
    { sku: 'YT-XM-003', name: '烟台蓬莱小面（海鲜）', costPrice: 45.8, retailPrice: 45.8, stock: 567, sold: 156 },
    { sku: 'YT-XM-004', name: '烟台蓬莱小面（精装）', costPrice: 68.8, retailPrice: 68.8, stock: 234, sold: 89 }
  ],
  pendingOrders: [
    { id: 'GL20250615001', product: '烟台蓬莱小面（原汤）', quantity: 50, amount: 1440, deadline: '2025-06-18' },
    { id: 'GL20250615002', product: '烟台蓬莱小面（浓汤）', quantity: 30, amount: 984, deadline: '2025-06-19' },
    { id: 'GL20250615003', product: '烟台蓬莱小面（海鲜）', quantity: 20, amount: 916, deadline: '2025-06-20' }
  ],
  financials: {
    unpaidAmount: 45600,
    nextPayment: 15200,
    paymentDue: '2025-06-25',
    totalDebt: 156800
  }
};

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [supplierData, setSupplierData] = useState(defaultSupplierData);

  useEffect(() => {
    const savedUser = localStorage.getItem('partner-user');
    if (!savedUser) {
      navigate('/partner-login');
      return;
    }
    const user = JSON.parse(savedUser);
    setCurrentUser(user);
    
    // 根据用户类型设置数据
    if (user.user === 'ytkj-wine') {
      setSupplierData(wineSupplierData);
    } else {
      setSupplierData(defaultSupplierData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('partner-user');
    toast.success('已退出登录');
    navigate('/partner-hub');
  };

  const handleContactManager = () => {
    toast.success('正在为您接通客户经理...');
  };

  const handleChangePayment = () => {
    navigate('/payment-plan-adjustment');
  };

  const handleComplaint = () => {
    toast.info('投诉功能正在开发中');
  };

  const handleDashboard = () => {
    navigate('/supplier-dashboard');
  };

  const handleUploadProduct = () => {
    navigate('/supplier-upload-product');
  };

  if (!currentUser) {
    return null;
  }

  const isWineSupplier = currentUser.user === 'ytkj-wine';
  const supplierType = isWineSupplier ? '自有商品合作' : '技术赋能型供应商';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  供应商工作台
                </h1>
                <p className="text-gray-300">
                  欢迎回来，{currentUser.user} | 模式A：{supplierType} | 全平台流水抽成模式
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDashboard}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  看板
                </Button>
                <Button 
                  onClick={handleUploadProduct}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  上架商品
                </Button>
                <Button 
                  onClick={handleContactManager}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  联系客户经理
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  退出登录
                </Button>
              </div>
            </motion.div>

            {/* 关键指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">当月流水</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">¥{supplierData.monthlyRevenue.total.toLocaleString()}</div>
                    <p className="text-xs text-gray-400">
                      <span className="text-green-400">+{supplierData.monthlyRevenue.growth}%</span> 较上月
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">在售SKU</CardTitle>
                    <Package className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{supplierData.products.length}</div>
                    <p className="text-xs text-gray-400">{isWineSupplier ? '梅酒系列' : '蓬莱小面系列'}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">待履约订单</CardTitle>
                    <Clock className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{supplierData.pendingOrders.length}</div>
                    <p className="text-xs text-gray-400">总金额 ¥{supplierData.pendingOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      {isWineSupplier ? '商品销售收入' : '待偿还货款'}
                    </CardTitle>
                    {isWineSupplier ? 
                      <TrendingUp className="h-4 w-4 text-green-400" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    }
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      ¥{isWineSupplier ? supplierData.monthlyRevenue.total.toLocaleString() : supplierData.financials.unpaidAmount.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-400">
                      {isWineSupplier ? '自有商品销售' : `下期应还 ¥${supplierData.financials.nextPayment.toLocaleString()}`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 主要内容区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* 产品库存 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Warehouse className="h-5 w-5 mr-2 text-blue-400" />
                      产品库存管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supplierData.products.map((product, index) => (
                        <div key={product.sku} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{product.name}</h4>
                            <p className="text-gray-400 text-sm">
                              SKU: {product.sku} | 成本: ¥{product.costPrice} | 零售: ¥{product.retailPrice}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">库存: {product.stock}</p>
                            <p className="text-gray-400 text-sm">已售: {product.sold}</p>
                          </div>
                          <Badge 
                            variant={product.stock > 500 ? "default" : product.stock > 100 ? "secondary" : "destructive"}
                            className="ml-3"
                          >
                            {product.stock > 500 ? "充足" : product.stock > 100 ? "中等" : "不足"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 待履约订单 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
                      待履约订单
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supplierData.pendingOrders.map((order, index) => (
                        <div key={order.id} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-medium">订单 {order.id}</h4>
                            <Badge variant="outline" className="text-orange-400 border-orange-400">
                              待履约
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mb-1">{order.product}</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">数量: {order.quantity}</span>
                            <span className="text-green-400 font-semibold">¥{order.amount.toLocaleString()}</span>
                          </div>
                          <p className="text-red-400 text-xs mt-1">截止: {order.deadline}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 财务状况和操作 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 财务状况 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="lg:col-span-2"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                      {isWineSupplier ? '全平台销售概况' : '财务状况'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isWineSupplier ? (
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-gray-300 mb-3">全平台销售数据</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">全平台销售额</span>
                              <span className="text-white">¥{supplierData.monthlyRevenue.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">销售订单</span>
                              <span className="text-green-400">{supplierData.monthlyRevenue.orders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">增长率</span>
                              <span className="text-green-400">+{supplierData.monthlyRevenue.growth}%</span>
                            </div>
                            <Progress 
                              value={75}
                              className="w-full"
                            />
                            <p className="text-xs text-gray-400">目标完成度: 75%</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-gray-300 mb-3">全平台流水抽成</h4>
                          <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-400/30">
                            <p className="text-white text-2xl font-bold">¥{(supplierData.monthlyRevenue.total * 0.75).toLocaleString()}</p>
                            <p className="text-gray-400 text-sm">全平台净收益 (75%抽成)</p>
                            <div className="mt-2 space-y-1 text-xs text-gray-300">
                              <div>• 京东/淘宝: 80%抽成</div>
                              <div>• 拼多多/抖音: 70%抽成</div>
                              <div>• 自有商城: 85%抽成</div>
                            </div>
                            <Badge className="mt-2 bg-green-600 text-white">
                              无需垫资
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-gray-300 mb-3">还款进度</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">总债务</span>
                              <span className="text-white">¥{supplierData.financials.totalDebt.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">已还金额</span>
                              <span className="text-green-400">¥{(supplierData.financials.totalDebt - supplierData.financials.unpaidAmount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">剩余金额</span>
                              <span className="text-red-400">¥{supplierData.financials.unpaidAmount.toLocaleString()}</span>
                            </div>
                            <Progress 
                              value={((supplierData.financials.totalDebt - supplierData.financials.unpaidAmount) / supplierData.financials.totalDebt) * 100} 
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-gray-300 mb-3">下期还款</h4>
                          <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-400/30">
                            <p className="text-white text-2xl font-bold">¥{supplierData.financials.nextPayment.toLocaleString()}</p>
                            <p className="text-gray-400 text-sm">到期日期: {supplierData.financials.paymentDue}</p>
                            <Badge className="mt-2 bg-blue-600 text-white">
                              还有 9 天
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* 快捷操作 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-cyan-400" />
                      快捷操作
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        onClick={handleDashboard}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        SCM看板
                      </Button>
                      <Button 
                        onClick={handleUploadProduct}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        上架商品
                      </Button>
                      <Button 
                        onClick={handleContactManager}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        联系客户经理
                      </Button>
                      {!isWineSupplier && (
                        <Button 
                          onClick={handleChangePayment}
                          variant="outline"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          偿还方案调整
                        </Button>
                      )}
                      <Button 
                        onClick={handleComplaint}
                        variant="outline"
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        投诉建议
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerDashboard;
