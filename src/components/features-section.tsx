import React from 'react';
import { Home, Users, Map, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    id: 'property-management',
    icon: <Home className="h-6 w-6" />,
    title: "Property Management",
    description: "Expert management of your BnB property, maximizing your returns while minimizing your effort."
  },
  {
    id: 'bnb-consulting',
    icon: <Users className="h-6 w-6" />,
    title: "BnB Consulting",
    description: "Professional advice on property selection, furnishing, and optimization for the BnB market."
  },
  {
    id: 'property-setup',
    icon: <Map className="h-6 w-6" />,
    title: "Location Guidance",
    description: "Strategic insights on the best locations for BnB investment and property acquisition."
  },
  {
    id: 'additional-services',
    icon: <Calendar className="h-6 w-6" />,
    title: "Complete Packages",
    description: "Comprehensive services including airport transfers, excursions, and personalized experiences."
  }
];

export function FeaturesSection() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services#${serviceId}`);
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive solutions for property owners and travelers
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleServiceClick(feature.id)}
            >
              <div className="absolute -top-4 left-6 bg-brand rounded-lg p-3 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}