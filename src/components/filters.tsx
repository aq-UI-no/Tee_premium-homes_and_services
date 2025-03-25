import React from 'react';
import { Button } from './ui/button';
import { SlidersHorizontal, X, Plus, Minus, Wifi, Utensils, Bath, Loader2, Car, Map } from 'lucide-react';
import Slider from 'rc-slider';
import { useFilters } from '../contexts/FilterContext';

const CURRENCIES = [
  { code: 'KES', symbol: 'KSh' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' }
];

// Mock price distribution data - replace with real data
const PRICE_DISTRIBUTION = Array.from({ length: 50 }, () => 
  Math.floor(Math.random() * 100)
);

const AMENITIES = [
  { id: 'wifi', label: 'Wifi', icon: Wifi },
  { id: 'kitchen', label: 'Kitchen', icon: Utensils },
  { id: 'private-bathroom', label: 'Private attached bathroom', icon: Bath },
  { id: 'washer', label: 'Washer', icon: Loader2 },
  { id: 'dryer', label: 'Dryer', icon: Loader2 },
  { id: 'air-conditioning', label: 'Air conditioning', icon: Loader2 }
];

const SERVICES = [
  { id: 'airport-pickup', label: 'Airport Pickup', icon: Car },
  { id: 'train-pickup', label: 'Train Station Pickup', icon: Car },
  { id: 'bus-pickup', label: 'Bus Station Pickup', icon: Car },
  { id: 'car-hire', label: 'Car Hire', icon: Car },
  { id: 'excursions', label: 'Local Excursions', icon: Map }
];

export function Filters() {
  const { filters, setFilters, isFiltersOpen, setIsFiltersOpen } = useFilters();

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCounterChange = (type: 'beds' | 'bathrooms', action: 'increment' | 'decrement') => {
    const current = filters[type];
    let newValue;
    
    if (current === 'Any') {
      newValue = action === 'increment' ? 1 : 'Any';
    } else {
      const numericValue = parseInt(current as string);
      newValue = action === 'increment' ? 
        numericValue + 1 : 
        numericValue - 1 === 0 ? 'Any' : numericValue - 1;
    }
    
    handleFilterChange(type, newValue);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [1300, 18000],
      currency: 'KES',
      beds: 'Any',
      bathrooms: 'Any',
      amenities: [],
      services: []
    });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setIsFiltersOpen(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>

      {isFiltersOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFiltersOpen(false)}
          />
          
          {/* Filter Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">Price range</h4>
                  <select
                    value={filters.currency}
                    onChange={(e) => handleFilterChange('currency', e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {CURRENCIES.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-600 mb-4">Nightly prices before fees and taxes</p>

                {/* Price Distribution Graph */}
                <div className="h-24 flex items-end gap-[2px] mb-6">
                  {PRICE_DISTRIBUTION.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-rose-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Price Range Slider */}
                <div className="px-2">
                  <Slider
                    range
                    min={1300}
                    max={18000}
                    step={100}
                    value={filters.priceRange}
                    onChange={(value: number | number[]) => {
                      if (Array.isArray(value)) {
                        handleFilterChange('priceRange', value);
                      }
                    }}
                    railStyle={{ backgroundColor: '#e5e7eb' }}
                    trackStyle={[{ backgroundColor: '#f43f5e' }]}
                    handleStyle={[
                      { backgroundColor: '#fff', borderColor: '#f43f5e', borderWidth: 2, boxShadow: 'none' },
                      { backgroundColor: '#fff', borderColor: '#f43f5e', borderWidth: 2, boxShadow: 'none' }
                    ]}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="rounded-full border px-4 py-2 text-sm">
                    {CURRENCIES.find(c => c.code === filters.currency)?.symbol}{filters.priceRange[0]}
                  </div>
                  <div className="rounded-full border px-4 py-2 text-sm">
                    {CURRENCIES.find(c => c.code === filters.currency)?.symbol}{filters.priceRange[1]}+
                  </div>
                </div>
              </div>

              {/* Beds and Bathrooms */}
              <div>
                <h4 className="text-lg font-medium mb-4">Beds and bathrooms</h4>
                
                {/* Beds */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <label className="text-base">Beds</label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCounterChange('beds', 'decrement')}
                        disabled={filters.beds === 'Any'}
                        className="h-8 w-8 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-16 text-center">{filters.beds}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCounterChange('beds', 'increment')}
                        className="h-8 w-8 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-base">Bathrooms</label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCounterChange('bathrooms', 'decrement')}
                        disabled={filters.bathrooms === 'Any'}
                        className="h-8 w-8 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-16 text-center">{filters.bathrooms}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCounterChange('bathrooms', 'increment')}
                        className="h-8 w-8 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-lg font-medium mb-4">Amenities</h4>
                <div className="grid grid-cols-2 gap-4">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity.id}
                      className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-rose-400 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={filters.amenities.includes(amenity.id)}
                        onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...filters.amenities, amenity.id]
                            : filters.amenities.filter(id => id !== amenity.id);
                          handleFilterChange('amenities', newAmenities);
                        }}
                      />
                      <div className={`rounded-full p-2 ${
                        filters.amenities.includes(amenity.id) ? 'bg-rose-100' : 'bg-gray-100'
                      }`}>
                        <amenity.icon className={`h-5 w-5 ${
                          filters.amenities.includes(amenity.id) ? 'text-rose-500' : 'text-gray-500'
                        }`} />
                      </div>
                      <span className="flex-1">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <h4 className="text-lg font-medium mb-4">Additional Services</h4>
                <div className="grid grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-rose-400 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={filters.services.includes(service.id)}
                        onChange={(e) => {
                          const newServices = e.target.checked
                            ? [...filters.services, service.id]
                            : filters.services.filter(id => id !== service.id);
                          handleFilterChange('services', newServices);
                        }}
                      />
                      <div className={`rounded-full p-2 ${
                        filters.services.includes(service.id) ? 'bg-rose-100' : 'bg-gray-100'
                      }`}>
                        <service.icon className={`h-5 w-5 ${
                          filters.services.includes(service.id) ? 'text-rose-500' : 'text-gray-500'
                        }`} />
                      </div>
                      <span className="flex-1">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReset}
              >
                Clear all
              </Button>
              <Button
                className="flex-1 bg-rose-500 text-white hover:bg-rose-600"
                onClick={() => setIsFiltersOpen(false)}
              >
                Show results
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 