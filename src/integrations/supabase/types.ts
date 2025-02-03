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
      ai_generations: {
        Row: {
          created_at: string | null
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          space_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          space_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          space_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_intents: {
        Row: {
          created_at: string | null
          id: string
          session_id: string | null
          space_id: string | null
          status: string
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string | null
          webhook_secret: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_id?: string | null
          space_id?: string | null
          status: string
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_secret?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string | null
          space_id?: string | null
          status?: string
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_secret?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_intents_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          created_at: string | null
          currency: string
          id: string
          is_default: boolean
          price: number
          rate_type: string
          space_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          id?: string
          is_default?: boolean
          price: number
          rate_type: string
          space_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          id?: string
          is_default?: boolean
          price?: number
          rate_type?: string
          space_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_plans_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          details: string
          id: string
          reason: string
          reporter_id: string | null
          space_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          details: string
          id?: string
          reason: string
          reporter_id?: string | null
          space_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string
          id?: string
          reason?: string
          reporter_id?: string | null
          space_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          address: string
          city: string
          contact_email: string | null
          contact_phone: string | null
          contact_website: string | null
          country: string
          created_at: string | null
          currency: string
          description: string
          id: string
          images: string[] | null
          is_featured: boolean | null
          lat: number
          lng: number
          owner_id: string
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          country?: string
          created_at?: string | null
          currency?: string
          description: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          lat: number
          lng: number
          owner_id: string
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          country?: string
          created_at?: string | null
          currency?: string
          description?: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          lat?: number
          lng?: number
          owner_id?: string
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_webhook_events: {
        Row: {
          created_at: string | null
          data: Json
          event_type: string
          id: string
          processed_at: string | null
          stripe_event_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          event_type: string
          id?: string
          processed_at?: string | null
          stripe_event_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          event_type?: string
          id?: string
          processed_at?: string | null
          stripe_event_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_space_rating: {
        Args: {
          space_id: string
        }
        Returns: number
      }
      can_review_space: {
        Args: {
          space_id: string
          profile_id: string
        }
        Returns: boolean
      }
      check_booking_availability: {
        Args: {
          p_space_id: string
          p_check_in: string
          p_check_out: string
        }
        Returns: boolean
      }
      get_viewing_request_details: {
        Args: {
          request_id: string
        }
        Returns: {
          id: string
          space_id: string
          user_id: string
          preferred_date: string
          guests: number
          message: string
          status: string
          created_at: string
          space_title: string
          space_images: string[]
          space_owner_id: string
        }[]
      }
      owns_space: {
        Args: {
          space_id: string
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
