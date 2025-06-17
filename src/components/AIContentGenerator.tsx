
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { useAIContent } from '@/hooks/useAIContent';
import { ContentGenerationRequest } from '@/services/aiContentService';
import AIPermissionCheck from './AIPermissionCheck';

interface AIContentGeneratorProps {
  type: 'product' | 'review' | 'flight' | 'train' | 'hotel' | 'ticket';
  context: any;
  onContentGenerated?: (content: any) => void;
  buttonText?: string;
  title?: string;
  description?: string;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  type,
  context,
  onContentGenerated,
  buttonText,
  title,
  description
}) => {
  const { generateContent, isGenerating, hasPermission, grantPermission } = useAIContent();

  const handleGenerate = async () => {
    const request: ContentGenerationRequest = {
      type,
      context
    };

    try {
      const content = await generateContent(request);
      if (content && onContentGenerated) {
        onContentGenerated(content);
      }
    } catch (error) {
      console.error('生成内容失败:', error);
    }
  };

  if (!hasPermission) {
    return <AIPermissionCheck onPermissionGranted={grantPermission} />;
  }

  const getDefaultTitle = () => {
    const titles: Record<string, string> = {
      product: 'AI商品内容生成',
      review: 'AI评价生成',
      flight: 'AI航班信息生成',
      train: 'AI列车信息生成',
      hotel: 'AI酒店信息生成',
      ticket: 'AI景点信息生成'
    };
    return titles[type] || 'AI内容生成';
  };

  const getDefaultDescription = () => {
    const descriptions: Record<string, string> = {
      product: '智能生成商品标题、描述和亮点',
      review: '生成真实自然的用户评价',
      flight: '生成航班服务信息和亮点',
      train: '生成列车服务特色和设施信息',
      hotel: '生成酒店设施和服务亮点',
      ticket: '生成景点介绍和游玩攻略'
    };
    return descriptions[type] || '使用AI智能生成内容';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-purple-600" />
          {title || getDefaultTitle()}
        </CardTitle>
        <CardDescription>
          {description || getDefaultDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full gradient-ocean text-white"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI生成中...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              {buttonText || '生成内容'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
