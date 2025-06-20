
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 初始化Supabase客户端
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  console.log('Travel API function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, params, forceRefresh } = await req.json();
    console.log('Request type:', type, 'Params:', params, 'Force refresh:', forceRefresh);

    let data;
    let shouldCache = true;

    switch (type) {
      case 'flights':
        data = await getFlightData(params);
        break;
      case 'trains':
        data = await getTrainData(params);
        break;
      case 'hotels':
        data = await getHotelData(params);
        break;
      case 'tickets':
        data = await getTicketData(params);
        break;
      default:
        throw new Error('Invalid request type');
    }

    // 将数据存储到Supabase中进行缓存（如果需要）
    if (shouldCache && data && data.length > 0) {
      await cacheDataToSupabase(type, data);
    }

    return new Response(JSON.stringify({ success: true, data, cached: shouldCache }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in travel-api function:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// 获取航班数据 - 增强版本支持更多搜索参数
async function getFlightData(params: any) {
  console.log('Fetching enhanced flight data with params:', params);
  
  // 这里可以接入真实的航班API，如：
  // - Amadeus Flight Offers Search API
  // - Skyscanner API
  // - Expedia API
  
  // 生成更真实的模拟数据
  const airlines = ['中国国航', '东方航空', '南方航空', '海南航空', '春秋航空', '吉祥航空'];
  const airports = {
    '北京': ['北京首都机场', '北京大兴机场'],
    '上海': ['上海浦东机场', '上海虹桥机场'],
    '广州': ['广州白云机场'],
    '深圳': ['深圳宝安机场'],
    '成都': ['成都双流机场'],
    '杭州': ['杭州萧山机场']
  };

  const mockFlightData = [];
  const flightCount = params?.limit || 15;

  for (let i = 0; i < flightCount; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const airlineCode = airline === '中国国航' ? 'CA' : airline === '东方航空' ? 'MU' : airline === '南方航空' ? 'CZ' : 'HU';
    
    const departureTime = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const flightDuration = Math.floor(Math.random() * 360 + 60); // 1-7小时
    const arrivalTime = new Date(departureTime.getTime() + flightDuration * 60 * 1000);

    mockFlightData.push({
      id: `flight_${i}_${Date.now()}`,
      flight_number: airlineCode + Math.floor(Math.random() * 9000 + 1000),
      airline: airline,
      departure_airport: params?.from || '北京首都机场',
      arrival_airport: params?.to || '上海浦东机场',
      departure_time: departureTime.toISOString(),
      arrival_time: arrivalTime.toISOString(),
      price: Math.floor(Math.random() * 2000 + 300),
      available_seats: Math.floor(Math.random() * 200 + 5),
      class_type: 'economy',
      duration_minutes: flightDuration,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  return mockFlightData;
}

// 获取火车票数据 - 增强版本
async function getTrainData(params: any) {
  console.log('Fetching enhanced train data with params:', params);
  
  // 这里可以接入真实的火车票API，如：
  // - 12306官方API（需要授权）
  // - 第三方火车票API
  
  const trainTypes = ['高速动车', '动车', '普通列车', '直达特快'];
  const trainPrefixes = ['G', 'D', 'T', 'K'];
  
  const mockTrainData = [];
  const trainCount = params?.limit || 10;

  for (let i = 0; i < trainCount; i++) {
    const typeIndex = Math.floor(Math.random() * trainTypes.length);
    const trainType = trainTypes[typeIndex];
    const prefix = trainPrefixes[typeIndex];
    
    const departureTime = new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000);
    const trainDuration = Math.floor(Math.random() * 480 + 120); // 2-10小时
    const arrivalTime = new Date(departureTime.getTime() + trainDuration * 60 * 1000);

    mockTrainData.push({
      id: `train_${i}_${Date.now()}`,
      train_number: prefix + Math.floor(Math.random() * 900 + 100),
      train_type: trainType,
      departure_station: params?.from || '北京南',
      arrival_station: params?.to || '上海虹桥',
      departure_time: departureTime.toISOString(),
      arrival_time: arrivalTime.toISOString(),
      business_class_price: trainType === '高速动车' ? Math.floor(Math.random() * 1000 + 1200) : null,
      first_class_price: Math.floor(Math.random() * 600 + 600),
      second_class_price: Math.floor(Math.random() * 400 + 300),
      business_class_seats: trainType === '高速动车' ? Math.floor(Math.random() * 30 + 5) : 0,
      first_class_seats: Math.floor(Math.random() * 100 + 20),
      second_class_seats: Math.floor(Math.random() * 400 + 50),
      duration_minutes: trainDuration,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  return mockTrainData;
}

// 获取酒店数据 - 增强版本
async function getHotelData(params: any) {
  console.log('Fetching enhanced hotel data with params:', params);
  
  // 这里可以接入真实的酒店API，如：
  // - Booking.com API
  // - Expedia API
  // - 携程API
  // - Agoda API
  
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '西安', '南京'];
  const hotelTypes = ['国际大酒店', '商务酒店', '精品酒店', '度假酒店', '快捷酒店'];
  const amenitiesList = [
    ['免费WiFi', '停车场', '餐厅', '健身房', '游泳池', '商务中心'],
    ['免费WiFi', '停车场', '餐厅', '会议室'],
    ['免费WiFi', '餐厅', '咖啡厅', '精品SPA'],
    ['免费WiFi', '停车场', '游泳池', '儿童乐园', '海滩'],
    ['免费WiFi', '24小时前台', '自助洗衣']
  ];

  const mockHotelData = [];
  const hotelCount = params?.limit || 12;
  const targetCity = params?.location || cities[Math.floor(Math.random() * cities.length)];

  for (let i = 0; i < hotelCount; i++) {
    const hotelType = hotelTypes[Math.floor(Math.random() * hotelTypes.length)];
    const amenities = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
    
    mockHotelData.push({
      id: `hotel_${i}_${Date.now()}`,
      name: `${targetCity}${hotelType}`,
      address: `${targetCity}市${['中心区', '商务区', '新区', '老城区'][Math.floor(Math.random() * 4)]}`,
      city: targetCity,
      rating: (Math.random() * 2 + 3).toFixed(1),
      image_url: `https://images.unsplash.com/photo-${1566073771259 + Math.floor(Math.random() * 1000)}-${Math.random().toString(36)}?w=400`,
      amenities: amenities,
      standard_price: Math.floor(Math.random() * 400 + 200),
      deluxe_price: Math.floor(Math.random() * 600 + 400),
      suite_price: Math.floor(Math.random() * 1200 + 800),
      standard_available: Math.floor(Math.random() * 50 + 10),
      deluxe_available: Math.floor(Math.random() * 30 + 5),
      suite_available: Math.floor(Math.random() * 15 + 2),
      description: `位于${targetCity}${['市中心', '商务区', '风景区'][Math.floor(Math.random() * 3)]}，${['交通便利', '环境优美', '设施完善'][Math.floor(Math.random() * 3)]}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  return mockHotelData;
}

// 获取门票数据 - 增强版本
async function getTicketData(params: any) {
  console.log('Fetching enhanced ticket data with params:', params);
  
  // 这里可以接入真实的门票API，如：
  // - 美团API
  // - 大众点评API
  // - 携程门票API
  // - 去哪儿API
  
  const attractions = [
    { name: '故宫博物院', category: '文化景点', city: '北京', features: ['免排队', '含讲解器', '当日有效'] },
    { name: '天安门广场', category: '文化景点', city: '北京', features: ['免费参观', '全天开放'] },
    { name: '上海迪士尼乐园', category: '主题乐园', city: '上海', features: ['快速通道', '含园区接驳', '当日有效'] },
    { name: '东方明珠', category: '观光景点', city: '上海', features: ['360度观景', '含观光厅', '当日有效'] },
    { name: '西湖', category: '自然景观', city: '杭州', features: ['免费参观', '全天开放', '风景优美'] },
    { name: '广州塔', category: '观光景点', city: '广州', features: ['高空观景', '旋转餐厅', '当日有效'] },
    { name: '兵马俑', category: '文化景点', city: '西安', features: ['世界遗产', '含讲解', '当日有效'] },
    { name: '大熊猫基地', category: '自然景观', city: '成都', features: ['近距离观赏', '科普教育', '当日有效'] }
  ];

  const mockTicketData = [];
  const ticketCount = params?.limit || 8;

  for (let i = 0; i < ticketCount; i++) {
    const attraction = attractions[i % attractions.length];
    
    mockTicketData.push({
      id: `ticket_${i}_${Date.now()}`,
      name: attraction.name,
      category: attraction.category,
      location: `${attraction.city}市${['中心区', '风景区', '文化区'][Math.floor(Math.random() * 3)]}`,
      city: attraction.city,
      price: Math.floor(Math.random() * 300 + 30),
      available_quantity: Math.floor(Math.random() * 2000 + 100),
      open_time: ['08:00-18:00', '09:00-17:00', '全天开放'][Math.floor(Math.random() * 3)],
      image_url: `https://images.unsplash.com/photo-${1564760055775 + Math.floor(Math.random() * 1000)}-${Math.random().toString(36)}?w=400`,
      description: `${attraction.name}是${attraction.city}著名的${attraction.category}，${['历史悠久', '风景优美', '文化深厚', '设施完善'][Math.floor(Math.random() * 4)]}`,
      features: attraction.features,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  return mockTicketData;
}

// 将数据缓存到Supabase - 增强版本
async function cacheDataToSupabase(type: string, data: any[]) {
  try {
    console.log(`正在缓存 ${data.length} 条 ${type} 数据`);
    
    // 为避免重复数据，先清理最近24小时内的缓存
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { error: deleteError } = await supabase
      .from(type)
      .delete()
      .lt('created_at', oneDayAgo);
    
    if (deleteError && deleteError.code !== 'PGRST116') { // PGRST116是没有匹配行的错误，可以忽略
      console.warn(`清理旧缓存时出现警告:`, deleteError);
    }
    
    // 批量插入新数据
    const { error: insertError } = await supabase
      .from(type)
      .upsert(data, { onConflict: 'id' });
    
    if (insertError) {
      console.error(`缓存 ${type} 数据时出错:`, insertError);
    } else {
      console.log(`成功缓存 ${data.length} 条 ${type} 数据`);
    }
  } catch (error) {
    console.error(`缓存数据时发生异常:`, error);
  }
}
