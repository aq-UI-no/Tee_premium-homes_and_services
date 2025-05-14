export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  status: 'available' | 'maintenance' | 'booked';
  rating?: number;
  reviews?: number;
  isPlaceholder?: boolean;
}

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  property?: Property;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

export interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
  property_id: string;
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    name: string;
  };
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'safety' | 'accessibility' | 'luxury';
} 