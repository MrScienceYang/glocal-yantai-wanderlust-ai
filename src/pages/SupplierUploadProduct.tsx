
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
  Loader2,
  Brain
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
import { supplierAIService } from '@/services/supplierAIService';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PlatformSelector, { platforms } from '@/components/PlatformSelector';

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
  const [aiGenerating, setAiGenerating] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['glocal']);
  const [uploadMode, setUploadMode] = useState<'single' | 'multi'>('single');

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
    const productName = form.getValues('name');
    const category = form.getValues('category');
    
    if (!productName || !category) {
      toast.error('请先填写商品名称和分类');
      return;
    }

    setAiGenerating(true);
    setShowThinking(true);
    setThinkingProcess('DeepSeek R1 正在思考中...');

    try {
      console.log('供应商AI生成开始:', { type, productName, category });
      
      const result = await supplierAIService.generateProductContent({
        type,
        productName,
        category,
        costPrice: form.getValues('costPrice'),
        retailPrice: form.getValues('retailPrice')
      });

      if (result.thinking) {
        setThinkingProcess(result.thinking);
      }

      if (result.content) {
        form.setValue(type, result.content);
        toast.success(`AI${type === 'description' ? '描述' : type === 'tags' ? '标签' : '规格'}生成成功！`);
      }
    } catch (error) {
      console.error('AI生成失败:', error);
      toast.error('AI生成失败，请稍后重试');
      setThinkingProcess('生成失败，请重试');
    } finally {
      setAiGenerating(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsUploading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('上架商品信息:', data);
      console.log('选择平台:', selectedPlatforms);
      
      const platformNames = platforms
        .filter(p => selectedPlatforms.includes(p.id))
        .map(p => p.name)
        .join('、');
      
      toast.success(`商品已成功上架到：${platformNames}`);
      setUploadSuccess(true);
      
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
    const platformNames = platforms
      .filter(p => selectedPlatforms.includes(p.id))
      .map(p => p.name)
      .join('、');

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
            <p className="text-gray-300 mb-6">您的商品已成功提交到：{platformNames}</p>
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
                  填写商品信息，提交到商城平台进行销售 | 供应商专享AI免费服务
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
                          {/* 平台选择 */}
                          <div className="space-y-4">
                            <Label className="text-gray-300 text-base font-medium">选择上架平台</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-400 text-sm mb-2 block">上架模式</Label>
                                <div className="flex space-x-4">
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setUploadMode('single');
                                      setSelectedPlatforms([selectedPlatforms[0] || 'glocal']);
                                    }}
                                    variant={uploadMode === 'single' ? 'default' : 'outline'}
                                    size="sm"
                                    className={uploadMode === 'single' 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    }
                                  >
                                    单一平台
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => setUploadMode('multi')}
                                    variant={uploadMode === 'multi' ? 'default' : 'outline'}
                                    size="sm"
                                    className={uploadMode === 'multi' 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    }
                                  >
                                    同步上架
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <Label className="text-gray-400 text-sm mb-2 block">目标平台</Label>
                                <PlatformSelector
                                  selectedPlatforms={selectedPlatforms}
                                  onSelectionChange={setSelectedPlatforms}
                                  multiSelect={uploadMode === 'multi'}
                                  placeholder={uploadMode === 'single' ? "选择单一平台" : "选择多个平台"}
                                />
                              </div>
                            </div>
                            
                            {uploadMode === 'multi' && selectedPlatforms.length > 1 && (
                              <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-3">
                                <p className="text-blue-300 text-sm">
                                  <strong>同步上架模式：</strong>商品将同时上架到 {selectedPlatforms.length} 个平台，
                                  系统会根据各平台特性自动调整商品信息格式。
                                </p>
                              </div>
                            )}
                          </div>

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
                                      <Brain className="h-3 w-3 mr-1" />
                                    )}
                                    DeepSeek R1 生成
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
                                      <Brain className="h-3 w-3 mr-1" />
                                    )}
                                    DeepSeek R1 生成
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
                                      <Brain className="h-3 w-3 mr-1" />
                                    )}
                                    DeepSeek R1 生成
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
                              disabled={isUploading || selectedPlatforms.length === 0}
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
                                  {uploadMode === 'multi' ? '同步上架' : '提交上架'}
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
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-24">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-purple-400" />
                          DeepSeek R1 智能助手
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4">
                          <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                            <Sparkles className="h-4 w-4 mr-2" />
                            供应商专享AI服务
                          </h4>
                          <ul className="text-sm text-purple-200 space-y-1">
                            <li>• 使用DeepSeek R1推理模型</li>
                            <li>• 展示完整思考过程</li>
                            <li>• 智能商品内容生成</li>
                            <li>• 供应商账号免费使用</li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-white">使用说明：</h4>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p>1. 先填写商品名称和分类</p>
                            <p>2. 点击对应字段的"DeepSeek R1 生成"按钮</p>
                            <p>3. 查看AI的思考过程和生成结果</p>
                            <p>4. 可根据需要修改生成内容</p>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 bg-green-800/50 p-3 rounded border border-green-500/30">
                          <p className="font-medium mb-1 text-green-300">供应商特权：</p>
                          <p>作为供应商用户，您可以免费使用所有AI功能，无需观看广告或付费升级。</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* AI思考过程显示 */}
                  {showThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-white/10 backdrop-blur-md border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Brain className="h-5 w-5 mr-2 text-green-400" />
                            DeepSeek R1 思考过程
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
                            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                              {thinkingProcess}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplierUploadProduct;
