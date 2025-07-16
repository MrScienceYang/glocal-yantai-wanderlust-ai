export interface Attraction {
  id: string;
  name: string;
  description: string;
  distance: number;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  imageUrl?: string;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
  city: string;
}

export class SmartGuideService {
  async getNearbyAttractions(location: LocationInfo): Promise<Attraction[]> {
    const mockAttractions: Attraction[] = [
      {
        id: '1',
        name: '蓬莱阁风景区',
        description: '中国古代四大名楼之一，素有"人间仙境"之称',
        distance: 2.5,
        latitude: location.latitude + 0.02,
        longitude: location.longitude + 0.01,
        category: '历史文化',
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1613689324556-912a8155e821?q=80&w=400'
      },
      {
        id: '2',
        name: '烟台山景区',
        description: '烟台标志性景点，可俯瞰整个海湾美景',
        distance: 1.8,
        latitude: location.latitude + 0.01,
        longitude: location.longitude - 0.02,
        category: '自然风光',
        rating: 4.4,
        imageUrl: 'https://images.unsplash.com/photo-1623594198431-744358652934?q=80&w=400'
      },
      {
        id: '3',
        name: '金沙滩海滨公园',
        description: '优质的海滨度假胜地，沙质细腻，海水清澈',
        distance: 3.2,
        latitude: location.latitude - 0.01,
        longitude: location.longitude + 0.03,
        category: '海滨休闲',
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1589033391398-19c2dc336873?q=80&w=400'
      }
    ];

    return mockAttractions.sort((a, b) => a.distance - b.distance);
  }

  async getAttractionIntroduction(attractionId: string): Promise<string> {
    const attractions = {
      '1': '欢迎来到蓬莱阁风景区！我是您的AI智慧导游。蓬莱阁始建于北宋嘉祐六年，与黄鹤楼、岳阳楼、滕王阁并称为中国古代四大名楼。这里不仅有着悠久的历史文化底蕴，更是传说中八仙过海的地方。站在蓬莱阁上，您可以远眺渤海，感受"海市蜃楼"的神奇景象。\n\n接下来，我可以为您详细介绍：\n1. 景区内的主要景点：如八仙过海景区、三仙山风景区、蓬莱水城等\n2. 历史文化遗迹：古代建筑群、碑刻、文物陈列等\n3. 公共设施信息：停车场位置、充电宝租借点、餐饮区域、休息区等\n4. 最佳观光路线和拍照地点推荐\n\n您希望我先为您介绍哪个方面呢？',
      '2': '欢迎来到烟台山景区！我是您的AI智慧导游。烟台山海拔42.5米，是烟台市的标志性景点。这里有着丰富的近代历史文化遗存，包括灯塔、领事馆旧址等建筑群。山顶的烟台山灯塔是远东最早的海岸灯塔之一，至今仍在为过往船只指引方向。\n\n我可以为您详细介绍：\n1. 历史建筑群：各国领事馆旧址、教堂、洋行等近代建筑\n2. 观景点推荐：山顶观景台、灯塔周边、海景步道等\n3. 文化展馆：烟台开埠陈列馆、民俗文化展示等\n4. 便民设施：观光车站点、公共卫生间、小卖部、充电站等\n\n您想了解哪个方面的详细信息呢？',
      '3': '欢迎来到金沙滩海滨公园！我是您的AI智慧导游。这里拥有烟台最优质的海滩资源，沙质细腻如金，海水清澈湛蓝。公园内设有各种海滨娱乐设施，是游泳、日光浴和海上运动的理想场所。夕阳西下时，这里的海景更是美不胜收。\n\n我可以为您介绍：\n1. 海滨活动区域：游泳区、沙滩排球场、海上运动项目等\n2. 休闲设施：海滨步道、观景凉亭、儿童游乐区等\n3. 服务设施：更衣室、淋浴间、救生站、医疗点等\n4. 周边配套：停车场、餐饮区、商店、充电宝租借等\n\n您希望我重点为您介绍哪个区域呢？'
    };

    return attractions[attractionId] || '欢迎来到这个美丽的景区！我是您的AI智慧导游，很高兴为您服务。\n\n我可以为您介绍景区的各个景点、历史文化、公共设施以及最佳游览路线。您想了解哪个方面呢？';
  }

  async generateAudio(text: string, voice: string = 'zh-CN-XiaoxiaoNeural'): Promise<string | null> {
    try {
      console.log('尝试使用Edge TTS生成音频，文本长度:', text.length);
      
      const response = await fetch('https://speech.platform.bing.com/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        body: `<speak version='1.0' xml:lang='zh-CN'>
                <voice xml:lang='zh-CN' xml:gender='Female' name='${voice}'>
                  ${text}
                </voice>
               </speak>`
      });

      if (!response.ok) {
        console.error('Edge TTS API错误:', response.status, response.statusText);
        return this.generateBrowserAudio(text);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('Edge TTS音频生成成功');
      return audioUrl;
    } catch (error) {
      console.error('Edge TTS生成音频时出错:', error);
      return this.generateBrowserAudio(text);
    }
  }

  private async generateBrowserAudio(text: string): Promise<string | null> {
    try {
      console.log('使用浏览器内置TTS生成音频');
      
      if (!('speechSynthesis' in window)) {
        console.warn('浏览器不支持Speech Synthesis API');
        return null;
      }

      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
          voice.lang.includes('zh') || voice.lang.includes('CN')
        );
        if (chineseVoice) {
          utterance.voice = chineseVoice;
        }

        utterance.onstart = () => {
          console.log('浏览器TTS开始播放');
        };

        utterance.onend = () => {
          console.log('浏览器TTS播放完成');
        };

        utterance.onerror = (event) => {
          console.error('浏览器TTS播放错误:', event.error);
        };

        speechSynthesis.speak(utterance);
        resolve('browser-tts');
      });
    } catch (error) {
      console.error('浏览器TTS生成失败:', error);
      return null;
    }
  }

  async askNextDestination(currentAttraction: string, userResponse?: string): Promise<string> {
    const detailedResponses = {
      '景点介绍': [
        '根据您的选择，我来为您详细介绍景区内的主要景点。每个景点都有其独特的历史故事和文化内涵。我建议您按照从入口到核心景点的顺序游览，这样可以更好地感受景区的整体布局和历史脉络。您想先了解哪个具体景点呢？',
        '景区内有多个值得参观的景点，我可以为您介绍它们的特色和最佳参观时间。建议您预留充足的时间，因为每个景点都有很多值得细细品味的地方。您比较感兴趣的是历史建筑还是自然景观呢？'
      ],
      '历史文化': [
        '这里的历史文化底蕴非常深厚，我来为您讲述这些古迹背后的故事。从建筑风格到历史事件，每一处都承载着丰富的文化内涵。您想了解建筑历史还是相关的历史人物故事呢？',
        '景区的文化遗迹见证了悠久的历史变迁。我可以为您介绍不同历史时期的文物和它们的历史价值。这些珍贵的文化遗产都有着独特的艺术价值和历史意义。'
      ],
      '公共设施': [
        '为了让您的游览更加便利，我来介绍一下景区内的各项公共设施。包括停车场、卫生间、充电宝租借点、餐饮区域等。合理利用这些设施可以让您的游览体验更加舒适。您现在最需要了解哪种设施的位置呢？',
        '景区配备了完善的服务设施，我可以为您提供详细的位置信息和使用指南。这些便民设施分布在景区各个区域，方便游客随时使用。'
      ],
      '观光路线': [
        '我为您推荐几条经典的游览路线，每条路线都有不同的主题和特色。您可以根据自己的兴趣和时间来选择。比如历史文化路线、自然风光路线或者摄影爱好者路线。您更偏向哪种类型的游览体验呢？',
        '根据您的游览时间和兴趣点，我可以为您定制最适合的参观路线。这样可以确保您不错过任何精彩的景点，同时合理安排体力和时间。'
      ]
    };

    if (userResponse) {
      const response = userResponse.toLowerCase();
      if (response.includes('景点') || response.includes('参观') || response.includes('游览')) {
        return detailedResponses['景点介绍'][Math.floor(Math.random() * detailedResponses['景点介绍'].length)];
      } else if (response.includes('历史') || response.includes('文化') || response.includes('故事')) {
        return detailedResponses['历史文化'][Math.floor(Math.random() * detailedResponses['历史文化'].length)];
      } else if (response.includes('设施') || response.includes('停车') || response.includes('充电') || response.includes('餐饮')) {
        return detailedResponses['公共设施'][Math.floor(Math.random() * detailedResponses['公共设施'].length)];
      } else if (response.includes('路线') || response.includes('推荐') || response.includes('怎么走')) {
        return detailedResponses['观光路线'][Math.floor(Math.random() * detailedResponses['观光路线'].length)];
      }
    }

    const generalSuggestions = [
      '您刚才听到的介绍如何？接下来我可以为您详细介绍景区内的各个分区景点、历史文化背景、便民服务设施，或者为您推荐最佳的游览路线和拍照地点。您最感兴趣的是哪个方面呢？',
      '基于您的位置，我建议您可以选择以下几个方向：深入了解景区的历史文化故事、参观周边的特色景点、了解公共设施的分布情况，或者获取个性化的游览建议。您希望我重点介绍哪一个呢？',
      '为了让您有更好的游览体验，我可以为您提供：景区内各个景点的详细介绍、历史文化知识讲解、便民设施指引，以及根据您的兴趣定制的游览路线。请告诉我您最想了解什么？'
    ];

    return generalSuggestions[Math.floor(Math.random() * generalSuggestions.length)];
  }
}

export const smartGuideService = new SmartGuideService();
