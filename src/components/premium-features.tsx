import React from 'react';
import { Shield, Clock, Star, Award, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PremiumFeatures(): React.ReactElement {
  const navigate = useNavigate();
  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-teal-600" />,
      title: "Verified Properties",
      description: "Every property is personally verified for quality and authenticity"
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: "24/7 Concierge",
      description: "Round-the-clock support for all your needs and inquiries"
    },
    {
      icon: <Star className="h-8 w-8 text-teal-600" />,
      title: "Premium Amenities",
      description: "Luxury amenities and services included with every stay"
    },
    {
      icon: <Award className="h-8 w-8 text-teal-600" />,
      title: "Best-in-Class",
      description: "Curated selection of top-rated luxury properties"
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: "Expert Hosts",
      description: "Professional hosts dedicated to exceptional service"
    },
    {
      icon: <Heart className="h-8 w-8 text-teal-600" />,
      title: "Personalized Experience",
      description: "Tailored recommendations based on your preferences"
    }
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Features for Premium Living
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience luxury living with our carefully curated selection of premium properties
            and exceptional services designed for discerning travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover-lift transition-all duration-300"
            >
              <div className="bg-teal-50 rounded-xl p-3 inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
            <div className="text-gray-600">Premium Properties</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">50k+</div>
            <div className="text-gray-600">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
            <div className="text-gray-600">Verified Hosts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Experience Luxury Living?
          </h3>
          <div className="inline-flex gap-4">
            <button 
              className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors duration-300"
              onClick={() => navigate('/properties')}
            >
              Browse Properties
            </button>
            <button 
              className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors duration-300"
              onClick={() => navigate('/list-property')}
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 