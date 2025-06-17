
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface APIKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const APIKeySettings: React.FC<APIKeySettingsProps> = ({ isOpen, onClose, onSuccess }) => {
  const handleConfirm = () => {
    toast.success('通义千问AI服务已配置完成！');
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            AI服务配置
          </CardTitle>
          <CardDescription>
            系统已集成通义千问AI服务
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-sm text-green-800">
                <p className="font-medium">通义千问AI已就绪</p>
                <p className="text-xs mt-1">系统已预配置最新的Qwen3模型</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">功能特性：</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 智能行程规划</li>
              <li>• 本地达人推荐</li>
              <li>• 个性化旅游建议</li>
              <li>• 实时景点信息</li>
            </ul>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full gradient-ocean text-white"
          >
            开始使用AI服务
          </Button>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">服务说明：</p>
            <p>基于阿里云通义千问大模型，提供专业的旅游规划服务。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeySettings;
