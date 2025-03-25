import React, { useState, useEffect } from 'react';
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
  Receipt,
  Loader2,
  Plus
} from 'lucide-react';
import { ImageUploadService } from '../../services/imageUpload';
import { PropertyOwnerService } from '../../services/propertyOwner';
import { PropertyOwner } from '../../types/propertyOwner';

export function PropertyOwnerProfilePageEnhanced() {
  const [isEditing, setIsEditing] = useState(false);
  const [ownerData, setOwnerData] = useState<PropertyOwner | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'properties' | 'documents' | 'payments'>('overview');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const service = PropertyOwnerService.getInstance();
      const profile = await service.getProfile();
      setOwnerData(profile);
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !ownerData) return;

    try {
      const service = PropertyOwnerService.getInstance();
      const { id, url } = await service.uploadDocument(selectedFile);
      
      setOwnerData(prev => prev ? {
        ...prev,
        documents: [
          ...prev.documents,
          {
            id,
            name: selectedFile.name,
            type: 'Document',
            uploadDate: new Date().toLocaleDateString(),
            status: 'pending'
          }
        ]
      } : null);

      setSelectedFile(null);
      setUploadError(null);
    } catch (error) {
      setUploadError('Failed to upload document. Please try again.');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!ownerData) return;

    try {
      const service = PropertyOwnerService.getInstance();
      await service.deleteDocument(documentId);
      
      setOwnerData(prev => prev ? {
        ...prev,
        documents: prev.documents.filter(doc => doc.id !== documentId)
      } : null);
    } catch (error) {
      setError('Failed to delete document');
    }
  };

  const handleSave = async () => {
    if (!ownerData) return;

    try {
      setIsSaving(true);
      const service = PropertyOwnerService.getInstance();
      await service.saveProfile(ownerData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save profile changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    loadProfile();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!ownerData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </AdminLayout>
    );
  }

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
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
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

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('properties')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'properties'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setSelectedTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setSelectedTab('payments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payments
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {selectedTab === 'overview' && (
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
                        onChange={(e) => setOwnerData(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        value={ownerData.email}
                        onChange={(e) => setOwnerData(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        value={ownerData.phone}
                        onChange={(e) => setOwnerData(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <Input
                        value={ownerData.location}
                        onChange={(e) => setOwnerData(prev => prev ? ({ ...prev, location: e.target.value }) : null)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Earnings Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
                  <div className="h-64 flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500 ml-2">Earnings chart will be displayed here</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
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
          )}

          {selectedTab === 'properties' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Properties</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>
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
          )}

          {selectedTab === 'documents' && (
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
          )}

          {selectedTab === 'payments' && (
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
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 