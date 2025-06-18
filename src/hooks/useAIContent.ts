
import { useState } from 'react';
import { toast } from 'sonner';
import { aiContentService, ContentGenerationRequest } from '@/services/aiContentService';
import { useUser } from '@/components/UserProvider';

export const useAIContent = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const { isVip, isLoggedIn } = useUser();

  const generateContent = async (request: ContentGenerationRequest) => {
    // 登录用户或VIP用户直接允许使用
    if (!hasPermission && !isVip && !isLoggedIn) {
      toast.error('请先登录或获取AI服务使用权限');
      return;
    }

    setIsGenerating(true);
    
    try {
      const content = await aiContentService.generateContent(request);
      setGeneratedContent(content);
      toast.success(`AI ${getContentTypeName(request.type)}生成成功！`);
      return content;
    } catch (error) {
      console.error('AI内容生成失败:', error);
      toast.error('AI内容生成失败，请稍后重试');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const grantPermission = () => {
    setHasPermission(true);
  };

  const getContentTypeName = (type: string) => {
    const typeNames: Record<string, string> = {
      product: '商品内容',
      review: '用户评价',
      flight: '航班信息',
      train: '列车信息',
      hotel: '酒店信息',
      ticket: '景点信息'
    };
    return typeNames[type] || '内容';
  };

  return {
    generateContent,
    isGenerating,
    generatedContent,
    hasPermission: hasPermission || isVip || isLoggedIn, // 登录用户自动获得权限
    grantPermission,
    setGeneratedContent
  };
};
