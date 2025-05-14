import * as React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, BedDouble, Bath, Users } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number | null;
  reviews: number | null;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image: string;
  isPlaceholder: boolean;
}

const featuredProperties: Property[] = [
  {
    id: '1',
    title: 'One Bedroom Apartment',
    location: 'Malibu, California',
    price: 800,
    rating: 4.7,
    reviews: 89,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80',
    isPlaceholder: false
  },
  {
    id: '2',
    title: 'Studio',
    location: 'Coming Soon',
    price: 600,
    rating: null,
    reviews: null,
    bedrooms: 1,
    bathrooms: 1,
    guests: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2340&blur=10',
    isPlaceholder: true
  },
  {
    id: '3',
    title: 'Two Bedroom',
    location: 'Coming Soon',
    price: 1000,
    rating: null,
    reviews: null,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&blur=10',
    isPlaceholder: true
  },
  {
    id: '4',
    title: 'Three Bedroom',
    location: 'Coming Soon',
    price: 1200,
    rating: null,
    reviews: null,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&blur=10',
    isPlaceholder: true
  }
];

export function FeaturedProperties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProperties.map((property) => (
        <Link
          key={property.id}
          to={property.isPlaceholder ? '#' : `/properties/${property.id}`}
          className={`group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
            property.isPlaceholder ? 'cursor-default' : ''
          }`}
          onClick={(e) => {
            if (property.isPlaceholder) {
              e.preventDefault();
            }
          }}
        >
          <div className="relative h-48">
            <img
              src={property.image}
              alt={property.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                property.isPlaceholder ? 'filter blur-sm' : ''
              }`}
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
              ${property.price}/night
            </div>
            {property.isPlaceholder && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-xl font-semibold mb-2">Coming Soon</p>
                  <p className="text-sm">Stay tuned for updates</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            {!property.isPlaceholder && property.rating && property.reviews && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current flex-shrink-0 mr-1" />
                <span className="text-sm font-semibold mr-1">{property.rating}</span>
                <span className="text-sm text-gray-600">({property.reviews} reviews)</span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
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
          </div>
        </Link>
      ))}
    </div>
  );
} 