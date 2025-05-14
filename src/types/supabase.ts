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
      properties: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          location: string
          price_per_night: number
          bedrooms: number
          bathrooms: number
          guests: number
          images: string[]
          amenities: string[]
          status: 'available' | 'maintenance' | 'booked'
          rating: number | null
          reviews: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          location: string
          price_per_night: number
          bedrooms: number
          bathrooms: number
          guests: number
          images: string[]
          amenities: string[]
          status?: 'available' | 'maintenance' | 'booked'
          rating?: number | null
          reviews?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          location?: string
          price_per_night?: number
          bedrooms?: number
          bathrooms?: number
          guests?: number
          images?: string[]
          amenities?: string[]
          status?: 'available' | 'maintenance' | 'booked'
          rating?: number | null
          reviews?: number | null
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          property_id: string
          user_id: string
          check_in: string
          check_out: string
          guests: number
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          user_id: string
          check_in: string
          check_out: string
          guests: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          user_id?: string
          check_in?: string
          check_out?: string
          guests?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          role: 'user' | 'admin'
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name?: string | null
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          role?: 'user' | 'admin'
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          property_id: string
          user_id: string
          rating: number
          comment: string
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          user_id: string
          rating: number
          comment: string
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          user_id?: string
          rating?: number
          comment?: string
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