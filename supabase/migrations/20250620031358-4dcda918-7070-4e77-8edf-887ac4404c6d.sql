
-- 删除之前可能创建的表（如果存在）
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.search_logs;
DROP TABLE IF EXISTS public.tickets;
DROP TABLE IF EXISTS public.hotels; 
DROP TABLE IF EXISTS public.trains;
DROP TABLE IF EXISTS public.flights;

-- 创建航班数据表
CREATE TABLE public.flights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_number TEXT NOT NULL,
  airline TEXT NOT NULL,
  departure_airport TEXT NOT NULL,
  arrival_airport TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_seats INTEGER NOT NULL,
  class_type TEXT NOT NULL DEFAULT 'economy',
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建火车票数据表
CREATE TABLE public.trains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  train_number TEXT NOT NULL,
  train_type TEXT NOT NULL,
  departure_station TEXT NOT NULL,
  arrival_station TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  business_class_price DECIMAL(10,2),
  first_class_price DECIMAL(10,2),
  second_class_price DECIMAL(10,2),
  business_class_seats INTEGER DEFAULT 0,
  first_class_seats INTEGER DEFAULT 0,
  second_class_seats INTEGER DEFAULT 0,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建酒店数据表
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  rating DECIMAL(2,1),
  image_url TEXT,
  amenities TEXT[],
  standard_price DECIMAL(10,2),
  deluxe_price DECIMAL(10,2),
  suite_price DECIMAL(10,2),
  standard_available INTEGER DEFAULT 0,
  deluxe_available INTEGER DEFAULT 0,
  suite_available INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建门票数据表
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_quantity INTEGER NOT NULL,
  open_time TEXT,
  image_url TEXT,
  description TEXT,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建搜索日志表
CREATE TABLE public.search_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_type TEXT NOT NULL,
  search_params JSONB NOT NULL,
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建订单表
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  order_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  booking_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用行级安全
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- 创建搜索日志的RLS策略
CREATE POLICY "Users can view their own search logs" 
  ON public.search_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own search logs" 
  ON public.search_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 创建订单的RLS策略
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
  ON public.orders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- 公共表的策略（所有用户都可以查看）
CREATE POLICY "Anyone can view flights" ON public.flights FOR SELECT USING (true);
CREATE POLICY "Anyone can view trains" ON public.trains FOR SELECT USING (true);
CREATE POLICY "Anyone can view hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Anyone can view tickets" ON public.tickets FOR SELECT USING (true);

-- 插入航班数据
INSERT INTO public.flights (flight_number, airline, departure_airport, arrival_airport, departure_time, arrival_time, price, available_seats, duration_minutes) VALUES
('CA1234', '中国国航', '北京首都机场', '上海浦东机场', '2024-12-21 08:30:00+08', '2024-12-21 11:20:00+08', 680, 23, 170),
('MU5678', '东方航空', '北京首都机场', '上海浦东机场', '2024-12-21 14:15:00+08', '2024-12-21 17:05:00+08', 720, 8, 170),
('CZ9012', '南方航空', '北京首都机场', '上海浦东机场', '2024-12-21 19:40:00+08', '2024-12-21 22:30:00+08', 650, 156, 170);

-- 插入火车数据
INSERT INTO public.trains (train_number, train_type, departure_station, arrival_station, departure_time, arrival_time, business_class_price, first_class_price, second_class_price, business_class_seats, first_class_seats, second_class_seats, duration_minutes) VALUES
('G123', '高速动车', '北京南', '上海虹桥', '2024-12-21 08:00:00+08', '2024-12-21 12:30:00+08', 1748, 933, 553, 12, 45, 218, 270),
('G456', '高速动车', '北京南', '上海虹桥', '2024-12-21 14:20:00+08', '2024-12-21 18:50:00+08', 1748, 933, 553, 3, 67, 156, 270);

-- 插入酒店数据
INSERT INTO public.hotels (name, address, city, rating, standard_price, deluxe_price, suite_price, standard_available, deluxe_available, suite_available, description, amenities) VALUES
('上海外滩茂悦大酒店', '上海市黄浦区中山东一路', '上海', 4.8, 680, 880, 1280, 12, 8, 3, '位于外滩核心区域，享有黄浦江美景', ARRAY['免费WiFi', '停车场', '餐厅', '健身房']),
('北京王府井希尔顿酒店', '北京市东城区王府井大街', '北京', 4.7, 720, 920, 1580, 25, 15, 6, '地处王府井商业区核心，交通便利', ARRAY['免费WiFi', '停车场', '餐厅', '商务中心']);

-- 插入门票数据
INSERT INTO public.tickets (name, category, location, city, price, available_quantity, open_time, description, features) VALUES
('故宫博物院', '文化景点', '北京市东城区', '北京', 60, 500, '08:30-17:00', '明清两代的皇家宫殿，世界文化遗产', ARRAY['免排队', '含讲解器', '当日有效']),
('上海迪士尼乐园', '主题乐园', '上海市浦东新区', '上海', 399, 1200, '09:00-22:00', '中国内地首座迪士尼主题乐园', ARRAY['快速通道', '含园区接驳', '当日有效']),
('《狮子王》音乐剧', '演出', '上海大剧院', '上海', 280, 45, '19:30-21:30', '百老汇经典音乐剧中文版', ARRAY['VIP座位', '含节目单', '指定场次']);
