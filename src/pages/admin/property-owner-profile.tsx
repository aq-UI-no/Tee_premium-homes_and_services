import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  Star,
  Building2,
  BarChart,
  Edit2,
  Save,
  X,
  AlertCircle,
  FileText,
  Upload,
  Trash2,
  CreditCard,
  Receipt
} from 'lucide-react';
import { ImageUploadService } from '../../services/imageUpload';

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
  earningsHistory: {
    month: string;
    amount: number;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    type: 'rent' | 'deposit' | 'refund';
    status: 'completed' | 'pending' | 'failed';
    property: string;
  }[];
}

const mockOwner: PropertyOwner = {
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
  ],
  earningsHistory: [
    { month: 'Jan 2024', amount: 420000 },
    { month: 'Feb 2024', amount: 450000 },
    { month: 'Mar 2024', amount: 480000 }
  ],
  documents: [
    {
      id: 'd1',
      name: 'ID Document',
      type: 'Identification',
      uploadDate: 'Jan 15, 2024',
      status: 'verified'
    },
    {
      id: 'd2',
      name: 'Property Title Deed',
      type: 'Property Document',
      uploadDate: 'Jan 20, 2024',
      status: 'pending'
    }
  ],
  paymentHistory: [
    {
      id: 'p1',
      date: 'Mar 1, 2024',
      amount: 150000,
      type: 'rent',
      status: 'completed',
      property: 'Luxury Villa A'
    },
    {
      id: 'p2',
      date: 'Mar 1, 2024',
      amount: 85000,
      type: 'rent',
      status: 'completed',
      property: 'Modern Apartment B'
    }
  ]
};

export function PropertyOwnerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [ownerData, setOwnerData] = useState(mockOwner);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const imageService = ImageUploadService.getInstance();
      const uploadedImage = await imageService.uploadImage(selectedFile);
      
      // Add new document to the list
      setOwnerData(prev => ({
        ...prev,
        documents: [
          ...prev.documents,
          {
            id: uploadedImage.id,
            name: selectedFile.name,
            type: 'Document',
            uploadDate: new Date().toLocaleDateString(),
            status: 'pending'
          }
        ]
      }));

      setSelectedFile(null);
      setUploadError(null);
    } catch (error) {
      setUploadError('Failed to upload document. Please try again.');
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setOwnerData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId)
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setOwnerData(mockOwner);
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Property Owner Profile</h1>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input
                    value={ownerData.name}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={ownerData.email}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input
                    value={ownerData.phone}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Input
                    value={ownerData.location}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Properties List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>
              <div className="space-y-4">
                {ownerData.properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">{property.name}</h3>
                        <p className="text-sm text-gray-500">{property.type}</p>
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
                      <p className="text-sm font-medium text-gray-900">
                        KES {property.monthlyEarnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats and Earnings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Total Properties</p>
                    <p className="text-lg font-semibold text-gray-900">{ownerData.totalProperties}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Monthly Earnings</p>
                    <p className="text-lg font-semibold text-gray-900">
                      KES {ownerData.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-lg font-semibold text-gray-900">{ownerData.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="text-lg font-semibold text-gray-900">{ownerData.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Earnings History</h2>
              <div className="space-y-2">
                {ownerData.earningsHistory.map((earning) => (
                  <div key={earning.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{earning.month}</span>
                    <span className="text-sm font-medium text-gray-900">
                      KES {earning.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Documents</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Button onClick={handleUpload} disabled={!selectedFile}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {uploadError && (
                  <p className="text-sm text-red-500">{uploadError}</p>
                )}
                <div className="space-y-2">
                  {ownerData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Payment History</h2>
              <div className="space-y-4">
                {ownerData.paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Receipt className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">{payment.property}</h3>
                        <p className="text-sm text-gray-500">{payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                      <p className="text-sm font-medium text-gray-900">
                        KES {payment.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Alert */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Account Status</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Your account is currently {ownerData.status}. All features are available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 