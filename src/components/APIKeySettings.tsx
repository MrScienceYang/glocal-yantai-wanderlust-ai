
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { aiService } from '@/services/aiService';
import { aiContentService } from '@/services/aiContentService';

interface APIKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const APIKeySettings: React.FC<APIKeySettingsProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');
    
    try {
      // 测试AI服务连接
      const aiServiceTest = await aiService.testConnection();
      const aiContentServiceTest = await aiContentService.testConnection();
      
      if (aiServiceTest && aiContentServiceTest) {
        setConnectionStatus('success');
        toast.success('ChatGPT 4o API连接测试成功！');
      } else {
        setConnectionStatus('failed');
        toast.error('API连接测试失败，请检查网络连接');
      }
    } catch (error) {
      setConnectionStatus('failed');
      toast.error('API连接测试出现错误');
      console.error('API测试错误:', error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleConfirm = () => {
    toast.success('ChatGPT 4o AI服务已配置完成！');
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
            系统已集成ChatGPT 4o AI服务
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">ChatGPT 4o已就绪</p>
                <p className="text-xs mt-1">系统已预配置OpenAI最新4o模型</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">功能特性：</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 智能行程规划</li>
              <li>• 本地达人推荐</li>
              <li>• 个性化旅游建议</li>
              <li>• 智能内容生成</li>
              <li>• 多语言支持</li>
            </ul>
          </div>

          {/* API连接测试 */}
          <div className="space-y-2">
            <Button
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              variant="outline"
              className="w-full"
            >
              {isTestingConnection ? '测试中...' : '测试API连接'}
            </Button>
            
            {connectionStatus === 'success' && (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                API连接正常
              </div>
            )}
            
            {connectionStatus === 'failed' && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                API连接失败
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full gradient-ocean text-white"
          >
            开始使用AI服务
          </Button>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">服务说明：</p>
            <p>基于OpenAI ChatGPT 4o大模型，提供专业的智能旅游服务。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeySettings;
