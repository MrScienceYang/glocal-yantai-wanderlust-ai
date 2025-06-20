export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      flights: {
        Row: {
          airline: string
          arrival_airport: string
          arrival_time: string
          available_seats: number
          class_type: string
          created_at: string
          departure_airport: string
          departure_time: string
          duration_minutes: number
          flight_number: string
          id: string
          price: number
          updated_at: string
        }
        Insert: {
          airline: string
          arrival_airport: string
          arrival_time: string
          available_seats: number
          class_type?: string
          created_at?: string
          departure_airport: string
          departure_time: string
          duration_minutes: number
          flight_number: string
          id?: string
          price: number
          updated_at?: string
        }
        Update: {
          airline?: string
          arrival_airport?: string
          arrival_time?: string
          available_seats?: number
          class_type?: string
          created_at?: string
          departure_airport?: string
          departure_time?: string
          duration_minutes?: number
          flight_number?: string
          id?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          address: string
          amenities: string[] | null
          city: string
          created_at: string
          deluxe_available: number | null
          deluxe_price: number | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          rating: number | null
          standard_available: number | null
          standard_price: number | null
          suite_available: number | null
          suite_price: number | null
          updated_at: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          city: string
          created_at?: string
          deluxe_available?: number | null
          deluxe_price?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          rating?: number | null
          standard_available?: number | null
          standard_price?: number | null
          suite_available?: number | null
          suite_price?: number | null
          updated_at?: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          city?: string
          created_at?: string
          deluxe_available?: number | null
          deluxe_price?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          rating?: number | null
          standard_available?: number | null
          standard_price?: number | null
          suite_available?: number | null
          suite_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          booking_details: Json | null
          created_at: string
          id: string
          item_id: string
          order_type: string
          quantity: number | null
          status: string
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_details?: Json | null
          created_at?: string
          id?: string
          item_id: string
          order_type: string
          quantity?: number | null
          status?: string
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_details?: Json | null
          created_at?: string
          id?: string
          item_id?: string
          order_type?: string
          quantity?: number | null
          status?: string
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      search_logs: {
        Row: {
          created_at: string
          id: string
          search_params: Json
          search_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          search_params: Json
          search_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          search_params?: Json
          search_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          available_quantity: number
          category: string
          city: string
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          image_url: string | null
          location: string
          name: string
          open_time: string | null
          price: number
          updated_at: string
        }
        Insert: {
          available_quantity: number
          category: string
          city: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          open_time?: string | null
          price: number
          updated_at?: string
        }
        Update: {
          available_quantity?: number
          category?: string
          city?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          open_time?: string | null
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      trains: {
        Row: {
          arrival_station: string
          arrival_time: string
          business_class_price: number | null
          business_class_seats: number | null
          created_at: string
          departure_station: string
          departure_time: string
          duration_minutes: number
          first_class_price: number | null
          first_class_seats: number | null
          id: string
          second_class_price: number | null
          second_class_seats: number | null
          train_number: string
          train_type: string
          updated_at: string
        }
        Insert: {
          arrival_station: string
          arrival_time: string
          business_class_price?: number | null
          business_class_seats?: number | null
          created_at?: string
          departure_station: string
          departure_time: string
          duration_minutes: number
          first_class_price?: number | null
          first_class_seats?: number | null
          id?: string
          second_class_price?: number | null
          second_class_seats?: number | null
          train_number: string
          train_type: string
          updated_at?: string
        }
        Update: {
          arrival_station?: string
          arrival_time?: string
          business_class_price?: number | null
          business_class_seats?: number | null
          created_at?: string
          departure_station?: string
          departure_time?: string
          duration_minutes?: number
          first_class_price?: number | null
          first_class_seats?: number | null
          id?: string
          second_class_price?: number | null
          second_class_seats?: number | null
          train_number?: string
          train_type?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
