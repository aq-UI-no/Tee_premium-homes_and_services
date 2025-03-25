import React from 'react';
import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/features-section';
import { PropertyGrid } from '../components/properties/property-grid';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <PropertyGrid />
        </div>
      </section>
    </>
  );
}