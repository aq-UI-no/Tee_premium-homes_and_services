import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '../../components/ui/button';
import { Users, Home, Calendar, Settings } from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  revenue: number;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        // Check if user is admin
        const { data: userData, error: userError } = await supabase
          .from('admin_users_view')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (userError || !userData?.is_admin) {
          navigate('/');
          return;
        }

        setIsAdmin(true);

        // Fetch admin statistics
        const [
          { count: usersCount },
          { count: propertiesCount },
          { count: bookingsCount },
          { data: revenueData }
        ] = await Promise.all([
          supabase.from('admin_users_view').select('id', { count: 'exact' }),
          supabase.from('properties').select('id', { count: 'exact' }),
          supabase.from('bookings').select('id', { count: 'exact' }),
          supabase.from('bookings').select('total_price').eq('status', 'confirmed')
        ]);

        const totalRevenue = (revenueData || []).reduce((sum, booking) => sum + booking.total_price, 0);

        setStats({
          totalUsers: usersCount || 0,
          totalProperties: propertiesCount || 0,
          totalBookings: bookingsCount || 0,
          revenue: totalRevenue
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    }

    checkAdminAccess();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!isAdmin || error) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/settings')}
          className="flex items-center gap-2"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{stats?.totalUsers}</h3>
            </div>
            <Users className="h-8 w-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Properties</p>
              <h3 className="text-2xl font-bold">{stats?.totalProperties}</h3>
            </div>
            <Home className="h-8 w-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Bookings</p>
              <h3 className="text-2xl font-bold">{stats?.totalBookings}</h3>
            </div>
            <Calendar className="h-8 w-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats?.revenue.toFixed(2)}</h3>
            </div>
            <div className="h-8 w-8 text-teal-600 flex items-center justify-center text-2xl">
              $
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => navigate('/admin/users')}
        >
          Manage Users
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => navigate('/admin/properties')}
        >
          Manage Properties
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => navigate('/admin/bookings')}
        >
          Manage Bookings
        </Button>
      </div>
    </div>
  );
}