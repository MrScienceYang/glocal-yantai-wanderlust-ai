
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 初始化Supabase客户端
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  console.log('Travel API function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, params } = await req.json();
    console.log('Request type:', type, 'Params:', params);

    let data;
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

    // 将数据存储到Supabase中进行缓存
    await cacheDataToSupabase(type, data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in travel-api function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// 获取航班数据 - 使用Amadeus API
async function getFlightData(params: any) {
  console.log('Fetching flight data with params:', params);
  
  // 模拟API调用 - 在实际应用中这里会调用真实的航班API
  // 例如：Amadeus Flight Offers Search API
  const mockFlightData = [
    {
      flight_number: 'CA' + Math.floor(Math.random() * 9000 + 1000),
      airline: ['中国国航', '东方航空', '南方航空', '海南航空'][Math.floor(Math.random() * 4)],
      departure_airport: params.from || '北京首都机场',
      arrival_airport: params.to || '上海浦东机场',
      departure_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      arrival_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      price: Math.floor(Math.random() * 1000 + 500),
      available_seats: Math.floor(Math.random() * 200 + 10),
      class_type: 'economy',
      duration_minutes: Math.floor(Math.random() * 300 + 120)
    },
    {
      flight_number: 'MU' + Math.floor(Math.random() * 9000 + 1000),
      airline: '东方航空',
      departure_airport: params.from || '北京首都机场',
      arrival_airport: params.to || '上海浦东机场',
      departure_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      arrival_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      price: Math.floor(Math.random() * 1000 + 600),
      available_seats: Math.floor(Math.random() * 150 + 5),
      class_type: 'economy',
      duration_minutes: Math.floor(Math.random() * 300 + 120)
    }
  ];

  return mockFlightData;
}

// 获取火车票数据 - 使用12306或第三方API
async function getTrainData(params: any) {
  console.log('Fetching train data with params:', params);
  
  const mockTrainData = [
    {
      train_number: 'G' + Math.floor(Math.random() * 900 + 100),
      train_type: '高速动车',
      departure_station: params.from || '北京南',
      arrival_station: params.to || '上海虹桥',
      departure_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      arrival_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
      business_class_price: Math.floor(Math.random() * 1000 + 1500),
      first_class_price: Math.floor(Math.random() * 500 + 800),
      second_class_price: Math.floor(Math.random() * 300 + 400),
      business_class_seats: Math.floor(Math.random() * 20 + 5),
      first_class_seats: Math.floor(Math.random() * 80 + 20),
      second_class_seats: Math.floor(Math.random() * 300 + 100),
      duration_minutes: Math.floor(Math.random() * 120 + 240)
    }
  ];

  return mockTrainData;
}

// 获取酒店数据 - 使用Booking.com API或携程API
async function getHotelData(params: any) {
  console.log('Fetching hotel data with params:', params);
  
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都'];
  const city = params.location || cities[Math.floor(Math.random() * cities.length)];
  
  const mockHotelData = [
    {
      name: `${city}国际大酒店`,
      address: `${city}市中心商业区`,
      city: city,
      rating: (Math.random() * 2 + 3).toFixed(1),
      image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      amenities: ['免费WiFi', '停车场', '餐厅', '健身房', '游泳池'],
      standard_price: Math.floor(Math.random() * 300 + 200),
      deluxe_price: Math.floor(Math.random() * 400 + 350),
      suite_price: Math.floor(Math.random() * 800 + 600),
      standard_available: Math.floor(Math.random() * 30 + 10),
      deluxe_available: Math.floor(Math.random() * 20 + 5),
      suite_available: Math.floor(Math.random() * 10 + 2),
      description: `位于${city}市中心，交通便利，设施完善`
    },
    {
      name: `${city}商务酒店`,
      address: `${city}市商务区`,
      city: city,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      amenities: ['免费WiFi', '商务中心', '会议室', '接送服务'],
      standard_price: Math.floor(Math.random() * 200 + 150),
      deluxe_price: Math.floor(Math.random() * 300 + 250),
      suite_price: Math.floor(Math.random() * 600 + 400),
      standard_available: Math.floor(Math.random() * 25 + 5),
      deluxe_available: Math.floor(Math.random() * 15 + 3),
      suite_available: Math.floor(Math.random() * 8 + 1),
      description: `专为商务人士设计的现代化酒店`
    }
  ];

  return mockHotelData;
}

// 获取门票数据 - 使用美团、大众点评或景区官方API
async function getTicketData(params: any) {
  console.log('Fetching ticket data with params:', params);
  
  const attractions = [
    {
      name: '故宫博物院',
      category: '文化景点',
      city: '北京',
      location: '北京市东城区',
      image_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
      features: ['免排队', '含讲解器', '当日有效']
    },
    {
      name: '上海迪士尼乐园',
      category: '主题乐园',
      city: '上海',
      location: '上海市浦东新区',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      features: ['快速通道', '含园区接驳', '当日有效']
    },
    {
      name: '西湖风景区',
      category: '自然景观',
      city: '杭州',
      location: '杭州市西湖区',
      image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
      features: ['免费参观', '全天开放', '风景优美']
    }
  ];

  const mockTicketData = attractions.map(attraction => ({
    ...attraction,
    price: Math.floor(Math.random() * 200 + 50),
    available_quantity: Math.floor(Math.random() * 1000 + 100),
    open_time: '08:00-18:00',
    description: `${attraction.name}是著名的${attraction.category}，值得一游`
  }));

  return mockTicketData;
}

// 将数据缓存到Supabase
async function cacheDataToSupabase(type: string, data: any[]) {
  try {
    // 清除旧数据（可选，根据需要决定是否保留历史数据）
    // await supabase.from(type).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // 插入新数据
    const { error } = await supabase.from(type).upsert(data);
    if (error) {
      console.error(`Error caching ${type} data:`, error);
    } else {
      console.log(`Successfully cached ${data.length} ${type} records`);
    }
  } catch (error) {
    console.error(`Error in cacheDataToSupabase for ${type}:`, error);
  }
}
