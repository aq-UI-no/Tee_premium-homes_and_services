import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Search,
  Filter,
  User,
  Plus,
  Home,
  DollarSign,
  Calendar,
  Star,
  Building2,
  MapPin,
  Phone,
  Mail,
  BarChart
} from 'lucide-react';

interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalProperties: number;
  totalEarnings: number;
  rating: number;
  properties: {
    id: string;
    name: string;
    type: string;
    status: 'listed' | 'unlisted' | 'maintenance';
    monthlyEarnings: number;
    rating: number;
  }[];
}

const mockPropertyOwners: PropertyOwner[] = [
  {
    id: '1',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    phone: '+254 700 000 007',
    location: 'Nairobi, Kenya',
    status: 'active',
    joinDate: 'Jan 1, 2024',
    totalProperties: 3,
    totalEarnings: 450000,
    rating: 4.8,
    properties: [
      {
        id: 'p1',
        name: 'Luxury Villa A',
        type: 'Villa',
        status: 'listed',
        monthlyEarnings: 150000,
        rating: 4.9
      },
      {
        id: 'p2',
        name: 'Modern Apartment B',
        type: 'Apartment',
        status: 'listed',
        monthlyEarnings: 85000,
        rating: 4.7
      },
      {
        id: 'p3',
        name: 'Studio Apartment C',
        type: 'Studio',
        status: 'maintenance',
        monthlyEarnings: 65000,
        rating: 4.6
      }
    ]
  },
  {
    id: '2',
    name: 'Mary Johnson',
    email: 'mary@example.com',
    phone: '+254 700 000 008',
    location: 'Mombasa, Kenya',
    status: 'active',
    joinDate: 'Feb 1, 2024',
    totalProperties: 2,
    totalEarnings: 280000,
    rating: 4.6,
    properties: [
      {
        id: 'p4',
        name: 'Beach House A',
        type: 'House',
        status: 'listed',
        monthlyEarnings: 180000,
        rating: 4.8
      },
      {
        id: 'p5',
        name: 'Seaside Villa B',
        type: 'Villa',
        status: 'unlisted',
        monthlyEarnings: 0,
        rating: 0
      }
    ]
  }
];

export function PropertyOwnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState<PropertyOwner | null>(null);

  const filteredOwners = mockPropertyOwners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         owner.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || owner.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Property Owners</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Owner
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search property owners..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOwners.map((owner) => (
            <div
              key={owner.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedOwner(owner)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{owner.name}</h3>
                    <p className="text-sm text-gray-500">{owner.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  owner.status === 'active' ? 'bg-green-100 text-green-800' :
                  owner.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Properties</p>
                    <p className="text-sm font-medium text-gray-900">{owner.totalProperties}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Monthly Earnings</p>
                    <p className="text-sm font-medium text-gray-900">KES {owner.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-sm font-medium text-gray-900">{owner.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="text-sm font-medium text-gray-900">{owner.rating}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Properties</h4>
                <div className="space-y-2">
                  {owner.properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{property.name}</p>
                          <p className="text-xs text-gray-500">{property.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          property.status === 'listed' ? 'bg-green-100 text-green-800' :
                          property.status === 'unlisted' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                        <p className="text-sm text-gray-900">KES {property.monthlyEarnings.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
} 