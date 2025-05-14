import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Bed, Bath, Users, MapPin, Star } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3]">
        <img
          src={property.isPlaceholder ? 
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80&blur=10' :
            property.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
          }
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold">
          ${property.price_per_night}/night
        </div>
        {property.isPlaceholder && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">Coming Soon</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
          {property.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{property.rating}</span>
              {property.reviews && (
                <span className="text-gray-500">({property.reviews})</span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5" title={`${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}`}>
            <Bed className="h-4 w-4 flex-shrink-0" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title={`${property.bathrooms} bathroom${property.bathrooms !== 1 ? 's' : ''}`}>
            <Bath className="h-4 w-4 flex-shrink-0" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title={`Up to ${property.guests} guest${property.guests !== 1 ? 's' : ''}`}>
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{property.guests}</span>
          </div>
        </div>

        {!property.isPlaceholder && (
          <Link 
            to={`/properties/${property.id}`}
            className="block w-full"
          >
            <Button 
              className="w-full"
              aria-label={`View details for ${property.title}`}
            >
              View Details
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}