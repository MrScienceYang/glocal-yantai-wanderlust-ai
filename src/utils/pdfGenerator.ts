
import jsPDF from 'jspdf';

export interface BusinessPlanData {
  cooperationMode: string;
  title: string;
  description: string;
  features: Array<{ title: string; desc: string }>;
  financialModel: string[];
}

export const generateBusinessPlanPDF = (data: BusinessPlanData) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;

  // 添加设计感的背景和装饰
  const addDesignElements = () => {
    // 顶部渐变色带
    pdf.setFillColor(79, 172, 254);
    pdf.rect(0, 0, pageWidth, 8, 'F');
    pdf.setFillColor(14, 165, 233);
    pdf.rect(0, 8, pageWidth, 4, 'F');
    
    // 底部装饰线
    pdf.setDrawColor(79, 172, 254);
    pdf.setLineWidth(1);
    pdf.line(margin, 285, pageWidth - margin, 285);
  };

  // 设置中文字体（使用内置字体）
  pdf.setFont('helvetica');
  
  // 添加首页设计元素
  addDesignElements();

  // 主标题
  pdf.setFontSize(20);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal智能供应链合作商业计划书', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // 副标题装饰
  pdf.setFontSize(12);
  pdf.setTextColor(79, 172, 254);
  pdf.text('构建智能化供应链生态，共创数字化未来', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // 合作模式标题
  pdf.setFontSize(16);
  pdf.setTextColor(0, 100, 200);
  pdf.text(`合作模式${data.cooperationMode.slice(-1)}：${data.title}`, margin, yPosition);
  yPosition += 15;

  // 项目概述框
  pdf.setFillColor(240, 248, 255);
  pdf.rect(margin, yPosition - 5, maxWidth, 25, 'F');
  pdf.setDrawColor(79, 172, 254);
  pdf.rect(margin, yPosition - 5, maxWidth, 25);

  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text('项目概述', margin + 5, yPosition + 5);
  yPosition += 15;

  pdf.setFontSize(11);
  const descriptionLines = pdf.splitTextToSize(data.description, maxWidth - 10);
  pdf.text(descriptionLines, margin + 5, yPosition);
  yPosition += descriptionLines.length * 5 + 20;

  // 核心功能特性
  pdf.setFontSize(14);
  pdf.setTextColor(0, 100, 200);
  pdf.text('核心功能特性', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  data.features.forEach((feature, index) => {
    // 功能点图标
    pdf.setFillColor(34, 197, 94);
    pdf.circle(margin + 3, yPosition - 2, 2, 'F');
    
    pdf.text(`${feature.title}`, margin + 10, yPosition);
    yPosition += 8;
    const descLines = pdf.splitTextToSize(`   ${feature.desc}`, maxWidth - 15);
    pdf.text(descLines, margin + 15, yPosition);
    yPosition += descLines.length * 5 + 8;
  });

  yPosition += 10;

  // 财务合作模型
  pdf.setFontSize(14);
  pdf.setTextColor(0, 100, 200);
  pdf.text('财务合作模型', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  data.financialModel.forEach((item, index) => {
    // 数字标记
    pdf.setFillColor(79, 172, 254);
    pdf.circle(margin + 3, yPosition - 2, 2, 'F');
    
    const itemLines = pdf.splitTextToSize(`${item}`, maxWidth - 10);
    pdf.text(itemLines, margin + 10, yPosition);
    yPosition += itemLines.length * 5 + 8;
  });

  // 新页面 - 详细合作内容
  pdf.addPage();
  addDesignElements();
  yPosition = 25;

  // 详细合作方案标题
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal供应链合作详细方案', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  const detailedContent = getDetailedContent(data.cooperationMode.slice(-1));
  
  detailedContent.forEach(section => {
    if (yPosition > 250) {
      pdf.addPage();
      addDesignElements();
      yPosition = 25;
    }

    // 章节标题
    pdf.setFontSize(14);
    pdf.setTextColor(0, 100, 200);
    pdf.text(section.title, margin, yPosition);
    yPosition += 12;

    // 章节内容
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    section.content.forEach(paragraph => {
      const lines = pdf.splitTextToSize(paragraph, maxWidth);
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 5;
      
      if (yPosition > 250) {
        pdf.addPage();
        addDesignElements();
        yPosition = 25;
      }
    });
    
    yPosition += 10;
  });

  // 新页面 - 合作协议
  pdf.addPage();
  addDesignElements();
  yPosition = 25;

  // 合同标题
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal供应链合作协议书', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // 合同内容
  const contractContent = getContractContent(data.cooperationMode.slice(-1));
  
  pdf.setFontSize(10);
  contractContent.forEach(line => {
    if (yPosition > 270) {
      pdf.addPage();
      addDesignElements();
      yPosition = 25;
    }
    
    if (line.startsWith('第') && line.includes('条')) {
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      yPosition += 5;
    } else if (line.includes('甲方') && line.includes('签字')) {
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
    } else {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
    }
    
    const textLines = pdf.splitTextToSize(line, maxWidth);
    pdf.text(textLines, margin, yPosition);
    yPosition += textLines.length * 5 + 3;
  });

  // 保存PDF
  const fileName = `Glocal供应链合作方案_模式${data.cooperationMode.slice(-1)}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

// 获取详细合作内容
const getDetailedContent = (mode: string) => {
  const baseContent = [
    {
      title: '一、合作背景与愿景',
      content: [
        'Glocal智能供应链平台致力于通过先进的AI技术和数字化手段，重塑传统供应链模式，构建高效、透明、可持续的供应链生态系统。',
        '我们相信，通过深度的技术赋能和创新的合作模式，能够为传统产业注入新的活力，实现供应链各环节的价值最大化。'
      ]
    },
    {
      title: '二、平台核心优势',
      content: [
        '1. AI智能决策：基于大数据分析的精准需求预测和智能调度',
        '2. 全链路数字化：从生产到消费的完整数字化管理体系',
        '3. 品质保障体系：严格的质量控制和风险管控机制',
        '4. 生态化运营：多方共赢的可持续发展模式'
      ]
    }
  ];

  const specificContent = {
    'A': [
      {
        title: '三、技术赋能型供应商合作详情',
        content: [
          '核心概念：面向具有发展潜力但在技术和管理上相对落后的本地生产者，提供一整套技术解决方案。',
          '"技术赋能"组合包包括：',
          '• 专有软件系统接入：供应商获得Glocal自研的供应链管理（SCM）软件使用权限',
          '• AI数据决策支持：基于用户行为数据的精准需求预测，指导生产和备货',
          '• 标准化运营流程（SOPs）：完整的质量控制、食品安全规范、包装标准体系'
        ]
      },
      {
        title: '四、财务模型详解',
        content: [
          '• 技术改造启动金：针对技术化改造收取的一次性费用',
          '• 技术服务年费/抽成：SCM软件使用和AI数据分析服务费用',
          '• 成本回收机制：可由Glocal先行垫付，从后续交易中分期扣除',
          '• 合作保证金：确保履行合同承诺的风险抵押'
        ]
      }
    ],
    'B': [
      {
        title: '三、Glocal品牌联盟合作详情',
        content: [
          '核心概念：面向具备稳定生产能力的本地供应商，授权生产带有Glocal商标的产品。',
          '法律与运营框架：',
          '• 商标授权：Glocal授予供应商特定产品使用商标的有限许可',
          '• 质量控制：严格的生产过程审核和随时抽检权',
          '• 价值交换：专项流量扶持和平台服务费减免'
        ]
      },
      {
        title: '四、品牌合作优势',
        content: [
          '• 借助Glocal品牌信誉快速进入市场',
          '• 获得平台"Glocal精选"专区重点推广',
          '• 享受平台服务费20%-50%的减免优惠',
          '• 接受完善的品牌保护和法律支持'
        ]
      }
    ],
    'C': [
      {
        title: '三、末端渠道优化合作详情',
        content: [
          '核心概念：签约本地零售店、餐厅、酒店礼品店等作为线下合作伙伴。',
          '双向价值主张：',
          '• 对合作门店：获得独家、质量保证的特色产品，简化采购流程',
          '• 对Glocal：获得深入社区的线下实体分销和品牌展示网络',
          '• 线上线下联动：扫码下单、前台交付的创新模式'
        ]
      },
      {
        title: '四、合作运营模式',
        content: [
          '• 批发模式供货：按批发价向合作门店供货',
          '• 差价利润分成：门店获得销售差价收益',
          '• 免除订单服务费：降低合作门店运营成本',
          '• 部分减免保证金：快速拓展线下合作网络'
        ]
      }
    ],
    'D': [
      {
        title: '三、共生式景区合作详情',
        content: [
          '核心概念：超越简单门票佣金，建立深度共生合作关系。',
          '模式D1（优选合作伙伴）：',
          '• 景区显要位置优先陈列销售Glocal产品',
          '• 平台提供流量倾斜和联合营销活动',
          '• 门票销售佣金减免60%作为合作激励'
        ]
      },
      {
        title: '四、战略共创模式',
        content: [
          '模式D2（战略共创伙伴）：',
          '• 联名体验共创：共同开发独一无二的旅游产品',
          '• 收益分成机制：联名产品收益按约定比例分配',
          '• 营销费用共担：双方共同承担推广费用',
          '• 战略投资合作：深度绑定，共同发展'
        ]
      }
    ]
  };

  return [...baseContent, ...(specificContent[mode] || [])];
};

// 获取合同内容
const getContractContent = (mode: string) => {
  const contractTemplates = {
    'A': [
      '甲方（技术服务方）：Glocal智能供应链平台',
      '乙方（供应商）：_________________',
      '',
      '第一条 合作内容',
      '1.1 甲方向乙方提供技术赋能服务，包括SCM软件系统、AI数据分析、标准化运营流程等。',
      '1.2 乙方成为甲方优先供应商，提供符合平台标准的产品。',
      '',
      '第二条 技术赋能与服务',
      '2.1 甲方提供专有软件系统使用许可，授予非独占使用权。',
      '2.2 技术改造费用为人民币_____元，支付方式按约定执行。',
      '2.3 甲方提供必要的技术培训和持续支持。',
      '',
      '第三条 费用与结算',
      '3.1 技术服务费按月/年固定费用或交易抽成3.5%收取。',
      '3.2 技术改造启动金可由甲方垫付，从后续货款中分期扣除。',
      '3.3 合作保证金用于履约担保和风险控制。'
    ],
    'B': [
      '甲方（品牌授权方）：Glocal智能供应链平台',
      '乙方（生产商）：_________________',
      '',
      '第一条 商标授权',
      '1.1 甲方授予乙方Glocal商标的有限使用许可。',
      '1.2 乙方仅可在约定产品范围内使用该商标。',
      '',
      '第二条 质量控制',
      '2.1 乙方保证产品符合甲方质量标准和食品安全法规。',
      '2.2 甲方享有生产过程审核权和产品抽检权。',
      '',
      '第三条 费用与激励',
      '3.1 商标使用许可费按约定标准收取。',
      '3.2 平台服务费在标准费率基础上减免20%-50%。',
      '3.3 获得"Glocal精选"专区推广支持。'
    ],
    'C': [
      '甲方（供应方）：Glocal智能供应链平台',
      '乙方（合作门店）：_________________',
      '',
      '第一条 合作内容',
      '1.1 甲方向乙方供应Glocal系列特色产品。',
      '1.2 乙方在经营场所销售合作产品。',
      '',
      '第二条 供货与结算',
      '2.1 甲方按批发价向乙方供货。',
      '2.2 乙方获得销售差价收益。',
      '2.3 免除线上平台订单服务费。',
      '',
      '第三条 营销支持',
      '3.1 提供免费线上流量扶持。',
      '3.2 部分减免合作保证金。',
      '3.3 提供产品营销和陈列支持。'
    ],
    'D': [
      '甲方（合作方）：Glocal智能供应链平台',
      '乙方（景区）：_________________',
      '',
      '第一条 合作模式',
      '1.1 优选合作：景区优先陈列销售Glocal产品。',
      '1.2 战略共创：共同开发联名旅游体验产品。',
      '',
      '第二条 权利义务',
      '2.1 甲方提供联合营销和流量支持。',
      '2.2 门票销售佣金减免60%。',
      '2.3 联名产品收益按约定比例分成。',
      '',
      '第三条 非排他性声明',
      '3.1 本协议不限制乙方与其他平台合作。',
      '3.2 确保公平竞争和合规经营。'
    ]
  };

  const baseContract = [
    '',
    '第四条 保密义务',
    '双方对合作中获知的商业秘密承担保密义务。',
    '',
    '第五条 违约责任',
    '任何一方违约应承担相应法律责任和赔偿义务。',
    '',
    '第六条 争议解决',
    '因本协议产生的争议，双方应友好协商解决；协商不成的，提交有管辖权的人民法院裁决。',
    '',
    '第七条 其他条款',
    '本协议有效期为三年，可续签。未尽事宜另行协商。',
    '',
    '',
    '甲方签字：_________________    日期：_________________',
    '',
    '乙方签字：_________________    日期：_________________',
    '',
    '（本协议一式两份，甲乙双方各执一份）'
  ];

  return [...(contractTemplates[mode] || []), ...baseContract];
};
