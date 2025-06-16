
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

  // 设置中文字体（使用内置字体）
  pdf.setFont('helvetica');

  // 标题
  pdf.setFontSize(20);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal供应链合作商业计划书', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 30;

  // 合作模式
  pdf.setFontSize(16);
  pdf.setTextColor(0, 100, 200);
  pdf.text(`合作模式: ${data.cooperationMode}`, margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(data.title, margin, yPosition);
  yPosition += 20;

  // 项目描述
  pdf.setFontSize(12);
  const descriptionLines = pdf.splitTextToSize(data.description, maxWidth);
  pdf.text(descriptionLines, margin, yPosition);
  yPosition += descriptionLines.length * 6 + 15;

  // 核心功能
  pdf.setFontSize(14);
  pdf.setTextColor(0, 100, 200);
  pdf.text('核心功能特性:', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  data.features.forEach((feature, index) => {
    pdf.text(`${index + 1}. ${feature.title}`, margin + 5, yPosition);
    yPosition += 8;
    const descLines = pdf.splitTextToSize(`   ${feature.desc}`, maxWidth - 10);
    pdf.text(descLines, margin + 10, yPosition);
    yPosition += descLines.length * 6 + 5;
  });

  yPosition += 10;

  // 财务模型
  pdf.setFontSize(14);
  pdf.setTextColor(0, 100, 200);
  pdf.text('财务合作模型:', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  data.financialModel.forEach((item, index) => {
    const itemLines = pdf.splitTextToSize(`${index + 1}. ${item}`, maxWidth);
    pdf.text(itemLines, margin + 5, yPosition);
    yPosition += itemLines.length * 6 + 8;
  });

  // 新页面 - 合同部分
  pdf.addPage();
  yPosition = 20;

  // 合同标题
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Glocal供应链合作意向协议书', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 30;

  // 合同内容
  pdf.setFontSize(12);
  const contractContent = [
    '甲方：Glocal智能供应链平台',
    '乙方：_________________（合作伙伴）',
    '',
    '一、合作基础',
    '1. 甲方拥有完整的智能供应链管理系统和AI数据分析能力',
    '2. 乙方具备相应的生产或销售能力，愿意接受数字化改造',
    '3. 双方本着互利共赢的原则，建立长期战略合作关系',
    '',
    '二、合作内容',
    `1. 合作模式：${data.cooperationMode}`,
    '2. 技术支持：甲方提供SCM系统、AI决策支持、标准化流程',
    '3. 商业支持：平台流量倾斜、营销资源共享、品牌授权使用',
    '',
    '三、权利义务',
    '甲方权利义务：',
    '- 提供完整的技术解决方案和培训支持',
    '- 保证平台稳定运行和数据安全',
    '- 提供市场推广和流量支持',
    '',
    '乙方权利义务：',
    '- 按照标准化流程进行生产/销售活动',
    '- 接受质量监控和定期审核',
    '- 保护商业机密和知识产权',
    '',
    '四、费用结算',
    '1. 启动费用：根据具体合作模式确定',
    '2. 服务费用：年费制或交易抽成制',
    '3. 保证金：用于风险控制和履约保障',
    '',
    '五、合作期限',
    '本协议有效期为三年，到期后可续签。',
    '',
    '六、违约责任',
    '任何一方违反本协议条款，应承担相应的违约责任。',
    '',
    '七、争议解决',
    '因本协议产生的争议，双方应友好协商解决；',
    '协商不成的，提交有管辖权的人民法院裁决。',
    '',
    '八、其他条款',
    '本协议未尽事宜，双方另行签署补充协议。',
    '',
    '',
    '甲方签字：_________________    日期：_________________',
    '',
    '乙方签字：_________________    日期：_________________',
    '',
    '',
    '（本协议一式两份，甲乙双方各执一份）'
  ];

  contractContent.forEach(line => {
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 20;
    }
    
    if (line.startsWith('一、') || line.startsWith('二、') || line.startsWith('三、') || 
        line.startsWith('四、') || line.startsWith('五、') || line.startsWith('六、') || 
        line.startsWith('七、') || line.startsWith('八、')) {
      pdf.setFontSize(13);
      pdf.setTextColor(0, 100, 200);
    } else if (line.includes('甲方') && line.includes('签字')) {
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
    } else {
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
    }
    
    const textLines = pdf.splitTextToSize(line, maxWidth);
    pdf.text(textLines, margin, yPosition);
    yPosition += textLines.length * 6 + 3;
  });

  // 保存PDF
  const fileName = `Glocal供应链合作资料_${data.cooperationMode}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
