
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
            <p className="text-gray-600">生效日期：2025年6月19日</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>一、定义</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                本条款中，"平台"指Glocal 网站、App、小程序及其相关服务。"用户"指注册、登录、浏览或以其他方式使用本平台的个人或机构。"本地达人"指经平台审核、向用户提供陪同、导览或其他线下服务的第三方服务者。"盲盒产品"指平台按照价位随机组合门票、餐饮、交通、预制菜兑换券、文创产品等内容并对外销售的旅游或生活方式产品。"供应商"指向平台提供产品、服务或其他商业合作的企业或个人。"合作伙伴"指与平台建立战略合作关系的企业或机构。
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
                <li><strong>B端服务：</strong>为企业客户提供团建活动、商务差旅、会议会展等定制化服务。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>四、B端业务条款</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4 className="font-semibold mb-3">4.1 供应商合作条款</h4>
              <ol>
                <li><strong>入驻要求：</strong>供应商须具备合法经营资质，提供真实有效的营业执照、产品证书等相关证明文件。</li>
                <li><strong>产品质量：</strong>供应商保证所提供产品符合国家标准，承担产品质量责任，如因产品质量问题造成损失，供应商承担全部责任。</li>
                <li><strong>价格管理：</strong>供应商应保持价格稳定，重大价格调整需提前15天通知平台。平台有权对明显不合理的定价进行干预。</li>
                <li><strong>履约保证：</strong>供应商须按约定时间交付产品或服务，延期交付需承担相应违约责任。</li>
                <li><strong>数据配合：</strong>供应商应配合平台进行销售数据统计、用户反馈收集等工作，共同提升服务质量。</li>
              </ol>

              <h4 className="font-semibold mb-3 mt-6">4.2 本地达人服务条款</h4>
              <ol>
                <li><strong>资质认证：</strong>本地达人须通过平台培训考核，具备相应的服务能力和沟通技巧。</li>
                <li><strong>服务标准：</strong>达人服务应遵循平台制定的服务标准，确保服务质量和用户体验。</li>
                <li><strong>安全责任：</strong>达人在提供服务过程中应确保用户人身财产安全，购买相应保险，承担安全保障义务。</li>
                <li><strong>收益分成：</strong>平台与达人按约定比例分成服务费用，具体比例以合作协议为准。</li>
                <li><strong>违规处理：</strong>达人违反服务标准或发生服务纠纷的，平台有权暂停或终止合作关系。</li>
              </ol>

              <h4 className="font-semibold mb-3 mt-6">4.3 企业客户服务条款</h4>
              <ol>
                <li><strong>定制服务：</strong>平台为企业客户提供团建、商务差旅、会议会展等定制化服务，具体服务内容以合同约定为准。</li>
                <li><strong>费用结算：</strong>企业客户服务费用采用预付费或后付费模式，具体结算方式以商务合同约定为准。</li>
                <li><strong>发票开具：</strong>平台可为企业客户开具增值税发票，发票内容应真实准确反映服务内容。</li>
                <li><strong>保密义务：</strong>双方对在合作过程中获知的商业机密信息承担保密义务。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>五、平台责任与义务</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>技术维护：</strong>平台负责维护系统正常运行，保障交易安全，但不承担因不可抗力导致的服务中断责任。</li>
                <li><strong>信息审核：</strong>平台对供应商资质、产品信息进行必要审核，但不承担绝对担保责任。</li>
                <li><strong>纠纷调解：</strong>平台可协助处理用户与供应商间的争议，但最终责任由当事方承担。</li>
                <li><strong>数据保护：</strong>平台依法保护用户个人信息和商业机密，不得非法使用或泄露。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>六、费用与结算</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>平台佣金：</strong>平台按交易金额收取一定比例佣金，具体费率以合作协议为准。</li>
                <li><strong>结算周期：</strong>平台与供应商的结算周期为月结，特殊情况可协商调整。</li>
                <li><strong>费用扣除：</strong>平台有权从应付款项中扣除违约金、赔偿金等相关费用。</li>
                <li><strong>发票管理：</strong>供应商应按要求提供合规发票，税务问题由供应商自行承担。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>七、知识产权</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>平台权利：</strong>平台对其开发的软件、算法、商标等知识产权享有完整权利。</li>
                <li><strong>内容授权：</strong>供应商向平台提供的产品图片、描述等内容，授权平台在合作期间使用。</li>
                <li><strong>侵权责任：</strong>任何一方不得侵犯他人知识产权，如发生侵权由责任方承担全部责任。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>八、违约责任</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>供应商违约：</strong>供应商违反合作协议的，平台有权要求其承担违约金、赔偿损失，严重违约的可终止合作。</li>
                <li><strong>平台违约：</strong>平台违反约定义务的，应承担相应违约责任，但责任限额不超过相关交易金额。</li>
                <li><strong>免责条款：</strong>因不可抗力、政策调整、第三方原因等导致的损失，各方均不承担责任。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>九、争议解决</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>协商解决：</strong>发生争议时，各方应首先通过友好协商解决。</li>
                <li><strong>仲裁程序：</strong>协商不成的，提交烟台仲裁委员会仲裁，仲裁费用由败诉方承担。</li>
                <li><strong>管辖法院：</strong>如不适用仲裁的争议，由烟台市芝罘区人民法院管辖。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>十、其他条款</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol>
                <li><strong>完整协议：</strong>本条款构成完整协议，与单独的合作协议发生冲突时，以具体合作协议为准。</li>
                <li><strong>可分割性：</strong>如本条款中任何条款被认定无效，不影响其他条款的效力。</li>
                <li><strong>适用法律：</strong>本条款适用中华人民共和国法律。</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>十一、联系信息</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p><strong>客服电话：</strong>+86-173-7541-1453（工作日 9:00-18:00）</p>
              <p><strong>商务合作：</strong>glocal@yeah.net</p>
              <p><strong>投诉建议：</strong>complaint@glocal.com</p>
              <p><strong>公司地址：</strong>山东省烟台市芝罘区</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
