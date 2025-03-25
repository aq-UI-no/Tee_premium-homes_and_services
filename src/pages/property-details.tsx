import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '../components/ui/button';
import { Bed, Bath, MapPin } from 'lucide-react';
import { BookingForm } from '../components/bookings/booking-form';

export function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Property not found'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-teal-600">
              ${property.price_per_night}/night
            </div>
          </div>

          <div className="flex gap-6 mb-8">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-2" />
              <span>{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2" />
              <span>{property.bathrooms} bathrooms</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">About this property</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {property.amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <ul className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showBookingForm ? (
            <BookingForm
              propertyId={property.id}
              pricePerNight={property.price_per_night}
            />
          ) : (
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => setShowBookingForm(true)}
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}