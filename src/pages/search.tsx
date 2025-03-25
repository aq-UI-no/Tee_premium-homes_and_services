import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '../components/ui/button';
import { 
  Bed, Bath, MapPin, Star, 
  SlidersHorizontal, ArrowUpDown 
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  rating: number;
  reviews_count: number;
}

interface FilterState {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[];
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating'>('rating');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    bedrooms: null,
    bathrooms: null,
    amenities: [],
  });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const location = searchParams.get('location');
        const guests = searchParams.get('guests');

        let query = supabase
          .from('properties')
          .select(`
            *,
            reviews (count)
          `);

        // Apply filters
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }

        if (guests) {
          query = query.gte('max_guests', parseInt(guests));
        }

        if (filters.bedrooms) {
          query = query.gte('bedrooms', filters.bedrooms);
        }

        if (filters.bathrooms) {
          query = query.gte('bathrooms', filters.bathrooms);
        }

        // Apply sorting
        switch (sortBy) {
          case 'price_asc':
            query = query.order('price_per_night', { ascending: true });
            break;
          case 'price_desc':
            query = query.order('price_per_night', { ascending: false });
            break;
          case 'rating':
            query = query.order('rating', { ascending: false });
            break;
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProperties(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchParams, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {properties.length} properties found
          {searchParams.get('location') && ` in ${searchParams.get('location')}`}
        </h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </Button>
          <select
            className="border rounded-lg px-4 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <option value="rating">Top Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange({
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                  })}
                  className="w-full rounded-lg border-gray-300"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange({
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="w-full rounded-lg border-gray-300"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => handleFilterChange({
                  bedrooms: e.target.value ? parseInt(e.target.value) : null
                })}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}+ bedrooms</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                value={filters.bathrooms || ''}
                onChange={(e) => handleFilterChange({
                  bathrooms: e.target.value ? parseInt(e.target.value) : null
                })}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}+ bathrooms</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow text-sm font-semibold">
                ${property.price_per_night}/night
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold truncate">{property.title}</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-medium">{property.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="truncate">{property.location}</span>
              </div>
              <div className="flex gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && !loading && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No properties found</h2>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
} 