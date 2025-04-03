export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          type: 'distributor' | 'manufacturer'
          verticals: string[]
          logo: string | null
          description: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          type: 'distributor' | 'manufacturer'
          verticals: string[]
          logo?: string | null
          description?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'distributor' | 'manufacturer'
          verticals?: string[]
          logo?: string | null
          description?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          group_number: string
          group_name: string
          manager: string
          name: string
          address: string
          address2: string | null
          city: string
          state: string
          zipcode: string
          phone: string
          fax: string
          region: string
          coordinates: [number, number] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          group_number: string
          group_name: string
          manager: string
          name: string
          address: string
          address2?: string | null
          city: string
          state: string
          zipcode: string
          phone: string
          fax: string
          region: string
          coordinates?: [number, number] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_number?: string
          group_name?: string
          manager?: string
          name?: string
          address?: string
          address2?: string | null
          city?: string
          state?: string
          zipcode?: string
          phone?: string
          fax?: string
          region?: string
          coordinates?: [number, number] | null
          created_at?: string
          updated_at?: string
        }
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
  }
}