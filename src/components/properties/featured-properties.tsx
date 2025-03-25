import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, BedDouble, Bath, Users } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image: string;
}

const featuredProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Oceanfront Villa',
    location: 'Malibu, California',
    price: 1200,
    rating: 4.9,
    reviews: 128,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Modern Downtown Penthouse',
    location: 'Beverly Hills, California',
    price: 850,
    rating: 4.8,
    reviews: 95,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c153aee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Mountain View Estate',
    location: 'Hollywood Hills, California',
    price: 1500,
    rating: 5.0,
    reviews: 156,
    bedrooms: 6,
    bathrooms: 5,
    guests: 12,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Beachfront Bungalow',
    location: 'Venice Beach, California',
    price: 750,
    rating: 4.7,
    reviews: 82,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export function FeaturedProperties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProperties.map((property) => (
        <Link
          key={property.id}
          to={`/properties/${property.id}`}
          className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
              ${property.price}/night
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-semibold mr-1">{property.rating}</span>
              <span className="text-sm text-gray-600">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Up to {property.guests} guests</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 