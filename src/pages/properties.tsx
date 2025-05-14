import * as React from 'react';
import { MapPin, BedDouble, Bath, Users, Search, SlidersHorizontal } from 'lucide-react';

// Property data with one active listing and four placeholders
const PROPERTIES = [
  {
    id: '1',
    title: 'One Bedroom Apartment',
    location: 'Malibu, California',
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 89,
    isPlaceholder: false
  },
  {
    id: '2',
    title: 'Studio',
    location: 'Coming Soon',
    price: 600,
    bedrooms: 1,
    bathrooms: 1,
    guests: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340&blur=10',
    rating: null,
    reviews: null,
    isPlaceholder: true
  },
  {
    id: '3',
    title: 'Two Bedroom',
    location: 'Coming Soon',
    price: 1000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&blur=10',
    rating: null,
    reviews: null,
    isPlaceholder: true
  },
  {
    id: '4',
    title: 'Three Bedroom',
    location: 'Coming Soon',
    price: 1200,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&blur=10',
    rating: null,
    reviews: null,
    isPlaceholder: true
  },
  {
    id: '5',
    title: 'Villa',
    location: 'Coming Soon',
    price: 1500,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&blur=10',
    rating: null,
    reviews: null,
    isPlaceholder: true
  }
];

export function PropertiesPage() {
  const [searchParams, setSearchParams] = React.useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    guests: ''
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              value={searchParams.priceRange}
              onChange={(e) => setSearchParams(prev => ({ ...prev, priceRange: e.target.value }))}
            >
              <option value="">Price Range</option>
              <option value="0-500">$0 - $500</option>
              <option value="501-1000">$501 - $1000</option>
              <option value="1001-1500">$1001 - $1500</option>
              <option value="1501+">$1501+</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              value={searchParams.bedrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bedrooms: e.target.value }))}
            >
              <option value="">Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4+">4+ Bedrooms</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              value={searchParams.bathrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bathrooms: e.target.value }))}
            >
              <option value="">Bathrooms</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4+">4+ Bathrooms</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              value={searchParams.guests}
              onChange={(e) => setSearchParams(prev => ({ ...prev, guests: e.target.value }))}
            >
              <option value="">Guests</option>
              <option value="1-2">1-2 Guests</option>
              <option value="3-4">3-4 Guests</option>
              <option value="5-6">5-6 Guests</option>
              <option value="7+">7+ Guests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => (
          <div
            key={property.id}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              property.isPlaceholder ? 'relative' : ''
            }`}
          >
            <div className="relative h-64">
              <img
                src={property.image}
                alt={property.title}
                className={`w-full h-full object-cover ${
                  property.isPlaceholder ? 'filter blur-sm' : ''
                }`}
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                ${property.price}/night
              </div>
              {property.isPlaceholder && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-2xl font-semibold mb-2">Coming Soon</p>
                    <p className="text-sm">Stay tuned for updates</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 flex-shrink-0 mr-2" />
                <span className="text-sm truncate">{property.location}</span>
              </div>
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 flex-shrink-0 mr-1" />
                  <span className="truncate">{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 flex-shrink-0 mr-1" />
                  <span className="truncate">{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 flex-shrink-0 mr-1" />
                  <span className="truncate">{property.guests} guests</span>
                </div>
              </div>
              {!property.isPlaceholder && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-brand text-lg font-semibold">{property.rating}</span>
                    <span className="text-gray-500">({property.reviews} reviews)</span>
                  </div>
                  <button className="text-brand hover:text-brand-dark font-semibold">
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 