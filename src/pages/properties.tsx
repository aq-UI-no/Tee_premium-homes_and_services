import React, { useState } from 'react';
import { MapPin, BedDouble, Bath, Users, Search, SlidersHorizontal } from 'lucide-react';

// Placeholder property data
const PLACEHOLDER_PROPERTIES = [
  {
    id: '1',
    title: 'Luxury Beach Villa',
    location: 'Malibu, California',
    price: 1200,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    title: 'Modern Downtown Penthouse',
    location: 'New York City, NY',
    price: 800,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 98
  },
  {
    id: '3',
    title: 'Mountain View Cabin',
    location: 'Aspen, Colorado',
    price: 600,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 76
  },
  {
    id: '4',
    title: 'Oceanfront Paradise',
    location: 'Miami Beach, FL',
    price: 1500,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 150
  },
  {
    id: '5',
    title: 'Cozy Lake House',
    location: 'Lake Tahoe, CA',
    price: 450,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1475087542963-13ab5e611954?auto=format&fit=crop&q=80',
    rating: 4.6,
    reviews: 65
  },
  {
    id: '6',
    title: 'Historic Downtown Loft',
    location: 'Chicago, IL',
    price: 350,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 89
  }
];

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    guests: ''
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">
            Find Your Perfect Premium Property
          </h1>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.minPrice}
                  onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max Price"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.maxPrice}
                  onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                />
              </div>
              <div className="relative">
                <BedDouble className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.bedrooms}
                  onChange={(e) => setSearchParams({ ...searchParams, bedrooms: e.target.value })}
                >
                  <option value="">Bedrooms</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}+ Beds</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Bath className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.bathrooms}
                  onChange={(e) => setSearchParams({ ...searchParams, bathrooms: e.target.value })}
                >
                  <option value="">Bathrooms</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}+ Baths</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                >
                  <option value="">Guests</option>
                  {[2, 4, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>{num}+ Guests</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button className="px-4 py-2 text-brand hover:text-brand-dark flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                More Filters
              </button>
              <button className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${property.price}/night
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
                <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    {property.bedrooms} Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms} Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {property.guests} Guests
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-brand text-lg font-semibold">{property.rating}</span>
                    <span className="text-gray-500">({property.reviews} reviews)</span>
                  </div>
                  <button className="text-brand hover:text-brand-dark font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-brand text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 