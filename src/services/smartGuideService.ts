
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
    // 模拟数据，实际应该调用真实的景区API
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

    // 根据距离排序
    return mockAttractions.sort((a, b) => a.distance - b.distance);
  }

  async getAttractionIntroduction(attractionId: string): Promise<string> {
    // 这里应该调用DeepSeek API获取景区介绍
    const attractions = {
      '1': '欢迎来到蓬莱阁风景区！我是您的AI智慧导游。蓬莱阁始建于北宋嘉祐六年，与黄鹤楼、岳阳楼、滕王阁并称为中国古代四大名楼。这里不仅有着悠久的历史文化底蕴，更是传说中八仙过海的地方。站在蓬莱阁上，您可以远眺渤海，感受"海市蜃楼"的神奇景象。请问您想先参观哪个区域呢？',
      '2': '欢迎来到烟台山景区！我是您的AI智慧导游。烟台山海拔42.5米，是烟台市的标志性景点。这里有着丰富的近代历史文化遗存，包括灯塔、领事馆旧址等建筑群。山顶的烟台山灯塔是远东最早的海岸灯塔之一，至今仍在为过往船只指引方向。您想了解这里的哪个历史故事呢？',
      '3': '欢迎来到金沙滩海滨公园！我是您的AI智慧导游。这里拥有烟台最优质的海滩资源，沙质细腻如金，海水清澈湛蓝。公园内设有各种海滨娱乐设施，是游泳、日光浴和海上运动的理想场所。夕阳西下时，这里的海景更是美不胜收。您是想先在海边漫步，还是了解一下这里的海洋文化呢？'
    };

    return attractions[attractionId] || '欢迎来到这个美丽的景区！我是您的AI智慧导游，很高兴为您服务。';
  }

  async generateAudio(text: string, voice: string = 'zh-CN-XiaoxiaoNeural'): Promise<string | null> {
    try {
      console.log('尝试使用Edge TTS生成音频，文本长度:', text.length);
      
      // 使用Edge TTS的免费API
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
        
        // 如果Edge TTS不可用，尝试使用浏览器内置的Speech Synthesis API
        return this.generateBrowserAudio(text);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('Edge TTS音频生成成功');
      return audioUrl;
    } catch (error) {
      console.error('Edge TTS生成音频时出错:', error);
      // 降级到浏览器内置的Speech Synthesis API
      return this.generateBrowserAudio(text);
    }
  }

  private async generateBrowserAudio(text: string): Promise<string | null> {
    try {
      console.log('使用浏览器内置TTS生成音频');
      
      // 检查浏览器是否支持Speech Synthesis API
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

        // 尝试选择中文语音
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
        
        // 对于浏览器TTS，我们返回一个特殊标识符
        resolve('browser-tts');
      });
    } catch (error) {
      console.error('浏览器TTS生成失败:', error);
      return null;
    }
  }

  async askNextDestination(currentAttraction: string, userResponse?: string): Promise<string> {
    // 这里应该调用DeepSeek API生成下一步建议
    const suggestions = [
      '根据您刚才的回答，我建议您接下来可以前往观景台，那里有最佳的拍照位置。或者您也可以选择参观历史展览馆，了解更多文化背景。您更倾向于哪个选择呢？',
      '看起来您对这里的历史很感兴趣！我建议您下一站可以去文物陈列室，那里有珍贵的历史文物。另外，如果您想休息一下，附近的茶室环境也很不错。您想去哪里呢？',
      '既然您喜欢这里的自然风光，我推荐您走向海边栈道，那里可以更近距离地感受海风。如果您想要更多的文化体验，旁边的民俗表演也很精彩。您觉得怎么样？'
    ];

    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
}

export const smartGuideService = new SmartGuideService();
