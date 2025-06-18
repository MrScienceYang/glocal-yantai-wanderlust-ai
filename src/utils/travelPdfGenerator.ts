
import jsPDF from 'jspdf';

export interface TravelPlanPDFData {
  destination: string;
  duration: string;
  groupSize: string;
  budget: string;
  travelStyle: string;
  interests: string;
  plan: {
    itinerary: Array<{
      date: string;
      activities: Array<{
        name: string;
        description: string;
        location: string;
        time: string;
        estimatedCost: number;
        transportation: string;
      }>;
    }>;
    totalCost: number;
    recommendedGroupSize: string;
    startDate: string;
  };
  thinkingProcess?: string;
}

export const generateTravelPlanPDF = (data: TravelPlanPDFData) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;

  // 添加设计元素
  const addDesignElements = () => {
    // 顶部渐变色带
    pdf.setFillColor(79, 172, 254);
    pdf.rect(0, 0, pageWidth, 8, 'F');
    pdf.setFillColor(14, 165, 233);
    pdf.rect(0, 8, pageWidth, 4, 'F');
    
    // 底部装饰线
    pdf.setDrawColor(79, 172, 254);
    pdf.setLineWidth(1);
    pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
  };

  // 添加文本
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const fontSize = options.fontSize || 12;
    const color = options.color || [0, 0, 0];
    const align = options.align || 'left';
    
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    
    if (align === 'center') {
      const textWidth = pdf.getTextWidth(text);
      x = (pageWidth - textWidth) / 2;
    }
    
    pdf.text(text, x, y);
    return fontSize * 1.2; // 返回行高
  };

  // 检查是否需要新页面
  const checkNewPage = (requiredHeight = 20) => {
    if (yPosition > pageHeight - 40 - requiredHeight) {
      pdf.addPage();
      addDesignElements();
      yPosition = 25;
      return true;
    }
    return false;
  };

  // 添加首页设计元素
  addDesignElements();

  // 主标题
  yPosition += addText('Glocal智能旅行计划', pageWidth / 2, yPosition, {
    fontSize: 20,
    align: 'center',
    color: [0, 0, 0]
  });
  yPosition += 15;

  // 副标题
  yPosition += addText(`${data.destination} ${data.duration}日游`, pageWidth / 2, yPosition, {
    fontSize: 14,
    align: 'center',
    color: [79, 172, 254]
  });
  yPosition += 25;

  // 基本信息
  yPosition += addText('旅行概况', margin, yPosition, {
    fontSize: 16,
    color: [0, 100, 200]
  });
  yPosition += 15;

  const basicInfo = [
    `目的地：${data.destination}`,
    `旅行天数：${data.duration}天`,
    `人数：${data.groupSize}人`,
    `预算：${data.budget}元`,
    `旅行风格：${data.travelStyle}`,
    `兴趣偏好：${data.interests}`
  ];

  basicInfo.forEach(info => {
    checkNewPage();
    yPosition += addText(info, margin, yPosition, { fontSize: 10 });
    yPosition += 5;
  });

  yPosition += 15;

  // AI推理过程
  if (data.thinkingProcess) {
    checkNewPage(50);
    yPosition += addText('DeepSeek R1推理过程', margin, yPosition, {
      fontSize: 16,
      color: [0, 100, 200]
    });
    yPosition += 15;

    // 分行显示推理过程
    const thinkingLines = data.thinkingProcess.split('\n');
    thinkingLines.forEach(line => {
      if (line.trim()) {
        checkNewPage();
        yPosition += addText(line.trim(), margin, yPosition, { fontSize: 9 });
        yPosition += 4;
      }
    });
    
    yPosition += 15;
  }

  // 详细行程
  checkNewPage(50);
  yPosition += addText('详细行程安排', margin, yPosition, {
    fontSize: 16,
    color: [0, 100, 200]
  });
  yPosition += 15;

  data.plan.itinerary.forEach((day, dayIndex) => {
    checkNewPage(30);
    
    // 日期标题
    yPosition += addText(`第${dayIndex + 1}天：${day.date}`, margin, yPosition, {
      fontSize: 14,
      color: [0, 0, 0]
    });
    yPosition += 12;

    // 活动列表
    day.activities.forEach((activity, actIndex) => {
      checkNewPage(25);
      
      // 活动名称
      yPosition += addText(`${actIndex + 1}. ${activity.name}`, margin + 10, yPosition, {
        fontSize: 11,
        color: [0, 0, 0]
      });
      yPosition += 8;

      // 活动详情
      const details = [
        `时间：${activity.time}`,
        `地点：${activity.location}`,
        `描述：${activity.description}`,
        `交通：${activity.transportation}`,
        `费用：${activity.estimatedCost}元`
      ];

      details.forEach(detail => {
        checkNewPage();
        yPosition += addText(detail, margin + 20, yPosition, { fontSize: 9 });
        yPosition += 4;
      });
      
      yPosition += 8;
    });
    
    yPosition += 10;
  });

  // 费用总结
  checkNewPage(30);
  yPosition += addText('费用总结', margin, yPosition, {
    fontSize: 16,
    color: [0, 100, 200]
  });
  yPosition += 15;

  yPosition += addText(`总费用：${data.plan.totalCost}元`, margin, yPosition, {
    fontSize: 12
  });
  yPosition += 8;

  yPosition += addText(`人均费用：${Math.round(data.plan.totalCost / parseInt(data.groupSize))}元`, margin, yPosition, {
    fontSize: 12
  });

  // 页脚信息 - 使用正确的API获取页数
  const totalPages = (pdf as any).internal.pages.length - 1; // 修复页数获取
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`第 ${i} 页，共 ${totalPages} 页`, pageWidth - 50, pageHeight - 10);
    pdf.text('由Glocal DeepSeek R1生成', margin, pageHeight - 10);
  }

  // 保存PDF
  const fileName = `Glocal旅行计划_${data.destination.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
