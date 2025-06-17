
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { aiService } from '@/services/aiService';
import { toast } from 'sonner';

interface APIKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const APIKeySettings: React.FC<APIKeySettingsProps> = ({ isOpen, onClose, onSuccess }) => {
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || '');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error('请输入API密钥');
      return;
    }

    setIsValidating(true);
    
    try {
      aiService.setApiKey(apiKey.trim());
      
      // 测试API密钥是否有效
      await aiService.generateItinerary({
        interests: '测试',
        budget: '100',
        duration: '1天',
        groupSize: '1人',
        travelStyle: 'relaxed'
      });
      
      toast.success('API密钥设置成功！');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('API密钥验证失败:', error);
      toast.error('API密钥无效或网络错误，请检查后重试');
    } finally {
      setIsValidating(false);
    }
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
            设置您的AI API密钥以启用智能行程规划功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">如何获取API密钥：</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>访问 OpenAI 官网注册账号</li>
                  <li>进入API Keys页面创建新密钥</li>
                  <li>复制密钥并粘贴到下方输入框</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API密钥</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isValidating}
            >
              取消
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 gradient-ocean text-white"
              disabled={isValidating}
            >
              {isValidating ? '验证中...' : '保存'}
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">隐私说明：</p>
            <p>您的API密钥将安全地存储在本地浏览器中，不会上传到我们的服务器。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeySettings;
