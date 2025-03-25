import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Award, Users, Heart, Shield, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from property selection to guest experience.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Trust',
    description: 'Building trust through transparency, reliability, and consistent high-quality service.'
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Passion',
    description: 'Passionate about creating exceptional experiences for both property owners and guests.'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Growth',
    description: 'Committed to continuous improvement and helping our partners grow their investments.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    bio: 'With over 15 years in luxury hospitality and property management.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Property Management',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    bio: 'Expert in optimizing property performance and guest satisfaction.'
  },
  {
    name: 'Emma Thompson',
    role: 'Interior Design Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    bio: 'Specializes in creating stunning, guest-ready spaces.'
  },
  {
    name: 'David Williams',
    role: 'Guest Experience Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    bio: 'Ensures exceptional service and memorable stays.'
  }
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-brand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            About Tee Premium Homes & Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted partner in premium property management and BnB services along the coast.
            We transform properties into exceptional experiences.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded with a vision to revolutionize coastal property management, Tee Premium Homes & Services 
                has grown from a small local operation to a leading name in premium BnB services.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey began with a simple mission: to help property owners maximize their investments while 
                providing guests with unforgettable experiences. Today, we manage a portfolio of premium properties 
                and offer comprehensive services from property setup to guest management.
              </p>
              <p className="text-gray-600">
                What sets us apart is our deep understanding of both property management and hospitality, 
                combined with our commitment to excellence in every detail.
              </p>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80"
                alt="Coastal Property"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-brand/10 rounded-full p-4 inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-64 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Whether you're a property owner looking for management services or a guest seeking 
            the perfect stay, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-brand px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 