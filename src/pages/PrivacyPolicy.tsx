
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              隐私政策
            </h1>
            <p className="text-gray-600">最后更新日期：2025年6月17日</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>一、引言与适用范围</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                欢迎您使用 Glocal 烟台在线平台及其相关小程序、App、微信公众号（以下统称"本平台"）。我们深知个人信息对您的重要性，并将按照《中华人民共和国个人信息保护法》《中华人民共和国网络安全法》及其他适用法规，采取严格的安全措施保护您的个人信息。本政策旨在向您说明我们如何收集、使用、共享、存储及保护您在使用本平台过程中产生的个人信息，以及您可享有的权利。
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>二、我们收集的信息及用途</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>1. 基本账号信息</h4>
              <p>在您注册或登录平台时，我们会收集您的手机号码、昵称和头像；如您使用境外手机号或邮箱注册，也会收集对应信息。此类信息用于创建账号、进行身份识别并防止恶意注册。</p>
              
              <h4>2. 证件与支付信息</h4>
              <p>当您预订景区门票、酒店、达人陪同服务或进行收／退款时，我们需要您的身份证或护照号码，以及银行卡号、支付宝／微信支付账号等支付信息，以履行合同、完成合规报送和支付结算。</p>
              
              <h4>3. 旅行与喜好信息</h4>
              <p>在使用 AI 行程规划、盲盒游或订阅服务时，我们根据您填写的出行日期、同行人数、兴趣偏好以及浏览和购买记录，为您生成个性化行程并推荐预制菜、文创商品等内容，符合《计划书》中"AI + 本地达人"双核模式。</p>
              
              <h4>4. 位置信息</h4>
              <p>为向您推荐附近达人并在动态体验地图中提供精准导航，我们可能获取您的 GPS 定位、IP 地址或 WLAN 接入点信息。</p>
              
              <h4>5. 影音及图像</h4>
              <p>当您使用达人跟拍服务、上传游记或向客服提供证据时，我们会处理您拍摄或授权上传的照片和视频，用于展示游记、UGC 内容或解决交易纠纷。</p>
              
              <h4>6. 客服与风控信息</h4>
              <p>在投诉举报、担保交易等场景下，我们会记录通话录音、聊天记录、操作日志和设备信息，以处理纠纷、保障交易安全并履行法律义务，符合《计划书》附件 9 的要求。</p>
              
              <h4>可选权限说明</h4>
              <p>摄像头、相册、麦克风、定位、通信录等权限仅在首次调用相关功能时征得您的明示同意。若您拒绝授权，仅会影响对应功能，不影响核心交易服务。</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>三、信息共享、转让与公开披露</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>1. 合作伙伴</h4>
              <p>为实现"吃住行游购娱"一体化服务，我们仅在必要最小范围内，与下列类别伙伴共享信息：</p>
              <ul>
                <li>旅游供应商（景区、酒店、交通票务商）；</li>
                <li>本地达人及其 MCN 机构（用于向您提供陪同、导览、摄影等服务）；</li>
                <li>支付与结算机构（银行、支付公司）；</li>
                <li>物流及仓储伙伴（预制菜、文创产品配送）；</li>
                <li>第三方人工智能/云服务商（仅处理脱敏或经过加密的数据）。</li>
              </ul>
              
              <h4>2. 委托处理</h4>
              <p>当我们的 AI 模型需要进行云端训练或由第三方客服平台承接服务时，将签署严格的数据保护协议，禁止其出于未经您同意的目的使用您的信息。</p>
              
              <h4>3. 法定场景</h4>
              <p>依法律法规、诉讼或行政司法机关要求披露时，我们会在符合法律程序的前提下披露。</p>
              
              <h4>4. 公开发布</h4>
              <p>仅在您主动选择公开发布游记、短视频或评价时，相关内容及昵称会向全体用户展示。</p>
            </CardContent>
          </Card>

          {/* Continue with remaining sections... */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>十一、联系我们</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ul>
                <li>个人信息保护专责部门：数据与安全合规部</li>
                <li>邮箱：glocal@yeah.net</li>
                <li>客服电话：+86-17375411453（工作日 09:00-18:00）</li>
              </ul>
              <p>
                如您对本隐私政策或个人信息保护有任何疑问、建议或投诉，请通过上述方式与我们联系；若对我们的答复不满意，您还可向所在地的网信、市场监管或其他监管部门提出投诉。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
