
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Flight = Database['public']['Tables']['flights']['Row'];
type Train = Database['public']['Tables']['trains']['Row'];
type Hotel = Database['public']['Tables']['hotels']['Row'];
type Ticket = Database['public']['Tables']['tickets']['Row'];

export const travelDataService = {
  // 航班相关API
  async getFlights(searchParams?: {
    from?: string;
    to?: string;
    date?: string;
  }) {
    try {
      let query = supabase
        .from('flights')
        .select('*')
        .order('departure_time', { ascending: true });

      if (searchParams?.from) {
        query = query.ilike('departure_airport', `%${searchParams.from}%`);
      }
      if (searchParams?.to) {
        query = query.ilike('arrival_airport', `%${searchParams.to}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取航班数据失败:', error);
      return [];
    }
  },

  // 火车相关API
  async getTrains(searchParams?: {
    from?: string;
    to?: string;
    date?: string;
  }) {
    try {
      let query = supabase
        .from('trains')
        .select('*')
        .order('departure_time', { ascending: true });

      if (searchParams?.from) {
        query = query.ilike('departure_station', `%${searchParams.from}%`);
      }
      if (searchParams?.to) {
        query = query.ilike('arrival_station', `%${searchParams.to}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取火车数据失败:', error);
      return [];
    }
  },

  // 酒店相关API
  async getHotels(searchParams?: {
    location?: string;
    checkin?: string;
    checkout?: string;
  }) {
    try {
      let query = supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false });

      if (searchParams?.location) {
        query = query.or(`city.ilike.%${searchParams.location}%,name.ilike.%${searchParams.location}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取酒店数据失败:', error);
      return [];
    }
  },

  // 门票相关API
  async getTickets(searchParams?: {
    location?: string;
    category?: string;
    date?: string;
  }) {
    try {
      let query = supabase
        .from('tickets')
        .select('*')
        .order('price', { ascending: true });

      if (searchParams?.location) {
        query = query.or(`city.ilike.%${searchParams.location}%,name.ilike.%${searchParams.location}%`);
      }
      if (searchParams?.category) {
        query = query.eq('category', searchParams.category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取门票数据失败:', error);
      return [];
    }
  },

  // 记录搜索日志
  async logSearch(searchType: string, searchParams: any, userId?: string) {
    try {
      const { error } = await supabase
        .from('search_logs')
        .insert({
          search_type: searchType,
          search_params: searchParams,
          user_id: userId || null
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('记录搜索日志失败:', error);
    }
  },

  // 创建订单
  async createOrder(orderData: {
    order_type: string;
    item_id: string;
    quantity?: number;
    total_price: number;
    booking_details?: any;
    user_id?: string;
  }) {
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
  }
};

export type { Flight, Train, Hotel, Ticket };
