import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const KENYAN_LOCATIONS = [
  'Mombasa',
  'Nairobi',
  'Diani',
  'Watamu',
  'Kilifi',
  'Kiambu',
  'Kisumu',
  'Eldoret',
  'Nakuru',
  'Naivasha'
];

export function HeroSection() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    dates: '',
    guests: ''
  });
  const [showLocations, setShowLocations] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...searchParams,
      dates: startDate && endDate ? `${startDate.toISOString()}-${endDate.toISOString()}` : ''
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  const handleLocationSelect = (location: string) => {
    setSearchParams({ ...searchParams, location });
    setShowLocations(false);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setSearchParams({
      ...searchParams,
      dates: start && end ? `${start.toLocaleDateString()} - ${end.toLocaleDateString()}` : ''
    });
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <div 
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2070&q=80)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Experience Luxury Living
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in-delay">
          Discover handpicked premium properties in the world's most sought-after locations
        </p>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  onFocus={() => setShowLocations(true)}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              </div>
              {showLocations && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg overflow-hidden">
                  {KENYAN_LOCATIONS.map((location) => (
                    <button
                      key={location}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => handleLocationSelect(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Check-in - Check-out"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand"
                dateFormat="MMM d, yyyy"
                minDate={new Date()}
                customInput={
                  <input
                    className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                    readOnly
                  />
                }
              />
            </div>
            <div className="flex-1 relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="number"
                placeholder="Number of guests"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand"
                value={searchParams.guests}
                onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
              />
            </div>
            <Button 
              size="lg" 
              className="bg-brand text-white hover:bg-brand-dark px-8"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Button 
            size="lg" 
            className="bg-brand text-white hover:bg-brand-dark text-lg px-8 py-6"
            onClick={() => navigate('/properties')}
          >
            Browse Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-6"
            onClick={() => navigate('/list-property')}
          >
            List Your Property
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md py-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-sm text-white/70">Premium Properties</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">50k+</div>
            <div className="text-sm text-white/70">Happy Guests</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-sm text-white/70">Verified Hosts</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm text-white/70">Premium Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}