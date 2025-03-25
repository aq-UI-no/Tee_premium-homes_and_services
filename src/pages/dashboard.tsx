import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '../components/ui/button';
import { Calendar, Home, User } from 'lucide-react';

interface Booking {
  id: string;
  property: {
    id: string;
    title: string;
    location: string;
  };
  check_in: string;
  check_out: string;
  total_price: number;
  status: string;
  guests: number;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  status: string;
  bookings_count: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'properties'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        // Fetch user's bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            id,
            check_in,
            check_out,
            total_price,
            status,
            guests,
            property:properties (
              id,
              title,
              location
            )
          `)
          .eq('user_id', user.id)
          .order('check_in', { ascending: false });

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData || []);

        // Fetch user's properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select(`
            id,
            title,
            location,
            price_per_night,
            status,
            bookings:bookings (count)
          `)
          .eq('owner_id', user.id);

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    }
  };

  const handleUpdatePropertyStatus = async (propertyId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(properties.map(property =>
        property.id === propertyId
          ? { ...property, status }
          : property
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update property status');
    }
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button
            variant={activeTab === 'bookings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('bookings')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            My Bookings
          </Button>
          <Button
            variant={activeTab === 'properties' ? 'default' : 'outline'}
            onClick={() => setActiveTab('properties')}
            className="flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            My Properties
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {activeTab === 'bookings' ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{booking.property.title}</h3>
                  <p className="text-gray-600 mb-4">{booking.property.location}</p>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Check-in:</span>{' '}
                      {new Date(booking.check_in).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span>{' '}
                      {new Date(booking.check_out).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Guests:</span> {booking.guests}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${booking.total_price}</div>
                  <div className={`
                    mt-2 px-3 py-1 rounded-full text-sm
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>
              {booking.status === 'pending' && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </div>
              )}
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">
                When you book a property, it will appear here.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Price:</span>{' '}
                      ${property.price_per_night}/night
                    </div>
                    <div>
                      <span className="font-medium">Bookings:</span>{' '}
                      {property.bookings_count}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <select
                    value={property.status}
                    onChange={(e) => handleUpdatePropertyStatus(property.id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  View Property
                </Button>
              </div>
            </div>
          ))}
          {properties.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties listed</h3>
              <p className="text-gray-600 mb-4">
                Start earning by listing your property on our platform.
              </p>
              <Button
                onClick={() => navigate('/list-property')}
                className="bg-teal-600 hover:bg-teal-700"
              >
                List a Property
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}