import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/button';
import {
  ArrowUpIcon,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Home as HomeIcon,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  revenue: number;
}

// Mock data for the revenue chart
const revenueData = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 42560 },
  { month: 'Apr', revenue: 39000 },
  { month: 'May', revenue: 41000 },
  { month: 'Jun', revenue: 45000 },
];

interface Booking {
  id: string;
  property: string;
  dates: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const recentBookings: Booking[] = [
  {
    id: '1',
    property: 'Beach Cottage',
    dates: 'Mar 10 - Mar 15',
    status: 'confirmed',
  },
  {
    id: '2',
    property: 'Oceanview Villa',
    dates: 'Mar 12 - Mar 18',
    status: 'pending',
  },
  {
    id: '3',
    property: 'Seaside Apartment',
    dates: 'Mar 15 - Mar 20',
    status: 'confirmed',
  },
];

const statsCards = [
  {
    title: 'Total Properties',
    value: '124',
    change: '+12%',
    changeText: 'from last month',
  },
  {
    title: 'Active Bookings',
    value: '87',
    change: '+8%',
    changeText: 'from last month',
  },
  {
    title: 'Total Revenue',
    value: '$42,560',
    change: '+15%',
    changeText: 'from last month',
  },
];

interface PopularProperty {
  id: string;
  name: string;
  location: string;
  rating: number;
  bookings: number;
  revenue: number;
  image: string;
}

interface Activity {
  id: string;
  type: 'booking' | 'review' | 'inquiry' | 'maintenance';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'maintenance' | 'review' | 'booking' | 'inquiry';
}

const popularProperties: PopularProperty[] = [
  {
    id: '1',
    name: 'Luxury Beach Villa',
    location: 'Diani Beach',
    rating: 4.8,
    bookings: 45,
    revenue: 15800,
    image: '/property-1.jpg'
  },
  {
    id: '2',
    name: 'Ocean View Apartment',
    location: 'Nyali',
    rating: 4.6,
    bookings: 38,
    revenue: 12400,
    image: '/property-2.jpg'
  },
  {
    id: '3',
    name: 'Palm Resort Suite',
    location: 'Malindi',
    rating: 4.7,
    bookings: 42,
    revenue: 14200,
    image: '/property-3.jpg'
  }
];

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'booking',
    title: 'New Booking',
    description: 'Beach Cottage booked for 5 nights',
    timestamp: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'review',
    title: 'New Review',
    description: '4-star review for Oceanview Villa',
    timestamp: '3 hours ago',
    status: 'pending'
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Maintenance Request',
    description: 'AC repair needed at Palm Resort',
    timestamp: '5 hours ago',
    status: 'pending'
  }
];

const upcomingTasks: Task[] = [
  {
    id: '1',
    title: 'Property Inspection',
    dueDate: 'Tomorrow',
    priority: 'high',
    type: 'maintenance'
  },
  {
    id: '2',
    title: 'Guest Check-in',
    dueDate: 'Today',
    priority: 'high',
    type: 'booking'
  },
  {
    id: '3',
    title: 'Review Response',
    dueDate: 'In 2 days',
    priority: 'medium',
    type: 'review'
  }
];

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-6">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <h3 className="text-gray-500">{card.title}</h3>
              <p className="text-3xl font-bold">{card.value}</p>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span>{card.change}</span>
                <span className="ml-1 text-gray-500">{card.changeText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1a73e8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.property}</h3>
                      <p className="text-sm text-gray-500">{booking.dates}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Partner Activity</h2>
            <div className="flex flex-col items-center justify-center h-[200px]">
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-brand"
                    strokeWidth="12"
                    strokeDasharray="364.4"
                    strokeDashoffset="91.1"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-2xl font-bold">75%</p>
                  <p className="text-sm text-gray-500">Active Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Properties */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Popular Properties</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/properties')}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularProperties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100">
                  {/* Replace with actual image */}
                  <div className="w-full h-full bg-gray-200" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-500">{property.location}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{property.rating}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{property.bookings} bookings</p>
                    <p>${property.revenue.toLocaleString()} revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <div className={`
                    rounded-full p-2
                    ${activity.type === 'booking' ? 'bg-green-100' :
                      activity.type === 'review' ? 'bg-blue-100' :
                      activity.type === 'inquiry' ? 'bg-yellow-100' : 'bg-red-100'}
                  `}>
                    {activity.type === 'booking' ? <Calendar className="h-4 w-4 text-green-600" /> :
                     activity.type === 'review' ? <Star className="h-4 w-4 text-blue-600" /> :
                     activity.type === 'inquiry' ? <User className="h-4 w-4 text-yellow-600" /> :
                     <HomeIcon className="h-4 w-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{activity.title}</h3>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <div className={`
                    rounded-full p-2
                    ${task.priority === 'high' ? 'bg-red-100' :
                      task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}
                  `}>
                    {task.type === 'maintenance' ? <HomeIcon className="h-4 w-4" /> :
                     task.type === 'booking' ? <Calendar className="h-4 w-4" /> :
                     task.type === 'review' ? <Star className="h-4 w-4" /> :
                     <User className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => navigate('/admin/tasks')}
            >
              View All Tasks
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}