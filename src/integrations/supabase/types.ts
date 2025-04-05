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
      analysis_results: {
        Row: {
          checklist: Json | null
          company_profile_id: string | null
          eligibility_score: number | null
          id: string
          rfp_id: string
          risk_flags: Json | null
          timestamp: string | null
          verdict: string | null
        }
        Insert: {
          checklist?: Json | null
          company_profile_id?: string | null
          eligibility_score?: number | null
          id?: string
          rfp_id: string
          risk_flags?: Json | null
          timestamp?: string | null
          verdict?: string | null
        }
        Update: {
          checklist?: Json | null
          company_profile_id?: string | null
          eligibility_score?: number | null
          id?: string
          rfp_id?: string
          risk_flags?: Json | null
          timestamp?: string | null
          verdict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_results_rfp_id_fkey"
            columns: ["rfp_id"]
            isOneToOne: false
            referencedRelation: "rfps"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          created_at: string | null
          id: string
          openai_key_provided: boolean | null
          updated_at: string | null
          use_faiss: boolean | null
          use_supabase: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          openai_key_provided?: boolean | null
          updated_at?: string | null
          use_faiss?: boolean | null
          use_supabase?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          openai_key_provided?: boolean | null
          updated_at?: string | null
          use_faiss?: boolean | null
          use_supabase?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          capabilities: Json | null
          certifications: Json | null
          compliance_status: Json | null
          created_at: string | null
          id: string
          locations: Json | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          capabilities?: Json | null
          certifications?: Json | null
          compliance_status?: Json | null
          created_at?: string | null
          id?: string
          locations?: Json | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          capabilities?: Json | null
          certifications?: Json | null
          compliance_status?: Json | null
          created_at?: string | null
          id?: string
          locations?: Json | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      qa_logs: {
        Row: {
          document_source: string | null
          id: string
          query: string
          response: string
          rfp_id: string
          sources: Json | null
          timestamp: string | null
          vector_used: boolean | null
        }
        Insert: {
          document_source?: string | null
          id?: string
          query: string
          response: string
          rfp_id: string
          sources?: Json | null
          timestamp?: string | null
          vector_used?: boolean | null
        }
        Update: {
          document_source?: string | null
          id?: string
          query?: string
          response?: string
          rfp_id?: string
          sources?: Json | null
          timestamp?: string | null
          vector_used?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "qa_logs_rfp_id_fkey"
            columns: ["rfp_id"]
            isOneToOne: false
            referencedRelation: "rfps"
            referencedColumns: ["id"]
          },
        ]
      }
      rfps: {
        Row: {
          agency: string | null
          content: string | null
          created_at: string | null
          faiss_id: string | null
          file_path: string | null
          file_type: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agency?: string | null
          content?: string | null
          created_at?: string | null
          faiss_id?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agency?: string | null
          content?: string | null
          created_at?: string | null
          faiss_id?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
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
