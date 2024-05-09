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
      check_list: {
        Row: {
          created_at: string
          id: number
          items: Json[] | null
          uid: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          items?: Json[] | null
          uid?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          items?: Json[] | null
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "check_list_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      park_pass: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: number
          name: string | null
          uid: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: number
          name?: string | null
          uid?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: number
          name?: string | null
          uid?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "park_pass_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "park_pass_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          text: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          text?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      site_info: {
        Row: {
          arrival: string | null
          camp_ground_name: string | null
          camping_type: Database["public"]["Enums"]["camping_type"] | null
          can_purchase_fire_wood: boolean | null
          car_access: Database["public"]["Enums"]["car_access_type"] | null
          created_at: string
          departure: string | null
          fire_wood_price: number | null
          has_drinkable_water: boolean | null
          has_electric: boolean | null
          has_fire_pit: boolean | null
          has_sewer_service: boolean | null
          has_shower: boolean | null
          has_signal: boolean | null
          has_sink: boolean | null
          has_stores: boolean | null
          id: number
          is_fire_wood_unlimited: boolean | null
          is_waterfront: boolean | null
          location: string | null
          need_park_pass: boolean | null
          need_reservation: boolean | null
          note: string | null
          park_pass_name: string | null
          privacy: Database["public"]["Enums"]["privacy_type"] | null
          rating: number | null
          reservation_fee: number | null
          shower_cost: number | null
          site_fee: number | null
          site_number: number | null
          site_size: Database["public"]["Enums"]["site_size_type"] | null
          toilet: Database["public"]["Enums"]["toilet_type"] | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          arrival?: string | null
          camp_ground_name?: string | null
          camping_type?: Database["public"]["Enums"]["camping_type"] | null
          can_purchase_fire_wood?: boolean | null
          car_access?: Database["public"]["Enums"]["car_access_type"] | null
          created_at?: string
          departure?: string | null
          fire_wood_price?: number | null
          has_drinkable_water?: boolean | null
          has_electric?: boolean | null
          has_fire_pit?: boolean | null
          has_sewer_service?: boolean | null
          has_shower?: boolean | null
          has_signal?: boolean | null
          has_sink?: boolean | null
          has_stores?: boolean | null
          id?: number
          is_fire_wood_unlimited?: boolean | null
          is_waterfront?: boolean | null
          location?: string | null
          need_park_pass?: boolean | null
          need_reservation?: boolean | null
          note?: string | null
          park_pass_name?: string | null
          privacy?: Database["public"]["Enums"]["privacy_type"] | null
          rating?: number | null
          reservation_fee?: number | null
          shower_cost?: number | null
          site_fee?: number | null
          site_number?: number | null
          site_size?: Database["public"]["Enums"]["site_size_type"] | null
          toilet?: Database["public"]["Enums"]["toilet_type"] | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          arrival?: string | null
          camp_ground_name?: string | null
          camping_type?: Database["public"]["Enums"]["camping_type"] | null
          can_purchase_fire_wood?: boolean | null
          car_access?: Database["public"]["Enums"]["car_access_type"] | null
          created_at?: string
          departure?: string | null
          fire_wood_price?: number | null
          has_drinkable_water?: boolean | null
          has_electric?: boolean | null
          has_fire_pit?: boolean | null
          has_sewer_service?: boolean | null
          has_shower?: boolean | null
          has_signal?: boolean | null
          has_sink?: boolean | null
          has_stores?: boolean | null
          id?: number
          is_fire_wood_unlimited?: boolean | null
          is_waterfront?: boolean | null
          location?: string | null
          need_park_pass?: boolean | null
          need_reservation?: boolean | null
          note?: string | null
          park_pass_name?: string | null
          privacy?: Database["public"]["Enums"]["privacy_type"] | null
          rating?: number | null
          reservation_fee?: number | null
          shower_cost?: number | null
          site_fee?: number | null
          site_number?: number | null
          site_size?: Database["public"]["Enums"]["site_size_type"] | null
          toilet?: Database["public"]["Enums"]["toilet_type"] | null
          uid?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_info_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      test: {
        Row: {
          created_at: string
          id: string
          text: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          text?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          text?: string | null
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
      camping_type: "FRONT" | "BACK" | "GLAMPING" | "CROWN"
      car_access_type: "ON_SITE" | "ON_SITE_THROUGH" | "PARKING_LOT"
      privacy_type: "POOR" | "BAD" | "AVERAGE" | "GOOD" | "GREAT"
      site_size_type: "SMALL" | "MEDIUM" | "LARGE"
      toilet_type: "FLUSH" | "VAULT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
