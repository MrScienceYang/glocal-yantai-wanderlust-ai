import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  ArrowLeft, 
  Package, 
  DollarSign, 
  Image,
  FileText,
  Tag,
  CheckCircle,
  Sparkles,
  Bot,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import AIPermissionCheck from '@/components/AIPermissionCheck';
import { aiService } from '@/services/aiService';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ProductFormData {
  name: string;
  description: string;
  costPrice: number;
  retailPrice: number;
  category: string;
  tags: string;
  specs: string;
  images: FileList | null;
}

const SupplierUploadProduct = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showAIModule, setShowAIModule] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [hasAIPermission, setHasAIPermission] = useState(false);

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      costPrice: 0,
      retailPrice: 0,
      category: '',
      tags: '',
      specs: '',
      images: null,
    },
  });

  const handleBack = () => {
    navigate('/partner-dashboard');
  };

  const handleAIGenerate = async (type: 'description' | 'tags' | 'specs') => {
    if (!hasAIPermission) {
      setShowAIModule(true);
      return;
    }

    const productName = form.getValues('name');
    const category = form.getValues('category');
    
    if (!productName || !category) {
      toast.error('请先填写商品名称和分类');
      return;
    }

    setAiGenerating(true);
    try {
      const prompt = `
        请为以下商品生成${type === 'description' ? '详细描述' : type === 'tags' ? '标签' : '规格'}：
        商品名称：${productName}
        商品分类：${category}
        
        ${type === 'description' ? '请生成一个详细的商品描述，包括特色、工艺、使用场景等。' : ''}
        ${type === 'tags' ? '请生成适合的商品标签，多个标签用逗号分隔。' : ''}
        ${type === 'specs' ? '请生成商品规格信息，包括尺寸、重量、包装等。' : ''}
      `;

      const response = await aiService.generateItinerary({ 
        interests: prompt,
        budget: '不限',
        duration: '1',
        groupSize: '1',
        travelStyle: '商品描述生成'
      });

      let generatedContent = '';
      if (response.textResponse) {
        generatedContent = response.textResponse;
      } else if (typeof response === 'string') {
        generatedContent = response;
      }

      if (generatedContent) {
        form.setValue(type, generatedContent);
        toast.success(`AI${type === 'description' ? '描述' : type === 'tags' ? '标签' : '规格'}生成成功！`);
      }
    } catch (error) {
      console.error('AI生成失败:', error);
      toast.error('AI生成失败，请稍后重试');
    } finally {
      setAiGenerating(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsUploading(true);
    
    // 模拟上传过程
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('上传商品信息:', data);
      toast.success('商品上架成功！');
      setUploadSuccess(true);
      
      // 3秒后返回主页面
      setTimeout(() => {
        navigate('/partner-dashboard');
      }, 3000);
      
    } catch (error) {
      toast.error('上架失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">上架成功！</h2>
            <p className="text-gray-300 mb-6">您的商品已成功提交到商城平台</p>
            <div className="text-sm text-gray-400">3秒后自动返回工作台...</div>
          </motion.div>
        </div>
      </Layout>
    );
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
              className="flex items-center mb-8"
            >
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
                  上架商城平台商品
                </h1>
                <p className="text-gray-300">
                  填写商品信息，提交到商城平台进行销售
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧表单 */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Package className="h-5 w-5 mr-2 text-blue-400" />
                        商品信息
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {/* ... keep existing code (form fields) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 商品名称 */}
                            <FormField
                              control={form.control}
                              name="name"
                              rules={{ required: "请输入商品名称" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">商品名称</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field}
                                      placeholder="请输入商品名称"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* 商品分类 */}
                            <FormField
                              control={form.control}
                              name="category"
                              rules={{ required: "请选择商品分类" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">商品分类</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field}
                                      placeholder="如：酒类、食品、特产等"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* 成本价格 */}
                            <FormField
                              control={form.control}
                              name="costPrice"
                              rules={{ required: "请输入成本价格", min: { value: 0, message: "价格不能为负数" } }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">成本价格 (元)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field}
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* 零售价格 */}
                            <FormField
                              control={form.control}
                              name="retailPrice"
                              rules={{ required: "请输入零售价格", min: { value: 0, message: "价格不能为负数" } }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-300">零售价格 (元)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field}
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* 商品描述 */}
                          <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "请输入商品描述" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300 flex items-center justify-between">
                                  商品描述
                                  <Button
                                    type="button"
                                    onClick={() => handleAIGenerate('description')}
                                    disabled={aiGenerating}
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                  >
                                    {aiGenerating ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <Sparkles className="h-3 w-3 mr-1" />
                                    )}
                                    AI生成
                                  </Button>
                                </FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field}
                                    placeholder="请详细描述商品特色、工艺、口感等信息"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* 商品规格 */}
                          <FormField
                            control={form.control}
                            name="specs"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300 flex items-center justify-between">
                                  商品规格
                                  <Button
                                    type="button"
                                    onClick={() => handleAIGenerate('specs')}
                                    disabled={aiGenerating}
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                  >
                                    {aiGenerating ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <Sparkles className="h-3 w-3 mr-1" />
                                    )}
                                    AI生成
                                  </Button>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    placeholder="如：750ml单瓶装、礼盒装等，多个规格用逗号分隔"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* 商品标签 */}
                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300 flex items-center justify-between">
                                  商品标签
                                  <Button
                                    type="button"
                                    onClick={() => handleAIGenerate('tags')}
                                    disabled={aiGenerating}
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                  >
                                    {aiGenerating ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <Sparkles className="h-3 w-3 mr-1" />
                                    )}
                                    AI生成
                                  </Button>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    placeholder="如：传统工艺、地方特产、高端精品等，多个标签用逗号分隔"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* 商品图片 */}
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field: { onChange, value, ...field } }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">商品图片</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => onChange(e.target.files)}
                                    className="bg-white/10 border-white/20 text-white file:bg-white/20 file:text-white file:border-0"
                                  />
                                </FormControl>
                                <p className="text-xs text-gray-400">支持多张图片上传，建议尺寸 800x800px</p>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* 提交按钮 */}
                          <div className="flex justify-end space-x-4 pt-6">
                            <Button 
                              type="button"
                              onClick={handleBack}
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              取消
                            </Button>
                            <Button 
                              type="submit"
                              disabled={isUploading}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8"
                            >
                              {isUploading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                  上架中...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-2" />
                                  提交上架
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* 右侧AI助手模块 */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Bot className="h-5 w-5 mr-2 text-purple-400" />
                        AI智能助手
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4">
                        <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI功能介绍
                        </h4>
                        <ul className="text-sm text-purple-200 space-y-1">
                          <li>• 自动生成商品描述</li>
                          <li>• 智能推荐商品标签</li>
                          <li>• 规格信息生成</li>
                          <li>• 基于商品特性优化</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-white">使用说明：</h4>
                        <div className="text-sm text-gray-300 space-y-2">
                          <p>1. 先填写商品名称和分类</p>
                          <p>2. 点击对应字段的"AI生成"按钮</p>
                          <p>3. AI将自动生成相关内容</p>
                          <p>4. 可根据需要修改生成内容</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setShowAIModule(true)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        disabled={aiGenerating}
                      >
                        {aiGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            AI生成中...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            开始使用AI功能
                          </>
                        )}
                      </Button>

                      <div className="text-xs text-gray-400 bg-gray-800/50 p-3 rounded">
                        <p className="font-medium mb-1">提示：</p>
                        <p>AI生成的内容仅供参考，请根据实际情况进行调整和完善。</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* AI权限检查模块 */}
        {showAIModule && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md w-full mx-4">
              <AIPermissionCheck 
                onPermissionGranted={() => {
                  setHasAIPermission(true);
                  setShowAIModule(false);
                }}
              />
              <Button
                onClick={() => setShowAIModule(false)}
                variant="outline"
                className="mt-4 w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                取消
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SupplierUploadProduct;
