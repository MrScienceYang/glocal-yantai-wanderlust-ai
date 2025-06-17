
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  Warehouse,
  Factory,
  Truck,
  Calendar,
  ArrowLeft,
  Settings,
  Activity,
  Users,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('partner-user');
    if (!savedUser) {
      navigate('/partner-login');
      return;
    }
    setCurrentUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleBack = () => {
    navigate('/partner-dashboard');
  };

  const scmData = {
    production: {
      dailyCapacity: 5000,
      currentProduction: 3200,
      efficiency: 84,
      qualityRate: 98.5
    },
    inventory: {
      rawMaterials: 85,
      finishedGoods: 72,
      warningLevel: 20,
      turnoverRate: 12.5
    },
    logistics: {
      onTimeDelivery: 96,
      avgDeliveryTime: 2.3,
      transportCost: 8.2,
      pendingShipments: 45
    },
    suppliers: {
      totalSuppliers: 23,
      activeSuppliers: 18,
      qualityScore: 4.7,
      avgPaymentDays: 28
    }
  };

  const sopsData = [
    { name: '原料采购SOP', status: '已执行', completionRate: 100, lastUpdate: '2025-06-15' },
    { name: '生产质检SOP', status: '执行中', completionRate: 85, lastUpdate: '2025-06-16' },
    { name: '包装发货SOP', status: '待执行', completionRate: 0, lastUpdate: '2025-06-17' },
    { name: '库存管理SOP', status: '已执行', completionRate: 95, lastUpdate: '2025-06-16' }
  ];

  if (!currentUser) {
    return null;
  }

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
              <div className="flex items-center">
                <Button 
                  onClick={handleBack}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回
                </Button>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    SCM & SOPs 看板
                  </h1>
                  <p className="text-gray-300">
                    供应链管理与标准作业程序监控
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SCM 关键指标 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">生产效率</CardTitle>
                    <Factory className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{scmData.production.efficiency}%</div>
                    <p className="text-xs text-gray-400">
                      日产能: {scmData.production.currentProduction}/{scmData.production.dailyCapacity}
                    </p>
                    <Progress value={scmData.production.efficiency} className="mt-2" />
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
                    <CardTitle className="text-sm font-medium text-gray-300">库存水平</CardTitle>
                    <Warehouse className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{scmData.inventory.finishedGoods}%</div>
                    <p className="text-xs text-gray-400">
                      周转率: {scmData.inventory.turnoverRate}次/年
                    </p>
                    <Progress value={scmData.inventory.finishedGoods} className="mt-2" />
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
                    <CardTitle className="text-sm font-medium text-gray-300">物流准时率</CardTitle>
                    <Truck className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{scmData.logistics.onTimeDelivery}%</div>
                    <p className="text-xs text-gray-400">
                      平均配送: {scmData.logistics.avgDeliveryTime}天
                    </p>
                    <Progress value={scmData.logistics.onTimeDelivery} className="mt-2" />
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
                    <CardTitle className="text-sm font-medium text-gray-300">供应商评分</CardTitle>
                    <Users className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{scmData.suppliers.qualityScore}/5.0</div>
                    <p className="text-xs text-gray-400">
                      活跃供应商: {scmData.suppliers.activeSuppliers}/{scmData.suppliers.totalSuppliers}
                    </p>
                    <Progress value={scmData.suppliers.qualityScore * 20} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* SOPs 执行状态 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-400" />
                      SOPs 执行状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sopsData.map((sop, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-medium">{sop.name}</h4>
                            <Badge 
                              variant={sop.status === '已执行' ? 'default' : sop.status === '执行中' ? 'secondary' : 'destructive'}
                            >
                              {sop.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Progress value={sop.completionRate} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">完成率: {sop.completionRate}%</span>
                              <span className="text-gray-400">更新: {sop.lastUpdate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 产能控制面板 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-400" />
                      产能与库存控制
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-2">生产产能调整</h4>
                        <div className="flex items-center space-x-3">
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                            降低产能
                          </Button>
                          <span className="text-gray-300 text-sm">当前: 64%</span>
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                            提升产能
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-2">库存预警设置</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">原料库存预警</span>
                            <span className="text-orange-400">20% (当前: {scmData.inventory.rawMaterials}%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">成品库存预警</span>
                            <span className="text-green-400">15% (当前: {scmData.inventory.finishedGoods}%)</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-2">质量控制</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">合格率目标</span>
                            <span className="text-white">≥98%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">当前合格率</span>
                            <span className="text-green-400">{scmData.production.qualityRate}%</span>
                          </div>
                        </div>
                      </div>
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

export default SupplierDashboard;
