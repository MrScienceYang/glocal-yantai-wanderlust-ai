
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, Users, ArrowRight, Store, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserTypeSelectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType: 'platform' | 'supplier') => {
    if (userType === 'supplier') {
      navigate('/partner-login');
    } else {
      navigate('/login');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-2">
            选择您的身份
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* 平台用户选项 */}
          <Card 
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-ocean-500 animate-fade-in"
            onClick={() => handleUserTypeSelection('platform')}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-ocean flex items-center justify-center animate-scale-in">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">平台用户</CardTitle>
              <CardDescription>
                探索本地文化，享受智能旅行规划
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                  AI智能行程规划
                </li>
                <li className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                  本地达人服务
                </li>
                <li className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                  特色商品购买
                </li>
                <li className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                  盲盒旅行体验
                </li>
              </ul>
              <Button 
                className="w-full gradient-ocean text-white hover:opacity-90 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserTypeSelection('platform');
                }}
              >
                选择平台用户
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 供应商选项 */}
          <Card 
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-sunset-500 animate-fade-in delay-150"
            onClick={() => handleUserTypeSelection('supplier')}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-sunset flex items-center justify-center animate-scale-in delay-100">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">合作伙伴</CardTitle>
              <CardDescription>
                加入我们的生态系统，共创商业价值
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-orange-500" />
                  商品入驻平台
                </li>
                <li className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-orange-500" />
                  供应链管理
                </li>
                <li className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-orange-500" />
                  数据分析工具
                </li>
                <li className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-orange-500" />
                  营销推广支持
                </li>
              </ul>
              <Button 
                className="w-full gradient-sunset text-white hover:opacity-90 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserTypeSelection('supplier');
                }}
              >
                选择合作伙伴
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeSelection;
