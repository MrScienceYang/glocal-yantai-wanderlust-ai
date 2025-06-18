
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Play, Lock, LogIn } from 'lucide-react';
import { useUser } from './UserProvider';
import { AdModal } from './AdModal';
import { useNavigate } from 'react-router-dom';

interface AIPermissionCheckProps {
  onPermissionGranted: () => void;
  children?: React.ReactNode;
}

const AIPermissionCheck: React.FC<AIPermissionCheckProps> = ({ onPermissionGranted, children }) => {
  const { isVip, isLoggedIn } = useUser();
  const [showAdModal, setShowAdModal] = useState(false);
  const navigate = useNavigate();

  const handleWatchAd = () => {
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    setShowAdModal(false);
    onPermissionGranted();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // 如果是VIP用户或已登录用户，直接允许使用
  if (isVip || isLoggedIn) {
    onPermissionGranted();
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle>AI智能服务</CardTitle>
            <CardDescription>
              享受专业的AI智能体验
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-800 mb-2">使用条件</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 登录用户可直接使用</li>
                <li>• VIP会员可无限制使用</li>
                <li>• 非登录用户观看广告后可使用</li>
                <li>• 每次广告可获得15积分奖励</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                className="w-full gradient-ocean text-white"
                size="lg"
              >
                <LogIn className="mr-2 h-4 w-4" />
                立即登录使用AI服务
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">或</p>
                <Button
                  onClick={handleWatchAd}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  观看广告解锁AI服务
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">升级享受更多特权</p>
                <Button variant="outline" className="w-full" size="lg">
                  <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                  升级VIP享受无限制服务
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AdModal 
        isOpen={showAdModal} 
        onClose={handleAdComplete}
      />
    </>
  );
};

export default AIPermissionCheck;
