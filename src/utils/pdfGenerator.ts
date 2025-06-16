
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

  // 设置字体（使用支持中文的字体）
  pdf.setFont('courier');
  
  // 添加首页设计元素
  addDesignElements();

  // 主标题
  pdf.setFontSize(20);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal zhineng gongyinglian hezuo shangye jihuashu', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // 副标题装饰
  pdf.setFontSize(12);
  pdf.setTextColor(79, 172, 254);
  pdf.text('goujian zhinenghua gongyinglian shengtai, gongchuang shuzihua weilai', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 25;

  // 合作模式标题
  pdf.setFontSize(16);
  pdf.setTextColor(0, 100, 200);
  const modeTitle = getModeTitle(data.cooperationMode.slice(-1));
  
  // 将中文转换为拼音或英文描述
  const titleLines = pdf.splitTextToSize(modeTitle, maxWidth);
  pdf.text(titleLines, margin, yPosition);
  yPosition += titleLines.length * 8 + 15;

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
    pdf.setFontSize(14);
    pdf.setTextColor(0, 100, 200);
    const sectionTitleLines = pdf.splitTextToSize(section.title, maxWidth);
    pdf.text(sectionTitleLines, margin, yPosition);
    yPosition += sectionTitleLines.length * 8 + 8;

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
  pdf.text('gongyinglian hezuo xieyi', pageWidth / 2, yPosition, { align: 'center' });
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
    
    if (line.includes('diyitiao') || line.includes('diertiao')) {
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      yPosition += 5;
    } else if (line.includes('jiafang') && line.includes('qianzi')) {
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
  const fileName = `Glocal_Supply_Chain_Cooperation_Mode_${data.cooperationMode.slice(-1)}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

// 获取模式标题（英文版本）
const getModeTitle = (mode: string) => {
  const titles = {
    'A': 'Mode A: Technology Empowerment Supplier (Production Technology Transformation)',
    'B': 'Mode B: Glocal Brand Alliance (OEM Cooperation)',
    'C': 'Mode C: End Channel Optimization (Partner Stores)',
    'D': 'Mode D: Symbiotic Scenic Area Cooperation'
  };
  return titles[mode] || '';
};

// 获取特定模式的详细内容（英文版本）
const getModeSpecificContent = (mode: string) => {
  const contentMap = {
    'A': [
      {
        title: 'Core Concept',
        content: [
          'This mode is mainly aimed at local producers with development potential but relatively backward technology and management (such as farms, small food processing workshops). Glocal provides them with a complete set of technical solutions to improve their production efficiency, quality control level and logistics capabilities. In exchange, Glocal obtains exclusive or priority supplier qualifications.',
        ]
      },
      {
        title: 'Technology Empowerment Package',
        content: [
          'This is not a simple patent license, but a comprehensive service package whose value far exceeds a single patent. It includes:',
          '• Proprietary software system access: Suppliers get access to Glocals self-developed supply chain management (SCM) software to achieve digital management of orders, inventory, and production planning.',
          '• AI data decision support: Based on the behavioral data, search preferences and booking trends of Glocal platform C-end users, AI models provide suppliers with accurate demand forecasts to guide their production and stocking.',
          '• Standardized operating procedures (SOPs): Glocal provides a complete set of SOPs on product quality control, food safety standards, packaging standards and logistics handover.'
        ]
      },
      {
        title: 'Financial Model',
        content: [
          '• Technology transformation startup fund: One-time fees charged for technology transformation.',
          '• Technology service annual fee/commission: For SCM software use and AI data analysis services.',
          '• Cost recovery mechanism: To reduce the entry threshold for small and medium suppliers.',
          '• Cooperation deposit: Suppliers need to pay a certain amount of deposit.'
        ]
      }
    ],
    'B': [
      {
        title: 'Core Concept',
        content: [
          'This mode is aimed at local suppliers who already have stable production capacity and high-quality products. Glocal authorizes them to produce products with the "Glocal" trademark (i.e., OEM production), enabling them to quickly enter the market with the help of Glocals brand reputation, marketing channels and user trust.'
        ]
      },
      {
        title: 'Legal and Operational Framework',
        content: [
          '• Trademark authorization: Glocal must own the registered trademark of "Glocal". The core of the OEM cooperation agreement is to grant suppliers a limited license to use the trademark on specific products.',
          '• Quality control: This is the highest risk and most critical link in this model. Once there is a problem with OEM products (especially food safety issues), Glocal as the brand owner will bear the primary legal responsibility and brand reputation loss.',
          '• Value exchange: As a reward for meeting Glocals strict quality standards, suppliers will receive special traffic support provided by the platform, set up a "Glocal Selection" zone in the mall for key promotion, and enjoy platform service fee reductions.'
        ]
      }
    ],
    'C': [
      {
        title: 'Core Concept',
        content: [
          'This mode aims to sign local retail stores, restaurants, hotel gift shops, specialty stores, etc. as Glocals offline partners. The core value is to use Glocals integrated, quality-controllable, and unique supply chain to replace the existing local specialty supplies of these stores.'
        ]
      },
      {
        title: 'Bidirectional Value Proposition',
        content: [
          '• For partner stores: Able to obtain exclusive, quality-guaranteed specialty products, thereby forming differentiation in fierce market competition.',
          '• For Glocal: Obtained a low-cost offline physical distribution and brand display network that goes deep into the community.'
        ]
      },
      {
        title: 'Financial Model',
        content: [
          'This model is more suitable for adopting a wholesale model. Glocal supplies goods to partner stores at wholesale prices, and the stores sell them at retail prices to earn the difference.'
        ]
      }
    ],
    'D': [
      {
        title: 'Core Concept',
        content: [
          'Cooperation with scenic areas must go beyond the simple ticket commission model and turn to a deeper, symbiotic cooperative relationship.'
        ]
      },
      {
        title: 'Mode D1 (Preferred Partners)',
        content: [
          'Scenic areas prioritize the display and sale of Glocal brand or Glocal supply chain specialty products in prominent locations such as their own gift shops and visitor centers.'
        ]
      },
      {
        title: 'Mode D2 (Strategic Co-creation Partners)',
        content: [
          'Legal risk warning and strategic restructuring: The original plan of "exclusive sales of platform products, exemption from platform service fees" has extremely high antitrust legal risks.',
          'Compliant strategic transformation: This model must be reconstructed from anti-competitive "exclusivity" to competition-promoting "innovation".'
        ]
      }
    ]
  };

  return contentMap[mode] || [];
};

// 获取合同内容（英文版本）
const getContractContent = (mode: string) => {
  const contractTemplates = {
    'A': [
      'Party A (Technology Service Provider): Glocal Intelligent Supply Chain Platform',
      'Legal Representative:',
      'Unified Social Credit Code:',
      'Address:',
      '',
      'Party B (Supplier):',
      'Legal Representative/ID Number:',
      'Unified Social Credit Code:',
      'Address:',
      '',
      'Whereas:',
      '1. Party A legally owns and operates the "Glocal" online platform and owns a series of technical solutions aimed at improving the efficiency of agricultural/food production and supply chain management.',
      '2. Party B is a producer of [product type] and hopes to improve its production management level by adopting Party As empowerment technology and become a supplier of the platform.',
      '',
      'After friendly consultation between both parties, the following agreement is reached:',
      '',
      'Article 1 Definitions',
      '1.1 Empowerment technology: refers to a complete set of technologies and services provided by Party A to Party B for use.',
      '1.2 Supply products: refers to products produced and supplied by Party B to Party A using empowerment technology.',
      '',
      'Article 2 Technology Empowerment and Services',
      '2.1 Party A agrees to provide Party B with the empowerment technology defined in Article 1 of this agreement.',
      '2.2 Technology transformation: If hardware installation or system deployment is involved, both parties agree to implement it according to Annex 1.',
      '2.3 Training and support: Party A shall provide Party B with necessary technical use training and continuous technical support.',
      '',
      'Article 3 Product Supply and Procurement',
      '3.1 Party B agrees to become Party As [exclusive/priority] [product type] supplier during the validity period of this agreement.',
      '3.2 Orders: Party A issues procurement orders to Party B through its SCM system.',
      '3.3 Quality assurance: Party B guarantees that its supplied products fully comply with the quality standards specified in Annex 2.',
      '',
      'Article 4 Fees and Settlement',
      '4.1 Technology service fee: Party B agrees to pay technology service fees to Party A.',
      '4.2 Technology transformation startup fund payment: Party B agrees to pay the technology transformation startup fund.',
      '4.3 Payment settlement: Party A pays the payment to Party B within [] working days after receiving Party Bs supplied products.',
      '4.4 Deposit: Party B must pay a cooperation deposit to Party A within [] days after signing this agreement.'
    ],
    'B': [
      'Party A (Brand Licensor/Platform): Glocal Intelligent Supply Chain Platform',
      'Party B (Manufacturer/Licensee):',
      '',
      'Article 1 Cooperation Content',
      '1.1 Party B applies to enter Party As "Glocal" platform as a manufacturer and produces products with Party As "Glocal" registered trademark through OEM mode.',
      '1.2 OEM product list, specifications, quality standards, and packaging requirements are detailed in Annex 1 of this agreement.',
      '',
      'Article 2 Trademark Authorization',
      '2.1 Party A grants Party B a non-exclusive, non-transferable, non-sublicensable trademark use license.',
      '2.2 Party B shall not use Party As trademark in any situation beyond the scope agreed in this agreement.',
      '',
      'Article 3 Quality Control and Food Safety',
      '3.1 Core clause: Party B guarantees that all OEM products it produces fully comply with the quality standards specified in Annex 1.',
      '3.2 Party As audit rights: Party A has the right to enter Party Bs production and storage facilities at any time without prior notice.',
      '3.3 Product sampling: Party A has the right to sample and test OEM products at any time.',
      '3.4 Product recall: If OEM products are proven to have safety hazards or do not comply with legal regulations, Party B must immediately initiate a recall procedure.'
    ],
    'C': [
      'Party A (Supplier): Glocal Intelligent Supply Chain Platform',
      'Party B (Partner Store):',
      '',
      'Article 1 Cooperation Content',
      '1.1 Party A agrees to supply Party B with its integrated or proprietary "Glocal" series specialty products.',
      '1.2 Party B agrees to sell cooperative products in its business premises.',
      '',
      'Article 2 Supply and Ordering',
      '2.1 Ordering: Party B orders through Party As designated online ordering system or by contacting the customer manager.',
      '2.2 Price: Party A supplies goods to Party B at the "wholesale price" in the annex.',
      '2.3 Delivery: Party A is responsible for delivering the goods ordered by Party B to Party Bs designated business premises.',
      '2.4 Acceptance: Party B should immediately accept the goods upon receipt.',
      '',
      'Article 3 Settlement Method',
      '3.1 Both parties adopt [monthly settlement/batch settlement] method for settlement.',
      '3.2 Monthly settlement: Party A provides Party B with the previous months statement of accounts before the [] day of the next month.',
      '3.3 Batch settlement: Party B pays the payment for each batch when ordering/when goods arrive.'
    ],
    'D': [
      'Party A (Cooperation Partner): Glocal Intelligent Supply Chain Platform',
      'Party B (Scenic Area):',
      '',
      'Article 1 Cooperation Mode (choose one)',
      'Mode A: Preferred Partners',
      '1.1 Party B agrees to prioritize the display and sale of "Glocal" series cultural and creative products and specialty foods supplied by Party A in its self-operated stores in the scenic area.',
      '1.2 In return, Party A agrees to:',
      '(a) Provide joint marketing support for Party B on its "Glocal" platform.',
      '(b) If Party B sells electronic tickets through Party As platform, the platform service fee charged by Party A will be reduced by [60%] on the basis of the standard rate [10%].',
      '',
      'Mode B: Strategic Co-creation Partners',
      '1.1 Both parties agree to jointly plan, develop and operate a joint tourism experience product.',
      '1.2 Joint product content: specifically includes [special tour routes, exclusive guide services, customized cultural and creative souvenirs, specialty dining experiences, etc.].',
      '1.3 Revenue sharing: The net income generated from the external sales of joint products shall be distributed by both parties according to the ratio of [Party A XX%: Party B XX%].',
      '1.4 Exclusivity: Joint products are the common intellectual property of both parties and can only be sold through Party As platform and Party Bs official channels.'
    ]
  };

  const baseContract = [
    '',
    'Article 4 Confidentiality Obligations',
    'Both parties shall bear confidentiality obligations for commercial secrets learned during cooperation.',
    '',
    'Article 5 Breach of Contract Liability',
    'Any party that breaches the contract shall bear corresponding legal liability and compensation obligations.',
    '',
    'Article 6 Dispute Resolution',
    'Disputes arising from this agreement shall be resolved through friendly consultation between both parties.',
    '',
    'Article 7 Other Clauses',
    'This agreement is valid for three years and can be renewed. Matters not covered shall be negotiated separately.',
    '',
    '',
    'Party A Signature: _________________    Date: _________________',
    '',
    'Party B Signature: _________________    Date: _________________',
    '',
    '(This agreement is made in duplicate, with each party holding one copy)'
  ];

  return [...(contractTemplates[mode] || []), ...baseContract];
};
