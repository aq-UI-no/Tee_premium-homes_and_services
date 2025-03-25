import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  Map,
  Calendar,
  Briefcase,
  Car,
  Compass,
  PaintBucket,
  BarChart,
  Clock,
  Building,
  Plane
} from 'lucide-react';

const services = [
  {
    id: 'property-management',
    title: 'Property Management',
    description: 'Full-service BnB property management for coastal properties. We handle everything from guest communication to maintenance.',
    icon: <Home className="h-6 w-6" />,
    features: [
      'Guest screening and communication',
      'Professional cleaning services',
      'Maintenance and repairs',
      'Dynamic pricing optimization',
      '24/7 guest support',
      'Regular property inspections'
    ]
  },
  {
    id: 'bnb-consulting',
    title: 'BnB Consulting',
    description: 'Expert guidance on starting and optimizing your BnB business, from property selection to interior design.',
    icon: <Briefcase className="h-6 w-6" />,
    features: [
      'Location analysis and recommendations',
      'Property investment guidance',
      'Interior design and furnishing advice',
      'Pricing strategy development',
      'Local market insights',
      'ROI optimization'
    ]
  },
  {
    id: 'property-setup',
    title: 'Property Setup & Design',
    description: 'Complete property setup services to transform your space into a premium BnB destination.',
    icon: <PaintBucket className="h-6 w-6" />,
    features: [
      'Interior design consultation',
      'Furniture and decor sourcing',
      'Professional photography',
      'Listing optimization',
      'Smart home setup',
      'Welcome guide creation'
    ]
  }
];

const additionalServices = [
  {
    title: 'Transportation Services',
    description: 'Convenient pickup and drop-off from airports and train stations',
    icon: <Car className="h-6 w-6" />
  },
  {
    title: 'Local Excursions',
    description: 'Curated local experiences and guided tours',
    icon: <Compass className="h-6 w-6" />
  },
  {
    title: 'Performance Analytics',
    description: 'Detailed reporting and analytics for property owners',
    icon: <BarChart className="h-6 w-6" />
  },
  {
    title: '24/7 Concierge',
    description: 'Round-the-clock support for guests and property owners',
    icon: <Clock className="h-6 w-6" />
  }
];

const stats = [
  { value: '50+', label: 'Properties Managed' },
  { value: '98%', label: 'Occupancy Rate' },
  { value: '4.9/5', label: 'Guest Satisfaction' },
  { value: '£2M+', label: 'Revenue Generated' }
];

export function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-brand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Premium BnB Management & Consulting Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            From property management to expert consulting, we help you maximize your BnB investment
            while providing exceptional guest experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-brand px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/list-property')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-brand/10 rounded-lg p-3 inline-block mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/contact')}
                  className="mt-8 w-full bg-brand text-white py-3 rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-24 bg-gray-50" id="additional-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-brand/10 rounded-full p-4 inline-block mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-brand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Maximize Your BnB Potential?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're looking to start your BnB journey or optimize your existing property,
            we're here to help you succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-brand text-white px-8 py-3 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Schedule a Consultation
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="border border-brand text-brand px-8 py-3 rounded-lg hover:bg-brand/5 transition-colors"
            >
              View Our Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 