import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  User,
  Plus,
  Star,
  Home,
  Calendar
} from 'lucide-react';

interface Renter {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  leaseEnd: string;
  rentAmount: number;
  rating: number;
}

const mockRenters: Renter[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+254 700 000 004',
    property: 'Luxury Villa A',
    location: 'Karen, Nairobi',
    status: 'active',
    joinDate: 'Jan 1, 2024',
    leaseEnd: 'Dec 31, 2024',
    rentAmount: 150000,
    rating: 4.9
  },
  {
    id: '2',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+254 700 000 005',
    property: 'Modern Apartment B',
    location: 'Westlands, Nairobi',
    status: 'active',
    joinDate: 'Feb 1, 2024',
    leaseEnd: 'Jan 31, 2025',
    rentAmount: 85000,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+254 700 000 006',
    property: 'Studio Apartment C',
    location: 'Kilimani, Nairobi',
    status: 'pending',
    joinDate: 'Feb 15, 2024',
    leaseEnd: 'Feb 14, 2025',
    rentAmount: 65000,
    rating: 0
  }
];

export function RentersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredRenters = mockRenters.filter(renter => {
    const matchesSearch = renter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         renter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         renter.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || renter.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Renters</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Renter
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search renters..."
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

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRenters.map((renter) => (
                  <tr key={renter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{renter.name}</div>
                          <div className="text-sm text-gray-500">{renter.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{renter.property}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{renter.email}</div>
                      <div className="text-sm text-gray-500">{renter.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        renter.status === 'active' ? 'bg-green-100 text-green-800' :
                        renter.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {renter.status.charAt(0).toUpperCase() + renter.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm">
                          <div className="text-gray-900">{renter.joinDate}</div>
                          <div className="text-gray-500">to {renter.leaseEnd}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      KES {renter.rentAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{renter.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-brand hover:text-brand-dark mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 