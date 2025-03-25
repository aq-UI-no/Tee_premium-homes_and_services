import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '../components/ui/button';
import { 
  Bed, Bath, MapPin, Wifi, Car, Tv, 
  Coffee, Utensils, Star, ChevronLeft, ChevronRight,
  Waves as Pool
} from 'lucide-react';
import { BookingForm } from '../components/bookings/booking-form';

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Owner {
  full_name: string;
  avatar_url: string | null;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: string[];
  owner: Owner;
}

export function PropertyDetailsPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchPropertyAndReviews() {
      try {
        // Fetch property details
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select(`
            *,
            owner:owner_id (
              full_name,
              avatar_url
            )
          `)
          .eq('id', id)
          .single();

        if (propertyError) throw propertyError;
        setProperty(propertyData);

        // Fetch property reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('property_id', id)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPropertyAndReviews();
    }
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev: number) => 
      prev === (property?.images.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev: number) => 
      prev === 0 ? (property?.images.length ?? 1) - 1 : prev - 1
    );
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-6 w-6" />,
    'Parking': <Car className="h-6 w-6" />,
    'Pool': <Pool className="h-6 w-6" />,
    'TV': <Tv className="h-6 w-6" />,
    'Kitchen': <Utensils className="h-6 w-6" />,
    'Coffee Maker': <Coffee className="h-6 w-6" />,
  };

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

  const averageRating = reviews.length 
    ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-[600px]">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          
          {/* Gallery Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button
              variant="outline"
              className="rounded-full bg-black/30 border-white/50 hover:bg-black/50"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-black/30 border-white/50 hover:bg-black/50"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        <div className="p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
                <span className="text-gray-600 ml-1">({reviews.length} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-600">
                ${property.price_per_night}
                <span className="text-lg text-gray-600">/night</span>
              </div>
              {!showBookingForm && (
                <Button
                  className="mt-4 bg-teal-600 hover:bg-teal-700"
                  onClick={() => setShowBookingForm(true)}
                >
                  Check Availability
                </Button>
              )}
            </div>
          </div>

          {/* Property Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              {/* Main Features */}
              <div className="flex gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Bed className="h-6 w-6 text-teal-600 mr-2" />
                  <div>
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-6 w-6 text-teal-600 mr-2" />
                  <div>
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this property</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </div>

            <div>
              {showBookingForm ? (
                <BookingForm
                  propertyId={property.id}
                  pricePerNight={property.price_per_night}
                />
              ) : (
                <div className="sticky top-8">
                  {/* Host Information */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <img
                        src={property.owner.avatar_url || '/default-avatar.png'}
                        alt={property.owner.full_name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">Hosted by {property.owner.full_name}</h3>
                        <p className="text-sm text-gray-600">Superhost</p>
                      </div>
                    </div>
                    <Button className="w-full">Contact Host</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  {amenityIcons[amenity] || '•'}
                  <span className="ml-3">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="mt-4 text-sm font-medium">{review.user_name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}