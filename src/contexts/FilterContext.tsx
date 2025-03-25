import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  priceRange: [number, number];
  currency: string;
  beds: string | number;
  bathrooms: string | number;
  amenities: string[];
  services: string[];
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [1300, 18000],
    currency: 'KES',
    beds: 'Any',
    bathrooms: 'Any',
    amenities: [],
    services: []
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ filters, setFilters, isFiltersOpen, setIsFiltersOpen }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
} 