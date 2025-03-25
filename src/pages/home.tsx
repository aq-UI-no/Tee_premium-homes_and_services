import React from 'react';
import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/features-section';
import { FeaturedProperties } from '../components/properties/featured-properties';
import { Footer } from '../components/footer';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600">
              Discover our handpicked selection of premium properties
            </p>
          </div>
          <FeaturedProperties />
        </div>
      </section>
      <Footer />
    </>
  );
}