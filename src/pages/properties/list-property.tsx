import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Upload,
  Camera,
  MapPin,
  Home,
  DollarSign,
  Users,
  BedDouble,
  Bath,
  Square,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
}

export function ListPropertyPage() {
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [inspectionDate, setInspectionDate] = useState('');
  const [inspectionTime, setInspectionTime] = useState('');
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    type: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    maxGuests: '',
    amenities: '',
    rules: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: PropertyImage[] = Array.from(files).map((file, index) => ({
        id: `img-${index}`,
        url: URL.createObjectURL(file),
        isMain: index === 0
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement property listing submission
    console.log('Property Data:', propertyData);
    console.log('Images:', images);
    console.log('Inspection Date:', inspectionDate);
    console.log('Inspection Time:', inspectionTime);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">List Your Property</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Images Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Property Images</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt="Property"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-brand transition-colors">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Upload at least 5 high-quality images of your property. The first image will be the main cover photo.
            </p>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
              <Input
                value={propertyData.title}
                onChange={(e) => setPropertyData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Luxury Villa with Ocean View"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                value={propertyData.type}
                onChange={(e) => setPropertyData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Select Type</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
              <Input
                type="number"
                value={propertyData.price}
                onChange={(e) => setPropertyData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., 150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input
                value={propertyData.location}
                onChange={(e) => setPropertyData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Karen, Nairobi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <Input
                type="number"
                value={propertyData.bedrooms}
                onChange={(e) => setPropertyData(prev => ({ ...prev, bedrooms: e.target.value }))}
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <Input
                type="number"
                value={propertyData.bathrooms}
                onChange={(e) => setPropertyData(prev => ({ ...prev, bathrooms: e.target.value }))}
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
              <Input
                type="number"
                value={propertyData.area}
                onChange={(e) => setPropertyData(prev => ({ ...prev, area: e.target.value }))}
                placeholder="e.g., 2000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
              <Input
                type="number"
                value={propertyData.maxGuests}
                onChange={(e) => setPropertyData(prev => ({ ...prev, maxGuests: e.target.value }))}
                placeholder="e.g., 6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
              value={propertyData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPropertyData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your property in detail..."
              rows={4}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
            <Textarea
              value={propertyData.amenities}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPropertyData(prev => ({ ...prev, amenities: e.target.value }))}
              placeholder="List all amenities (e.g., Pool, Gym, Parking)"
              rows={3}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">House Rules</label>
            <Textarea
              value={propertyData.rules}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPropertyData(prev => ({ ...prev, rules: e.target.value }))}
              placeholder="List your house rules..."
              rows={3}
            />
          </div>
        </div>

        {/* Property Inspection Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Property Inspection</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
                <p className="text-sm text-blue-700 mt-1">
                  We require an in-person inspection of your property before listing it. This helps us ensure accuracy and quality for our clients.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Inspection Date</label>
              <Input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                value={inspectionTime}
                onChange={(e) => setInspectionTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Our inspection team will contact you to confirm the appointment.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-8">
            Submit Property
          </Button>
        </div>
      </form>
    </div>
  );
} 