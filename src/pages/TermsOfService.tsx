
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Glocal 服务条款
            </h1>
            <p className="text-gray-600">生效日期：2025年6月17日</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>一、定义</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                本条款中，"平台"指Glocal 网站、App、小程序及其相关服务。"用户"指注册、登录、浏览或以其他方式使用本平台的个人或机构。"本地达人"指经平台审核、向用户提供陪同、导览或其他线下服务的第三方服务者。"盲盒产品"指平台按照价位随机组合门票、餐饮、交通、预制菜兑换券、文创产品等内容并对外销售的旅游或生活方式产品。
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>二、协议的成立与修订</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li>用户点击同意或实际使用本平台，即视为已阅读并同意受本条款约束。</li>
                <li>平台有权根据业务需要不时更新条款，并以站内公告、弹窗或其他合理方式向用户公示。修订后的条款自公示之日起生效；用户不同意的，应立即停止使用平台服务。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>三、服务说明</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>OTA 预订：</strong>提供景区门票、交通、酒店、特色活动等线上预订与结算服务。</li>
                <li><strong>AI 路线规划：</strong>基于用户画像生成个性化行程，配合"AI + 本地达人"双核模式交付深度体验。</li>
                <li><strong>本地达人服务：</strong>经培训与审核的达人可向用户提供导览、陪同、拍摄等付费服务；其行为视为第三方独立行为，与平台构成委托关系。</li>
                <li><strong>盲盒产品：</strong>平台确保每个价位对应的组合价值控制在售价上下 50 元区间，并至少设计一套保底方案，以降低随机性风险。</li>
                <li><strong>特色电商：</strong>用户可购买烟台特色预制菜及文创商品，部分商品可能包含跨境电商服务。</li>
              </ol>
            </CardContent>
          </Card>

          {/* Continue with remaining sections following the same pattern */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>十六、联系信息</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>客服电话：+86-173-7541-1453（工作日 9:00-18:00）</p>
              <p>联系邮箱：glocal@yeah.net</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
