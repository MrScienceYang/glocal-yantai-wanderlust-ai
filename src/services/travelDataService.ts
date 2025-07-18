
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Flight = Database['public']['Tables']['flights']['Row'];
type Train = Database['public']['Tables']['trains']['Row'];
type Hotel = Database['public']['Tables']['hotels']['Row'];
type Ticket = Database['public']['Tables']['tickets']['Row'];

interface SearchParams {
  [key: string]: any;
  limit?: number;
}

interface ApiResponse {
  data: any[];
  source: 'api' | 'cache' | 'fallback';
  cached: boolean;
}

export const travelDataService = {
  // 统一的数据获取方法
  async fetchData(type: string, searchParams?: SearchParams): Promise<ApiResponse> {
    try {
      console.log(`正在获取${type}数据，参数:`, searchParams);
      
      // 首先尝试从实时API获取数据
      const { data: apiResponse, error: apiError } = await supabase.functions.invoke('travel-api', {
        body: { 
          type, 
          params: { 
            ...searchParams,
            limit: 20 // 默认获取20条数据
          }
        }
      });

      if (apiResponse?.success && apiResponse.data?.length > 0) {
        console.log(`使用实时${type}数据:`, apiResponse.data.length, '条记录');
        return {
          data: apiResponse.data,
          source: 'api',
          cached: apiResponse.cached || false
        };
      }

      // 如果API调用失败，使用数据库中的缓存数据
      console.log(`API调用失败，使用${type}缓存数据`);
      const fallbackData = await this.getCachedData(type, searchParams);
      
      return {
        data: fallbackData,
        source: 'cache',
        cached: true
      };
    } catch (error) {
      console.error(`获取${type}数据失败:`, error);
      
      // 最后尝试缓存数据
      const fallbackData = await this.getCachedData(type, searchParams);
      return {
        data: fallbackData,
        source: 'fallback',
        cached: true
      };
    }
  },

  // 从缓存获取数据 - 进一步简化类型处理
  async getCachedData(type: string, searchParams?: SearchParams): Promise<any[]> {
    try {
      // 分别处理每种类型，避免复杂的泛型推断
      if (type === 'flights') {
        return await this.getFlightCache(searchParams);
      } else if (type === 'trains') {
        return await this.getTrainCache(searchParams);
      } else if (type === 'hotels') {
        return await this.getHotelCache(searchParams);
      } else if (type === 'tickets') {
        return await this.getTicketCache(searchParams);
      }
      
      return [];
    } catch (error) {
      console.error(`获取缓存${type}数据异常:`, error);
      return [];
    }
  },

  // 专门的缓存获取方法
  async getFlightCache(searchParams?: SearchParams): Promise<any[]> {
    let query = supabase.from('flights').select('*').limit(20).order('departure_time', { ascending: true });
    
    if (searchParams?.from) {
      query = query.ilike('departure_airport', `%${searchParams.from}%`);
    }
    if (searchParams?.to) {
      query = query.ilike('arrival_airport', `%${searchParams.to}%`);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('获取航班缓存数据失败:', error);
      return [];
    }
    return data || [];
  },

  async getTrainCache(searchParams?: SearchParams): Promise<any[]> {
    let query = supabase.from('trains').select('*').limit(20).order('departure_time', { ascending: true });
    
    if (searchParams?.from) {
      query = query.ilike('departure_station', `%${searchParams.from}%`);
    }
    if (searchParams?.to) {
      query = query.ilike('arrival_station', `%${searchParams.to}%`);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('获取火车缓存数据失败:', error);
      return [];
    }
    return data || [];
  },

  async getHotelCache(searchParams?: SearchParams): Promise<any[]> {
    let query = supabase.from('hotels').select('*').limit(20).order('rating', { ascending: false });
    
    if (searchParams?.location) {
      query = query.or(`city.ilike.%${searchParams.location}%,name.ilike.%${searchParams.location}%`);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('获取酒店缓存数据失败:', error);
      return [];
    }
    return data || [];
  },

  async getTicketCache(searchParams?: SearchParams): Promise<any[]> {
    let query = supabase.from('tickets').select('*').limit(20).order('price', { ascending: true });
    
    if (searchParams?.location) {
      query = query.or(`city.ilike.%${searchParams.location}%,name.ilike.%${searchParams.location}%`);
    }
    if (searchParams?.category) {
      query = query.eq('category', searchParams.category);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('获取门票缓存数据失败:', error);
      return [];
    }
    return data || [];
  },

  // 航班相关API
  async getFlights(searchParams?: {
    from?: string;
    to?: string;
    date?: string;
  }): Promise<Flight[]> {
    const result = await this.fetchData('flights', searchParams);
    return result.data as Flight[];
  },

  // 火车相关API
  async getTrains(searchParams?: {
    from?: string;
    to?: string;
    date?: string;
  }): Promise<Train[]> {
    const result = await this.fetchData('trains', searchParams);
    return result.data as Train[];
  },

  // 酒店相关API
  async getHotels(searchParams?: {
    location?: string;
    checkin?: string;
    checkout?: string;
  }): Promise<Hotel[]> {
    const result = await this.fetchData('hotels', searchParams);
    return result.data as Hotel[];
  },

  // 门票相关API
  async getTickets(searchParams?: {
    location?: string;
    category?: string;
    date?: string;
  }): Promise<Ticket[]> {
    const result = await this.fetchData('tickets', searchParams);
    return result.data as Ticket[];
  },

  // 强制刷新数据（手动触发API调用）
  async refreshData(type: string, searchParams?: SearchParams): Promise<any[]> {
    try {
      console.log(`强制刷新${type}数据`);
      const { data: apiResponse, error } = await supabase.functions.invoke('travel-api', {
        body: { 
          type, 
          params: { 
            ...searchParams,
            limit: 20,
            forceRefresh: true
          }
        }
      });

      if (error) throw error;
      return apiResponse?.data || [];
    } catch (error) {
      console.error(`刷新${type}数据失败:`, error);
      throw error;
    }
  },

  // 记录搜索日志 - 简化类型处理
  async logSearch(searchType: string, searchParams: any, userId?: string): Promise<void> {
    try {
      // 直接使用简单的插入操作，避免复杂的类型推断
      const insertData = {
        search_type: searchType,
        search_params: searchParams,
        user_id: userId || null
      };
      
      const { error } = await supabase
        .from('search_logs')
        .insert(insertData);
      
      if (error) throw error;
    } catch (error) {
      console.error('记录搜索日志失败:', error);
    }
  },

  // 创建订单 - 简化类型处理
  async createOrder(orderData: {
    order_type: string;
    item_id: string;
    quantity?: number;
    total_price: number;
    booking_details?: any;
    user_id?: string;
  }): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('创建订单失败:', error);
      throw error;
    }
  },

  // 批量获取所有数据（用于首页展示）
  async getAllTravelData(): Promise<{
    flights: Flight[];
    trains: Train[];
    hotels: Hotel[];
    tickets: Ticket[];
  }> {
    try {
      console.log('批量获取所有旅行数据');
      
      const [flightsResult, trainsResult, hotelsResult, ticketsResult] = await Promise.allSettled([
        this.fetchData('flights', { limit: 6 }),
        this.fetchData('trains', { limit: 6 }),
        this.fetchData('hotels', { limit: 6 }),
        this.fetchData('tickets', { limit: 6 })
      ]);

      return {
        flights: flightsResult.status === 'fulfilled' ? flightsResult.value.data as Flight[] : [],
        trains: trainsResult.status === 'fulfilled' ? trainsResult.value.data as Train[] : [],
        hotels: hotelsResult.status === 'fulfilled' ? hotelsResult.value.data as Hotel[] : [],
        tickets: ticketsResult.status === 'fulfilled' ? ticketsResult.value.data as Ticket[] : []
      };
    } catch (error) {
      console.error('批量获取旅行数据失败:', error);
      return {
        flights: [],
        trains: [],
        hotels: [],
        tickets: []
      };
    }
  }
};

export type { Flight, Train, Hotel, Ticket };
