
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

  // 添加中文文本的函数（使用图片方式渲染中文）
  const addChineseText = (text: string, x: number, y: number, options: any = {}) => {
    try {
      // 创建临时canvas来渲染中文
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const fontSize = options.fontSize || 12;
      const fontFamily = options.fontFamily || 'Arial, "Microsoft YaHei", "SimHei", sans-serif';
      
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = options.color || '#000000';
      
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize * 1.5;
      
      canvas.width = textWidth + 10;
      canvas.height = textHeight + 10;
      
      // 重新设置字体（canvas重置后需要重新设置）
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = options.color || '#000000';
      ctx.textBaseline = 'top';
      
      // 填充文本
      ctx.fillText(text, 5, 5);
      
      // 将canvas转换为图片并添加到PDF
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = textWidth * 0.75; // 调整PDF中的尺寸
      const pdfHeight = textHeight * 0.75;
      
      if (options.align === 'center') {
        x = (pageWidth - pdfWidth) / 2;
      }
      
      pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
      
      return textHeight * 0.75;
    } catch (error) {
      // 如果中文渲染失败，使用英文替代
      pdf.setFontSize(options.fontSize || 12);
      pdf.setTextColor(options.color || '#000000');
      const fallbackText = text.replace(/[\u4e00-\u9fff]/g, '?'); // 替换中文为问号
      pdf.text(fallbackText, x, y, options);
      return options.fontSize || 12;
    }
  };

  // 添加首页设计元素
  addDesignElements();

  // 主标题
  const titleHeight = addChineseText('Glocal智能供应链合作商业计划书', pageWidth / 2, yPosition, {
    fontSize: 20,
    align: 'center',
    color: '#000000'
  });
  yPosition += titleHeight + 15;

  // 副标题
  const subtitleHeight = addChineseText('构建智能化供应链生态，共创数字化未来', pageWidth / 2, yPosition, {
    fontSize: 12,
    align: 'center',
    color: '#4facfe'
  });
  yPosition += subtitleHeight + 25;

  // 合作模式标题
  const modeTitle = getModeTitle(data.cooperationMode.slice(-1));
  const modeTitleHeight = addChineseText(modeTitle, margin, yPosition, {
    fontSize: 16,
    color: '#0064c8'
  });
  yPosition += modeTitleHeight + 15;

  // 获取对应模式的具体内容
  const modeContent = getModeSpecificContent(data.cooperationMode.slice(-1));
  
  // 渲染模式内容
  modeContent.forEach(section => {
    if (yPosition > 250) {
      pdf.addPage();
      addDesignElements();
      yPosition = 25;
    }

    // 章节标题
    const sectionTitleHeight = addChineseText(section.title, margin, yPosition, {
      fontSize: 14,
      color: '#0064c8'
    });
    yPosition += sectionTitleHeight + 8;

    // 章节内容
    section.content.forEach(paragraph => {
      if (yPosition > 250) {
        pdf.addPage();
        addDesignElements();
        yPosition = 25;
      }
      
      const paragraphHeight = addChineseText(paragraph, margin, yPosition, {
        fontSize: 10,
        color: '#000000'
      });
      yPosition += paragraphHeight + 5;
    });
    
    yPosition += 10;
  });

  // 新页面 - 合作协议
  pdf.addPage();
  addDesignElements();
  yPosition = 25;

  // 合同标题
  const contractTitleHeight = addChineseText('供应链合作协议', pageWidth / 2, yPosition, {
    fontSize: 18,
    align: 'center',
    color: '#000000'
  });
  yPosition += contractTitleHeight + 25;

  // 合同内容
  const contractContent = getContractContent(data.cooperationMode.slice(-1));
  
  contractContent.forEach(line => {
    if (yPosition > 270) {
      pdf.addPage();
      addDesignElements();
      yPosition = 25;
    }
    
    let fontSize = 10;
    let color = '#000000';
    
    if (line.includes('第一条') || line.includes('第二条') || line.includes('第三条')) {
      fontSize = 12;
      color = '#0064c8';
      yPosition += 5;
    } else if (line.includes('甲方') && line.includes('签字')) {
      fontSize = 11;
      yPosition += 10;
    }
    
    const lineHeight = addChineseText(line, margin, yPosition, {
      fontSize: fontSize,
      color: color
    });
    yPosition += lineHeight + 3;
  });

  // 保存PDF
  const fileName = `Glocal供应链合作模式${data.cooperationMode.slice(-1)}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

// 获取模式标题
const getModeTitle = (mode: string) => {
  const titles = {
    'A': '模式A：技术赋能型供应商（生产端技术化改造）',
    'B': '模式B：Glocal品牌联盟（贴牌/OEM合作）',
    'C': '模式C：末端渠道优化（合作门店）',
    'D': '模式D：共生式景区合作'
  };
  return titles[mode] || '';
};

// 获取特定模式的详细内容
const getModeSpecificContent = (mode: string) => {
  const contentMap = {
    'A': [
      {
        title: '核心概念',
        content: [
          '此模式主要面向具有发展潜力但在技术和管理上相对落后的本地生产者（如农场、小型食品加工作坊）。Glocal为其提供一整套技术解决方案，以提升其生产效率、品控水平和物流能力，作为交换，Glocal获得其独家或优先的供应商资格。',
        ]
      },
      {
        title: '"技术赋能"组合包',
        content: [
          '这并非简单的专利许可，而是一个综合性的服务包，其价值远超单一专利。它包括：',
          '• 专有软件系统接入：供应商获得Glocal自研的供应链管理（SCM）软件的使用权限，实现订单、库存、生产计划的数字化管理。',
          '• AI数据决策支持：基于Glocal平台C端用户的行为数据、搜索偏好和预订趋势，AI模型为供应商提供精准的需求预测，指导其生产和备货。',
          '• 标准化运营流程（SOPs）：Glocal提供一整套关于产品质量控制、食品安全规范、包装标准和物流交接的SOPs。'
        ]
      },
      {
        title: '财务模型',
        content: [
          '• 技术改造启动金：针对技术化改造收取的一次性费用。',
          '• 技术服务年费/抽成：针对SCM软件使用和AI数据分析服务。',
          '• 成本回收机制：降低中小供应商的准入门槛。',
          '• 合作保证金：供应商需缴纳一定数额的保证金。'
        ]
      }
    ],
    'B': [
      {
        title: '核心概念',
        content: [
          '此模式面向已经具备稳定生产能力和高质量产品的本地供应商。Glocal授权其生产带有"Glocal"商标的产品（即贴牌生产），使其能够借助Glocal的品牌信誉、营销渠道和用户信任，快速进入市场。'
        ]
      },
      {
        title: '法律与运营框架',
        content: [
          '• 商标授权：Glocal必须拥有"Glocal"的注册商标。OEM合作协议的核心是授予供应商在特定产品上使用该商标的有限许可。',
          '• 质量控制：这是此模式下风险最高、也最关键的一环。一旦贴牌产品出现问题（尤其是食品安全问题），Glocal作为品牌方将承担首要的法律责任和品牌声誉损失。',
          '• 价值交换：作为满足Glocal严苛质量标准的回报，供应商将获得平台提供的专项流量扶持，在商城设立"Glocal精选"专区进行重点推广，并享受平台服务费的减免。'
        ]
      }
    ],
    'C': [
      {
        title: '核心概念',
        content: [
          '此模式旨在签约本地的零售店、餐厅、酒店礼品店、特产店等作为Glocal的线下合作伙伴。核心价值在于，利用Glocal整合的、质量可控的、独特的供应链，替换掉这些门店现有的本地特产供应。'
        ]
      },
      {
        title: '双向价值主张',
        content: [
          '• 对合作门店：能够获得独家的、质量有保证的特色产品，从而在激烈的市场竞争中形成差异化。',
          '• 对Glocal：获得了一个深入社区的、低成本的线下实体分销和品牌展示网络。'
        ]
      },
      {
        title: '财务模型',
        content: [
          '此模式更适合采用批发模式。Glocal以批发价向合作门店供货，门店再以零售价出售，赚取差价。'
        ]
      }
    ],
    'D': [
      {
        title: '核心概念',
        content: [
          '与景区的合作必须超越简单的门票佣金模式，转向更深度的、共生的合作关系。'
        ]
      },
      {
        title: '模式D1（优选合作伙伴）',
        content: [
          '景区在其自营的礼品店、游客中心等显要位置，优先陈列和销售Glocal品牌或Glocal供应链提供的特色商品。'
        ]
      },
      {
        title: '模式D2（战略共创伙伴）',
        content: [
          '法律风险警示与战略重构：原计划的"独家销售平台产品，免予收取平台服务费"存在极高的反垄断法律风险。',
          '合规的战略转向：此模式必须从反竞争的"排他性"重构为促进竞争的"创新性"。'
        ]
      }
    ]
  };

  return contentMap[mode] || [];
};

// 获取合同内容
const getContractContent = (mode: string) => {
  const contractTemplates = {
    'A': [
      '甲方（技术服务方）：Glocal智能供应链平台',
      '法定代表人：',
      '统一社会信用代码：',
      '地址：',
      '',
      '乙方（供应商）：',
      '法定代表人/身份证号：',
      '统一社会信用代码：',
      '地址：',
      '',
      '鉴于：',
      '1. 甲方合法拥有并运营"Glocal"线上平台，并拥有一系列旨在提升农产品/食品生产与供应链管理效率的技术解决方案。',
      '2. 乙方为产品生产者，希望通过采用甲方的赋能技术提升其生产管理水平，并成为平台的供应商。',
      '',
      '经双方友好协商，达成协议如下：',
      '',
      '第一条 定义',
      '1.1 赋能技术：指甲方提供给乙方使用的一整套技术与服务。',
      '1.2 供应产品：指乙方利用赋能技术生产并供应给甲方的产品。',
      '',
      '第二条 技术赋能与服务',
      '2.1 甲方同意向乙方提供本协议第一条定义的赋能技术。',
      '2.2 技术改造：如涉及硬件安装或系统部署，双方同意按照附件实施。',
      '2.3 培训与支持：甲方应为乙方提供必要的技术使用培训和持续的技术支持。',
      '',
      '第三条 产品供应与采购',
      '3.1 乙方同意在本协议有效期内，成为甲方的供应商。',
      '3.2 订单：甲方通过其SCM系统向乙方下达采购订单。',
      '3.3 质量保证：乙方保证其供应产品完全符合质量标准。',
      '',
      '第四条 费用与结算',
      '4.1 技术服务费：乙方同意向甲方支付技术服务费。',
      '4.2 技术改造启动金支付：乙方同意支付技术改造启动金。',
      '4.3 货款结算：甲方在收到乙方供应产品并验收合格后支付货款。',
      '4.4 保证金：乙方须缴纳合作保证金。'
    ],
    'B': [
      '甲方（品牌授权方/平台）：Glocal智能供应链平台',
      '乙方（制造商/被授权方）：',
      '',
      '第一条 合作内容',
      '1.1 乙方申请入驻甲方"Glocal"平台作为制造商，通过OEM模式生产带有甲方"Glocal"注册商标的产品。',
      '1.2 OEM产品清单、规格、质量标准和包装要求详见本协议附件。',
      '',
      '第二条 商标授权',
      '2.1 甲方授予乙方非独占的、不可转让的、不可再许可的商标使用许可。',
      '2.2 乙方不得在任何超出本协议约定范围的情况下使用甲方商标。',
      '',
      '第三条 质量控制与食品安全',
      '3.1 核心条款：乙方保证其生产的所有OEM产品完全符合附件规定的质量标准。',
      '3.2 甲方审核权：甲方有权随时进入乙方的生产和仓储设施进行检查。',
      '3.3 产品抽检：甲方有权随时对OEM产品进行抽样检测。',
      '3.4 产品召回：如OEM产品被证实存在安全隐患，乙方必须立即启动召回程序。'
    ],
    'C': [
      '甲方（供应商）：Glocal智能供应链平台',
      '乙方（合作门店）：',
      '',
      '第一条 合作内容',
      '1.1 甲方同意向乙方供应其整合或自有的"Glocal"系列特色产品。',
      '1.2 乙方同意在其经营场所内销售合作产品。',
      '',
      '第二条 供货与订货',
      '2.1 订货：乙方通过甲方指定的线上订货系统或联系客户经理进行订货。',
      '2.2 价格：甲方按附件中的"批发价"向乙方供货。',
      '2.3 配送：甲方负责将乙方订购的货物配送至乙方指定经营场所。',
      '2.4 验收：乙方收到货物时应立即验收。',
      '',
      '第三条 结算方式',
      '3.1 双方采取月结/批结方式结算。',
      '3.2 月结：甲方于次月提供上月对账单。',
      '3.3 批结：乙方在每次订货时/货到时支付该批次货款。'
    ],
    'D': [
      '甲方（合作伙伴）：Glocal智能供应链平台',
      '乙方（景区）：',
      '',
      '第一条 合作模式（选择其一）',
      '模式A：优选合作伙伴',
      '1.1 乙方同意在其景区自营店铺的显要位置，优先陈列和销售甲方供应的"Glocal"系列文创产品和特色食品。',
      '1.2 作为回报，甲方同意：',
      '(a) 在其"Glocal"平台上为乙方提供联合营销支持。',
      '(b) 如乙方通过甲方平台销售电子门票，甲方收取的平台服务费将在标准费率基础上减免60%。',
      '',
      '模式B：战略共创伙伴',
      '1.1 双方同意共同策划、开发并运营联合旅游体验产品。',
      '1.2 联合产品内容：具体包括特殊游览路线、专属导览服务、定制文创纪念品、特色餐饮体验等。',
      '1.3 收益分成：联合产品对外销售产生的净收入由双方按照约定比例分配。',
      '1.4 独家性：联合产品为双方共同知识产权，仅可通过甲方平台和乙方官方渠道销售。'
    ]
  };

  const baseContract = [
    '',
    '第四条 保密义务',
    '双方应对合作中获知的商业秘密承担保密义务。',
    '',
    '第五条 违约责任',
    '任何一方违反合同应承担相应的法律责任和赔偿义务。',
    '',
    '第六条 争议解决',
    '因本协议产生的争议应通过双方友好协商解决。',
    '',
    '第七条 其他条款',
    '本协议有效期三年，可续签。未尽事宜另行协商。',
    '',
    '',
    '甲方签字：_________________    日期：_________________',
    '',
    '乙方签字：_________________    日期：_________________',
    '',
    '（本协议一式两份，双方各执一份）'
  ];

  return [...(contractTemplates[mode] || []), ...baseContract];
};
